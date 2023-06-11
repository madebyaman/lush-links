import db, { admin } from './firebaseAdmin'
import { Timestamp } from 'firebase/firestore';

export async function getUsername(uid: string) {
  const docRef = db.collection('users').doc(uid)
  const data = await docRef.get().then(doc => doc.data())
  return data?.username
}

export async function getAllAnalyticsData(username: string, from: 'all' | 'last-week' | 'last-month' | 'last-year' =
  'all') {
  let date = null;

  switch (from) {
    case 'last-week':
      date = Timestamp.fromMillis(Date.now() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'last-month':
      date = Timestamp.fromMillis(Date.now() - 30 * 24 * 60 * 60 * 1000);
      break;
    case 'last-year':
      date = Timestamp.fromMillis(Date.now() - 365 * 24 * 60 * 60 * 1000);
      break;
    case 'all':
    default:
      break;
  }

  const pageviewQuery = db.collection('analytics').where('event', '==', 'pageview').where('username', '==', username);

  if (date) {
    pageviewQuery.where('time', '>=', date);
  }

  const pageviewSnapshot = await pageviewQuery.get()

  const pageviewCount = pageviewSnapshot.docs.length;

  // For click events
  const clickUrlsSnapshot = await db.collection('analytics').where('event', '==', 'click').where('username', '==', username).get();

  const clickCounts: { url: string, count: number }[] = [];

  clickUrlsSnapshot.docs.forEach(doc => {
    const url = doc.data().url;
    if (url) {
      const index = clickCounts.findIndex(count => count.url === url);
      if (index === -1) {
        clickCounts.push({ url, count: 1 });
      }
      else {
        clickCounts[index].count++;
      }
    }
  });

  return {
    pageviewCount,
    clickCounts
  }
}

export async function setAnalyticsData(data: any) {
  try {
    const docRef = db.collection('analytics').doc()
    await docRef.set({ ...data, time: admin.firestore.Timestamp.now() })
    const doc = await docRef.get()
    return doc.data()
  } catch (error) {
    console.error('Error writing document: ', error)
  }
}

export async function getUserLinkSite(username: string) {
  try {

    const docRef = db.collection('users').where('username', '==', username)
    const data = await docRef.get().then(doc => doc.docs[0].data())
    const uid = data.uid
    const linkSite = await db.collection('links').doc(uid).get().then(doc => doc.data())
    return { ...linkSite, name: data.name, username: data.username }
  } catch (e) {
    return null
  }
}

export async function getAllLinkSites() {
  const snapshot = await db.collection('users').get()
  const sites: any[] = []

  snapshot.forEach(doc => {
    sites.push(doc.data())
  })

  return { sites }
}
