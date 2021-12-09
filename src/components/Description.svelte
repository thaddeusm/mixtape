<script>
  import { mixMeta } from './../stores.js';

  let mix_meta_value;

  const unsubscribeMixMeta = mixMeta.subscribe(value => {
    mix_meta_value = value;
  });
</script>

<p>
  {$mixMeta.description}
</p>

<style>
  p {
    text-align: left;
    line-height: 1.5;
    padding: 2rem;
  }
</style>
