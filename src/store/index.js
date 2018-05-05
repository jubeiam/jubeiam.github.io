import Vue from 'vue'
import Vuex from 'vuex'
import dashboard from './dashboard'
import lottery from './lottery'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		dashboard,
		lottery
	}
})