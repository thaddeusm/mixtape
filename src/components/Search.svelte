<script>
  import { music, artworkColors, colorPreference, mixMeta, mode, authorized } from './../stores.js';

  import Search from './../icons/Search.svelte';
  import AddSongButton from './../components/AddSongButton.svelte';

  let music_value;
  let artwork_colors_value;
  let color_preference_value;
  let mix_meta_value;

  const unsubscribeMusic = music.subscribe(value => {
		music_value = value;
	});

  const unsubscribeMixMeta = mixMeta.subscribe(value => {
    mix_meta_value = value;
  });

  const unsubscribeArtworkColors = artworkColors.subscribe(value => {
    artwork_colors_value = value;
  });

  const unsubscribeColorPreference = colorPreference.subscribe(value => {
    color_preference_value = value;
  });

  let query = '';
  let results = {
    songs: {data: []},
    albums: {data: []},
    artists: {data: []}
  };

  async function search() {
    results = await music_value.api.search(`${query}`, { limit: 10, types: 'artists,albums,songs' });

    console.log(results);
  }

  $: if (query.length > 0) {
    search();
  }

  async function getArtwork(urlTemplate) {
    let arr = urlTemplate.split('{w}x{h}');

    return await arr[0] + '55x55cc.jpeg';
  }

  function shorten(txt) {
    if (txt.length > 22) {
      return txt.slice(0, 22) + '...';
    } else {
      return txt;
    }
  }

  let iconColor;
  $: if (color_preference_value == 'light') {
    iconColor = artwork_colors_value.DarkVibrant;
  } else {
    iconColor = artwork_colors_value.LightVibrant;
  }

  $: listItemShadow = `box-shadow: .05rem .05rem 0 ${artwork_colors_value.DarkVibrant || black}, -.05rem -.05rem 0 ${artwork_colors_value.LightMuted || white};`
</script>

<section>
  <header>
    <sub><Search width={'1.2rem'} height={'1.2rem'} color={iconColor} /></sub>
    <input type="text" bind:value={query} placeholder="song, artist, or album name">
  </header>
  <ul class="results">
    {#each results.songs.data as song, index}
    <li class="result" style={listItemShadow}>
      {#await getArtwork(song.attributes.artwork.url)}
      {:then src}
        <section class="artwork">
          <AddSongButton artwork={src} {song} />
        </section>
      {/await}
      <h2>{shorten(song.attributes.name)}</h2>
      <h3>{shorten(song.attributes.artistName)}</h3>
    </li>
    {/each}
  </ul>
</section>

<style>
  section {
    background: var(--background);
    padding: 5% 5% 1% 5%;
  }

  header {
    display: grid;
    grid-template-columns: 15% 1fr;
    grid-template-areas:
      "icon input";
    justify-content: center;
  }

  header sub {
    grid-area: icon;
    display: block;
    align-self: flex-end;
  }

  header input[type="text"] {
    grid-area: input;
    font-size: 1.5rem;
    display: block;
    align-self: flex-start;
  }

  .results {
    margin: 0 auto;
    padding: 1rem 0;
  }

  li {
    margin: 1.5rem .5rem;
    padding: .5rem;
    background: var(--foreground);
    color: var(--text);
  }

  .result {
    text-align: left;
    display: grid;
    grid-template-columns: 22% 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      "art artist"
      "art song";
    align-items: center;
  }

  .artwork {
    grid-area: art;
  }

  .artwork img {

  }

  .result h2 {
    grid-area: artist;
  }

  .result h3 {
    grid-area: song;
  }
</style>
