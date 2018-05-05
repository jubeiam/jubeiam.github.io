<template lang="pug">
  div Chat&nbsp;
    Cntr(:value="messagesPerMin")
    | / min
    | chat mode
    div
      div(v-for="msg in messages" :key="msg.getTag('id')")
        span(:style="{color: msg.getTag('color')}") {{ msg.username }}
        span {{ msg.message }}
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { TmiMessage } from '../../service/tmi'
import Cntr from './Cntr'

const { mapState } = createNamespacedHelpers('lottery')

export default {
  props: {
    items: {
      validator: (v) => Array.isArray(v) && (!v.length || (v.length && v[0] instanceof TmiMessage))
    }
  },
  computed: {
    messagesPerMin() {
      const cmc = this.currentMessagesCount * 60 / this.currentMessagesInterval
      return cmc > this.currentMessagesPerMin ? cmc : this.currentMessagesPerMin
    },
    messages() {
      return [...this.chatMessages].reverse()
    },
    ...mapState([
      'currentMessagesPerMin',
      'currentMessagesCount',
      'currentMessagesInterval',
      'chatMessages'
    ])
  },
  components: {
    Cntr
  }
}
</script>
