<template lang="pug">
	.explain-me
		div.opener
			.button(v-on:click="toggle")
				i.fa.fa-info-circle(v-if="!open")
				i.fa.fa-times(v-if="open")
		.content
			.md(v-if="content")
				markdown(:text="content")
</template>

<script>
import axios from 'axios-es6'
import Markdown from './markdown.vue'

export default {
	name: 'ExplainMe'
	,components: {
		Markdown
	}
	,props: ['article']
	,data() {
		return {
			open: false,
			content: '',
			loaded: ''
		}
	},
	methods: {
		toggle() {
			this.open = !this.open
			this.$root.$emit('toggle.explain-me', this.open)

			if(this.open && this.loaded != this.article) {
				this.loaded = this.article
				this.getArticle(this.article)
			}
		},
		getArticle(article) {
			axios.get(`doc/${article}.md`)
			.then((resp) => {
				this.content = resp.data
			})
		}
	},
	watch: {
		article: function(val) {
			this.getArticle(val)
		}
	}
}


</script>


<style lang="scss">
	.explained .explain-me{
		right: 0;
	}

	.explain-me{
		transition: all .3s ease;

		position: fixed;
		top: 0;
		right: -300px;
		bottom: 22px;
		width: 300px;

		.content{
			background-color: #f2f2f2;
			overflow-y: auto;
			overflow-x: hidden;
			height: 100%;
		}

		.button{
			$basec: #A3D7FF;
			$seconc: #29abe0;
			$thirdc: #0D6D93;
			$size: 40px;

			color: #666;
			font-size: 1.5em;
			border-radius: 10%;
			border: 1px solid #ccc;
			display: inline-block;
			cursor: pointer;
			padding: 5px;
			width: $size;
			height: $size;
			text-align: center;
			&:hover{
				background-color: #ddd;
			}
		}

		.md{
			font-size: 0.7em;
			padding: 10px;
		}

		pre{
			overflow: auto;
			background-color: white;
			padding: 2px;
		}

		.opener{
			left: -46px;
			top: 5px;
			position: absolute;
		}
	}


</style>

