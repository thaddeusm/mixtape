<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  import New from './../icons/New.svelte';
  import TapeCog from './../icons/TapeCog.svelte';

  import { setArtwork, getImageColors } from './../artwork.js';
  import { artworkColors, music, queue, colorPreference } from './../stores.js';

  let artwork_colors_value;
  let music_value;
  let queue_value;
  let color_preference_value;

  const unsubscribeArtworkColors = artworkColors.subscribe(value => {
    artwork_colors_value = value;
  });

  const unsubscribeMusic = music.subscribe(value => {
    music_value = value;
  });

  const unsubscribeQueue = queue.subscribe(value => {
    queue_value = value;
  });

  const unsubscribeColorPreference = colorPreference.subscribe(value => {
		color_preference_value = value;
	});

  export let song;
  let loading;

  async function addSong() {
    loading = true;
    let obj = {
			[song.attributes.playParams.kind]: song.attributes.playParams.id
		};

    if (queue_value.length > 0) {
      await music_value.playLater(obj);
    } else {
      await music_value.setQueue(obj);
      await setArtwork(song.attributes.artwork.url);
      await getImageColors();
    }

    queue.set(music_value.queue.items);
    loading = false;
    dispatch('song-added');
  }

  let iconColor;
  $: if (color_preference_value == 'light') {
    iconColor = artwork_colors_value.DarkVibrant;
  } else {
    iconColor = artwork_colors_value.LightVibrant;
  }
</script>

<button class="simple" on:click={addSong} class:loading>
  {#if loading}
    <TapeCog />
  {:else}
    <New color={iconColor} width={'1.5rem'} height={'1.5rem'} />
  {/if}
</button>

<style>
  button {
    width: 1.5rem;
    height: 1.5rem;
  }
</style>
