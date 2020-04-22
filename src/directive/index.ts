import { VueElement } from '../../lazy-animate'
import _Vue from 'vue'

function createCssClass (elStyle: CSSStyleDeclaration) {
  elStyle.transition = 'all 300ms cubic-bezier(.5, .15, .28, .91)'
  elStyle.transform = 'translateX(25%)'
  elStyle.opacity = '0'
}

const lazyAnimateDirective = (app: typeof _Vue) => app.directive('lazyanimate', {
  bind: (el, binding) => {
    const vueEl = el as VueElement
    createCssClass(vueEl.style)
    vueEl.isFromDirective = true
    vueEl.binding = binding
    vueEl.__vue__.$lazyObserver.startObserving(el)
  }
})
export default lazyAnimateDirective
