export default {
	namespaced: true,
	state: {
		oauth: '2kd40u048u143b5xi4xmciqmzaul7k',
		username: 'bloddust',
		channel: 'lirik',
		attendee: [],
		chatMessages: [],
		won: [],
		keyword: '',
		lang: 'en',
		currentMessagesCount: 0,
		currentMessagesPerMin: 0,
		currentMessagesTimer: null,
		currentMessagesTimerCycle: 0,
		currentMessagesInterval: 20
	},
	mutations: {
		addAttendeeFromMessage(state, payload) {
			const attendee = {}
			attendee.username = payload.username
			attendee.timestamp = parseFloat(payload.getTag('tmi-sent-ts'))
			attendee.subscriber = payload.getTag('subscriber') === '1'

			state.attendee.push(attendee)
		},
		addChatMessage(state, payload) {
			if (payload.message === state.keyword || !state.keyword) {
				state.chatMessages.push(payload)
			}
			const pos = state.chatMessages.length - 80
			if (pos > 0) {
				state.chatMessages = state.chatMessages.slice(pos)
			}
			state.currentMessagesCount++
		},
		saveCredentials(state, {oauth, username, channel}) {
			state.oauth = oauth
			state.username = username
			state.channel = channel
		},
		setStats(state, num) {
			state.currentMessagesPerMin = num
			state.currentMessagesCount = 0
		},
		resetAttendee(state) {
			state.attendee = []
		},
		resetChat(state) {
			state.chatMessages = []
		},
		setKeyword(state, word) {
			state.keyword = word
		},
		addWonAttendee(state, attendee) {
			state.won.push(attendee)
		}
	},
	getters: {
		summary: (state) => {
			let s = ''
			if (state.keyword) {
				s += state.keyword
			} else {
				s += 'Current users'
			}

			if (state.activePeriod) {
				s += ` active at least in ${state.activePeriod}[min]`
			}

			if (state.subLuck) {
				s += ` subscribers luck x${state.subLuck}`
			}

			return s
		}
	},
	actions: {
	}
}
