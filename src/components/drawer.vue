<template lang="pug">

	div(:class="classComputed")

		transition(name="back")
			div(class="back-drop" v-if="open" @click="close()")


		div(class="container" @click="show()")

			div(class="bar" @click.stop="toggle()")
				div(class="arrow")
					i(class="fa fa-angle-up" v-if="!open")
					i(class="fa fa-angle-down" v-if="open")

			transition(name="body")
				div(class="content" @click.stop="close()" v-if="open")
					slot


</template>

<script>
export default {
	name: 'Drawer'
	,data: () => ({
		open: false
	})
	,computed:{
		classComputed: function(){
			if(this.open === true){
				return 'drawer drawer--open'
            }

			return 'drawer drawer--closed'
		}
	}
	,methods: {
		toggle: function(){
			this.open = !this.open
		}
		,show: function(){
			this.open = true
		}
		,close: function(){
			this.open = false
		}
	}
}
</script>


<style lang="scss">
.drawer{
	.back-drop{
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: rgba(0,0,0,0.5);
		z-index: 1024;
	}


	.container{
		z-index: 2048;
		position: fixed;
		bottom: 0;
		width: 100%;
	}


	.bar{
		cursor: pointer;
		position: relative;
		background-color: #f0f0f0;
		border-top: 1px solid #e2e2e2;

		.arrow{
			background-color: #f0f0f0;
			margin: auto;
			position: relative;
			top: -10px;
			width: 40px;
			border-top: 1px solid #e2e2e2;
			text-align: center;
			border-radius: 50%;
		}
	}


	.content{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 90px;
		background-color: white;


		a{
			color: #1a97de;
			font-size: 30px;
			padding: 10px;
			margin: 10px;
			border-radius: 4px;

			&.router-link-active{
				background-color: #f0f0f0;
			}

			&:hover{
				background-color: #e2e2e2;
			}
		}
	}


	.back-enter-active, .back-leave-active {
		transition: opacity .5s;
	}
	.back-enter, .back-leave-to /* .fade-leave-active in <2.1.8 */ {
		opacity: 0;
	}

	.body-enter-active, .body-leave-active {
		transition: opacity .2s, height .2s;
	}
	.body-enter, .body-leave-to /* .fade-leave-active in <2.1.8 */ {
		opacity: 0;
		height: 0;
	}


}
</style>