<template>
  <section class="animated bg-darkslategray" ref="pageEnd">
    This element does not use the v-lazytransition binding or lazy-transition component.
    <p> {{ text }} </p>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { FunctionalVueElement, VueElement } from '@/../lazy-transition'

export default Vue.extend({
  name: 'function-component',
  data () {
    return {
      text: ''
    }
  },
  methods: {
    showThings () {
      setTimeout(() => {
        this.text = 'But it\'s special'
        setTimeout(() => {
          this.text = 'It executes a callback using the global variables.'
          setTimeout(() => {
            this.text = 'This callback keeps cloning nodes as you scroll. ' +
              'but there will never be more than 12 nodes at a time' +
              'no matter how much you scroll'
            this.duplicateAndClone()
          }, 1000)
        }, 1000)
      }, 1000)
    },
    duplicateAndClone () {
      const el = this.$refs.pageEnd as FunctionalVueElement
      const newNode = el.cloneNode() as FunctionalVueElement;
      const secondNode = el.cloneNode() as FunctionalVueElement; // node to be cloned
      secondNode.innerText = 'This is the initial cloned node';
      newNode.classList.remove('animated', 'bg-darkslategray');

      el.parentElement!.appendChild(newNode)
      newNode.appendChild(secondNode)

      this.$lazyObserver.startObserving(secondNode, () => {
        this.cloneChildNode(secondNode, newNode)
      }, 'side-fade-right', true)
    },
    cloneChildNode (childNode: FunctionalVueElement, parentNode: FunctionalVueElement) {
      if (parentNode.children.length > 20) parentNode.firstChild!.remove();
      const node = childNode.cloneNode() as FunctionalVueElement;
      node.textContent = 'CLONED NODE'
      parentNode.append(node)
      this.$lazyObserver.startObserving(node, () => {
        this.cloneChildNode(node, parentNode)
      },  'side-fade-right', true)
    }
  },
  mounted (): void {
    const el = this.$refs.pageEnd as VueElement

    this.$lazyObserver.startObserving(el, this.showThings, 'side-fade-left', true)
  },
  beforeDestroy (): void {
    const el = this.$refs.pageEnd as VueElement
    this.$lazyObserver.stopObserving(el)
  }
})
</script>
