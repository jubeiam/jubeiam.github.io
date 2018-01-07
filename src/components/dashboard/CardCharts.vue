<style lang="scss" scoped>
	@import '../../scss/dashboard-vars';

	.cart-chart{
		padding: 25px;
		background-color: $bg-color-lighten;
		border-radius: $border-radius;
		border: 1px solid $border-color;
	}

	ul{
		list-style: none;
	}

	li{
		display: inline-block;
		font-weight: 500;
		font-size: 0.9rem;
		margin-right: 15px;
		text-transform: capitalize;
		cursor: pointer;
		color: $color-lighten;

		&:last-child{
			margin-right: 0;
		}

		&.active{
			border-bottom: 2px solid $primary;
			color: $color;
		}
	}

	.switcher{
		text-align: center;
	}

</style>

<style lang="scss">
	@import '../../scss/dashboard-vars';

	#linear{
		.ct-series-a .ct-line{
			stroke: $primary;
		}

		.ct-series-b .ct-line{
			stroke: $secondary;
		}

		.ct-series-c .ct-line{
			stroke: #00cc00;
			opacity: 0.2;
			stroke-dasharray: 15, 5;
			stroke-width: 2px;
		}

		.ct-series-d .ct-line{
			stroke: #cc0000;
			opacity: 0.2;
			stroke-dasharray: 15, 5;
			stroke-width: 2px;
		}
	}
</style>


<template lang="pug">
	.cart-chart
		.switcher
			ul
				li.daily(@click="draw('daily')" :class="{active: mode=='daily'}") daily
				li.weekly(@click="draw('weekly')" :class="{active: mode=='weekly'}") weekly
				li.monthly(@click="draw('monthly')" :class="{active: mode=='monthly'}") monthly
		#linear.ct-major-tenth(ref="linear")
		.advise(ref="advise")
</template>

<script>
import 'chartist/dist/chartist.css'
import Chartist from 'chartist'
import axios from 'axios-es6'
import { CURRENCY } from '@/store/dashboard'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('dashboard')

// https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG
export default {
	props: {
		id: String
	}
	,data () {
		return {
			mode: 'daily'
		}
	}
	,methods: {
		getDaily () {
			axios.get(`https://min-api.cryptocompare.com/data/histominute?fsym=${this.id}&tsym=${this.currency}&limit=10&aggregate=30&e=CCCAGG`)
			.then((response) => {
				const data = {
					labels: []
					,series: []
				}

				data.labels = response.data.Data.map((row) => this.$moment(row.time * 1000).format('LT'))
				data.series[0] = response.data.Data.map((row) => row.open)
				data.series[1] = response.data.Data.map((row) => row.close)
				data.series[2] = response.data.Data.map((row) => row.high)
				data.series[3] = response.data.Data.map((row) => row.low)

				this.line.update(data, null, true)
			})
		}
		,getWeekly () {
			axios.get(`https://min-api.cryptocompare.com/data/histohour?fsym=${this.id}&tsym=${this.currency}&limit=10&aggregate=20&e=CCCAGG`)
			.then((response) => {
				const data = {
					labels: []
					,series: []
				}

				data.labels = response.data.Data.map((row) => this.$moment(row.time * 1000).format('D MMM'))
				data.series[0] = response.data.Data.map((row) => row.open)
				data.series[1] = response.data.Data.map((row) => row.close)
				data.series[2] = response.data.Data.map((row) => row.high)
				data.series[3] = response.data.Data.map((row) => row.low)

				this.line.update(data, null, true)
			})
		}
		,getMonthly () {
			axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${this.id}&tsym=${this.currency}&limit=15&aggregate=20&e=CCCAGG`)
			.then((response) => {
				const data = {
					labels: []
					,series: []
				}

				data.labels = response.data.Data.map((row) => this.$moment(row.time * 1000).format('D MMM'))
				data.series[0] = response.data.Data.map((row) => row.open)
				data.series[1] = response.data.Data.map((row) => row.close)
				data.series[2] = response.data.Data.map((row) => row.high)
				data.series[3] = response.data.Data.map((row) => row.low)

				this.line.update(data, null, true)
			})
		}
		,draw (type) {
			switch (type) {
				case 'daily':
					this.getDaily()
					this.mode = 'daily'
					break
				case 'weekly':
					this.getWeekly()
					this.mode = 'weekly'
					break
				case 'monthly':
					this.getMonthly()
					this.mode = 'monthly'
					break
				default:
					this.getDaily()
					this.mode = 'daily'
					break
			}
		}
	}
	,computed: {
		...mapState({
			currency: CURRENCY
		})
	}
	,mounted () {
		this.draw()

		this.line = new Chartist.Line(
			'#linear',
			{labels: [], series: []},
			{
				showPoint: false
			}
		)
	}
	,watch: {
		currency () {
			this.draw(this.mode)
		}
	}
}
</script>
