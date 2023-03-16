<script lang="ts">
	import { Canvas } from '@threlte/core';
	import PeerSetup from '$lib/components/PeerSetup.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Share from '$lib/components/Share.svelte';
	import Perf from '$lib/components/perf.svelte';
</script>

<PeerSetup />
<div>
	<Canvas shadows={false} rendererParameters={{ antialias: false }}>
		<Experience />
		<Perf />
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
