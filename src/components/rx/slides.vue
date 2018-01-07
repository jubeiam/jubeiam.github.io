<style scoped>
.slides{
	width: 100%;
	margin: auto;
	background-color: #fafafa;
	padding: 15px;
	font-size: 24px
}

@media screen and (min-width: 780px){
	.slides{
		width: 600px;
	}
}

@media screen and (min-width: 1024px){
	.slides{
		width: 800px;
	}
}
</style>

<template lang="pug">
	div.slides
		slide(v-if="id=='1'")
			div A
		slide(v-if="id=='2'")
			board(modifier="subject.filter((n) => n != 'r')")
		slide(v-if="id=='3'")
			board(modifier="subject.map((n) => n.toUpperCase())")
		slide(v-if="id=='4'")
			board(modifier="subject.debounceTime(250).map((n) => n.toUpperCase())")

		div
			input(type="number" v-model="index" @input="go" min="1")
</template>

<script>
import slide from './slide'
import board from './board'

export default {
	props: {
		id: {
			type: String,
			default: '1'
		}
	}
	,data() {
		return {
			index: this.id
		}
	}
	,components: {
		slide,
		board
	}
	,methods: {
		go() {
			console.log('GO', this.index)
			this.$router.push({name: 'rxslides', params: {id: this.index}})
		}
	}

}
</script>
