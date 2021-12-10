<script>
  import MiniPlayer from './../components/MiniPlayer.svelte';
  import { artworkColors, colorPreference, mixMeta } from './../stores.js';

  let artwork_colors_value;
	let color_preference_value;
  let mix_meta_value;

  const unsubscribeMixMeta = mixMeta.subscribe(value => {
    mix_meta_value = value;
  });

  const unsubscribeArtworkColors = artworkColors.subscribe(value => {
    artwork_colors_value = value;
  });

  const unsubscribeColorPreference = colorPreference.subscribe(value => {
		color_preference_value = value;
	});

  let background;
  let y;

  $: if (color_preference_value == 'light') {
    background = `background: ${artwork_colors_value.LightMuted || '#ffffff'}`;
  } else {
    background = `background: ${artwork_colors_value.DarkVibrant || '#1e1e1e'}`;
  }
</script>

<svelte:window bind:scrollY={y}></svelte:window>

<header style={background}>
  <h1>{$mixMeta.title}</h1>
  {#if y > 300}
    <aside>
      <MiniPlayer />
    </aside>
  {/if}
</header>

<style>
  header {
    height: 4rem;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: grid;
    grid-template-columns: 7% 70% 16% 7%;
    grid-template-rows: 1fr;
    grid-template-areas: ". title MiniPlayer .";
    z-index: 100;
    justify-content: center;
    align-items: center;
  }

  h1 {
    grid-area: title;
  }

  aside {
    grid-area: MiniPlayer;
    height: 100%;
  }
</style>
