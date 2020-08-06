template lang="pug">
	.trend-ico
		template(v-if="value===0")
			Icon(name="minus" :scale="scale")
		template(v-if="value>0")
			Icon.up(name="arrow-up" :scale="scale")
		template(v-else)
			Icon.down(name="arrow-down" :scale="scale")
</template>

<script>
import 'vue-awesome/icons/arrow-down'
import 'vue-awesome/icons/arrow-up'
import 'vue-awesome/icons/minus'
import Icon from 'vue-awesome/components/Icon'

export default {
	props: {
		value: Number,
		scale: [String, Number]
	}
	,components: {
		Icon
	}
}
</script>

<style scoped>
.up{color: #00cc00}
.down{color: #cc0000}
</style>