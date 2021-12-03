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
    		<path fill={color} d="M2.832,0.126C2.514-0.157,2,0.066,2,0.5v23c0,0.431,0.51,0.658,0.832,0.375l13-11.5c0.224-0.198,0.226-0.549,0-0.749
    			L2.832,0.126z"/>
    		<path fill={color} d="M22.5,0h-4C18.224,0,18,0.224,18,0.5v23c0,0.276,0.224,0.5,0.5,0.5h4c0.276,0,0.5-0.224,0.469-0.5v-23
    			C23,0.224,22.776,0,22.5,0z"/>
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
