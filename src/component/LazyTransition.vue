<script lang="ts">
import Vue from 'vue'
import { VueElement } from '@/../types'

interface AnimatedItem {
  lazyTransitionShow: boolean;
}

export default Vue.extend({
  name: 'LazyTransition', // vue component name
  props: {
    name: {
      required: false,
      default: '',
      type: String
    },
    height: {
      required: false,
      default: 200,
      type: Number
    }
  },
  data(): AnimatedItem {
    return {
      lazyTransitionShow: false,
    };
  },
  mounted(): void {
    const el = this.$refs.animateditem as VueElement

    this.$lazyObserver.startObserving(el, {});
  },
  beforeDestroy(): void {
    const el = this.$refs.animateditem as VueElement

    this.$lazyObserver.stopObserving(el);
  }
});
</script>

<template>
  <div class="lazy-animated" ref="animateditem" :style="{ minHeight: height + 'px' }">
    <transition :name="name">
      <slot v-if="lazyTransitionShow"> DEFAULT </slot>
    </transition>
  </div>
</template>
