<script>
  import { artworkColors, music, queue, queuePosition, colorPreference } from './../stores.js';

  import Playlist from './../icons/Playlist.svelte';

  let artwork_colors_value;
  let music_value;
  let queue_value;
  let queue_position_value;
	let color_preference_value;

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

  $: console.log(queue_value)

  function getArtwork(urlTemplate) {
    let arr = urlTemplate.split('{w}x{h}');

    return arr[0] + '55x55cc.jpeg';
  }

  function shortenArtist(txt) {
    if (txt.length > 20) {
      return txt.slice(0, 20) + '...';
    } else {
      return txt;
    }
  }

  function shortenSongTitle(txt) {
    if (txt.length > 30) {
      return txt.slice(0, 30) + '...';
    } else {
      return txt;
    }
  }

  let background;

  $: {
    if (color_preference_value == 'dark') {
      background = '#1e1e1e';
    } else {
      background = '#ffffff';
    }

    console.log(background);
  }

  $: listGradient = `background: ${artwork_colors_value.LightVibrant}; background: -webkit-linear-gradient(2deg, ${artwork_colors_value.DarkVibrant}, 10%, ${background}); background: -moz-linear-gradient(2deg, ${artwork_colors_value.DarkVibrant}, 10%, ${background}); background: linear-gradient(2deg, ${artwork_colors_value.DarkVibrant}, 10%, ${background})`;
  $: listItemShadow = `box-shadow: .05rem .05rem 0 ${artwork_colors_value.DarkVibrant || black}, -.05rem -.05rem 0 ${artwork_colors_value.LightMuted || white};`
  $: iconColor = artwork_colors_value.Vibrant;
</script>

<section id="icon">
  <Playlist color={iconColor} width={'3rem'} height={'3rem'} />
</section>
<ul style={listGradient}>
  {#each $queue as item, index}
    <li style={listItemShadow}>
      <img src="{getArtwork(item.artworkURL)}" alt={`${item.attributes.albumName} artwork`}>
      <h2>{shortenArtist(item.attributes.artistName)}</h2>
      <h3>{shortenSongTitle(item.attributes.name)}</h3>
    </li>
  {/each}
</ul>

<style>
  #icon {
    text-align: center;
    margin-top: 4rem;
  }

  ul {
    margin: 0 auto;
    padding: 0 0 1rem 0;
  }

  li {
    margin: 1.5rem .5rem;
    padding: .5rem;
    background: var(--foreground);
    color: var(--text);
    text-align: left;
    display: grid;
    grid-template-columns: 22% 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      "art artist"
      "art song";
    align-items: center;
  }

  li img {
    grid-area: art;
  }

  li h2 {
    grid-area: artist;
  }

  li h3 {
    grid-area: song;
  }
</style>
