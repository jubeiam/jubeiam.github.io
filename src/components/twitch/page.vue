<template lang="pug">

	div(class="container")
		joinChannel(@join="joinChannel")

		div(class="chat-container")
			div(class="channels-wrapper")
				channels(:channels="channels" @part="partChannel")


			div(class="chat-wrapper")
				chat()
				ol
					li(v-for="m in chm") {{ m.message }}


</template>

<script>
import Vue from 'vue'
import ChannelsComponent from './channels.vue'
import ChatComponent from './chat.vue'
import JoinChannelComponent from './joinChannel.vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
	,limit: 25
	,messages: []
	,users: {}
	,channels: ['#lirik']
	,whispers: []
  }
  ,mutations: {
    user(state, {userstate}){
		state.users[userstate['user-id']] = userstate
	}
	,message(state, payload){
		if(state.messages.length >= state.limit){
			state.messages.splice(0, state.messages.length - state.limit + 1)
		}

		state.messages.push(payload)
	}
	,addChannel(state, {channel}){
		const pos = state.channels.indexOf(channel)
		if(pos == -1){
			state.channels.push(channel)
		}
	}
	,partChannel(state, {channel}){
		const pos = state.channels.indexOf(channel)
		if(pos > -1){
			state.channels.splice(pos, 1)
		}
	}
  }
  ,actions: {
	newChatMessage({commit, state}, {userstate, message, channel}){
		commit('user', {userstate})
		commit('message', {
			message
			,channel
			,'user-id': userstate['user-id']
		})
	}
  }
  ,getters: {
	  messagesInChannel: (state, getters) => (channel) => {
		  return state.messages.filter(item => item.channel == channel)
	  }
  }
})


const client = new tmi.client({
    identity: {
        username: "bloddust",
        password: "oauth:jsjyhxf7jaa0rkt4qviizzb0vgkc8n"
    }
});

// Connect the client to the server..
client.connect();

client.on("chat", function (channel, userstate, message, self) {
    // Don't listen to my own messages..
    if (self) return

	store.dispatch('newChatMessage', {
		channel
		,userstate
		,message
	})
    // Do your stuff.
});

client.on("join", function (channel, username, self) {
    // Don't listen to my own messages..
    // if (!self) return

	store.commit('addChannel', {channel})
    // Do your stuff.
});

client.on("part", function (channel, username, self) {
    // Don't listen to my own messages..
    if (!self) return

	store.commit('partChannel', {channel})
    // Do your stuff.
});


export default {
	name: 'twitch-page'
	,store
	,components:{
		channels: ChannelsComponent
		,chat: ChatComponent
		,joinChannel: JoinChannelComponent
	}
	,computed:{
		chm(){
			return this.$store.getters.messagesInChannel('#lirik')
		}
		,channels(){
			return this.$store.state.channels
		}
	}
	,methods:{
		add(){
			this.$store.commit('increment')
		}
		,joinChannel(name){
			client.join(name)
		}
		,partChannel(name){
			client.part(name)
		}
	}
}
</script>


<style lang="scss" scoped>
	@import './../../scss/variables';

	.chat-container{
		margin: auto;
		width: 600px;
		border: 1px solid red;
	}

	.channels-wrapper{
		float: left;
		width: 35%;
		background-color: $cPrimary;
	}

</style>