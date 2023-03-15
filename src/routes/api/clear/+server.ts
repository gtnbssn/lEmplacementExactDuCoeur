import { usersCollection } from '$lib/Firebase';
import { Timestamp } from 'firebase-admin/firestore';

export async function GET() {
  const staleLimit = new Date(Date.now() - 9000);
  const q = usersCollection.where('online', '==', true).where('pingTimestamp', '<', Timestamp.fromDate(staleLimit));
  const docs = await q.get();
  docs.docs.map((docSnapshot) => usersCollection.doc(docSnapshot.id).set({ disconnectTimestamp: Timestamp.now(), online: false }, { merge: true }));
  return new Response('oy');
}
