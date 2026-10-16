import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { PRODUCTS } from '../src/data/products.js';

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error('Set GOOGLE_APPLICATION_CREDENTIALS to a service-account JSON file outside this repository.');
}

initializeApp({
  credential: applicationDefault(),
  projectId: 'novacommerce-4c25a'
});

const db = getFirestore();
const batch = db.batch();

PRODUCTS.forEach(({ id, ...product }) => {
  batch.set(db.collection('products').doc(id), product, { merge: true });
});

await batch.commit();
console.log(`Uploaded ${PRODUCTS.length} products to Firestore.`);
