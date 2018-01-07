import DashboardMain from '@/components/CCDashboard.vue'
import RankingMain from '@/components/dashboard/RankingMain'
import CurrencyMain from '@/components/dashboard/CurrencyMain'
import SettingsMain from '@/components/dashboard/SettingsMain'

export default {
	path: '/ccdashboard'
	,component: DashboardMain
	,children: [
		{
			path: 'ranking'
			,name: 'dh.ranking'
			,component: RankingMain
		} ,{
			path: 'crypto/:id'
			,name: 'dh.currency'
			,component: CurrencyMain
			,props: true
		} ,{
			path: 'settings'
			,name: 'dh.settings'
			,component: SettingsMain
		}
	]
}