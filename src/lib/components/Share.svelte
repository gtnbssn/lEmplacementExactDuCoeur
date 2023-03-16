<script lang="ts">
	const shareIt = () => {
		navigator
			.share({
				title: "L'Emplacement Exact du Cœur",
				url: 'https://lemplacementexactducoeur.vercel.app'
			})
			.then(() => {});
	};
</script>

{#if navigator.share}
	<button class="share-button" type="button" title="Share" on:click={shareIt}>
		<svg>
			<use href="#share-icon" />
		</svg>
		<span>Share</span>
	</button>
{/if}

<svg class="hidden">
	<defs>
		<symbol
			id="share-icon"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="feather feather-share"
			><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline
				points="16 6 12 2 8 6"
			/><line x1="12" y1="2" x2="12" y2="15" /></symbol
		>
	</defs>
</svg>

<style>
</style>
