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
    		<path fill={color} d="M22.169,0.126l-13,11.5c-0.226,0.199-0.224,0.551,0,0.749l13,11.5C22.487,24.156,23,23.934,23,23.5v-23
    			C23,0.068,22.488-0.157,22.169,0.126z"/>
    		<path fill={color} d="M6.5,0h-4C2.224,0,2,0.224,2,0.5v23C2,23.776,2.224,24,2.5,24h4C6.776,24,7,23.776,7,23.5v-23C7,0.224,6.776,0,6.5,0z"/>
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
