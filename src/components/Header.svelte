<script>
  import MiniPlayer from './../components/MiniPlayer.svelte';
  import Pencil from './../icons/Pencil.svelte';
  import { artworkColors, colorPreference, mixMeta, mode, authorized } from './../stores.js';

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
    background = `background: ${artwork_colors_value.LightVibrant}`;
  } else {
    background = `background: ${artwork_colors_value.DarkVibrant}`;
  }

  function shorten(txt) {
    if (txt.length > 20) {
      return txt.slice(0, 20) + '...';
    } else {
      return txt;
    }
  }

  $: dynamicWidth = `width: ${mix_meta_value.title.length * 10}px`;

  let iconColor;
  $: if (color_preference_value == 'light') {
    iconColor = artwork_colors_value.DarkVibrant;
  } else {
    iconColor = artwork_colors_value.LightVibrant;
  }
</script>

<svelte:window bind:scrollY={y}></svelte:window>

<header style={background}>
  {#if $mode == 'edit' && $authorized}
    <section class="title">
      <input type="text" bind:value={$mixMeta.title} maxlength="24" style={dynamicWidth}>
      <sup><Pencil width={'1rem'} height={'1rem'} color={iconColor} /></sup>
    </section>
  {:else}
    <h2 class="title">{shorten($mixMeta.title)}</h2>
  {/if}
  {#if y > 300}
    <aside>
      <MiniPlayer />
    </aside>
  {:else}
    <!-- todo: share button -->
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

  .title {
    grid-area: title;
  }

  aside {
    grid-area: MiniPlayer;
    height: 100%;
  }

  input[type=text] {
    font-size: 1.5rem;
    max-width: 235px;
    min-width: 90px;
  }
</style>
