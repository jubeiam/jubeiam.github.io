<template lang="pug">
transition-group(tag="ul" name="fade")
	li(v-for="i in items" :key="i.id") {{ i.item }}
</template>

<script>
export default {
	data() {
		return {
			items: []
		}
	}
	,methods: {
		push(item) {
			this.items.unshift({
				id: Math.random()
				,item
			})
			this.items = this.items.slice(0, 10)
		}
	}

}
</script>
