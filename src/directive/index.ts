import _Vue, { VNode } from 'vue'
import { getVueInstance, isHtmlElement, isVueComponent } from '@/service/util/Helpers'
import { DirectiveBinding } from 'vue/types/options'
import { FunctionalElement, ObserverBinding } from '@/../types'

function addBindingProperties (el: FunctionalElement, binding: DirectiveBinding) {
  const obBind: ObserverBinding = {
    transition: Object.create(null),
    isVue: true
  }

  const bindVal = binding.value

  if (typeof bindVal === 'string') {
    obBind.transition = bindVal
  } else if (typeof bindVal === 'object') {
    obBind.transition = bindVal.transition
    obBind.onView = bindVal.onView
    obBind.onExit = bindVal.onExit
  }

  if (binding.modifiers.manual) {
    obBind.isVue = false
  }

  el.binding = obBind
  return obBind
}

function prepareAndWatch (el: Element, binding: DirectiveBinding, node: VNode) {
  const element = el as FunctionalElement
  const bindVal = addBindingProperties(element, binding)

  // if the element is not a vue component, observe with context
  if (isHtmlElement(el) && !isVueComponent(el)) {
    const rootVue = node.context!
    if (rootVue) {
      rootVue.$lazyObserver.startObserving(element, bindVal)
    }
  } else if (isVueComponent(el)) { // if its a component, observe with component
    node.componentInstance?.$lazyObserver.startObserving(element, bindVal)
  }
}

export const lazyAnimateDirective = (app: typeof _Vue) => app.directive('lazytransition', {
  inserted: (el, binding, vnode) => {
    if (el.getAttribute('lazy-observing') !== 'true') {
      prepareAndWatch(el, binding, vnode)
    }
  }
})

export const lazyAnimateGroup = (app: typeof _Vue) => app.directive('lazytransition-group', {
  inserted: (el, binding, vnode) => {
    if (el.hasChildNodes()) {
      const numberOfChildren = el.children.length
      for (let i = 0; i < numberOfChildren; i++) {
        const elm = el.children.item(i)!;
        const instance = getVueInstance(elm)
        const vNode = instance ? instance.$vnode : vnode
        if (elm.getAttribute('lazy-observing') !== 'true') {
          prepareAndWatch(elm, binding, vNode)
        }
      }
    }
  }
})

export const lazyTransitionRoot = (app: typeof _Vue) => app.directive('lazytransition-root', {
  bind: (el, binding, vnode) => {
    const context = vnode.context
    const obs = context?.$lazyObserver
    const bindVal = binding.value
    const obsName = bindVal ? bindVal.observer : undefined
    if (obs)
      if (bindVal) {
        if (obsName && obsName.length > 0)
          obs.createObserver(obsName, el)
      } else obs.createObserver('default', el)
  }
})
