<script>
	export let width = '200px';
	export let height = '200px';

	export let color = '#000000';

	let style = `width: ${width}; height: ${height}`;
</script>

<div {style}>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
    <g id="Black">
    	<g id="New_icons">
    		<g>
    			<g>
    				<polygon fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
    					1.5,22.5 3.5,16.5 19.5,0.5 23.5,4.5 7.5,20.5 				"/>

    					<line fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="17" y1="3" x2="21" y2="7"/>
    				<polyline fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
    					3.5,16.5 7.5,16.5 7.5,20.5 				"/>

    					<line fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="7.5" y1="16.5" x2="19" y2="5"/>
    			</g>

    				<line fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="0.5" y1="23.5" x2="1.5" y2="22.5"/>
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
