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

    			<rect x="6.086" y="11.086" transform="matrix(0.7071 -0.7072 0.7072 0.7071 -6.6424 8.9656)" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" width="2.828" height="2.828">
						<animate attributeType="XML" attributeName="x" values="6.086;8;6.086" dur="1s" repeatCount="indefinite" begin="0s" />
						<animate attributeType="XML" attributeName="y" values="11.086;13;11.086" dur="1s" repeatCount="indefinite" begin="0s" />
					</rect>

    			<rect x="0.939" y="11.439" transform="matrix(0.707 -0.7072 0.7072 0.707 -8.2537 5.0765)" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" width="2.121" height="2.121">
						<animate attributeType="XML" attributeName="x" values="0.939;2;0.939" dur="1s" repeatCount="indefinite" begin=".5s" />
						<!-- <animate attributeType="XML" attributeName="y" values="11.439;13;11.439" dur="1s" repeatCount="indefinite" begin=".5s" /> -->
					</rect>

    			<rect x="19.939" y="11.439" transform="matrix(0.7072 -0.707 0.707 0.7072 -2.6887 18.5079)" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" width="2.121" height="2.121">
						<animate attributeType="XML" attributeName="x" values="19.939;21;19.939" dur="1s" repeatCount="indefinite" begin="1s" />
						<animate attributeType="XML" attributeName="y" values="11.439;13;11.439" dur="1s" repeatCount="indefinite" begin="1s" />
					</rect>

    			<rect x="12.379" y="10.379" transform="matrix(0.707 -0.7072 0.7072 0.707 -4.5917 13.9163)" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" width="4.243" height="4.243">
						<animate attributeType="XML" attributeName="x" values="12.379;14;12.379" dur="1s" repeatCount="indefinite" begin="1.5s" />
						<!-- <animate attributeType="XML" attributeName="y" values="10.379;12;10.379" dur="1s" repeatCount="indefinite" begin="1.5s" /> -->
					</rect>
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
