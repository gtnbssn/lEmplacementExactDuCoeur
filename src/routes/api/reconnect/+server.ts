import { json } from "@sveltejs/kit";
import { usersCollection } from '$lib/Firebase';
import { getOnlineUsers } from "$lib/utils";
import type { RequestEvent } from './$types';

const reconnectUser = (userId: string) => {
  const userDoc = usersCollection.doc(userId);
  userDoc.set({ online: true }, { merge: true });
};

export async function GET(requestEvent: RequestEvent) {
  reconnectUser(String(requestEvent.url.searchParams.get('userid')));
  const onlineUsers = await getOnlineUsers();
  const returnData = {
    currentUserId: requestEvent.url.searchParams.get('userid'),
    peers: onlineUsers
  }
  return json(returnData);
}
