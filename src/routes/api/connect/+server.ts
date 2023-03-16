import { usersCollection } from '$lib/Firebase';
import { Timestamp, GeoPoint } from "firebase-admin/firestore";
import { IPinfoWrapper } from 'node-ipinfo';
import { json } from "@sveltejs/kit";
import { getOnlineUsers, clearStaleUsers } from "$lib/utils";
import type { RequestEvent } from './$types';
import { IPINFO_TOKEN } from "$env/static/private";

const ipinfoWrapper = new IPinfoWrapper(IPINFO_TOKEN);

const createUser = async (request: RequestEvent) => {
  const requestIP = request.getClientAddress();

  const IPinfos = await ipinfoWrapper.lookupIp(requestIP);

  if (IPinfos.bogon == true) {
    IPinfos.city = 'bogon';
    IPinfos.countryCode = 'bogon';
    IPinfos.loc = '0,0';
  }

  const latLon = IPinfos.loc.split(',');

  const now = Timestamp.now();

  const createdUser = await usersCollection.add({
    city: IPinfos.city,
    country: IPinfos.countryCode,
    'ip address': IPinfos.ip,
    'lat/lon': new GeoPoint(Number(latLon[0]), Number(latLon[1])),
    online: true,
    connectTimestamp: now,
    pingTimestamp: now,
    peerid: request.url.searchParams.get('peerid')
  });

  return createdUser.id;
};

export async function GET(requestEvent: RequestEvent) {
  await clearStaleUsers();
  const onlineUsers = await getOnlineUsers();

  const newUserFBid = await createUser(requestEvent);

  const returnData = {
    currentUserId: newUserFBid,
    peers: onlineUsers
  }

  return json(returnData);
}
