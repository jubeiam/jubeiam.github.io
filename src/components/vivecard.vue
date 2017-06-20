<template lang="pug">

	div(class='content')
		div(id='front' :style="style")
			div(class='hr')
			div(class='txt')
				h1 Leszek Stęczniewski
				h2 l.steczniewski (at) gmail.com



</template>

<script>

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'
// import 'rxjs/add/observable/interval'
// import 'rxjs/add/observable/zip'
// import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/throttleTime'

export default {
	name: 'vivecard'
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
			return `transform:rotateX(${this.rotatey}deg) rotateY(${this.rotatex}deg);`
		}
	}
	,mounted: function() {

		let mp = Observable.fromEvent(window, 'mousemove')
			// .map(event => {console.log(event); return event})
			.throttleTime(100)
			.map(event => ({
				x: event.pageX / window.innerWidth * 2
				,y: event.pageY / window.innerHeight * 2
			}))
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
	.content{
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
		height: 200px;
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