<script>
  import Play from './../icons/Play.svelte';
  import Pause from './../icons/Pause.svelte';
  import { music, queue, queuePosition } from './../stores.js';

  let music_value;
  let queue_value;
  let queue_position_value;

  const unsubscribeMusic = music.subscribe(value => {
    music_value = value;
  });

  const unsubscribeQueue = queue.subscribe(value => {
    queue_value = value;
  });

  const unsubscribeQueuePosition = queuePosition.subscribe(value => {
    queue_position_value = value;
  });
</script>

<aside>
  {#if !playing}
    <button on:click={play}>
      <Play color={actionButtonColor} width={'2rem'} height={'2rem'} />
    </button>
  {:else}
    <button on:click={pause}>
      <Pause color={actionButtonColor} width={'2rem'} height={'2rem'} />
    </button>
  {/if}
</aside>
