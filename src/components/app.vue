<style lang="scss">
@import '../scss/style';

.drawer a > div{
	$size: 32px;
	width: $size;
	height: $size;

	& > img {
		width: 100%;
	}
}
</style>


<template lang="pug">
#app
	transition(name="fade" mode="out-in")
		router-view
	drawer(:open='open', @close='open = false')
		router-link(to='/vivecard')
			div
				i.fa.fa-address-card
		router-link(to='/2048')
			div
				i.fa.fa-trophy
		router-link(to='/rx')
			div
				img(src="../assets/img/Rx_Icon.png")
		router-link(to='/ccdashboard/ranking')
			div
				img(src="../assets/img/standard_coin_full_color_M.png")

		router-link(to='/lottery')
			div
				img(src="")
</template>

<script>
import Drawer from '@/components/drawer.vue'
// import 'vue2-animate/dist/vue2-animate.css';


export default {
	components: {
		Drawer
	}
	,data() {
		return {
			open: false
		}
	}
	,methods:{
		toggledrawer: function(){
			this.open = !this.open
		}
	}
	,mounted() {
		this.$root.$on('toggle.explain-me', function (open) {
			if(open){
				this.$el.classList.add('explained')
			}else{
				this.$el.classList.remove('explained')
			}
		})
	}
}
</script>

