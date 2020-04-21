import LazyAnimation from './components/LazyAnimation/LazyAnimation.vue'
import { createObserverService } from './service/CreateObserver'
import lazyAnimateDirective from './directives/LazyAnimate'
import _Vue from 'vue'
import { LazyAnimationConfig } from './types'

export function LazyAnimationPlugin (Vue: typeof _Vue, config?: LazyAnimationConfig): void {
  Vue.component(LazyAnimation.name, LazyAnimation)

  lazyAnimateDirective(Vue)

  Vue.prototype.$lazyObserver = createObserverService(config)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(LazyAnimationPlugin)
}
