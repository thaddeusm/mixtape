<script>
  import { onMount } from 'svelte';

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

  let description = null;
  let descriptionLoaded = false;

  let timeout = null;

  function saveDescription() {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      mixMeta.set({title: mix_meta_value.title, description: description.innerText});
    }, 1500);
  }

  let iconColor;
  $: if (color_preference_value == 'light') {
    iconColor = artwork_colors_value.DarkVibrant;
  } else {
    iconColor = artwork_colors_value.LightVibrant;
  }

  $: if (description !== null && !descriptionLoaded) {
    description.innerText = mix_meta_value.description;
    descriptionLoaded = true;
  }
</script>

{#if $mode == 'edit' && $authorized}
  <section class="icon">
    <Pencil width={'1rem'} height={'1rem'} color={iconColor} />
  </section>
  <p contenteditable="true" bind:this={description} on:keyup={saveDescription}>

  </p>
{:else}
  <p>
    {$mixMeta.description}
  </p>
{/if}

<style>
  @media screen and (min-width: 1101px) {
    p[contenteditable="true"] {
      border-left: 1rem solid var(--foreground);
      padding-left: 2rem;
    }

    .icon {
      text-align: center;
    }

    p {
      margin: 0 7%!important;
      max-height: calc(80vh);
      overflow: scroll;
    }
  }

  p {
    text-align: left;
    line-height: 1.5;
    margin: 10% 7%;
    outline: none;
    white-space: pre-wrap;
  }

  p[contenteditable="true"] {
    margin: 3% 7% 15% 7%;
  }

  .icon {
    text-align: center;
    margin-top: 12%;
  }
</style>
