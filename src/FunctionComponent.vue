<template>
  <section id="fs" class="animated bg-darkslategray component" ref="pageEnd">
    <p> {{ text }} </p>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { BoundElement, FunctionalElement, VueElement } from '@/../types'

export default Vue.extend({
  name: 'function-component',
  data () {
    return {
      text: 'This element does not use the v-lazytransition binding ' +
        'or lazy-transition component.',
      parentNode: Object.create(null)
    }
  },
  methods: {
    showThings (el: BoundElement) {
      this.parentNode = el.parentElement
      setTimeout(() => {
        this.text = 'it uses the $lazyObservable global variable'
        setTimeout(() => {
          this.text = 'It executes a callback using the global variables.'
          setTimeout(() => {
            this.text = 'This callback keeps cloning nodes as you scroll. ' +
              'it clones 20 nodes'
            this.duplicateAndClone(el)
          }, 1000)
        }, 1000)
      }, 2000)
    },
    duplicateAndClone (el: BoundElement) {
      if (this.parentNode.childElementCount >= 20) return
      const newNode = el.cloneNode() as FunctionalElement
      newNode.innerText = 'CLONED NODE'
      newNode.classList.remove('scale-up-down', 'component')

      this.parentNode.appendChild(newNode)
      if (this.parentNode.childElementCount > 20) this.parentNode.firstChild.remove()
      this.$lazyObserver.observeWith('func', newNode, {
        transition: 'side-fade-right',
        onView: () => this.duplicateAndClone(newNode)
      })
    }
  },
  mounted (): void {
    const el = this.$refs.pageEnd as VueElement

    this.$lazyObserver.observeWith('default', el, {
      transition: 'side-fade-right',
      onView: this.showThings,
      afterTransition: (elm) => elm.classList.add('scale-up-down')
    })
  },
  beforeDestroy (): void {
    const el = this.$refs.pageEnd as VueElement
    this.$lazyObserver.stopObserving(el)
  }
})
</script>
