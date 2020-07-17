<script>
	
</script>

<div class="container">
	<section id="tape">
		<aside id="leftSpool">
			<h1>X</h1>
		</aside>
		<aside id="rightSpool">
			<h1>X</h1>
		</aside>
	</section>
</div>

<style>
	@media screen and (max-width: 450px) {
		#tape {
			width: 18rem;
			height: 11rem;
		}
	}

	@media screen and (min-width: 451px) and (max-width: 800px) {
		#tape {
			width: 26rem;
			height: 16rem;
		}
	}

	@media screen and (min-width: 801px) {
		#tape {
			width: 28rem;
			height: 17rem;
		}
	}

	.container {
		box-sizing: content-box;
	}

	#tape {
		border: .1rem solid black;
		border-radius: .1rem;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr auto 1fr auto 1fr;
		grid-template-areas: ". left . right .";
		align-items: center;
		justify-content: center;
	}

	aside {
		width: 4rem;
		height: 4rem;
		border-radius: 4rem;
		background: white;
		text-align: center;
	}

	#leftSpool {
		border: .5rem solid black;		
		grid-area: left;
	}

	#rightSpool {
		border: 2rem solid black;
		background: white;
		grid-area: right;
	}

	h1 {
		display: inline-block;
	}
</style>