import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import { PRODUCTS } from '../src/data/products.js';

const { Database } = sqlite3.verbose();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbDirectory = path.resolve(__dirname, '../data');
const dbPath = path.join(dbDirectory, 'novacommerce.db');

fs.mkdirSync(dbDirectory, { recursive: true });

const db = new Database(dbPath);

const run = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) {
        reject(err);
        return;
      }

      resolve({ id: this.lastID, changes: this.changes });
    });
  });

const get = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(row);
    });
  });

const all = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(rows);
    });
  });

export const initDb = async () => {
  await run(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const countRow = await get('SELECT COUNT(*) AS count FROM products');
  const productCount = Number(countRow?.count ?? 0);

  if (productCount === 0) {
    const statements = PRODUCTS.map((product) =>
      run('INSERT INTO products (id, data) VALUES (?, ?)', [product.id, JSON.stringify(product)])
    );

    await Promise.all(statements);
  }
};

export const getProducts = async () => {
  const rows = await all('SELECT data FROM products ORDER BY id');
  return rows.map((row) => JSON.parse(row.data));
};

export const getOrders = async () => {
  const rows = await all('SELECT data FROM orders ORDER BY created_at DESC');
  return rows.map((row) => JSON.parse(row.data));
};

export const saveOrder = async (order) => {
  const payload = JSON.stringify(order);
  await run('INSERT INTO orders (id, data) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET data = excluded.data', [
    order.id,
    payload,
  ]);

  return order;
};

export default db;
