<script>
  import UpArrow from './../icons/UpArrow.svelte';

  import { artworkColors, colorPreference, mixMeta, mode, queue, queuePosition, artwork, authorized, loadingTracks, music } from './../stores.js';

  let artwork_colors_value;
  let color_preference_value;
  let mix_meta_value;
  let mode_value;
  let music_value;

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

  const unsubscribeMusic = music.subscribe(value => {
		music_value = value;
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

  let copiedToClipboard = false;

  function jumpToTop() {
    window.scrollTo(0, 0);
  }

  function changeToEditMode() {
    music_value.stop();
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
    jumpToTop();
  }

  function remix() {
    music_value.stop();
    mode.set('edit');
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

      navigator.clipboard.writeText(shareData.url);
      copiedToClipboard = true;

      setTimeout(function() {
        copiedToClipboard = false;
      }, 2000);
    }
  }
</script>

<footer style={background}>
  {#if $authorized}
    <aside id="cta">
      {#if $mode !== 'edit'}
        <button class="call-to-action" on:click={changeToEditMode} disabled={$loadingTracks}>
          create a mixtape
        </button>
        <button class="simple" on:click={remix} disabled={$loadingTracks}>
          or remix this
        </button>
      {:else}
        <button class="call-to-action" on:click={share} disabled={$queue.length == 0 || copiedToClipboard}>
          {#if copiedToClipboard}
            copied to clipboard
          {:else}
            share your mixtape
          {/if}
        </button>
      {/if}
    </aside>
  {/if}
  {#if $queue.length > 0}
    <button class="icon simple" on:click={jumpToTop}>
      <UpArrow width={'1.15rem'} height={'1.15rem'} color={'#ffffff'} />
    </button>
  {/if}
</footer>

<style>
  @media screen and (max-width: 1100px) {
    .call-to-action {
      margin: 1.5rem auto;
    }

    .simple {
      margin: -1rem auto 1.5rem auto;
    }

    .icon {
      margin: 1.5rem auto;
    }
  }

  @media screen and (min-width: 1101px) {
    .call-to-action {
      margin: 3rem auto;
    }

    .simple {
      margin: -2rem auto 3rem auto;
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

  button {
    display: block;
    text-align: center;
  }
</style>
