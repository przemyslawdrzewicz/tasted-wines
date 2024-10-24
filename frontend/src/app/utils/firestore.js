import { getFirestore,  } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import firebaseApp from './firebaseConfig';

const db = getFirestore(firebaseApp);
const storage = getStorage();

export { db, storage };
