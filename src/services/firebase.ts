import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc, setDoc, increment, writeBatch } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
// @ts-ignore - firestoreDatabaseId is in the JSON but not in the standard AppOptions type
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const getIPHash = async (): Promise<string | null> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    const ip = data.ip;
    
    // Create a simple hash of the IP for privacy
    const msgUint8 = new TextEncoder().encode(ip);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } catch (error) {
    console.error("Error detecting IP:", error);
    return null;
  }
};

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
  // 1. Detect IP Hash
  const visitorHash = await getIPHash();
  if (!visitorHash) return;

  try {
    // 2. Check if this visitor has been tracked before
    const visitorRef = doc(db, 'uniqueVisitors', visitorHash);
    const visitorSnap = await getDoc(visitorRef);

    if (visitorSnap.exists()) {
      // Already counted this IP
      return;
    }

    // 3. Increment count and record visitor atomically
    const batch = writeBatch(db);
    const statsRef = doc(db, 'stats', 'global');
    const statsSnap = await getDoc(statsRef);

    if (statsSnap.exists()) {
      batch.update(statsRef, {
        visitorCount: increment(1)
      });
    } else {
      batch.set(statsRef, {
        visitorCount: 1
      });
    }

    batch.set(visitorRef, {
      visitedAt: new Date().toISOString()
    });

    await batch.commit();
  } catch (error) {
    console.error("Error tracking unique visit:", error);
  }
};
