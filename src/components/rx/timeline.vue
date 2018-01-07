<style scoped>
.line{
	height: 2px;
	background-color: black;
	margin-top: 8px;
}
.timeline > * {
	flex: 1 1 auto;
}
.timeline{
	display: flex;
	position: relative;
}
.mid{
	width: 100%;
	position: relative;
}

.slot{
	position: absolute;
	top: 0;
	left: 0;
	right: 10px;
	padding-right: 10px;
	height: 10px;
}

.l100{
	left: 100%;
	opacity: 0;
}

.mte-enter-active{
	transition: left 2s linear;
	opacity: 1;
}

.mte-enter{
	left: 0;
}

.mte-enter-to{
	left: 100%;
}




</style>



<template lang="pug">
	div.timeline
		div
			i.fa.fa-angle-right
		.mid
			.line
			.slot
				transition-group(name="mte")
					timelineitem.l100(v-for="t in items" :title="t.title" :key="t.id")
		div
			i.fa.fa-angle-right
</template>

<script>
import timelineitem from './timelineitem'

export default {
	data() {
		return {
			items: []
		}
	}
	,methods: {
		push(item) {
			const ti = {
				id: Math.random(),
				title: item,
				left: 0
			}
			this.items.push(ti)

			setTimeout(() => {
				this.items = this.items.filter((item) => item.id !== ti.id)
			}, 2000)

		}
	}
	,mounted() {
	}
	,beforeDestroy() {
	}
	,components: {
		timelineitem
	}
}
</script>
