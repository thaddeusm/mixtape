<script>
  import UpArrow from './../icons/UpArrow.svelte';

  import { artworkColors, colorPreference, mixMeta, mode, queue, queuePosition, artwork } from './../stores.js';

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
</script>

<footer class="{$mode == 'edit' ? 'mini' : 'full'}" style={background}>
  {#if $mode !== 'edit'}
    <aside id="cta">
      <button class="call-to-action" on:click={changeToEditMode}>
        make your own
      </button>
    </aside>
  {/if}
  <button class="simple" style={color} id="about">about</button>
  <button class="simple" style={color} id="terms">terms</button>
  {#if $queue.length > 0}
    <button class="simple icon" on:click={jumpToTop}>
      <UpArrow width={'1.15rem'} height={'1.15rem'} color={'#ffffff'} />
    </button>
  {/if}
</footer>

<style>
  .mini {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "about terms";
    align-items: center;
    height: 5rem;
  }

  .full {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      "cta cta cta"
      "about icon terms";
    align-items: center;
    justify-content: center;
    height: 10rem;
    padding: 1rem 0 0 0;
  }

  #about {
    grid-area: about;
  }

  #terms {
    grid-area: terms;
  }

  .icon {
    grid-area: icon;
  }

  #cta {
    grid-area: cta;
    text-align: center;
  }
</style>
