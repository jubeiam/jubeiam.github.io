<template lang="pug">
	div
		transition-group.list.flex.flex--wrap(name="list" tag="div")
			Card(v-for="(curr, $index) in listFiltred" :key="curr.id" :value="curr" :style="{'--delay': $index}" @click.native="go(curr.symbol)")
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import axios from 'axios-es6'

import { CURRENCY, QUERY } from '@/store/dashboard'
import Card from './CurrCard'

const { mapState, mapMutations } = createNamespacedHelpers('dashboard')

export default {
	data () {
		return {
			list: []
		}
	}
	,computed: {
		listFiltred () {
			if (!this.query) {
				return this.list
			}

			const patt = new RegExp(this.query, 'i')
			return this.list.filter((c) => {
				return patt.test(c.name) || patt.test(c.symbol)
			})
		}
		,...mapState({
			currency: CURRENCY
			,query: QUERY
		})
	}
	,mounted () {
		this.getList()
  }
  ,components: {
	  Card
  }
  ,methods: {
	  getList () {
			axios.get(`https://api.coinmarketcap.com/v1/ticker/?convert=${this.currency}`)
			.then((response) => {
				this.list = response.data
			})
	  }
	  ,go (id) {
		  this.$router.push({
			  name: 'dh.currency',
			  params: {
				  id: id
			  }
		  })
	  }
  }
  ,watch: {
	  currency (n, o) {
			this.list = []

			this.$nextTick(() => {
				this.getList()
			})
	  }
  }
  ,beforeDestroy () {
	  this.list = []
  }
}
</script>

<style lang="scss" scoped>
	@import '../../scss/dashboard-vars';

	.list > * {
		margin-bottom: 5px;
		margin-right: 5px;
	}
</style>