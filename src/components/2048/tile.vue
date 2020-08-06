<template lang="pug">
	div(class="tile" :x="x" :y="y" :class="className")
		div(class="value") {{ v }}
</template>

<script>
export default {
	name: 'tile-2048'
	,props: ['x', 'y', 'v']
	,computed:{
		className: function(){
			return 'shade-' + this.v
		}
	}
}
</script>


<style lang="scss" scoped>


	.tile{
		position: relative;
		text-align: center;
		transition-duration: 250ms;
	}

	.value{
		display: inline-block;
		font-size: 37px;
		color: black;
		font-weight: bold;
		line-height: 96px;
	}

</style>