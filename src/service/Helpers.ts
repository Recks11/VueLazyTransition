import { VueElement, FunctionalVueElement } from '../../lazy-transition'

export function isHtmlElement (el: Element) {
  return el instanceof HTMLElement
}

export function isFunctionalElement (el: Element) {
  const elem = el as FunctionalVueElement
  return elem.callback !== undefined
}

export function isVueComponent (el: Element) {
  return getVueInstance(el) !== undefined
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

export function getVueInstance (el: Element) {
  const elem = el as VueElement

  return elem.__vue__
}
