import { writable } from 'svelte/store';
import { tweened, spring } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';
import type { DataConnection } from 'peerjs';

export const connectionState: {
  firstLoad: boolean;
  peerid: string;
  userid: string;
  peerConnections: DataConnection[];
  messagesHistory: string[];
} = { firstLoad: true, peerid: '', userid: '', peerConnections: [], messagesHistory: [] };

export const connectionStateStore = writable(connectionState);

export const jump = tweened(0, {
  duration: 400,
  easing: cubicOut
});

const startPosition: [x: number, y: number, z: number] = [0, 0, 50];

export const cameraPosition = spring(startPosition, {
  stiffness: 0.15,
  damping: 0.4
});

export const monochrome = writable(0);

export const sendMessageToPeers = (message: string, peerConnections: DataConnection[]) => {
  peerConnections.forEach((peerConnection) => peerConnection.send(message));
};
