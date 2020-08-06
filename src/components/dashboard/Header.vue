<template lang="pug">
	.headerc
		Search.p80
		CurrencySel.p10
		Refresh.p10
</template>

<script>
import CurrencySel from './CurrencySel'
import Search from './Search'
import Refresh from './Refresh'


export default {
	components: {
		CurrencySel
		,Refresh
		,Search
	}
}
</script>

<style lang="scss" scoped>
	@import '../../scss/dashboard-vars';

	.headerc{
		background-color: $bg-color-lighten;
		display: flex;
		padding: 5px;
		justify-content: space-between;
	}

	.p10{
		width: 8%;
	}
	.p80{
		width: 78%;
	}
</style>