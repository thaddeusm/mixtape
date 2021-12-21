<script>
  import { onMount } from 'svelte';
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
  let results = [];

  let timeout = null;
  let searching = false;

  async function search() {
    clearTimeout(timeout);

    timeout = setTimeout(async () => {
        if (query !== '') {
          let res;
          res = await music_value.api.music(`v1/catalog/us/search?term=${query}&limit=10&types=songs`);
          results = await res.data.results.songs.data;
        }
    }, 750);
  }

  $: if (query.length > 0) {
    search();
  }

  function shorten(txt) {
    if (txt.length > 22) {
      return txt.slice(0, 22) + '...';
    } else {
      return txt;
    }
  }

  function clearSearch() {
    query = '';
    results = [];
  }

  let iconColor;
  $: if (color_preference_value == 'light') {
    iconColor = artwork_colors_value.DarkVibrant;
  } else {
    iconColor = artwork_colors_value.LightVibrant;
  }
</script>

<section>
  <header>
    <sub><Search width={'1.2rem'} height={'1.2rem'} color={iconColor} /></sub>
    <input type="text" bind:value={query} placeholder="search by song title">
  </header>
  <ul class="results">
    {#each results as song, index}
      <li class="result">
        <h2>{shorten(song.attributes.name)}</h2>
        <h3>{shorten(song.attributes.artistName)}</h3>
        <section class="add-song">
          <AddSongButton {song} on:song-added={clearSearch} />
        </section>
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
    list-style: none;
  }

  li {
    margin: 1.5rem 0;
    background: var(--background);
    color: var(--text);
  }

  .result {
    text-align: left;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      "song add"
      "artist add";
    align-items: center;
    border-left: .5rem solid var(--text);
    padding-left: .5rem;
  }

  .add-song {
    grid-area: add;
  }

  .result h2 {
    grid-area: song;
  }

  .result h3 {
    grid-area: artist;
  }

  .loading {
    text-align: center;
    margin: 0;
  }
</style>
