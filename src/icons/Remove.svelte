<script>
	export let width = '200px';
	export let height = '200px';

	export let color = '#000000';

	let style = `width: ${width}; height: ${height}`;
</script>

<div {style}>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
    <g id="Black">
    	<g>

    			<line fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="16" y1="8" x2="7" y2="17"/>

    			<line fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="16" y1="17" x2="7" y2="8"/>
    		<polygon fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="21.5,18
    			11.5,23.5 1.5,18 1.5,7 11.5,1.5 21.5,7 		"/>
    	</g>
    </g>
    <g id="Frames-24px">
    	<rect fill="none" width="24" height="24"/>
    </g>
  </svg>
</div>

<style>
  div {
    display: inline-block;
  }
</style>
