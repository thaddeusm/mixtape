<script>
	export let width = '200px';
	export let height = '200px';

	export let color = '#000000';

	let style = `width: ${width}; height: ${height}`;
</script>

<div {style}>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
    <g id="Filled_Icon">
    	<path fill={color} d="M23.754,11.553l-23-11.5C0.417-0.113,0.031,0.133,0.031,0.5v23c0,0.373,0.393,0.612,0.724,0.447l23-11.5
    		C24.122,12.263,24.122,11.737,23.754,11.553z"/>
    </g>
    <g id="Invisible_Shape">
    	<rect fill="none" width="24" height="24"/>
    </g>
  </svg>
</div>

<style>
  div {
    display: inline-block;
  }
</style>
