<script>
  import { artworkColors, colorPreference } from './../stores.js';

  let artwork_colors_value;
	let color_preference_value;

  const unsubscribeArtworkColors = artworkColors.subscribe(value => {
    artwork_colors_value = value;
  });

  const unsubscribeColorPreference = colorPreference.subscribe(value => {
		color_preference_value = value;
	});

  let background;

  $: if (color_preference_value == 'light') {
    background = `background: ${artwork_colors_value.LightVibrant || '#ffffff'}`;
  } else {
    background = `background: ${artwork_colors_value.DarkVibrant || '#1e1e1e'}`;
  }
</script>

<header style={background}>
  <h1>Mixtape</h1>
</header>

<style>
  header {
    padding: 2% 10%;
    margin: 0 0 10% 0;
  }
</style>
