<script>
  import Pencil from './../icons/Pencil.svelte';
  import { mixMeta, mode, authorized, colorPreference, artworkColors } from './../stores.js';

  let mix_meta_value;
  let color_preference_value;
  let artwork_colors_value;

  const unsubscribeMixMeta = mixMeta.subscribe(value => {
    mix_meta_value = value;
  });

  const unsubscribeArtworkColors = artworkColors.subscribe(value => {
    artwork_colors_value = value;
  });

  const unsubscribeColorPreference = colorPreference.subscribe(value => {
		color_preference_value = value;
	});

  let iconColor;
  $: if (color_preference_value == 'light') {
    iconColor = artwork_colors_value.DarkVibrant;
  } else {
    iconColor = artwork_colors_value.LightVibrant;
  }
</script>

{#if $mode == 'edit' && $authorized}
  <section class="icon">
    <Pencil width={'1rem'} height={'1rem'} color={iconColor} />
  </section>
  <p contenteditable="true" bind:innerHTML={$mixMeta.description}>
    {$mixMeta.description}
  </p>
{:else}
  <p>
    {$mixMeta.description}
  </p>
{/if}

<style>
  p {
    text-align: left;
    line-height: 1.5;
    margin: 15% 7%;
    border: none;
    outline: none;
  }

  p[contenteditable="true"] {
    margin: 3% 7% 15% 7%;
  }

  .icon {
    text-align: center;
    margin-top: 12%;
  }
</style>
