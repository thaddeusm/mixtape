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
    		<polyline fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
    			10.5,20.5 0.5,20.5 0.5,1.5 18.5,1.5 18.5,12.5 		"/>
    		<g>
    			<polyline fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
    				7.5,13.5 4.5,13.5 4.5,16.5 7.5,15.5 			"/>
    			<polyline fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
    				7.5,15.5 7.5,7 13.5,4.5 13.5,13.5 			"/>
    			<polyline fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
    				13.5,11.5 10.5,11.5 10.5,14.5 13.5,13.5 			"/>
    		</g>
    		<g>
    			<polygon fill="none" stroke={color} stroke-linejoin="round" stroke-miterlimit="10" points="12.5,16.75 16.5,14.5 20.5,16.75
    				20.5,21.25 16.5,23.5 12.5,21.25 			"/>
    			<g>

    					<line fill="none" stroke={color} stroke-linecap="round" stroke-miterlimit="10" x1="23.5" y1="23.179" x2="20.5" y2="21.252"/>
    			</g>
    		</g>
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
