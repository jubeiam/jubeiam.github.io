<template lang="pug">
	div
		select(@change="update")
			option(v-for="c in currency_list" :value="c" :selected="currency==c") {{ c }}
</template>

<script>
import { CURRENCY, CURRENCY_LIST } from '@/store/dashboard'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('dashboard')

export default {
	computed: {
		...mapState({
			currency_list (state) {
				return ['USD'].concat(state[CURRENCY_LIST]).sort((a, b) => a.localeCompare(b))
			}
			,currency: CURRENCY
		})
	}
	,methods: {
		update (e) {
			this.setCurrency(e.target.value)
		},
		...mapMutations({
			setCurrency: CURRENCY
		})
	}
}
</script>

<style lang="scss" scoped>
	@import '../../scss/dashboard-vars';

	div{
		min-width: 100px;
		align-self: center;
		text-align: center;
	}
	select{
		width: 100%;
		padding: 5px;
		border: $input-border;
		border-radius: $border-radius;
		color: $color-light;
		cursor: pointer;

		&:hover{
			color: $color;
		}
	}
</style>