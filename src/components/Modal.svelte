<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function close(e) {
    dispatch('close-modal');
  }
</script>

<section class="container" on:click={close}>
  <aside>
    <slot></slot>
  </aside>
</section>

<style>
  .container {
    position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		display: grid;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, .9);
		z-index: 3000;
  }

  aside {
		overflow: auto!important;
		margin: 0;
    background: var(--background);
    padding: 1rem 2rem;
    border-radius: .5rem;
    max-width: 800px;
  }
</style>
