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
    select
      "itemId",
      "url",
      "title",
      "price",
      "numInStock"
    from "Items"
    order by "itemId" desc
  `;

  db.query(sql)
    .then(result => {
      const rows = result.rows;
      res.status(200).json(rows);
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/items/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    throw new ClientError(400, 'No item key');
  }
  const sql = `
    select
      i."itemId",
      i."url",
      i."title",
      i."description",
      i."price",
      i."numInStock",
      (select json_agg(vars) from (
        select "varId", "type", "value" from "Variations"
          where "itemId" = i."itemId"
        ) vars
      ) as Variations
    from "Items" as i
    where "itemId" = $1;
  `;
  const params = [id];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find item ${id}`);
      }
      const row = result.rows[0];
      const { itemId, url, title, description, price, numInStock } = row;
      const vars = {};
      if (!row.variations) {
        return { itemId, url, title, description, price, numInStock, vars };
      }
      for (let i = 0; i < row.variations.length; i++) {
        const { type, value, varId } = row.variations[i];
        if (vars[type]) {
          vars[type].push({ value, varId });
        } else {
          vars[type] = [{ value, varId }];
        }
      }
      res.status(200).json({ itemId, url, title, description, price, numInStock, vars });
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/orders', (req, res, next) => {
  if (!req.body.userId || !req.body.transactionId ||
    !req.body.items) {
    throw new ClientError(400, 'missing require fields');
  }
  const { userId, transactionId, items } = req.body;
  const sql = `
    insert into "Orders"
    ("userId", "transactionId", "isCompleted")
    values ($1, $2, $3)
    returning *
  `;
  const params = [userId, transactionId, false];
  db.query(sql, params)
    .then(result => {
      const [order] = result.rows;
      if (!order) {
        throw new ClientError(500, 'Internal server error');
      }
      const sizeArray = items.map(item => {
        const vars = [];
        if (item.vars) {
          for (const key in item.vars) {
            vars.push(item.vars[key].varId);
          }
        }
        let var1 = null;
        let var2 = null;
        let var3 = null;
        if (vars.length > 2) {
          [var1, var2, var3] = vars;
        } else if (vars.length > 1) {
          [var1, var2] = vars;
        } else if (vars.length === 1) {
          [var1] = vars;
        }
        return [order.orderId, item.itemId, item.qty, var1, var2, var3];
      });
      const sql2 = format('insert into "OrderItems" ("orderId", "itemId", "qty", "varId1", "varId2", "varId3") values %L returning *',
        sizeArray);
      db.query(sql2)
        .then(result => res.status(201).json(order))
        .catch(err => next(err));
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
