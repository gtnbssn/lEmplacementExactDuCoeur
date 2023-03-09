import { usersCollection } from '$lib/Firebase';

export const getOnlineUsers = async (): Promise<string[]> => {
  const q = usersCollection.where('online', '==', true).limit(9);
  const docs = await q.get();
  const activeUsers = docs.docs.map((doc) => doc.get('peerid'));
  return activeUsers;
};
