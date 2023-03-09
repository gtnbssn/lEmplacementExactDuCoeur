<script lang="ts">
  import { connectionStateStore, sendMessageToPeers } from "$lib/stores";
  let message = "";
</script>
<h1>firstLoad = {$connectionStateStore.firstLoad}</h1>
<h1>peer id = {$connectionStateStore.peerid}</h1>
<h1>user id = {$connectionStateStore.userid}</h1>
<ul class="py-6">
	{#each $connectionStateStore.peerConnections as peerConnection}
		<li>{peerConnection.peer}</li>
	{/each}
</ul>
  <input bind:value={message} class="border-2 border-gray-700"/>
<button on:click={() => sendMessageToPeers(message, $connectionStateStore.peerConnections)} >
send message
</button>
  <ul class="py-6">
  {#each $connectionStateStore.messagesHistory as message}
    <li>{message}</li>
  {/each}
</ul>
