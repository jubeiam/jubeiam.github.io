<template lang="pug">

	div(class="score")
		div(class="label")
			slot
		div(class="value") {{ v }}
		<transition name="up">
			<div v-if="show" class="delta">+{{ delta }}</div>
		</transition>

</template>

<script>
export default {
	name: 'score-2048'
	,props: ['v']
	,data: () => (
		{
			delta: 0
			,show: false
			,prev: 0
		}
	)
	,watch:{
		v: function(n){
			if(n == 0) this.prev = 0 // when resets to 0 update prev also
			this.delta = n - this.prev

			if(this.delta <= 0) return // disable showing popup when lower or eq 0
			this.show = true

			setTimeout(() => {
				// this is where animation ends by fade out
				this.show = false // hide popup
				this.prev = n // and set prev value
			}, 0)
		}
	}
}
</script>


<style lang="scss" scoped>
	@import './../../scss/variables';

	.score{
		display: inline-block;
		color: $cFontInv;

		font-size: 2em;
		font-weight: 600;

		min-width: 50px;
		border-radius: 3px;

		padding: $dPadding $dPadding*2;
		text-align: center;
		background-color: $cBack;
		border-radius: $dPadding;

		position: relative;
	}

	.value{
		display: inline-block;
	}

	.label{
		color: $cFontDimmed;
		font-size: 0.3em;
		text-transform: uppercase;
	}

	.delta{
		position: absolute;
		top: $dPadding;
		left: $dPadding;
		right: $dPadding;
		text-shadow: 0 0 5px $cBorder;
	}

	.up-leave-active{
		transition: opacity .5s, top .5s;
	}

	.up-leave-to{
		opacity: 0;
		top: -10px;
	}

	.up-anter-active{
		transition: opacity .1s;
	}

	.up-leave, up-enter{
		opacity: 1;
	}

</style>