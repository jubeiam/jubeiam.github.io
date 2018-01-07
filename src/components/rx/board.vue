<template lang="pug">
  div
    div.d-flex.space-around
      drum(@click.native="addR()" red)
      drum(@click.native="addG()" green)
      drum(@click.native="addB()" blue)
    timeline(ref="t1")

    modifier(v-model="mod")


    timeline(ref="t2")
    top10(ref="top10")

</template>

<script>
import timeline from './timeline'
import drum from './drum'
import modifier from './modifier'
import top10 from './top10'
import rx from 'rxjs'

export default {
  props: {
    modifier: String
  },
  data() {
    return {
      mod: ''
    }
  }
  ,components: {
    timeline
    ,drum
    ,modifier
    ,top10
  }
  ,methods: {
    addR() {
      this.$refs.t1.push('r')
      this.eventR$.next('r')
    }
    ,addG() {
      this.$refs.t1.push('g')
      this.eventG$.next('g')
    }
    ,addB() {
      this.$refs.t1.push('b')
      this.eventB$.next('b')
    }
    ,fwd(type, name) {
      this.$refs.t2.push(type)
      this.$refs.top10.push(name)
    }
    ,initSubscription(n) {
      this.eventR$.complete()
      this.eventG$.complete()
      this.eventB$.complete()
      this.eventR$ = new rx.Subject()
      this.eventG$ = new rx.Subject()
      this.eventB$ = new rx.Subject()


      const filteredR = (function(subject, R, G, B, Rx){
        return eval(`${n}`)
      })(this.eventR$, this.eventR$, this.eventG$, this.eventB$, rx)

      const filteredG = (function(subject, R, G, B, Rx){
        return eval(`${n}`)
      })(this.eventG$, this.eventR$, this.eventG$, this.eventB$, rx)

      const filteredB = (function(subject, R, G, B, Rx){
        return eval(`${n}`)
      })(this.eventB$, this.eventR$, this.eventG$, this.eventB$, rx)

      filteredR.subscribe((n) => this.fwd('r', n))
      filteredG.subscribe((n) => this.fwd('g', n))
      filteredB.subscribe((n) => this.fwd('b', n))

    }
  }
  ,created() {
    this.eventR$ = new rx.Subject()
    this.eventG$ = new rx.Subject()
    this.eventB$ = new rx.Subject()

    this.initSubscription(this.modifier)
    this.mod = this.modifier
  }
  ,beforeDestroy() {
    this.eventR$.complete()
    this.eventG$.complete()
    this.eventB$.complete()
  }
  ,watch: {
    mod(n) {
      this.initSubscription(n)
    },
    modifier(n) {
      this.mod = n
    }
  }

}
</script>

