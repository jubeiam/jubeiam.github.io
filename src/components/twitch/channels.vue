<template lang="pug">

	div(class="channels")
		div(v-for="c in channels" @click="partChannel(c)") {{c}}
</template>

<script>
export default {
	name: 'twitch-channels'
	,props:['channels']
	,methods:{
		partChannel(c){
			this.$emit('part', c)
		}
	}
}
</script>


<style lang="scss" scoped>
	@import './../../scss/variables';

</style>