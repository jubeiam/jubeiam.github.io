<template lang="pug">

	div(class="board clearfix")
		div
			h1 2048 Game
				span(class="over" v-if="over") over
		div(class="flex")
			div(class="newgame")
				bbutton(@click="newGame") new game
			div(class="scores")
				score(:v="current") score
				score(:v="best") best

		div(class="board-content clearfix")
			div(class="tiles-background")
				div(v-for="n in 16" :x="((n % 4) || 4) - 1" :y="Math.floor((n - 0.1) / 4)")
			div(class="tiles")
				tile(v-for="tile in tiles" :x="tile.x" :y="tile.y" :v="tile.v" :key="tile.id")


</template>

<script>
import TileComponent from './tile.vue'
import ScoreComponent from './score.vue'
import BtnComponent from './button.vue'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/throttleTime'

class Tile{

	constructor(x, y, v){
		this.x = x
		this.y = y
		this.v = v
	}
}


export default {
	name: 'board-2048'
	,components:{
		tile: TileComponent
		,score: ScoreComponent
		,bbutton: BtnComponent
	}
	,data: () => {
		return {
			current: 0
			,best: 0
			,keypress: null
			,tiles: []
			,over: false
		}
	}
	,methods: {
		newGame: function(){
			this.over = false

			this.current = 0

			this.tiles = []
			this.spawn2Tiles()

		}
		,spawnTiles: function(){
			let tile

			const slot = this.getEmptySlot()
			if(slot === false){
				this.over = true
				return false
			}

			tile = new Tile(slot.x, slot.y, 2)
			tile.id = Math.random()
			this.tiles.push(tile)
		}
		,spawn2Tiles: function(){
			this.spawnTiles()
			this.spawnTiles()
		}

		,getEmptySlot: function(){
			let x, y;

			let i = 0

			do {
				i++
				x = Math.floor(Math.random() * 4)
				y = Math.floor(Math.random() * 4)
			} while (!this.isAvaliableSlot(x, y) && i < 300);

			// when limit reached check if found
			if(!this.isAvaliableSlot(x, y)){
				return false
			}

			return {
				x:x
				,y:y
			};
		}

		,isAvaliableSlot: function(x, y){
			return this.getTileAtPos(x, y) === undefined
		}

		,getTileAtPos: function(x, y){
			let found
			this.tiles.forEach((item, i) =>{
				if(item.x == x && item.y == y){
					found = i
				}
			})
			return this.tiles[found]
		}

		,canMerge: function(a, b){
			return a.v == b.v
		}

		,stack: function(direction){
			// console.log('stack', direction)
			let deltaX = 0, deltaY = 0, sorting, what, factor, what2
			switch (direction) {
				case 38: // ^
					what = 'y'
					what2 = 'x'
					factor = -1
					deltaY = -1
					sorting = (a, b) => a.y - b.y
					break;
				case 39: // >
					what = 'x'
					what2 = 'y'
					factor = 1
					deltaX = 1
					sorting = (a, b) => a.x - b.x
					break;
				case 37: // <
					what = 'x'
					what2 = 'y'
					factor = -1
					deltaX = -1
					sorting = (a, b) => b.x - a.x
					break;
				case 40: // \/
					what = 'y'
					what2 = 'x'
					factor = 1
					deltaY = 1
					sorting = (a, b) => b.y - a.y
					break;
			}

			this.resetTiles()



			// this.tiles.forEach(item => item.processed = false)

			// TODO: sort
			// last row first

			const isValidPosition = x => x >= 0 && x < 4
			const toValid = x => x < 0 ? 0 : (x > 3 ? 3 : x)


			let i = 1.5 + (factor * 1.5)

			while(isValidPosition(i)){
				let j = 0
				while(isValidPosition(j)){

					this.tiles.forEach(item => {
						if(item[what] == i && item[what2] == j){
							let k = 0;
							while(k < 3){

								let x = toValid(item.x + deltaX * 1)
								let y = toValid(item.y + deltaY * 1)


								let found = this.getTileAtPos(x, y)


								if(found){
									if(found.processed === true){
										break;
									}else if(found !== item){
										let cm = this.canMerge(item, found)
										if(!cm){
											break
										}else{
											item.processed = true
											found.processed = true
										}
									}
								}


								item.x = x
								item.y = y

								k ++
							}

						}
					})

					j++
				}

				i = i - factor
			}

		}

		,resetTiles: function(){
			this.tiles.forEach(item => {
				item.processed = false
				item.todelete = false
				item.merger = null
				item.promised = false
			})
		}

		,combine: function(){

			this.tiles.forEach(item => {
				let found = this.getTileAtPos(item.x, item.y)

				if(found && found !== item && this.canMerge(item, found)){
					found.v += item.v
					item.todelete = true

					this.setCurrent(item.v)
				}
			})

			this.tiles = this.tiles.filter(item => !item.todelete)
		}

		,setCurrent: function(v){
			this.current += v
			if(this.current > this.best){
				this.best = this.current
				localStorage.setItem('board2048', this.best)
			}

		}


	}

	,mounted: function(){
		this.spawn2Tiles()

		let keypress = Observable.fromEvent(window, 'keyup')
			.throttleTime(251)
			.filter(item => item.ctrlKey === false)
			.filter(item => item.altKey === false)
			.map(item => item.keyCode)
			.filter(item => item <= 40 && item >= 37)


		this.keypress = keypress.subscribe(what => {
			if(this.over) return
			this.stack(what)

			setTimeout(() => {
				this.combine()
				this.spawn2Tiles()
			}, 250);

		})


		// todo use vuex
		this.best = localStorage.getItem('board2048') || 0
	}

	,destroyed: function(){
		this.keypress.unsubscribe()
	}



}
</script>


<style lang="scss" scoped>
	@import './../../scss/variables';

	.board{
		position: relative;
		padding: 15px;

		>div{
			margin: auto;
			width: 460px;
			position: relative;
			margin-bottom: 15px;
		}
	}

	.flex{
		display: flex;
		align-items: center;
	}

	.scores, .newgame{
		width: 50%;
	}

	.scores{
		text-align: right;
		.score{
			margin-right: 15px;

			&:last-child{
				margin-right: 0;
			}
		}
	}

	.over{
		color: #cc0000;
		padding-left: $dPadding;
		text-decoration: underline;
	}

	$size: 460px;
	.tiles-background, .tiles{
		position: absolute;
		top: 0;
		left: 0;

		width: $size;
		height: $size;


	}

	.tiles-background{
		background-color: #bbada0;
		border-radius: 2%;
	}

	.tiles-background, .tiles{
		$size: 20.8%;
		> div{
			position: absolute;
			margin: 2%;
			width: $size;
			height: $size;
			background-color: rgba(238, 228, 218, 0.35);
			border-radius: 6%;
		}
	}



	@for $i from 0 through 3{
		[x="#{$i}"]{
    		left: 25% * $i;
		}
		[y="#{$i}"]{
    		top: 25% * $i;
		}
	}


	$v: 2;
	$x: 51%;
	$step: (50/11);
	@while $v <= 2048{
		$x: $x - $step;

		.tile.shade-#{$v}{
			background-color: lighten(red, $x);
		}

		$v: $v * 2;
	}



</style>