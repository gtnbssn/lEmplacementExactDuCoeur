<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Experience from '$lib/components/Experience.svelte';
	import Share from '$lib/components/Share.svelte';
</script>

<div>
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
