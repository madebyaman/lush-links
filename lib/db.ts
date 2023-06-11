import { QuerySnapshot, addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import db from "./firebase";
import { ILushSite } from "@/types/types";

export function createOrUpdateUser(uid: string, data: any) {
  return setDoc(doc(db, 'users', uid), data, { merge: true })
}

export async function createOrUpdateLink(username: string, data: any) {
  return setDoc(doc(db, 'links', username), data, { merge: true })
}

export async function getUserProfile(uid: string) {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    return null
  }
}

export async function getUserLinkPage(uid: string) {
  const q = query(collection(db, 'links'), where('userId', '==', uid))
  const querySnapshot = await getDocs(q)

  let doc: ILushSite | null = null;
  if (!querySnapshot.empty) {
    const firstDoc = querySnapshot.docs[0];
    doc = firstDoc.data() as ILushSite;
  }

  return doc;
}

export async function checkUsernameAvailability(username?: string, uid?: string) {
  if (!username) return false;
  const q = query(collection(db, 'users'), where('username', '==', username))
  const querySnapshot = await getDocs(q)
  if (querySnapshot.empty) return true;
  else if (uid) {
    if (querySnapshot.size > 0) {
      // More than one user with the same username
      // check if one of them is the current user
      const docs = []
      querySnapshot.forEach(doc => {
        if (doc.id !== uid) {
          docs.push(doc)
        }
      });
      return docs.length === 0;

    } else return true;
  } else return false;
}
