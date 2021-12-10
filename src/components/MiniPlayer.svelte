<script>
  import {onMount} from 'svelte';

  import Play from './../icons/Play.svelte';
  import Pause from './../icons/Pause.svelte';
  import { artworkColors, music, queue, queuePosition, authorized, playing } from './../stores.js';

	let artwork_colors_value;
	let music_value;
	let queue_value;
	let queue_position_value;
	let authorized_value;
	let playing_value;

	const unsubscribeArtworkColors = artworkColors.subscribe(value => {
		artwork_colors_value = value;
	});

	const unsubscribeMusic = music.subscribe(value => {
		music_value = value;
	});

	const unsubscribeQueue = queue.subscribe(value => {
		queue_value = value;
	});

	const unsubscribeQueuePosition = queuePosition.subscribe(value => {
		queue_position_value = value;
	});

	const unsubscribeAuthorized = authorized.subscribe(value => {
		authorized_value = value;
	});

	const unsubscribePlaying = playing.subscribe(value => {
		playing_value = value;
	});

  $: actionButtonColor = artwork_colors_value.DarkVibrant;

  $: border = `border: ${10 - ((queue_position_value / queue_value.length) * 10)}px solid black`;

	function play() {
		playing.set(true);
		music_value.play();
	}

	function pause() {
		playing.set(false);
		music_value.pause();
	}

	function stop() {
		playing.set(false);
		music_value.stop();
	}
</script>

<section>
  {#if !$playing}
    <button on:click={play} style={border} class="play">
      <Play color={actionButtonColor} width={'1.15rem'} height={'1.15rem'} />
    </button>
  {:else}
    <button on:click={pause} style={border}>
      <Pause color={actionButtonColor} width={'1.15rem'} height={'1.15rem'} />
    </button>
  {/if}
</section>

<style>
  section {
    height: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
  }

  button {
    border-radius: 100%;
    padding: .4rem;
    background: #ffffff;
  }
</style>
