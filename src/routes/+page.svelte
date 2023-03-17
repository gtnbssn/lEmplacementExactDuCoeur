<script lang="ts">
	import { Canvas } from '@threlte/core';
	import PeerSetup from '$lib/components/PeerSetup.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Share from '$lib/components/Share.svelte';
	import { deviceAcceleration } from '$lib/stores';

	const handleMotion = (evt: DeviceMotionEvent) => {
		if (evt.acceleration) {
			deviceAcceleration.set({
				x: evt.acceleration.x || 0,
				y: evt.acceleration.y || 0,
				z: evt.acceleration.z || 0
			});
		}
	};
	const startMotionEvents = () => {
		if (typeof DeviceMotionEvent.requestPermission === 'function') {
			DeviceMotionEvent.requestPermission()
				.then((response) => {
					if (response == 'granted') {
						window.addEventListener('devicemotion', handleMotion);
					}
				})
				.catch(alert);
		} else {
			window.addEventListener('devicemotion', handleMotion);
		}
	};
</script>

<PeerSetup />
<div on:click|once|stopPropagation|preventDefault={startMotionEvents}>
	<Canvas shadows={false} rendererParameters={{ antialias: false }}>
		<Experience />
	</Canvas>
	<Share />
</div>

<style>
	div {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
</style>
