<template lang="pug">
div.content
	div#front(:style="style" ref="front")
		div.hr
			div.txt
			h1 Leszek Stęczniewski
			h2 l.steczniewski (at) gmail.com

	explain-me(article="vivecard" @toggle="asdf")
</template>

<script>
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/throttleTime'
import ExplainMe from './explain-me.vue'

export default {
	name: 'vivecard'
	,components: {
		ExplainMe
	}
	,data: () => ({
		rotatex: 0
		,rotatey: 0
		,maxx: 45
		,maxy: 45
	})
	,computed:{
		style: function(){

			let f = Math.max(Math.abs(this.rotatex), Math.abs(this.rotatey))
			f = Math.pow(f, 1.2)

			return `box-shadow: ${this.rotatex}px ${this.rotatey}px ${f}px #93c54b;`
		}
	}
	,methods: {
		asdf (d) {
			console.log('asdf', d)
		}
	}
	,mounted: function() {

		let mp = Observable.fromEvent(window, 'mousemove')
			.throttleTime(100)
			.map(event => {
				let componentPosition = this.$refs.front.getBoundingClientRect()
				return {
					x: event.pageX / (componentPosition.left + componentPosition.width / 2)
					,y: event.pageY / (componentPosition.top + componentPosition.height / 2)
				}
			})
			.map(p => ({
				x: p.x * this.maxx - this.maxx
				,y: p.y * this.maxy - this.maxy
			}))


		this.mp = mp.subscribe(
			r => {
				this.rotatex = r.x * -1
				this.rotatey = r.y * -1
			}
		)

	}
	,destroyed: function(){
		this.mp.unsubscribe()
	}
}


</script>


<style lang="scss" scoped>
	.explained .content{
		margin-right: 325px;
	}
	.content{
		transition: all .3s ease;
		height: 100%;
		position: relative;
		display: flex;
		align-content: center;
		justify-content: center;
	}
	#front{
		font-size: 1.3em;
		color: #fafafa;
		transform-style: preserve-3d;
		transition-duration: .1s;
		margin: auto;
		background-color: #3e3f3a;
		border-radius: 1%;
		width: 500px;
		height: 260px;
		padding: 30px;
	}

	.txt{
		position: relative;
		top: 15px;
	}

	.hr{
		position: absolute;
		left: 0;
		top: 30px;
		border-top: 3px solid #29abe0;
		width: 100%;
	}

	h1, h2{
		text-align: center;
	}

	h2{
		color: #f8f5f0;
	}

</style>