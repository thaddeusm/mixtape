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
  		<polyline fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="3.5,18.5
  			2.5,18.5 2.5,6.5 3.5,6.5 		"/>

  			<line fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="0.5" y1="17.5" x2="0.5" y2="7.5"/>
  		<polyline fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
  			19.5,18.5 20.5,18.5 20.5,6.5 19.5,6.5 		"/>

  			<line fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="22.5" y1="17.5" x2="22.5" y2="7.5"/>
  		<rect x="5.5" y="5.5" fill="none" stroke={color} stroke-linejoin="round" stroke-miterlimit="10" width="12" height="14"/>
  		<polyline fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
  			10.5,14.5 7.5,14.5 7.5,17.5 10.5,16.5 		"/>
  		<polyline fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
  			15.5,12.5 12.5,12.5 12.5,15.5 15.5,14.5 		"/>
  		<polyline fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
  			10.5,16.5 10.5,9.5 15.5,7.5 15.5,14.5 		"/>
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
