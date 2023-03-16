<script lang="ts">
	import { onMount } from 'svelte';
	import Peer from 'peerjs';
	import VisibilityChange from 'svelte-visibility-change';
	import { connectionStateStore, sendMessageToPeers } from '$lib/stores';
	import {
		monochrome,
		cameraPosition,
		baseHue,
		baseHue2,
		baseHue3,
		hueSpread,
		saturation,
		alpha
	} from '$lib/stores';

	let visibilityState: 'visible' | 'hidden';

	let peer: Peer;

	const reset = () => {
		cameraPosition.set({ x: 0, y: 0, z: 70 });
		baseHue.set(0.7);
		baseHue2.set(0.5);
		baseHue3.set(0.2);
		hueSpread.set(0.2);
		saturation.set(0.5);
	};

	const blink = () => {
		monochrome.set(1);
		setTimeout(() => monochrome.set(0), 250);
		alpha.set(1);
	};
	const handleMessage = (message: string) => {
		console.log(message);
		switch (message) {
			case '1':
				reset();
				break;
			case '2':
				const newX = Math.random() * 100 - 50;
				cameraPosition.set({ x: newX, y: $cameraPosition.y, z: $cameraPosition.z });
				break;
			case '3':
				const newY = Math.random() * 100 - 50;
				cameraPosition.set({ x: $cameraPosition.x, y: newY, z: $cameraPosition.z });
				break;
			case '4':
				const newZ = Math.random() * 40 + 40;
				cameraPosition.set({ x: $cameraPosition.x, y: $cameraPosition.y, z: newZ });
				break;
			case '5':
				const newBaseHue = Math.random() * 0.8 + 0.1;
				baseHue.set(newBaseHue);
				break;
			case '6':
				const newBaseHue2 = Math.random() * 0.8 + 0.1;
				baseHue2.set(newBaseHue2);
				break;
			case '7':
				const newBaseHue3 = Math.random() * 0.8 + 0.1;
				baseHue3.set(newBaseHue3);
				break;
			case '8':
				const newHueSpread = Math.random() * 0.5;
				hueSpread.set(newHueSpread);
				break;
			case '9':
				const newSaturation = Math.random() * 0.8 + 0.2;
				saturation.set(newSaturation);
				break;
			default:
				reset();
				break;
		}
	};

	const connectPeers = (peers: string[]) => {
		peers.forEach((peerid) => {
			const dataConnection = peer.connect(peerid);
			console.log(`trying to connect to ${dataConnection.peer}`);
			dataConnection.on('open', () => {
				console.log(`connecting to ${dataConnection.peer}`);
				$connectionStateStore.peerConnections = [
					...$connectionStateStore.peerConnections,
					dataConnection
				];
			});
			dataConnection.on('data', (data) => {
				handleMessage(String(data));
			});
		});
	};

	const handleConnect = async () => {
		peer = new Peer({
			config: {
				iceServers: [
					{ url: 'stun:coturn.gtnbssn.com:443' },
					{ url: 'turn:coturn.gtnbssn.com:443', username: 'gtnbssn', credential: 'hatchinmarch' }
				]
			}
		});
		peer.on('open', (id) => {
			$connectionStateStore.peerid = id;
			fetch(`/api/connect?peerid=${$connectionStateStore.peerid}`)
				.then((res) => res.json())
				.then((json) => {
					console.log(`peerid is ${$connectionStateStore.peerid}`);
					console.log('connecting');
					$connectionStateStore.userid = json.currentUserId;
					connectPeers(json.peers as string[]);
				});
			$connectionStateStore.firstLoad = false;
		});
		peer.on('connection', (dataConnection) => {
			dataConnection.on('open', () => {
				console.log(`connection from ${dataConnection.peer}`);
				$connectionStateStore.peerConnections = [
					...$connectionStateStore.peerConnections,
					dataConnection
				];
				blink();
				dataConnection.on('data', (data) => {
					handleMessage(String(data));
				});
			});
			dataConnection.on('close', () => {
				console.log(`${dataConnection.peer} has closed the connection`);
				blink();
				reset();
				$connectionStateStore.peerConnections = $connectionStateStore.peerConnections.filter(
					(peerConnection) => peerConnection.peer != dataConnection.peer
				);
			});
		});
	};

	const handleReconnect = async () => {
		if ($connectionStateStore.firstLoad) {
			return;
		}
		const res = await fetch(`/api/reconnect?userid=${$connectionStateStore.userid}`);
		const json = await res.json();
		console.log(`reconnecting ${$connectionStateStore.userid}`);
		connectPeers(json.peers);
	};

	const handleDisconnect = async () => {
		if ($connectionStateStore.firstLoad) {
			return;
		}
		$connectionStateStore.peerConnections.forEach((peerConnection) => peerConnection.close());
		$connectionStateStore.peerConnections = [];
		await fetch(`/api/disconnect?userid=${$connectionStateStore.userid}`);
		console.log('disconnecting');
		return 'disconnected';
	};

	onMount(async () => handleConnect());

	const delays = [500, 1000, 1500, 2000, 2500, 3000];
	const messages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const sendMessage = () => {
		const randomDelay = delays[Math.floor(Math.random() * delays.length)];
		console.log(`next message in ${randomDelay} ms.`);
		if ($connectionStateStore.peerConnections.length === 0) {
			console.log('no connected peers');
		} else {
			const randomMessage = String(messages[Math.floor(Math.random() * messages.length)]);
			console.log(`sending ${randomMessage}`);
			sendMessageToPeers(randomMessage, $connectionStateStore.peerConnections);
		}
		setTimeout(sendMessage, randomDelay);
	};
	setTimeout(sendMessage, 1000);

	const ping = async () => {
		if (visibilityState == 'visible') {
			await fetch(`/api/ping?userid=${$connectionStateStore.userid}`);
		}
		setTimeout(ping, 3000);
	};
	setTimeout(ping, 3000);
</script>

<svelte:window on:beforeunload={handleDisconnect} />

<VisibilityChange
	bind:state={visibilityState}
	on:hidden={async () => await handleDisconnect()}
	on:visible={async () => await handleReconnect()}
/>
