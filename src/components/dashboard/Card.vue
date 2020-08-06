<template lang="pug">
	.card
		.icon
			slot(name="icon")
		.flex.flex--column
			.value
				slot
			.sub
				slot(name="sub")
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
	@import '../../scss/dashboard-vars';

	.card{
		padding: 25px;
		background-color: $bg-color-lighten;
		border-radius: $border-radius;
		border: 1px solid $border-color;
		display: flex;
	}

	.value{
		font-size: 2rem;
		grid-area: value;
	}

	.sub{
		grid-area: sub;
		font-size: 0.7rem;
		color: $color-light;
	}

	.icon{
		grid-area: icon;
		color: $color-lighten;
		margin-right: 10px;
	}


</style>