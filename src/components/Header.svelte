<script>
  import MiniPlayer from './../components/MiniPlayer.svelte';
  import Modal from './../components/Modal.svelte';
  import About from './../components/About.svelte';
  import Pencil from './../icons/Pencil.svelte';
  import { artworkColors, colorPreference, mixMeta, mode, authorized } from './../stores.js';

  let artwork_colors_value;
	let color_preference_value;
  let mix_meta_value;

  const unsubscribeMixMeta = mixMeta.subscribe(value => {
    mix_meta_value = value;
  });

  const unsubscribeArtworkColors = artworkColors.subscribe(value => {
    artwork_colors_value = value;
  });

  const unsubscribeColorPreference = colorPreference.subscribe(value => {
		color_preference_value = value;
	});

  let background;
  let y;

  $: if (color_preference_value == 'light') {
    background = `background: ${artwork_colors_value.LightVibrant}`;
  } else {
    background = `background: ${artwork_colors_value.DarkVibrant}`;
  }

  let modalOpen = false;

  function toggleModal() {
    window.scrollTo(0, 0);
    modalOpen = !modalOpen;
  }

  function shorten(txt) {
    if (txt.length > 20) {
      return txt.slice(0, 20) + '...';
    } else {
      return txt;
    }
  }

  $: dynamicWidth = `width: ${mix_meta_value.title.length * 14}px`;

  let iconColor;
  $: if (color_preference_value == 'light') {
    iconColor = artwork_colors_value.DarkVibrant;
  } else {
    iconColor = artwork_colors_value.LightVibrant;
  }
</script>

<svelte:window bind:scrollY={y}></svelte:window>

{#if $authorized}
  <header style={background}>
    {#if $mode == 'edit'}
      <section class="title">
        <input type="text" bind:value={$mixMeta.title} maxlength="18" style={dynamicWidth}>
        <sup><Pencil width={'1rem'} height={'1rem'} color={iconColor} /></sup>
      </section>
    {:else}
      <h2 class="title">{shorten($mixMeta.title)}</h2>
    {/if}
    {#if y > 300}
      <aside>
        <MiniPlayer />
      </aside>
    {:else}
      <aside>
        <button class="simple" on:click={toggleModal}>
          ?
        </button>
      </aside>
    {/if}
  </header>
{/if}

{#if modalOpen}
  <div class="overlay">
    <Modal on:close-modal={toggleModal}>
      <About />
    </Modal>
  </div>
{/if}

<style>
  @media screen and (max-width: 500px) {
    header {
      grid-template-columns: 7% 70% 16% 7%;
      grid-template-rows: 1fr;
      grid-template-areas: ". title actions .";
    }

    input[type="text"] {
      max-width: 235px;
      min-width: 150px;
    }
  }

  @media screen and (min-width: 501px) and (max-width: 1101px) {
    header {
      grid-template-columns: 7% 70% 16% 7%;
      grid-template-rows: 1fr;
      grid-template-areas: ". title actions .";
    }

    input[type="text"] {
      max-width: 300px;
      min-width: 150px;
    }
  }

  @media screen and (min-width: 1101px) {
    header {
      grid-template-rows: 1fr;
      grid-template-columns: 65% 1fr 4%;
      grid-template-areas: ". title actions";
      text-align: center;
      background: var(--background)!important;
    }

    input[type="text"] {
      min-width: 150px;
    }

    .title {
      text-align: left;
      margin-left: 3rem;
    }
  }

  header {
    height: 4rem;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: grid;
    z-index: 100;
    justify-content: center;
    align-items: center;
    transition: background .5s ease-in;
  }

  .title {
    grid-area: title;
  }

  aside {
    grid-area: actions;
    height: 100%;
    display: grid;
    align-items: center;
    justify-content: center;
  }

  input[type=text] {
    font-size: 1.7rem;
  }

  .simple {
    font-size: 1.5rem;
  }
</style>
