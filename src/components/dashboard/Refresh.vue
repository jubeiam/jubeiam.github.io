<template lang="pug">
	div
		.btn(role="button")
			Icon(name="refresh" :spin="spin")

</template>

<script>
import 'vue-awesome/icons/refresh'
import Icon from 'vue-awesome/components/Icon'

export default {
	props: {
		spin: {
			type: Boolean
			,default: false
		}
	}
	,components: {
		Icon
	}
}
</script>

<style lang="scss" scoped>
	@import '../../scss/dashboard-vars';

	div{
		align-self: center;
		text-align: center;
	}
	.btn{
		position: relative;
		border: $input-border;
		border-radius: $border-radius;
		color: $color-lighten;
		padding: 5px;
		display: inline-block;
		cursor: pointer;

		&:hover{
			color: $color-light;
		}
	}

</style>