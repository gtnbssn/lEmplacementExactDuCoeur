<script lang="ts">
	import { deviceAcceleration } from '$lib/stores';
	const handleDeviceMotion = (e: DeviceMotionEvent) => {
		if (e.acceleration) {
			deviceAcceleration.set({
				x: e.acceleration.x || 0,
				y: e.acceleration.y || 0,
				z: e.acceleration.z || 0
			});
		}
		return 'ha';
	};
</script>

<svelte:window
	on:DeviceMotionEvent={(e) => {
		handleDeviceMotion(e);
	}}
/>
