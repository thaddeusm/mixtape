<script>
  import {onMount} from 'svelte';

  import Play from './../icons/Play.svelte';
  import Pause from './../icons/Pause.svelte';
  import { artworkColors, music, queue, queuePosition, state, playing } from './../stores.js';

	let artwork_colors_value;
	let music_value;
	let queue_value;
	let queue_position_value;
	let state_value;
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

	const unsubscribeState = state.subscribe(value => {
		state_value = value;
	});

	const unsubscribePlaying = playing.subscribe(value => {
		playing_value = value;
	});

  $: actionButtonColor = artwork_colors_value.DarkVibrant;

  let radius = 0;
  let duration = 100;
	let currentTime = 0;
  let durations = [];

  $: if (queue_value.length) {
    duration = totalDuration();
  }

	$: if (durations.length > 0 && queue_position_value > 0) {
		currentTime = durations.slice(0, queue_position_value).reduce((acc, currentValue) => {
			return acc + currentValue;
		});
	}

  $: radius = `border: ${(duration - currentTime) / 200}px solid black`;

  function totalDuration() {
		let total = 0;

		for (let i=0; i<queue_value.length; i++) {
			let item = queue_value[i];
			let trackDuration = item.attributes.durationInMillis / 1000;

			durations.push(trackDuration);

			total += trackDuration;
		}

		return total;
	}

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
    <button on:click={play} style={radius} class="play">
      <Play color={actionButtonColor} width={'1.5rem'} height={'1.5rem'} />
    </button>
  {:else}
    <button on:click={pause} style={radius}>
      <Pause color={actionButtonColor} width={'1.5rem'} height={'1.5rem'} />
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
    padding: .5rem;
  }
</style>
