<script>
  import TapeCog from './../icons/TapeCog.svelte';

  export let style = '';
</script>

<div class="loading" {style}><TapeCog /></div>

<style>
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(180deg);
    }
  }

  .loading {
    width: 1.5rem;
    height: 1.5rem;
    display: inline-block;
    animation-name: spin;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
</style>
