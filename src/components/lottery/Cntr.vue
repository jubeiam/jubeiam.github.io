<style scoped>
	.score{
		display: inline-block;
		position: relative;
		min-width: 35px;
		text-align: right;
	}

	.value{
		display: inline-block;
	}

	.delta{
		position: absolute;
		top: 0;
		right: 0;
		text-shadow: 0 0 5px grey;
	}

	.up-leave-active, .down-leave-active{
		transition: opacity .5s, top .5s;
	}

	.up-leave-to{
		opacity: 0;
		top: -20px;
	}

	.down-leave-to{
		opacity: 0;
		top: 20px;
	}

	.up-anter-active, .down-anter-active{
		transition: opacity .1s;
	}

	.up-leave, up-enter, .down-leave, down-enter{
		opacity: 1;
	}
</style>

<template lang="pug">
	div(class="score")
		div(class="value") {{ valueShadow }}
		<transition :name="transition">
			<div v-if="show" class="delta">{{ deltaSign }}{{ delta }}</div>
		</transition>
</template>

<script>
export default {
	props: {
		value: Number
	},
	data: () => (
		{
			delta: 0,
			show: false,
			prev: 0,
			transition: 'up',
			valueShadow: 0
		}
	),
	computed: {
		deltaSign() {
			return this.transition === 'up' ? '+' : '-'
		}
	},
	watch:{
		value(n) {
			if(n == 0) {// when resets to 0 update prev also
				this.prev = 0
				this.valueShadow = 0
			}

			clearTimeout(this.tValue)
			this.tValue = setTimeout(() => {
				this.delta = n - this.prev
				this.valueShadow = n

				this.transition = this.delta > 0 ? 'up' : 'down'
				this.show = true

				setTimeout(() => {
					// this is where animation ends by fade out
					this.show = false // hide popup
					this.prev = n // and set prev value
				}, 0)
			}, 350);


		}
	},
	beforeDestroy() {
		clearTimeout(this.tValue)
	}
}
</script>
