<script lang="ts">
	import { T, OrbitControls, useFrame, TransformableObject, useThrelte } from '@threlte/core';
	import type { ShaderMaterial } from 'three';
	import { degToRad } from 'three/src/math/MathUtils';
	import PostProcessing from '$lib/components/PostProcessing.svelte';
	import landscapeVertex from '$lib/shaders/landscapeVertex.glsl?raw';
	import landscapeFragment from '$lib/shaders/landscapeFragment.glsl?raw';
	import planeVertex from '$lib/shaders/planeVertex.glsl?raw';
	import planeFragment from '$lib/shaders/planeFragment.glsl?raw';
	import {
		cameraPosition,
		baseHue,
		baseHue2,
		baseHue3,
		hueSpread,
		saturation,
		alpha,
		planePositionsStore,
		deviceAcceleration
	} from '$lib/stores';

	const { camera } = useThrelte();
	let landscapeMaterial: ShaderMaterial;
	let landscapeMaterial2: ShaderMaterial;
	let landscapeMaterial3: ShaderMaterial;
	let planeMaterial: ShaderMaterial;
	let planeMaterial2: ShaderMaterial;

	useFrame((_, delta) => {
		landscapeMaterial.uniforms.uTime.value += delta;
		landscapeMaterial2.uniforms.uTime.value += delta * 1.2;
		landscapeMaterial3.uniforms.uTime.value += delta * 0.8;
		landscapeMaterial.uniforms.uBaseHue.value = $baseHue;
		landscapeMaterial2.uniforms.uBaseHue.value = $baseHue2;
		landscapeMaterial3.uniforms.uBaseHue.value = $baseHue3;
		landscapeMaterial.uniforms.uHueSpread.value = $hueSpread;
		landscapeMaterial2.uniforms.uHueSpread.value = $hueSpread;
		landscapeMaterial3.uniforms.uHueSpread.value = $hueSpread;
		landscapeMaterial.uniforms.uSaturation.value = $saturation;
		landscapeMaterial2.uniforms.uSaturation.value = $saturation;
		landscapeMaterial3.uniforms.uSaturation.value = $saturation;
		planeMaterial.uniforms.uTime.value += delta;
		planeMaterial2.uniforms.uAlpha.value = $alpha;
	});
</script>

<T.Color args={['#010101']} attach="background" />
<T.PerspectiveCamera
	makeDefault
	position={[
		$cameraPosition.x + $deviceAcceleration.x * 1.0,
		$cameraPosition.y + $deviceAcceleration.y * 1.0,
		$cameraPosition.z + $deviceAcceleration.z * 0.6
	]}
	fov={24}
>
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
		uniforms={{
			uTime: { value: 7.0 },
			uBaseHue: { value: 0.2 },
			uHueSpread: { value: 0.2 },
			uSaturation: { value: 0.5 }
		}}
	/>
</T.Mesh>

<T.Mesh position={[0, 5, 0]} rotation.x={-Math.PI * 0.5}>
	<T.PlaneGeometry args={[16, 16, 128, 128]} />
	<T.ShaderMaterial
		bind:ref={landscapeMaterial2}
		vertexShader={landscapeVertex}
		fragmentShader={landscapeFragment}
		uniforms={{
			uTime: { value: 3.0 },
			uBaseHue: { value: 0.5 },
			uHueSpread: { value: 0.2 },
			uSaturation: { value: 0.5 }
		}}
	/>
</T.Mesh>

<T.Mesh rotation.x={-Math.PI * 0.5}>
	<T.PlaneGeometry args={[16, 16, 128, 128]} />
	<T.ShaderMaterial
		bind:ref={landscapeMaterial}
		vertexShader={landscapeVertex}
		fragmentShader={landscapeFragment}
		uniforms={{
			uTime: { value: 0.0 },
			uBaseHue: { value: 0.7 },
			uHueSpread: { value: 0.2 },
			uSaturation: { value: 0.5 }
		}}
	/>
</T.Mesh>

<T.Mesh position={[0, -5, 0]} rotation.x={Math.PI * 0.5}>
	<T.PlaneGeometry args={[16, 16, 128, 128]} />
	<T.ShaderMaterial
		bind:ref={landscapeMaterial2}
		vertexShader={landscapeVertex}
		fragmentShader={landscapeFragment}
		uniforms={{
			uTime: { value: 3.0 },
			uBaseHue: { value: 0.5 },
			uHueSpread: { value: 0.2 },
			uSaturation: { value: 0.5 }
		}}
	/>
</T.Mesh>

<T.Mesh position={[0, -10, 0]} rotation.x={Math.PI * 0.5}>
	<T.PlaneGeometry args={[16, 16, 128, 128]} />
	<T.ShaderMaterial
		bind:ref={landscapeMaterial3}
		vertexShader={landscapeVertex}
		fragmentShader={landscapeFragment}
		uniforms={{
			uTime: { value: 3.0 },
			uBaseHue: { value: 0.2 },
			uHueSpread: { value: 0.2 },
			uSaturation: { value: 0.5 }
		}}
	/>
</T.Mesh>

<T.Group let:ref>
	<TransformableObject object={ref} lookAt={$camera} />
	<T.Mesh>
		<T.PlaneGeometry args={[100, 100, 32, 32]} />
		<T.ShaderMaterial
			bind:ref={planeMaterial}
			vertexShader={planeVertex}
			fragmentShader={planeFragment}
			uniforms={{ uTime: { value: 0.0 }, uAlpha: { value: 1.0 } }}
			transparent
			wireframe
		/>
	</T.Mesh>
	<T.Mesh rotation={[$planePositionsStore.x1, $planePositionsStore.y1, $planePositionsStore.z1]}>
		<T.PlaneGeometry args={[100, 100, 32, 32]} />
		<T.ShaderMaterial
			bind:ref={planeMaterial2}
			vertexShader={planeVertex}
			fragmentShader={planeFragment}
			uniforms={{ uTime: { value: 0.0 }, uAlpha: { value: 0.3 } }}
			transparent
			wireframe
		/>
	</T.Mesh>
	<T.Mesh rotation={[$planePositionsStore.x2, $planePositionsStore.y2, $planePositionsStore.z2]}>
		<T.PlaneGeometry args={[100, 100, 32, 32]} />
		<T.ShaderMaterial
			bind:ref={planeMaterial2}
			vertexShader={planeVertex}
			fragmentShader={planeFragment}
			uniforms={{ uTime: { value: 0.0 }, uAlpha: { value: 0.3 } }}
			transparent
			wireframe
		/>
	</T.Mesh>
</T.Group>
<PostProcessing />
