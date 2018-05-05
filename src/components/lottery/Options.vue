<template lang="pug">
	div
		h2 Options
		div
			.control
				label Oauth
					input(type="text" maxlength="255" v-model="oauth")
			.control
				label Twitch user name
					input(type="text" maxlength="255" v-model="username")
			.control
				label Channel
					input(type="text" maxlength="255" v-model="channel")
			button.btn(@click="save") Save

		.control
			label Keyword
				input(type="text" maxlength="32" v-model="keyword")
		.control
			label Active period
				input(type="number" min="0" max="600" v-model="activePeriod")
				| minutes

		.control
			label Subscribers luck
				input(type="number" min="0" max="1000" v-model="subLuck")
				| x



		div
			button(@click="startLottery") save
			button(@click="roll") roll
			button(@click="resetAttendes") reset

</template>

<script>
export default {
	props: {
		value: Object
	},
	data() {
		return {
			keyword: '',
			activePeriod: 0,
			subLuck: 0,
			username: '',
			oauth: '',
			channel: ''
		}
	},
	methods: {
		resetAttendes() {
			this.$emit('reset')
		},
		roll() {
			this.$emit('roll')
		},
		save() {
			this.$emit('save', {
				oauth: this.oauth,
				username: this.username,
				channel: this.channel
			})
		},
		startLottery() {
			this.$emit('startLottery', {
				keyword: this.keyword
			})
		}
	},
	mounted() {
		this.oauth = this.value.oauth
		this.username = this.value.username
		this.channel = this.value.channel
		this.keyword = this.value.keyword
	}
}
</script>
