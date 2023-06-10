import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import db from "./firebase";
import { ILushSite } from "@/types/types";

export function createOrUpdateUser(uid: string, data: any) {
  return setDoc(doc(db, 'users', uid), data, { merge: true })
}

export async function createOrUpdateLink(username: string, data: any) {
  return setDoc(doc(db, 'links', username), data, { merge: true })
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

export async function checkUsernameAvailability(username: string) {
  const q = query(collection(db, 'links'), where('username', '==', username))
  const querySnapshot = await getDocs(q)

  return querySnapshot.empty;
}
