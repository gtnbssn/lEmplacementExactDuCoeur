<script lang="ts">
	import { Pass } from '@threlte/core';
	import { Vector2 } from 'three';
	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
	import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
	import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
	import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
	import { monochrome } from '$lib/stores';

	const unrealBloomPass = new UnrealBloomPass(new Vector2(256, 256), 2, 2, 0.0);
	const filmPass = new FilmPass(0.47, 0.25, 250, 0);
	monochrome.subscribe((value) => {
		filmPass.uniforms.grayscale.value = value;
	});
</script>

<Pass pass={unrealBloomPass} />
<Pass pass={filmPass} />
<Pass pass={new ShaderPass(FXAAShader)} />
