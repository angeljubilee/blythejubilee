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
      const sql2 = format('insert into "Variations" ("type", "value", "itemId") values %L',
        sizeArray);
      db.query(sql2)
        .then(result => {
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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
