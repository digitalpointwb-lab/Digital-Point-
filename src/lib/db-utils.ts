import { db } from './firebase';
import { collection, doc, setDoc, getDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { sampleProducts } from '../data/sampleProducts';

export const initializeFirestore = async (userId: string, email: string) => {
  if (email === 'digitalpointwb@gmail.com') {
    const adminRef = doc(db, 'admins', userId);
    const adminSnap = await getDoc(adminRef);
    if (!adminSnap.exists()) {
      await setDoc(adminRef, {
        email,
        role: 'owner',
        createdAt: serverTimestamp()
      });
      console.log('Admin record initialized for', email);
    }
  }
};

export const seedSampleData = async () => {
  const batch = writeBatch(db);
  
  // Seed Categories
  const categories = [
    { id: 'camera', name: 'Digital Cameras', slug: 'camera', desc: 'Mirrorless, DSLR, and Cinema cameras.' },
    { id: 'lens', name: 'Premium Lenses', slug: 'lens', desc: 'Prime, zoom, and anamorphic lenses.' },
    { id: 'drone', name: 'Pro Drones', slug: 'drone', desc: 'Aerial cinematography solutions.' },
    { id: 'switcher', name: 'Video Switchers', slug: 'switcher', desc: 'Multicam switching solutions.' },
    { id: 'accessories', name: 'Photography Accessories', slug: 'accessories', desc: 'Gimbals, tripods, and lighting.' },
  ];

  for (const cat of categories) {
    const catRef = doc(db, 'categories', cat.id);
    batch.set(catRef, { ...cat, createdAt: serverTimestamp() });
  }

  // Seed Products
  for (const prod of sampleProducts) {
    const prodRef = doc(collection(db, 'products'));
    const { id, ...prodData } = prod;
    batch.set(prodRef, {
      ...prodData,
      createdAt: serverTimestamp()
    });
  }

  await batch.commit();
  console.log('Sample data seeded successfully');
};
