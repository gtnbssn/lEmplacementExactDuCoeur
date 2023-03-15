<script lang="ts">
	import { Canvas } from '@threlte/core';
	import PeerSetup from '$lib/components/PeerSetup.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Perf from '$lib/components/perf.svelte';
	import Moves from '$lib/components/Moves.svelte';
	import TestComm from '$lib/components/TestComm.svelte';
</script>

<PeerSetup />
<div>
	<Canvas shadows={false} rendererParameters={{ antialias: false }}>
		<Experience />
		<Perf />
	</Canvas>
</div>
<!-- <div id="greetingz"> -->
<!-- 	<h1>L'Emplacement Exact Du Coeur</h1> -->
<!-- 	<p> -->
<!-- 		Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea molestias repellendus totam eligendi -->
<!-- 		illum est obcaecati, officiis non beatae eveniet libero incidunt consequuntur dolore! Nisi neque -->
<!-- 		ipsam mollitia praesentium architecto? -->
<!-- 	</p> -->
<!-- 	<p> -->
<!-- 		Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea molestias repellendus totam eligendi -->
<!-- 		illum est obcaecati, officiis non beatae eveniet libero incidunt consequuntur dolore! Nisi neque -->
<!-- 		ipsam mollitia praesentium architecto? -->
<!-- 	</p> -->
<!-- 	<p> -->
<!-- 		Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea molestias repellendus totam eligendi -->
<!-- 		illum est obcaecati, officiis non beatae eveniet libero incidunt consequuntur dolore! Nisi neque -->
<!-- 		ipsam mollitia praesentium architecto? -->
<!-- 	</p> -->
<!-- </div> -->

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
	#greetingz {
		backdrop-filter: blur(124px);
	}
	h1,
	p {
		opacity: 0.2;
	}
</style>
