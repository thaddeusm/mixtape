<script>
  import UpArrow from './../icons/UpArrow.svelte';

  import { artworkColors, colorPreference, mixMeta, mode, queue, queuePosition, artwork, authorized } from './../stores.js';

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
    underline = `border-bottom: 1px solid ${artwork_colors_value.LightMuted}`;
    color = `color: ${artwork_colors_value.LightMuted}`;
  }

  function jumpToTop() {
    window.scrollTo(0, 0);
  }

  function changeToEditMode() {
    mode.set('edit');
    mixMeta.set({
    	'title': 'Mixtape Title',
    	'description': 'Mixtape description...'
    });
    queue.set([]);
    queuePosition.set(0);
    artworkColors.set({
    	DarkMuted: '#1e1e1e',
    	DarkVibrant: '#454545',
    	LightMuted: '#ffffff',
    	LightVibrant: '#efefef',
    	Muted: '#90a4ae',
    	Vibrant: '#cfd8dc'
    });
    artwork.set('');
  }

  async function share() {
    let shareData = {
      title: 'Mixtape',
      text: `Check out this mix: ${mix_meta_value.title}`,
      url: window.location.href
    }

    try {
      await navigator.share(shareData);
    } catch(err) {
      console.log(err);
    }
  }
</script>

<footer style={background}>
  {#if $authorized}
    <aside id="cta">
      {#if $mode !== 'edit'}
        <button class="call-to-action" on:click={changeToEditMode}>
          create a mixtape
        </button>
      {:else}
        <button class="call-to-action" on:click={share}>
          share your mixtape
        </button>
      {/if}
    </aside>
  {/if}
  {#if $queue.length > 0}
    <button class="simple icon" on:click={jumpToTop}>
      <UpArrow width={'1.15rem'} height={'1.15rem'} color={'#ffffff'} />
    </button>
  {/if}
</footer>

<style>
  @media screen and (max-width: 1100px) {
    button {
      margin: 1.5rem auto;
    }
  }

  @media screen and (min-width: 1101px) {
    button {
      margin: 3rem auto;
    }

    .icon {
      display: none;
    }
  }

  footer {
    display: grid;
    align-items: center;
    justify-content: center;
    transition: background .5s ease-in;
  }

  .call-to-action {
    background: var(--background);
  }
</style>
