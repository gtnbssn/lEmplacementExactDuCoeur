import { usersCollection } from '$lib/Firebase';
import { Timestamp } from 'firebase-admin/firestore';
import type { RequestEvent } from './$types';

const userPing = (userId: string) => {
  if (userId) {
    const userDoc = usersCollection.doc(userId);
    userDoc.set({ pingTimestamp: Timestamp.now(), online: true }, { merge: true });
  }
};

export async function GET(requestEvent: RequestEvent) {
  userPing(String(requestEvent.url.searchParams.get('userid')));
  return new Response('oy');
}

