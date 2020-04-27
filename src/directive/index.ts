import { VueElement } from '../../lazy-animate'
import _Vue, { VNode } from 'vue'
import { isHtmlElement, isVueComponent } from '@/service/Helpers'
import { DirectiveBinding } from 'vue/types/options'

function prepareAndWatch (el: Element, binding: DirectiveBinding, node: VNode) {
  const element = el as VueElement
  element.isFromDirective = true
  element.binding = binding

  if (isHtmlElement(el)) {
    node.context!.$lazyObserver.startObserving(element)
  } else if (isVueComponent(el)) {
    element.__vue__.$lazyObserver.startObserving(element)
  }
}

export const lazyAnimateDirective = (app: typeof _Vue) => app.directive('lazyanimate', {
  bind: (el, binding, vnode) => {
    prepareAndWatch(el, binding, vnode)
  }
})

export const lazyAnimateGroup = (app: typeof _Vue) => app.directive('lazyanimategroup', {
  bind: (el, binding, vnode) => {
    if (el.hasChildNodes()) {
      const numberOfChildren = el.children.length
      for (let i = 0; i < numberOfChildren; i++) {
        const elm = el.children.item(i)!;
        prepareAndWatch(elm, binding, vnode)
      }
    }
  }
})
