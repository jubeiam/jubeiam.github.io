<template lang="pug">
	.search
		.relative
			input(v-model.trim="query" @input="onChange")
			Icon.icon(name="search")
</template>

<script>
import 'vue-awesome/icons/search'
import Icon from 'vue-awesome/components/Icon'

import { QUERY } from '@/store/dashboard'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('dashboard')

export default {
	data () {
		return {
			query: ''
		}
	}
	,components: {
		Icon
	}
	,methods: {
		onChange () {
			this.$emit('input', this.query)
			this.setQuery(this.query)
		}
		,...mapMutations({
			setQuery: QUERY
		})
	}
}
</script>

<style lang="scss" scoped>
	@import '../../scss/dashboard-vars';

	.search{
		min-width: 250px;
		position: relative;
		align-self: center;
	}

	input{
		outline: 0;
		width: 100%;
		padding: 5px;
		padding-left: 25px;
		border: $input-border;
		border-radius: $border-radius;
		color: $color;
	}

	.icon{
		position: absolute;
		left: 5px;
		top: 6px;
		color: $color-lighten;
	}

	input:focus + .icon{
		color: $color-light;
	}

</style>