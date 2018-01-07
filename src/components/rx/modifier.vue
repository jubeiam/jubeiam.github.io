<template lang="pug">
div
	textarea(ref="txt") {{value}}
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/lib/codemirror.css'

export default {
	props: ['value']
	,mounted() {
		this.code = CodeMirror.fromTextArea(this.$refs.txt, {
			lineNumbers: true
			,mode: "javascript"
			,indentUnit: 4
			,indentWithTabs: true
		})

		this.code.on('change', (e, c) => {
			this.$emit('input', e.getValue())
		})
	}
	,watch: {
		value(n) {
			if (n != this.code.getValue()) {
				this.code.setValue(n)
			}
		}
	}
}
</script>
