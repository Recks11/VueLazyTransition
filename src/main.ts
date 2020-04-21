import _Vue from 'vue'
import { createObserverService } from './service/CreateObserver'
import { LazyAnimationConfig } from './types'
import LazyAnimation from './components/LazyAnimation/LazyAnimation.vue'
import lazyAnimateDirective from './directives/LazyAnimate'

export function LazyAnimationPlugin (Vue: typeof _Vue, config?: LazyAnimationConfig): void {
  Vue.component(LazyAnimation.name, LazyAnimation)

  lazyAnimateDirective(Vue)

  Vue.prototype.$lazyObserver = createObserverService(config)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(LazyAnimationPlugin)
}
