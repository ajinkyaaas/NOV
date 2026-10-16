import express from 'express';
import cors from 'cors';
import { initDb, getProducts, getOrders, saveOrder } from './db.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', database: 'sqlite', service: 'novacommerce' });
});

app.get('/api/products', async (_req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load products', error: error.message });
  }
});

app.get('/api/orders', async (_req, res) => {
  try {
    const orders = await getOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load orders', error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const order = req.body;

    if (!order?.id) {
      return res.status(400).json({ message: 'Order data is missing an id.' });
    }

    const savedOrder = await saveOrder(order);
    return res.status(201).json(savedOrder);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to save order', error: error.message });
  }
});

const startServer = async () => {
  await initDb();

  app.listen(PORT, () => {
    console.log(`NovaCommerce SQLite API is running on http://localhost:${PORT}`);
  });
};

startServer();
