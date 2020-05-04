import { FunctionalElement, VueElement } from '@/../types'

export function getVueInstance (el: Element) {
  const elem = el as VueElement
  return elem.__vue__
}

export function isHtmlElement (el: Element) {
  return el instanceof HTMLElement
}

export function hasCallback (el: FunctionalElement) {
  const elem = el as FunctionalElement
  const binding = elem.binding
  return (binding && (binding.onView || binding.onExit || binding.afterTransition)) || el.getAttribute('ltr-id') !== undefined
}

export function isVueComponent (el: Element) {
  return getVueInstance(el) !== undefined
}

export function isLazyTransitionComponent(el: VueElement) {
  if (isVueComponent(el)) {
    const instance = getVueInstance(el)
    if (instance) {
      if (typeof instance.$data.lazyTransitionShow === 'boolean') {
        return true
      }
    }
  }
  return false
}

// helper method to add and remove classes from an element
export function addAndRemoveCssClass (el: HTMLElement, addList?: string[], removeList?: string[]) {
  if (addList !== undefined && addList.length !== 0) {
    el.classList.add(...addList)
  }
  if (removeList !== undefined && removeList!.length !== 0) {
    el.classList.remove(...removeList!)
  }
}

export const isDev = () => {
  return process.env.NODE_ENV !== 'production'
}


export function makeStr(length: number) {
  let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
