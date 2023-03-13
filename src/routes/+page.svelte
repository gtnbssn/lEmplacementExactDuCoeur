<script lang="ts">
	import { Canvas } from '@threlte/core';
	import PeerSetup from '$lib/components/PeerSetup.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Perf from '$lib/components/perf.svelte';
	import TestComm from '$lib/components/TestComm.svelte';
</script>

<PeerSetup />
<div class="fixed top-0 left-0 h-full w-full">
	<Canvas shadows={false} rendererParameters={{ antialias: false }}>
		<Experience />
		<Perf />
	</Canvas>
</div>
<!-- <div>
  <TestComm />
</div> -->
