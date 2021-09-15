require('dotenv/config');
const pg = require('pg');
const format = require('pg-format');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.use(staticMiddleware);

app.post('/api/uploads', uploadsMiddleware, (req, res, next) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.send('Please select an image to upload');
  }
  const url = `/images/${req.file.filename}`;
  res.status(201).json({ url });
});

app.post('/api/items', (req, res, next) => {
  if (!req.body.title ||
    !req.body.description ||
    !req.body.price ||
    !req.body.numInStock) {
    throw new ClientError(400, 'missing require fields');
  }
  const { title, description, url, price, numInStock } = req.body;

  const sql = `
    insert into "Items"
    ("title", "description", "url", "price", "numInStock")
    values ($1, $2, $3, $4, $5)
    returning *
  `;
  const params = [title, description, url, price, numInStock];
  db.query(sql, params)
    .then(result => {
      const [item] = result.rows;
      if (!item) {
        throw new ClientError(500, 'Internal server error');
      }

      const sizes = req.body.sizeList;
      if (!sizes.length) {
        res.status(201).json(item);
      }

      const sizeArray = sizes.map(size => {
        return ['size', size, item.itemId];
      });
      const sql2 = format('insert into "Variations" ("type", "value", "itemId") values %L returning *',
        sizeArray);
      db.query(sql2)
        .then(result => {
          if (!result.rows) {
            res.status(201).json(item);
          }
          const vars = {};
          for (let i = 0; i < result.rows.length; i++) {
            const variation = result.rows[i];
            const { type, value, varId } = variation;
            if (!vars[type]) {
              vars[type] = [{ value, varId }];
            } else {
              vars[variation.type].push({ value, varId });
            }
          }
          item.vars = vars;
          res.status(201).json(item);

        })
        .catch(err => {
          next(err);
        });
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/items', (req, res, next) => {
  const sql = `
    select i."itemId", i."url", i."title", i."description", i."price",
      i."numInStock", i."createdAt",
      (select json_agg(vars) from (
        select "varId", "type", "value" from "Variations"
          where "itemId" = i."itemId"
        ) vars
      ) as Variations
    from "Items" as i
    order by i."itemId" desc
  `;

  db.query(sql)
    .then(result => {
      const rows = result.rows;
      const shopItems = rows.map(row => {
        const { itemId, url, title, description, price, numInStock, createdAt } = row;
        const vars = {};
        if (!row.variations) {
          return { itemId, url, title, description, price, numInStock, createdAt, vars };
        }
        for (let i = 0; i < row.variations.length; i++) {
          const { type, value, varId } = row.variations[i];
          if (vars[type]) {
            vars[type].push({ value, varId });
          } else {
            vars[type] = [{ value, varId }];
          }
        }
        return { itemId, url, title, description, price, numInStock, createdAt, vars };
      });
      res.status(200).json(shopItems);
    })
    .catch(err => {
      next(err);
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
