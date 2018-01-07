export const CURRENCY = 'currency'
export const CURRENCY_LIST = 'currency-list'
export const QUERY = 'query'
export default {
	namespaced: true
	,state: {
		[CURRENCY_LIST]: ['AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'ZAR']
		,[CURRENCY]: 'USD'
		,[QUERY]: ''
	}
	,mutations: {
		[CURRENCY]: (state, payload) => {
			state[CURRENCY] = payload
		}
		,[QUERY]: (state, payload) => {
			state[QUERY] = payload
		}
	}
	// actions: { ... },
	// getters: { ... }

}