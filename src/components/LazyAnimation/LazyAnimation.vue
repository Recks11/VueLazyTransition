<template>
  <div class="lazy-animated" ref="animateditem" :style="{ minHeight: height + 'px' }">
    <transition :name="name">
      <slot v-if="show" />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'lazy-animation',
  props: {
    name: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 200
    }
  },
  mounted () {
    const el = this.$refs.animateditem as Element
    this.$lazyObserver.startObserving(el)
  },
  beforeDestroy () {
    const el = this.$refs.animateditem as Element
    this.$lazyObserver.stopObserving(el)
  }
})
</script>
