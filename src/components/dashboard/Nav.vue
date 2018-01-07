<style scoped lang="scss">
	@import '../../scss/dashboard-vars';

	.navc{
		background-color: $bg-color-lighten;
		border-right: 1px solid $border-color;
		border-bottom: 1px solid $border-color;
	}

	.group{
		color: $primary-dark;
	}

	.user{
		$size: 40px;
		height: $size + 10px;
		padding: 5px 0;
		display: flex;
		justify-content: center;

		.avatar{
			display: inline-block;
			border-radius: 50%;
			overflow: hidden;
			height: 100%;
			width: 40px;
			height: $size;
			width: $size;


			img{
				height: 100%;
			}
		}

		.name{
			display: inline-block;
			font-weight: 600;
   		margin-left: 5px;
			text-align: center;
			line-height: $size;
		}
	}
</style>

<template lang="pug">
	.navc

		.user
			template(v-if="user")
				.avatar
					img(:src="user.picture.thumbnail")
				.name {{ user.name.first }} {{ user.name.last }}

		.group Discover
		ul
			li
				router-link(:to="{name: 'dh.ranking'}")
					Icon(name="line-chart")
					| Ranking
			li
				router-link(:to="{name: 'dh.settings'}")
					Icon(name="cog")
					| Settings

		.group Favorites
		ul
			li(v-for="f in fav")


</template>

<script>
import 'vue-awesome/icons/line-chart'
import 'vue-awesome/icons/cog'
import Icon from 'vue-awesome/components/Icon'
import axios from 'axios-es6'

export default {
  data () {
    return {
		fav: [],
		user: null
    }
  }
  ,components: {
    Icon
  }
  ,created () {
	  axios.get('https://randomuser.me/api?seed=foobaz')
	  .then((response) => {
		  this.user = response.data.results[0]
	  })
  }
}
</script>
