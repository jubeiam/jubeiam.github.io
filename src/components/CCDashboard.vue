<template lang="pug">
	.dashboard
		Headerc.grid-header
		Navigation.grid-nav
		Container.grid-container
		Footerc.grid-footer
</template>

<script>
import Headerc from './dashboard/Header.vue'
import Navigation from './dashboard/Nav.vue'
import Footerc from './dashboard/Footer.vue'
import Container from './dashboard/Container.vue'



export default {
	components: {
		Headerc,
		Navigation,
		Footerc,
		Container
	}
}
</script>

<style scoped lang="scss">
	@import '../scss/dashboard-vars';

	.grid-header{
		grid-area: header;
	}
	.grid-nav{
		grid-area: nav;
	}
	.grid-container{
		grid-area: container;
	}
	.grid-footer{
		grid-area: footer;
	}
	.dashboard{
		height: 100vh;
		overflow: hidden;
		display: grid;
		grid-template-columns: 250px auto;
		grid-template-rows: $header-height auto 50px 30px;
		grid-template-areas:
			"nav header header header"
			"nav container container container"
			"nav footer footer footer";
	}
</style>