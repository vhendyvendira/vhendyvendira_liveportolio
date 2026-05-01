import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc, setDoc, increment } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
// @ts-ignore - firestoreDatabaseId is in the JSON but not in the standard AppOptions type
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const getVisitorCount = async () => {
  try {
    const docRef = doc(db, 'stats', 'global');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().visitorCount as number;
    }
    return 0;
  } catch (error) {
    console.error("Error getting visitor count:", error);
    return 0;
  }
};

export const trackVisit = async () => {
  // Check if we've already counted this session
  if (sessionStorage.getItem('visited')) return;

  try {
    const docRef = doc(db, 'stats', 'global');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        visitorCount: increment(1)
      });
    } else {
      // Initialize if it doesn't exist
      await setDoc(docRef, {
        visitorCount: 1
      });
    }
    
    sessionStorage.setItem('visited', 'true');
  } catch (error) {
    console.error("Error tracking visit:", error);
  }
};
