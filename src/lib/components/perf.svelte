<script lang="ts">
	import { useFrame } from '@threlte/core';

	let frameCounter = 0;

	useFrame(() => {
		frameCounter++;
	});

	const logFPS = () => {
		console.log(`${frameCounter} fps`);
		frameCounter = 0;
		setTimeout(logFPS, 1000);
	};

	setTimeout(logFPS, 1000);
</script>

<div />
