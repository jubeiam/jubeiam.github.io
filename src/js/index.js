import Vue from 'vue'
import VueRouter from 'vue-router'

import Vivecard from './../components/vivecard.vue'
import Drawer from './../components/drawer.vue'
import Board from './../components/2048/board.vue'
// import Twitch from './../components/twitch/page.vue'
import Quiz from './../components/quiz/page.vue'


Vue.use(VueRouter)


const router = new VueRouter({
	routes: [
		{path: '/vivecard', component: Vivecard}
		,{path: '/2048', component: Board}
		// ,{path: '/twitch', component: Twitch}
		// ,{path: '/quiz', component: Quiz}
		,{path: '*', redirect: '/vivecard'}
	]
})

new Vue({
	el: '#bdy'
	,components: {
		Vivecard
		,Board
		,Drawer
	}
	,data:{
		open: false
	}
	,methods:{
		toggledrawer: function(){
			this.open = !this.open
		}
	}
	,router
})