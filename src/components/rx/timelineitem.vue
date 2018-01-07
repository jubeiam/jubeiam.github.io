<style lang="sass" scoped>
.item
	$size: 10px
	width: $size
	height: $size
	border-radius: 50%
	margin-top: 4px
	position: absolute
	top: 0
</style>


<template lang="pug">
  div.item(:style="{'background-color': color}")

</template>

<script>
export default {
	props: ['title']
	,computed: {
		color() {
			switch (this.title) {
				case 'r':
					return 'red'
				case 'g':
					return 'green'
				case 'b':
					return 'blue'
			}
		}
	}
}
</script>
