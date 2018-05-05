<template lang="pug">
	.grid
		.summary
			h1 {{ summary }}
		Options.options(:value="opts" @save="saveMainSettings" @startLottery="startLottery" @roll="roll" @reset="reset")
		Chat.chat
		Attendee.attendee

</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Chat from './Chat'
import Options from './Options'
import Attendee from './Attendee'

import { Tmi } from '../../service/tmi'

const { mapState, mapMutations, mapGetters, mapActions } = createNamespacedHelpers('lottery')

export default {
	data() {
		return {
			currentMessagesTimer: null
		}
	},
	computed: {
		opts() {
			return {
				oauth: this.oauth,
				username: this.username,
				channel: this.channel,
				keyword: this.keyword
			}
		},
		...mapState(['oauth', 'username', 'channel', 'attendee', 'currentMessagesCount', 'currentMessagesInterval', 'keyword', 'attendee']),
		...mapGetters(['summary'])
	},
	methods: {
		openConnection() {
			if (this.tmi) this.tmi.close()
			this.tmi = Tmi({
				username: this.username,
				password: this.oauth,
				channel: this.channel
			})

			const m$ = this.tmi.message$
				.filter((m) => [''].indexOf(m.getTag('user-type')) > -1)

			this.addAttendeFromStream(m$)
			this.addMessageFromStream(m$)
		},
		filterKeyword(s$) {
			return s$
		},
		addAttendeFromStream(s$) {
			s$
			.filter((m) => this.keyword ? m.message === this.keyword : true)
			.filter((m) => this.attendee.find((a) => a.username === m.username) === undefined) // unique
			.subscribe(
				m => this.addAttendeeFromMessage(m),
				err => console.error(err)
			)
		},
		addMessageFromStream(s$) {
			s$
			.subscribe(
				m => this.addChatMessage(m),
				err => console.error(err)
			)

		},
		saveMainSettings(opts) {
			this.saveCredentials(opts)
		},
		startStats() {
			if (this.currentMessagesTimer) {
				return
			}

			this.currentMessagesTimer = setInterval(() => {
				const mul = 60 / this.currentMessagesInterval
				this.setStats(this.currentMessagesCount * mul)
			}, this.currentMessagesInterval * 1000)
		},
		startLottery({keyword}) {
			this.reset()
			this.setKeyword(keyword)
		},
		getRandFromArray(arr) {
			const random = Math.floor(Math.random() * arr.length)

			return arr[random]
		},
		roll() {
			const found = this.getRandFromArray(this.attendee)

			// chance to rool from subs only

			this.addWonAttendee(found)
		},
		reset() {
			this.resetAttendee()
			this.resetChat()
		},
		...mapMutations([
			'addAttendeeFromMessage',
			'saveCredentials',
			'addChatMessage',
			'setStats',
			'resetAttendee',
			'setKeyword',
			'addWonAttendee',
			'resetChat'
		])
	},
	components: {
		Attendee,
		Chat,
		Options
	},
	created() {
		this.openConnection()
		this.startStats()
	},
	beforeDestroy() {
		this.tmi.close()
		clearInterval(this.currentMessagesTimer)
	}
}
</script>

<style lang="sass" scoped>
	.grid
		display: grid
		grid-template-columns: 1fr 1fr 1fr
		grid-column-gap: 16px
		grid-template-rows: auto
		grid-template-areas: "summary summary summary" "options chat attendee" "footer footer footer"

	.options
		grid-area: options

	.chat
		grid-area: chat

	.attendee
		grid-area: attendee

	.summary
		grid-area: summary


</style>


