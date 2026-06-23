import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkData() {
  const querySnapshot = await getDocs(collection(db, 'products'));
  console.log(`Product count: ${querySnapshot.size}`);
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().name}`);
  });
  
  const catSnapshot = await getDocs(collection(db, 'categories'));
  console.log(`Category count: ${catSnapshot.size}`);
}

checkData().catch(console.error);
