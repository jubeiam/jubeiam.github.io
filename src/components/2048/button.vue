<template lang="pug">

	div(class="bbutton" @click="click")
		slot


</template>

<script>
export default {
	name: 'bbutton-2048'
	,methods:{
		click(){
			this.$emit('click')
		}
	}
}
</script>


<style lang="scss" scoped>
	@import './../../scss/variables';


	.bbutton{
		color: $cFontInv;
		padding: $dPadding*2;
		border-radius: $dPadding;
		display: inline-block;
		min-width: 100px;
		cursor: pointer;

		text-align: center;
		text-transform: uppercase;

		outline: none;
		background-color: $cBtn;

		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);

		&:hover{
			box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
			background-color: $cHover;
		}
	}

</style>