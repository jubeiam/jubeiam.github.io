import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import App from '@/components/app.vue'
import moment from 'moment'
// import Twitch from '@/components/twitch/page.vue'
// import Quiz from '@/components/quiz/page.vue'

import InstallSw from './install-sw'

InstallSw()

Vue.prototype.$moment = moment

new Vue({
	el: '#app'
	,router
	,store
	,render: h => h(App)
})