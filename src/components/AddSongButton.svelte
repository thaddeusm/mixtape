<script>
  import New from './../icons/New.svelte';

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

  async function addSong() {
    let obj = {
			[song.attributes.playParams.kind]: song.attributes.playParams.id
		};

    if (queue_value.length > 0) {
      await music_value.playLater(obj);
    } else {
      await music_value.setQueue(obj);
      setArtwork(song.attributes.artwork.url);
      getImageColors();
    }

    queue.set(music_value._player._queue.items);
  }

  let iconColor;
  $: if (color_preference_value == 'light') {
    iconColor = artwork_colors_value.DarkVibrant;
  } else {
    iconColor = artwork_colors_value.LightVibrant;
  }
</script>

<button class="simple" on:click={addSong}>
  <New color={iconColor} width={'1.5rem'} height={'1.5rem'} />
</button>

<style>

</style>
