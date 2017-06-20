<template lang="pug">

	div(class="")
		input-ac(v-model="channel" :ac="hintChannels")
		div(@click="joinChannel" class="btn") join


</template>

<script>
import InputAcComponent from './../input-ac.vue'

// import 'axios'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'

// dendenmushi
const token = '1p3rcu2fz7det052uxgukihq2kah2n'


export default {
	name: 'twitch-join-channel'
	,components:{
		'input-ac': InputAcComponent
	}
	,data: () => ({
		channel: ''
		,ob: null
		,hintChannels: []
	})
	,watch:{
		channel: function(n, o){
			if(this.ob)
				this.ob.next(n)
		}

	}
	,methods:{
		joinChannel(){
			this.$emit('join', this.channel)
		}
	}
	,mounted(){
		this.value = Observable.create((observer) => {
			this.ob = observer

			return function unsubscribe() {

			};
		}).debounceTime(150)
		.filter(item => item.length > 2)
		.map(q => 'https://api.twitch.tv/kraken/search/channels?limit=3&query=' + encodeURI(q))
		.switchMap(url => axios.get(url, {
			headers:{
				'Accept': 'application/vnd.twitchtv.v5+json'
				,'Client-ID': token
			}
		}).then(response => {
			response.data.channels.sort((a, b) => b.followers - a.followers)
			return response.data
		}))



		this.value.subscribe(
			s => {
				this.filtredChannels = s.channels
				this.hintChannels = s.channels.map(c => c.name)
			}
		)

		// console.log(this.value)
	}
}
</script>


<style lang="scss">
	@import './../../scss/variables';


	.input-ac{
		display: inline-block;
	}

	.input-ac--opened{
		.input-ac__input{
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}
	}

	.input-ac__input{
		padding: 5px;
		border: 1px solid #e0e0e0;
		border-radius: 3px;
	}

	.input-ac__list{
		margin: 0;
		position: absolute;
		list-style: none;
		padding: 0;
		border: 1px solid #e0e0e0;
		border-bottom-left-radius: 3px;
		border-bottom-right-radius: 3px;
		width: 100%;
	}

	.input-ac__proposition{
		cursor: pointer;
		padding: 5px;

		&:hover{
			background-color: $cHover;
			color: $cFontInv;
		}
	}

	.btn{
		color: $cFontInv;
		padding: $dPadding*2;
		border-radius: $dPadding;
		display: inline-block;
		min-width: 100px;
		cursor: pointer;

		text-align: center;
		text-transform: uppercase;

		outline: none;
		background-color: $cBtn;

		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);

		&:hover{
			box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
			background-color: $cHover;
		}
	}
</style>