<script>
  import UpArrow from './../icons/UpArrow.svelte';

  import { artworkColors, colorPreference, mixMeta, mode } from './../stores.js';

  let artwork_colors_value;
  let color_preference_value;
  let mix_meta_value;
  let mode_value;

  const unsubscribeMixMeta = mixMeta.subscribe(value => {
    mix_meta_value = value;
  });

  const unsubscribeArtworkColors = artworkColors.subscribe(value => {
    artwork_colors_value = value;
  });

  const unsubscribeColorPreference = colorPreference.subscribe(value => {
    color_preference_value = value;
  });

  const unsubscribeMode = mode.subscribe(value => {
    mode_value = value;
  });

  $: background = `background: ${artwork_colors_value.DarkVibrant}`;
  let underline;
  let color;

  $: if (color_preference_value == 'light') {
    underline = `border-bottom: 1px solid ${artwork_colors_value.LightVibrant}`;
    color = `color: ${artwork_colors_value.LightVibrant}`;
  } else {
    underline = `border-bottom: 1px solid ${artwork_colors_value.LightVibrant}`;
    color = `color: ${artwork_colors_value.LightVibrant}`;
  }

  function jumpToTop() {
    window.scrollTo(0, 0);
  }
</script>

<footer style={background}>
  {#if $mode == 'view'}
    <aside id="cta">
      <button class="call-to-action">
        make your own
      </button>
    </aside>
  {/if}
  <button class="simple" style={color} id="about">about</button>
  <button class="simple" style={color} id="terms">terms</button>
  <button class="simple" id="up" on:click={jumpToTop}>
    <UpArrow width={'1.15rem'} height={'1.15rem'} color={'#ffffff'} />
  </button>
</footer>

<style>
  footer {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      "cta cta cta"
      "about up terms";
    align-items: center;
    justify-content: center;
    height: 10rem;
    padding: 2rem 0 0 0;
  }

  #about {
    grid-area: about;
  }

  #terms {
    grid-area: terms;
  }

  #up {
    grid-area: up;
  }

  #cta {
    grid-area: cta;
    text-align: center;
  }
</style>
