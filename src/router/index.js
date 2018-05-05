import Vue from 'vue'
import VueRouter from 'vue-router'
import Vivecard from '@/components/vivecard.vue'
import Board from '@/components/2048/board.vue'
import RxSlides from '@/components/rx/slides.vue'
import dashboard from './dashboard'
import LotteryMain from '@/components/lottery/Main'

Vue.use(VueRouter)

export default new VueRouter({
	routes: [
		{path: '/vivecard', component: Vivecard},
		{path: '/lottery', component: LotteryMain}
		,{path: '/2048', component: Board}
		,{path: '/rx', component: RxSlides}
		,{path: '/rx/:id', component: RxSlides, props: true, name: 'rxslides'}
		,dashboard
		,{path: '*', redirect: '/vivecard'}
	]
})