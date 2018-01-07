<template lang="pug">
	div(v-html="compiled")
</template>

<script>
import marked from 'marked'
// import SyntaxHighlighter, {registerBrush} from 'syntaxhighlighter';
// import JavaScriptBrush from 'brush-javascript'
import 'prismjs'
import 'prismjs/components/prism-pug'
import 'prismjs/components/prism-sass'



export default {
	name: 'Markdown',
	props: {
		text: String
	},
	computed: {
		compiled () {
			const md = marked(this.text)
			return md
			return Prism.highlight('const a = "foo"', Prism.languages.javascript)
		}
	},
	mounted () {
		marked.setOptions({
			tables: true,
			sanitize: true,
			highlight: function (code, lang) {
				return Prism.highlight(code, Prism.languages[lang])
			}
		})
	}
}
</script>


<style lang="scss">
	@import 'node_modules/prismjs/themes/prism';
</style>