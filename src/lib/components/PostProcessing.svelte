<script lang="ts">
	import { Pass } from '@threlte/core';
	import { Vector2 } from 'three';
	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
	import { FilmPass } from '$lib/filmPass/FilmPass';
	import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';
	import { monochrome } from '$lib/stores';

	const unrealBloomPass = new UnrealBloomPass(new Vector2(1024, 1024), 2.0, 2.0, 0.0);
	const filmPass = new FilmPass(0.47, 0.25, 250, 0);
	monochrome.subscribe((value) => {
		filmPass.uniforms.grayscale.value = value;
	});
	const smaaPass = new SMAAPass(window.innerWidth, window.innerHeight);
</script>

<Pass pass={unrealBloomPass} />
<Pass pass={filmPass} />
<Pass pass={smaaPass} />
