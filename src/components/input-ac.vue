<template lang="pug">

div(:class="cClass")
	input(ref="input" :value="cValue" class="input-ac__input" @keyup="onKey($event)")
	transition(name="ac__list--toggle")
		ul(v-if="!pause" class="input-ac__list")
			li(v-for="c in ac" @click="setCompleted(c)" class="input-ac__proposition") {{c}}


</template>

<script>
export default {
	name: 'input-ac'
	,data: () => ({
		completed: ''
		,val: ''
		,accepted: false
		,pause: false
	})
	,props: {
		value: {
			type: String,
			default: ''
		}
		,ac:{
			type: Array
		}
	}
	,computed: {
		cValue(){
			return this.completed || this.value
		}
		,cClass(){
			return 'input-ac' + (this.pause?'':' input-ac--opened')
		}
	}
	,watch: {
		ac(n, o){
			let part
			if(n.length == 0 || this.pause){
				return
			}

			this.completed = n[0]
			part = this.getPart()
			this.selectPart(part)
		}
	}
	,methods:{
		onKey(event){
			const value = event.target.value

			if(event.key == 'Backspace'){
				this.pause = true
				this.val = value
				this.completed = ''
				this.$emit('input', value)
			}else if(event.key == 'Tab'){
				event.preventDefault()
				event.stopPropagation()
			}else if(event.key == 'ArrowDown'){
				event.preventDefault()
				event.stopPropagation()
			}else if(event.key == 'ArrowUp'){
				event.preventDefault()
				event.stopPropagation()
			}else if(event.key == 'Enter'){
				this.acceptCompleted()
			}else{
				this.updateValue(event.target.value)
			}

		}
		,updateValue(value){
			let part
			this.val = value
			this.pause = false

			part = this.getPart()
			this.selectPart(part)

			this.$emit('input', value)
		}
		,acceptCompleted(){
			this.updateValue(this.completed)
			this.pause = true
			this.removeSelection()
		}
		,setCompleted(v){
			this.completed = v
			this.acceptCompleted()
		}
		,selectPart(part){
			if(!part) return
			if(this.pause) return

			setTimeout(() => {
				let v = this.$refs.input.value
				if(this.val.length != v.length){
					this.$refs.input.setSelectionRange(this.val.length, v.length)
				}
			}, 0)
		}
		,removeSelection(){
			setTimeout(() => {
				let v = this.$refs.input.value
				this.$refs.input.setSelectionRange(v.length, v.length)
			}, 0)
		}
		,getPart(){
			return this.completed.replace(new RegExp('^'+ this.val), '')
		}

	}
}
</script>

<style lang="scss">

.input-ac{
	position: relative;
}

.ac__list--toggle-enter-active, .ac__list--toggle-leave-active {
  transition: opacity .1s
}
.ac__list--toggle-enter, .ac__list--toggle-leave-to{
  opacity: 0
}

</style>