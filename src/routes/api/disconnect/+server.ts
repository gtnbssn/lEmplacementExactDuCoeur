import { usersCollection } from '$lib/Firebase';
import { Timestamp } from 'firebase-admin/firestore';
import type { RequestEvent } from './$types';

const disconnectUser = (userId: string) => {
  if (userId) {
    const userDoc = usersCollection.doc(userId);
    userDoc.set({ disconnectTimestamp: Timestamp.now(), online: false }, { merge: true });
  }
};

export async function GET(requestEvent: RequestEvent) {
  disconnectUser(String(requestEvent.url.searchParams.get('userid')));
  return new Response('oy');
}
