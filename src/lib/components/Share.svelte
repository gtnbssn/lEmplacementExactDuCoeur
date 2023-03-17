<script lang="ts">
	const shareIt = () => {
		navigator
			.share({
				title: "L'Emplacement Exact du Cœur",
				url: 'https://lemplacementexactducoeur.vercel.app'
			})
			.then(() => {});
	};
	const shareMessages = [
		'Share',
		'Relate',
		'Connect',
		'Make Friends',
		'Find Love',
		'Talk To Me',
		"Don't Stay Alone",
		'Create a Bond',
		'Stay With Me',
		'Rekindle This Friendship',
		'Keep Warm',
		'Create a Community',
		'Create a Core Memory',
		'Grow With Others',
		'Seek Connections',
		'Keep me Company',
		'Smile at Someone',
		'Invite Someone Over'
	];
	const shareMessage = shareMessages[Math.floor(Math.random() * shareMessages.length)];
</script>

<button class="share-button" type="button" title="Share" on:click={shareIt}>
	<svg>
		<use href="#share-icon" />
	</svg>
	<span>{shareMessage}</span>
</button>

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
	svg {
		width: 20px;
		height: 20px;
		margin-right: 7px;
	}
	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: auto;
		padding: 1em 2em;
		color: #eee;
		text-align: center;
		background-color: rgba(255, 255, 255, 0.1);
		-webkit-backdrop-filter: blur(24px);
		backdrop-filter: blur(24px);
		position: fixed;
		bottom: 0;
		right: 0;
		margin: 1em;
		border-radius: 1em;
	}
</style>
