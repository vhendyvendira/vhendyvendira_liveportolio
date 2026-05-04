import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc, setDoc, increment, writeBatch } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
// @ts-ignore - firestoreDatabaseId is in the JSON but not in the standard AppOptions type
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const getIPHash = async (): Promise<string | null> => {
  const providers = [
    'https://api.ipify.org?format=json',
    'https://api.seeip.org/jsonip',
    'https://ipapi.co/json/'
  ];

  for (const url of providers) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(3000) });
      if (!response.ok) continue;
      const data = await response.json();
      const ip = data.ip || data.jsonip || data.ip_address;
      
      if (ip) {
        // Create a simple hash of the IP for privacy
        const msgUint8 = new TextEncoder().encode(ip);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
      }
    } catch (error) {
      // Silently try next provider
      continue;
    }
  }

  // Fallback: use a persistent local ID if IP detection fails
  try {
    let localId = localStorage.getItem('visitor_local_id');
    if (!localId) {
      localId = crypto.randomUUID();
      localStorage.setItem('visitor_local_id', localId);
    }
    return localId;
  } catch (e) {
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
