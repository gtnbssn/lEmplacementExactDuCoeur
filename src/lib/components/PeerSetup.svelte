<script lang="ts">
	import { onMount } from 'svelte';
	import Peer from 'peerjs';
	import VisibilityChange from 'svelte-visibility-change';
	import { connectionStateStore, sendMessageToPeers } from '$lib/stores';
	import { monochrome } from '$lib/stores';

	let visibilityState: 'visible' | 'hidden';

	let peer: Peer;

	// peer.on('open', (id) => {
	// 	$connectionStateStore.peerid = id;
	// 	handleConnect(id);
	// 	$connectionStateStore.firstLoad = false;
	// });

	const handleMessage = (message: string) => {
		$connectionStateStore.messagesHistory = [...$connectionStateStore.messagesHistory, message];
		console.log(message);
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
		// peer = new Peer();
		peer.on('open', (id) => {
			$connectionStateStore.peerid = id;
			fetch(`/api/connect?peerid=${$connectionStateStore.peerid}`)
				.then((res) => res.json())
				.then((json) => {
					console.log(`peerid is ${$connectionStateStore.peerid}`);
					console.log('connecting');
					console.log(`json sent by the connect endpoint:`);
					console.log(json);
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
				monochrome.set(1);
				setTimeout(() => monochrome.set(0), 150);
				dataConnection.on('data', (data) => {
					handleMessage(String(data));
				});
			});
			dataConnection.on('close', () => {
				console.log(`${dataConnection.peer} has closed the connection`);
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
		console.log(json);
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
		console.log($connectionStateStore);
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
</script>

<svelte:window on:beforeunload={handleDisconnect} />

<VisibilityChange
	bind:state={visibilityState}
	on:hidden={async () => await handleDisconnect()}
	on:visible={async () => await handleReconnect()}
/>
