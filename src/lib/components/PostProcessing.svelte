<script lang="ts">
	import { Pass } from '@threlte/core';
	import { Vector2 } from 'three';
	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
	import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
	import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
	import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
</script>

<Pass pass={new UnrealBloomPass(new Vector2(256, 256), 2, 2, 0.0)} />
<Pass pass={new FilmPass(0.47, 0.25, 250, 0)} />
<Pass pass={new ShaderPass(FXAAShader)} />
