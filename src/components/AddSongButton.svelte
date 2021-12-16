<script>
  import New from './../icons/New.svelte';

  import { artworkColors, music, queue } from './../stores.js';

  let artwork_colors_value;
  let music_value;
  let queue_value;

  const unsubscribeArtworkColors = artworkColors.subscribe(value => {
    artwork_colors_value = value;
  });

  const unsubscribeMusic = music.subscribe(value => {
    music_value = value;
  });

  const unsubscribeQueue = queue.subscribe(value => {
    queue_value = value;
  });

  export let artwork;
  export let song;

  function addSong() {

  }

  $: actionButtonColor = artwork_colors_value.DarkVibrant;

  $: imageBackgroundOpaque = `width: 55px; height: 55px; background: linear-gradient(to right, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.85) 100%), url('${artwork}'); background-position: center;`;
</script>

<button on:click={addSong} style={imageBackgroundOpaque}>
  <New color={actionButtonColor} width={'1.5rem'} height={'1.5rem'} />
</button>

<style>
  button {
    padding: .4rem;
    background: #ffffff;
  }
</style>
