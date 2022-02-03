<script>
  import { artworkColors, music, queue, queuePosition, colorPreference, mode, playing, loadingTracks } from './../stores.js';
  import { getThumbnail, setArtwork, getImageColors, clearArtwork, resetColors } from './../artwork.js';

  import Playlist from './../icons/Playlist.svelte';
  import Remove from './../icons/Remove.svelte';
  import MiniPlayer from './../components/MiniPlayer.svelte';
  import Search from './../components/Search.svelte';
  import Loading from './../components/Loading.svelte';

  let artwork_colors_value;
  let music_value;
  let queue_value;
  let queue_position_value;
	let color_preference_value;
  let mode_value;
  let playing_value;

  const unsubscribeArtworkColors = artworkColors.subscribe(value => {
    artwork_colors_value = value;
  });

  const unsubscribeMusic = music.subscribe(value => {
    music_value = value;
  });

  const unsubscribeQueue = queue.subscribe(value => {
    queue_value = value;
  });

  const unsubscribeQueuePosition = queuePosition.subscribe(value => {
    queue_position_value = value;
  });

  const unsubscribeColorPreference = colorPreference.subscribe(value => {
		color_preference_value = value;
	});

  const unsubscribeMode = mode.subscribe(value => {
    mode_value = value;
  });

  const unsubscribePlaying = playing.subscribe(value => {
    playing_value = value;
  });

  function shorten(txt) {
    if (txt.length > 20) {
      return txt.slice(0, 20) + '...';
    } else {
      return txt;
    }
  }

  async function removeTrack(index) {
    await music_value.stop();
    await music_value.queue.reset();
    await music_value.queue.remove(index);
    await queue.set(music_value.queue.items);
    await queuePosition.set(0);

    if (typeof queue_value[queue_position_value] == 'object') {
      await setArtwork(queue_value[queue_position_value].attributes.artwork.url);
      await getImageColors();
    } else {
      await clearArtwork();
      await resetColors();
    }
  }

  let background;

  $: {
    if (color_preference_value == 'dark') {
      background = '#1e1e1e';
    } else {
      background = '#ffffff';
    }
  }

  let nowPlayingItemIndex;

  $: if (playing_value || queue_position_value) {
    setTimeout(() => {
      nowPlayingItemIndex = music_value.nowPlayingItemIndex;
    }, 700);
  }

  $: listGradient = `background: ${artwork_colors_value.LightVibrant}; background: -webkit-linear-gradient(2deg, ${artwork_colors_value.DarkVibrant}, 10%, ${background}); background: -moz-linear-gradient(2deg, ${artwork_colors_value.DarkVibrant}, 10%, ${background}); background: linear-gradient(2deg, ${artwork_colors_value.DarkVibrant}, 10%, ${background})`;
  $: listItemShadow = `box-shadow: .05rem .05rem 0 ${artwork_colors_value.DarkVibrant || 'black'}, -.05rem -.05rem 0 ${artwork_colors_value.LightMuted || 'white'};`

  let iconColor;
  $: if (color_preference_value == 'light') {
    iconColor = artwork_colors_value.DarkVibrant;
  } else {
    iconColor = artwork_colors_value.LightVibrant;
  }
</script>

<section class="container" style={listGradient}>
  <header>
    {#if $loadingTracks}
      <Loading style={''}/>
    {:else}
      <Playlist color={iconColor} width={'2rem'} height={'2rem'} />
    {/if}
  </header>
  <ul>
    {#each $queue as item, index}
      <li class="queue-item" style={listItemShadow}>
        {#await getThumbnail(item.artworkURL) then src}
          <section class="artwork">
            <MiniPlayer artwork={src} secondary={$queuePosition !== index} {index} />
          </section>
        {/await}
        <h2>{shorten(item.attributes.name)}</h2>
        <h3>{shorten(item.attributes.artistName)}</h3>
        {#if $mode == 'edit'}
          <section class="remove">
            <button class="simple" on:click={() => {removeTrack(index)}} disabled={$playing}>
              <Remove color={iconColor} width={'1.5rem'} height={'1.5rem'} />
            </button>
          </section>
        {/if}
      </li>
    {/each}
    {#if $mode == 'edit'}
      <li>
        <Search />
      </li>
    {/if}
  </ul>
</section>

<style>
  @media screen and (max-width: 1100px) {
    header {
      margin-top: 4rem;
    }
  }

  @media screen and (min-width: 1101px) {
    .container {
      max-height: 35vh;
      overflow: scroll;
    }
  }

  .container {
    height: 100%;
  }

  header {
    text-align: center;
  }

  ul {
    margin: 0 auto;
    padding: 1rem 0;
    transition: background .5s ease-in!important;
    list-style: none;
  }

  li {
    margin: 1.5rem auto;
    max-width: 400px;
    padding: .5rem;
    background: var(--foreground);
    color: var(--text);
  }

  .queue-item {
    text-align: left;
    display: grid;
    grid-template-columns: 20% 1fr auto;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      "art artist remove"
      "art song remove";
    align-items: center;
  }

  .artwork {
    grid-area: art;
    padding-left: 10%;
  }

  li h2 {
    grid-area: artist;
  }

  li h3 {
    grid-area: song;
  }

  .remove {
    grid-area: remove;
    padding-right: .5rem;
  }
</style>
