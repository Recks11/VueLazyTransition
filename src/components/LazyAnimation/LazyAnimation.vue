<template>
  <div class="lazy-animated" ref="animateditem" :style="{ minHeight: height + 'px' }">
    <transition :name="name">
      <slot v-if="show" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({ name: 'lazy-animation' })
export default class LazyAnimation extends Vue {
  @Prop({ default: '', required: false }) name!: string
  @Prop({ default: 200, required: false }) height!: number

  mounted () {
    const el = this.$refs.animateditem as Element
    this.$lazyObserver.startObserving(el)
  }

  beforeDestroy () {
    const el = this.$refs.animateditem as Element
    this.$lazyObserver.stopObserving(el)
  }
}
</script>
