<style lang="scss" scoped>
	@import '../../scss/dashboard-vars';

	.container{
		overflow: auto;
		background-color: $bg-color;
		padding: 10px 15px;
	}

</style>

<template lang="pug">
	.container
		router-view
</template>

<script>
export default {

}
</script>
