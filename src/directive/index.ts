import { VueElement } from '@/../lazy-transition'
import _Vue, { VNode } from 'vue'
import { getVueInstance, isHtmlElement, isVueComponent } from '@/service/Helpers'
import { DirectiveBinding } from 'vue/types/options'

function prepareAndWatch (el: Element, binding: DirectiveBinding, node: VNode) {
  const element = el as VueElement
  element.isFromDirective = true
  element.binding = binding

  if (isHtmlElement(el) && !isVueComponent(el)) {
    const rootVue = node.context
    if (rootVue) {
      rootVue.$lazyObserver.startObserving(element, binding.value.onView)
      } else {

    }
  } else if (isVueComponent(el)) {
    getVueInstance(el).$lazyObserver.startObserving(element, binding.value.onView)
  }
}

export const lazyAnimateDirective = (app: typeof _Vue) => app.directive('lazytransition', {
  bind: (el, binding, vnode) => {
    if (el.getAttribute('lazy-observing') !== 'true') {
      prepareAndWatch(el, binding, vnode)
    }
  }
})

export const lazyAnimateGroup = (app: typeof _Vue) => app.directive('lazytransition-group', {
  bind: (el, binding, vnode) => {
    if (el.hasChildNodes()) {
      const numberOfChildren = el.children.length
      for (let i = 0; i < numberOfChildren; i++) {
        const elm = el.children.item(i)!;
        if (elm.getAttribute('lazy-observing') !== 'true') {
          prepareAndWatch(elm, binding, vnode)
        }
      }
    }
  }
})
