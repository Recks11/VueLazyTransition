<script lang="ts">
import Vue from 'vue';

interface AnimatedItem {
  show: boolean;
}

export default Vue.extend({
  name: 'LazyTransition', // vue component name
  props: {
    name: {
      required: false,
      default: ''
    },
    height: {
      required: false,
      default: 200
    }
  },
  data(): AnimatedItem {
    return {
      show: false,
    };
  },
  mounted(): void {
    const el = this.$refs.animateditem as Element;
    this.$vnode.context!.$lazyObserver.startObserving(el);
  },
  beforeDestroy(): void {
    const el = this.$refs.animateditem as Element;
    this.$vnode.context!.$lazyObserver.stopObserving(el);
  },
});
</script>

<template>
  <div class="lazy-animated" ref="animateditem" :style="{ minHeight: height + 'px' }">
    <transition :name="name">
      <slot v-if="show" />
    </transition>
  </div>
</template>

<style scoped>
</style>
