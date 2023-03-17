import { writable } from 'svelte/store';
import { tweened, spring } from 'svelte/motion';
import { sineInOut } from 'svelte/easing';
import type { DataConnection } from 'peerjs';

const connectionState: {
  firstLoad: boolean;
  peerid: string;
  userid: string;
  peerConnections: DataConnection[];
  messagesHistory: string[];
} = { firstLoad: true, peerid: '', userid: '', peerConnections: [], messagesHistory: [] };

export const connectionStateStore = writable(connectionState);

const startPosition: { x: number, y: number, z: number } = { x: 0, y: 0, z: 68 };

export const cameraPosition = tweened(startPosition, {
  duration: 6000,
  easing: sineInOut
});

const startDeviceAcceleration: {
  x: number, y: number, z: number, alpha: number, beta: number, gamma: number
} = { x: 0, y: 0, z: 0, alpha: 0, beta: 0, gamma: 0 };

export const deviceAcceleration = spring(startDeviceAcceleration, {
  stiffness: 0.05,
  damping: 0.3
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
});

const planePositions: {
  x1: number, y1: number, z1: number, x2: number, y2: number, z2: number
} = { x1: 0, y1: 0, z1: 0, x2: 0, y2: 0, z2: 0 }

export const planePositionsStore = writable(planePositions);

export const sendMessageToPeers = (message: string, peerConnections: DataConnection[]) => {
  peerConnections.forEach((peerConnection) => peerConnection.send(message));
};
