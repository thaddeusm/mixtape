<script>
	export let width = '200px';
	export let height = '200px';

	export let color = '#000000';

	let style = `width: ${width}; height: ${height}`;
</script>

<div {style}>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
    <g id="Filled_Icon">
    	<g>
    		<path fill={color} d="M10.5,0h-5C5.224,0,5,0.224,5,0.5v23C5,23.776,5.224,24,5.5,24h5c0.276,0,0.5-0.224,0.5-0.5v-23C11,0.224,10.776,0,10.5,0
    			z"/>
    		<path fill={color} d="M18.5,0h-5C13.224,0,13,0.224,13,0.5v23c0,0.276,0.224,0.5,0.5,0.5h5c0.276,0,0.5-0.224,0.5-0.5v-23
    			C19,0.224,18.776,0,18.5,0z"/>
    	</g>
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
