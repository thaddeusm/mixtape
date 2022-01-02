<script>
  import {onMount} from 'svelte';

  import Loading from './../components/Loading.svelte';
  import Play from './../icons/Play.svelte';
  import Pause from './../icons/Pause.svelte';
  import { artworkColors, music, queue, queuePosition, authorized, playing } from './../stores.js';
  import { setArtwork, getImageColors } from './../artwork';

  export let artwork = null;
  export let secondary = false;
  export let index = null;

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

  $: border = `border-radius: 100%; border: ${10 - ((queue_position_value / queue_value.length) * 10)}px solid black`;
  $: imageBackgroundOpaque = `width: 55px; height: 55px; background: linear-gradient(to right, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.6) 100%), url('${artwork}'); background-position: center;`;
  $: imageBackgroundFull = `width: 55px; height: 55px; background: url('${artwork}'); background-position: center;`;

  let loading = false;

	async function play() {
    loading = true;
    playing.set(true);
		await music_value.play();
    loading = false;
	}

	async function pause() {
    loading = true;
    playing.set(false);
		await music_value.pause();
    loading = false;
	}

	async function stop() {
    loading = true;
    playing.set(false);
		await music_value.stop();
    loading = false;
	}

  async function skipTo() {
    loading = true;
    await music_value.changeToMediaAtIndex(index);
    queuePosition.set(music_value.queue.position);
    loading = false;

		if (!playing_value) {
			playing.set(true);
		}

    await setArtwork(queue_value[index].attributes.artwork.url);
    await getImageColors();
  }
</script>

<section class={!artwork ? 'no-artwork' : 'artwork'}>
  {#if loading}
    <Loading style={'padding: 1rem;'}/>
  {:else}
    {#if !$playing && !secondary}
      <button on:click={play} style={artwork ? imageBackgroundOpaque : border}>
        <Play color={actionButtonColor} width={'1.15rem'} height={'1.15rem'} />
      </button>
    {:else if $playing && !secondary}
      <button on:click={pause} style={artwork ? imageBackgroundOpaque : border}>
        <Pause color={actionButtonColor} width={'1.15rem'} height={'1.15rem'} />
      </button>
    {:else if secondary}
      <button on:click={skipTo} style={artwork ? imageBackgroundFull : border}>
      </button>
    {/if}
  {/if}
</section>

<style>
  .no-artwork {
    height: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
  }

  .artwork {
    display: inline;
  }

  button {
    padding: .4rem;
    background: #ffffff;
  }
</style>
