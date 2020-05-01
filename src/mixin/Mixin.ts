// Idea gotten from Vuex
// assign the $lazyobserver as a mixin and disperse it to each component in the
// created hook
import _Vue from 'vue'
import { Vue } from 'vue/types/vue'

export const addMixin = (app: typeof _Vue) => app.mixin({
  beforeCreate : initObserver
})

function initObserver (this: Vue) {
  const options = this.$options
  // @ts-ignore
  if (options.observer) {
    // @ts-ignore
    this.$lazyObserver = typeof options.observer === 'function'
      // @ts-ignore
    ? options.observer() : options.observer
  } else if (options.parent && options.parent.$lazyObserver) {
    this.$lazyObserver = options.parent.$lazyObserver
  }
}
