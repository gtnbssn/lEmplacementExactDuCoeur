<script lang="ts">
	import { T, OrbitControls, useFrame } from '@threlte/core';
	import type { ShaderMaterial } from 'three';
	import { degToRad } from 'three/src/math/MathUtils';
	import PostProcessing from '$lib/components/PostProcessing.svelte';
	import landscapeVertex from '$lib/shaders/landscapeVertex.glsl?raw';
	import landscapeFragment from '$lib/shaders/landscapeFragment.glsl?raw';
	import planeVertex from '$lib/shaders/planeVertex.glsl?raw';
	import planeFragment from '$lib/shaders/planeFragment.glsl?raw';
  import { jump } from '$lib/stores';

	let landscapeMaterial: ShaderMaterial;
	let landscapeMaterial2: ShaderMaterial;
	let landscapeMaterial3: ShaderMaterial;
	let planeMaterial: ShaderMaterial;

  let wen = true;
  const jumpYo = () =>{
    if(wen){
      jump.set(40);
      wen = false;
    }else{
      jump.set(0);
      wen = true;
    }
    setTimeout(jumpYo, 2000);
  }
  // setTimeout(jumpYo,1000);

	useFrame(({ clock }, delta) => {
		landscapeMaterial.uniforms.uTime.value += delta;
		landscapeMaterial2.uniforms.uTime.value += delta * 1.2;
		landscapeMaterial3.uniforms.uTime.value += delta * 0.8;
		planeMaterial.uniforms.uTime.value += delta;
		if (Math.floor(clock.getElapsedTime()) % 2 == 0) {
			// console.log(`beh ${clock.getElapsedTime()}`);
		}
	});
</script>

<T.Color args={['#010101']} attach="background" />
<T.PerspectiveCamera makeDefault position={[0, $jump, 50]} fov={24}>
	<OrbitControls
		maxPolarAngle={degToRad(180)}
		enableZoom={true}
		target={{ y: 0.5 }}
		enableDamping
	/>
</T.PerspectiveCamera>

<T.Mesh position={[0, 10, 0]} rotation.x={-Math.PI * 0.5}>
	<T.PlaneGeometry args={[16, 16, 128, 128]} />
	<T.ShaderMaterial
		bind:ref={landscapeMaterial3}
		vertexShader={landscapeVertex}
		fragmentShader={landscapeFragment}
		uniforms={{ uTime: { value: 7.0 } }}
	/>
</T.Mesh>

<T.Mesh position={[0, 5, 0]} rotation.x={-Math.PI * 0.5}>
	<T.PlaneGeometry args={[16, 16, 128, 128]} />
	<T.ShaderMaterial
		bind:ref={landscapeMaterial2}
		vertexShader={landscapeVertex}
		fragmentShader={landscapeFragment}
		uniforms={{ uTime: { value: 3.0 } }}
	/>
</T.Mesh>

<T.Mesh rotation.x={-Math.PI * 0.5}>
	<T.PlaneGeometry args={[16, 16, 128, 128]} />
	<T.ShaderMaterial
		bind:ref={landscapeMaterial}
		vertexShader={landscapeVertex}
		fragmentShader={landscapeFragment}
		uniforms={{ uTime: { value: 0.0 } }}
	/>
</T.Mesh>

<T.Mesh position={[0, -5, 0]} rotation.x={Math.PI * 0.5}>
	<T.PlaneGeometry args={[16, 16, 128, 128]} />
	<T.ShaderMaterial
		bind:ref={landscapeMaterial2}
		vertexShader={landscapeVertex}
		fragmentShader={landscapeFragment}
		uniforms={{ uTime: { value: 3.0 } }}
	/>
</T.Mesh>

<T.Mesh position={[0, -10, 0]} rotation.x={Math.PI * 0.5}>
	<T.PlaneGeometry args={[16, 16, 128, 128]} />
	<T.ShaderMaterial
		bind:ref={landscapeMaterial3}
		vertexShader={landscapeVertex}
		fragmentShader={landscapeFragment}
		uniforms={{ uTime: { value: 3.0 } }}
	/>
</T.Mesh>

<T.Mesh>
	<T.PlaneGeometry args={[100, 100, 32, 32]} />
	<T.ShaderMaterial
		bind:ref={planeMaterial}
		vertexShader={planeVertex}
		fragmentShader={planeFragment}
		uniforms={{ uTime: { value: 0.0 } }}
		wireframe
	/>
</T.Mesh>
<PostProcessing />
