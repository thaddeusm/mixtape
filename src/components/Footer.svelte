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
</script>

<footer>
  {#if $mode == 'view'}
    <button class="call-to-action">
      make your own
    </button>
  {/if}
  <button class="simple">about</button>
  <button class="simple">terms</button>
  <button id="toTop">
    <UpArrow width={'1rem'} height={'1rem'} color={$artworkColors.LightMuted} />
  </button>
</footer>

<style>
  footer {
    background: var(--foreground);
  }
</style>
