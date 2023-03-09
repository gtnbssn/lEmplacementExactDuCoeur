<script lang="ts">
  import { Canvas } from "@threlte/core";
  import PeerSetup from "$lib/components/PeerSetup.svelte";
  import Experience from "$lib/components/Experience.svelte";
  import TestComm  from "$lib/components/TestComm.svelte";
</script>

  <PeerSetup />
<div>
	<Canvas shadows={false} rendererParameters={{ antialias: false }}>
    <Experience />
  </Canvas>
</div>
<!-- <div>
  <TestComm />
</div> -->

<style>
	div {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
</style>
