<style lang="scss" scoped>
	.item{
		flex: 1 1 auto;
		margin-right: 25px;
		margin-bottom: 25px;

		&:last-child{
			margin-right: 0;
		}
	}
</style>

<template lang="pug">
	div
		.name Name
		.buy Buy
		.flex.flex--between
			Card.item
				| {{ price }}
				span(slot="sub") Current price ({{ currency }})
				Icon(slot="icon" name="money" :scale="iconSize")
			Card.item
				| {{ articles }}
				span(slot="sub") Related articles
				Icon(slot="icon" name="file-text-o" :scale="iconSize")
			Card.item
				| {{ review }}
				span(slot="sub") Analitycs review
				Icon(slot="icon" name="user-o" :scale="iconSize")
			Card.item
				| {{ conversations }}
				span(slot="sub") Conversations
				Icon(slot="icon" name="comment-o" :scale="iconSize")

		CardCharts(:id="id")

</template>

<script>
import 'vue-awesome/icons/money'
import 'vue-awesome/icons/comment-o'
import 'vue-awesome/icons/file-text-o'
import 'vue-awesome/icons/user-o'
import Icon from 'vue-awesome/components/Icon'
import { CURRENCY } from '@/store/dashboard'
import { createNamespacedHelpers } from 'vuex'
import axios from 'axios-es6'
const { mapState, mapMutations } = createNamespacedHelpers('dashboard')


import Card from './Card'
import CardCharts from './CardCharts'

export default {
	props: {
		id: String
	}
	,data () {
		return {
			articles: 0
			,review: 0
			,conversations: 0
			,iconSize: 1.9
			,price: 0
		}
	}
	,components: {
		Card
		,Icon
		,CardCharts
	}
	,computed: {
		...mapState({
			currency: CURRENCY
		})
	}
	,methods: {
		getPrice () {
			axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${this.id}&tsyms=${this.currency}`)
			.then((response) => {
				this.price = response.data[this.currency]
			})
		}
	}
	,mounted () {
		this.articles = Math.floor(Math.random() * 100)
		this.review = Math.floor(Math.random() * 10)
		this.conversations = Math.floor(Math.random() * 100)
		this.getPrice()
	}
	,watch: {
		currency () {
			this.getPrice()
		}
	}
}
</script>
