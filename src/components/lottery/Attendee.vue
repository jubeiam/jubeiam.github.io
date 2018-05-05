<template lang="pug">
  div
    Cntr(:value="attendee.length")
    | + 12
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Cntr from './Cntr'
const { mapState } = createNamespacedHelpers('lottery')
export default {
  computed: {
    ...mapState(['attendee'])
  },
  components: {
    Cntr
  }
}
</script>
