<style lang="scss" scoped>
	@import '../../scss/dashboard-vars';

	.currency-card{
		padding: 15px;
		border: 1px solid $border-color;
		background-color: $bg-color-lighten;
		min-width: 300px;
		border-radius: 5px;
	}

	.name,.rank{
		display: inline-block;
	}

	.name{
		font-weight: 600;
		font-size: 1.1rem;
	}

	.price{
		font-weight: 600;
		font-size: 1.7rem;
	}

	.short{
		width: 30px;
		font-weight: 300;
		font-size: .8rem;
		color: $color-light;
	}

	.updated{
		font-weight: 300;
		font-size: .8rem;
		color: $color-light;
		text-align: right;
		width: 100%;
	}

	.main{
		display: flex;
		justify-content: center;
		padding: 25px 25px;
	}

	.rank{
		font-weight: 300;
		margin-right: 3px;
		color: $color-lighten;
	}
	.rank:before{
		content: "["
	}
	.rank:after{
		content: "]"
	}
	.info{
		display: flex;
	}
	.h42{
		opacity: .5;
	}
	.h1{
		opacity: .2;
	}

</style>

<template lang="pug">
	.currency-card
		.title
			.rank {{ rank }}
			.name {{ name }}
		.main
			.price {{ price }}
			.short {{ symbol }}
		.info
			.h1(title="hourly")
				TrendIco(:value="h1" scale="0.7")
			.h42(title="daily")
				TrendIco(:value="h42" scale="0.7")
			.d7(title="weekly")
				TrendIco(:value="d7" scale="0.7")
			.updated {{ last_updated }}
</template>

<script>
import { CURRENCY } from '@/store/dashboard'
import TrendIco from './TrendIco'

export default {
	props: {
		value: Object
	}
	,components: {
		TrendIco
	}
	,computed: {
		name () {
			return this.value.name
		}
		,rank () {
			return this.value.rank
		}
		,symbol () {
			return this.value.symbol
		}
		,last_updated () {
			return this.$moment(this.value.last_updated * 1000).format('lll')
		}
		,price () {
			const c = this.currency

			if (c) {
				return this.value['price_' + (c.toLowerCase())]
			}

			return this.value.price_usd
		}
		,currency () {
			return this.$store.state.dashboard[CURRENCY]
		}
		,h1 () {
			return parseFloat(this.value.percent_change_1h)
		}
		,d7 () {
			return parseFloat(this.value.percent_change_7d)
		}
		,h42 () {
			return parseFloat(this.value.percent_change_24h)
		}
	}
}
</script>
