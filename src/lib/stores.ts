import { writable } from 'svelte/store';
import { tweened, spring } from 'svelte/motion';
import { cubicOut, sineInOut } from 'svelte/easing';
import type { DataConnection } from 'peerjs';

export const connectionState: {
  firstLoad: boolean;
  peerid: string;
  userid: string;
  peerConnections: DataConnection[];
  messagesHistory: string[];
} = { firstLoad: true, peerid: '', userid: '', peerConnections: [], messagesHistory: [] };

export const connectionStateStore = writable(connectionState);

const startPosition: { x: number, y: number, z: number } = { x: 0, y: 0, z: 50 };

export const cameraPosition = tweened(startPosition, {
  duration: 6000,
  easing: sineInOut
});

export const monochrome = writable(0);

export const baseHue = tweened(0.7, {
  duration: 800,
  easing: sineInOut
});

export const baseHue2 = tweened(0.5, {
  duration: 800,
  easing: sineInOut
});

export const baseHue3 = tweened(0.2, {
  duration: 800,
  easing: sineInOut
});

export const hueSpread = tweened(0.2, {
  duration: 800,
  easing: sineInOut
});

export const saturation = tweened(0.5, {
  duration: 800,
  easing: sineInOut
});

export const alpha = spring(0, {
  stiffness: 0.07,
  damping: 0.4
})

export const sendMessageToPeers = (message: string, peerConnections: DataConnection[]) => {
  peerConnections.forEach((peerConnection) => peerConnection.send(message));
};
