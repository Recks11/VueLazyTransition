import {
  addAndRemoveCssClass,
  getVueInstance,
  hasCallback,
  isLazyTransitionComponent, makeStr
} from '@/service/util/Helpers'
import { ObserverFactory } from '@/service/factory/ObserverFactory'
import { FunctionalElement, BindFunctions, LazyTransitionConfig, ObserverBinding } from '@/../types'

function startTransition (element: FunctionalElement, transition: string, stage: string) {
  const isVue = element.binding.isVue
  if (isVue) {
    addAndRemoveCssClass(element,
      [transition + `-${stage}-active`],
      [transition + `-${stage}`])
  } else {addAndRemoveCssClass(element, [transition])}
}

// Run when element is in view
// @TODO (Make Replaceable)
export function handleElementInView (entry: IntersectionObserverEntry,
                                     config: LazyTransitionConfig,
                                     obSer: ObserverService) {
  // get the element
  const elm: FunctionalElement = entry.target as FunctionalElement

  if (entry.isIntersecting) {
    if (entry.intersectionRatio >= config.intersectionRatio) {
      const transition = elm.binding.transition
      const id = elm.getAttribute('ltr-id')
      const fnTpl = id ? obSer.fnMap.get(id) : undefined
      try {

        if (isLazyTransitionComponent(elm)) {
          getVueInstance(elm).$data.lazyTransitionShow = true
          elm.removeAttribute('style')

        } else {
          // if there is a transition, start transition
          if (transition && transition.length !== 0 && elm.transitionStage === 0) {
            startTransition(elm, transition, 'enter')
          }

          if (hasCallback(elm) && id) {
            if (obSer.fnMap.has(id)) {
              if (fnTpl) {
                if (fnTpl.onView) fnTpl.onView(elm)
              }
            }
            elm.removeAttribute('ltr-id')
          }
        }

      } finally {
        // Stop observing after object is in view and transition is done
        obSer.stopObserving(elm)
      }
      // const rootBounds = entry.rootBounds
      // if (rootBounds) {
      //   if (entry.intersectionRect.top <= entry.rootBounds!.top + 80) {
      //     startTransition(elm, transition!, 'leave')
      //     obSer.stopObserving(elm)
      //   }
      // }
    }
  }
}

// add and remove vue transition classes
function addTransitionEvents (el: FunctionalElement, state: string, fnMap: Map<String, BindFunctions>) {
  const bn = el.binding
  const tr = bn.transition
  const fn = fnMap.has(el.trId) ? fnMap.get(el.trId) : undefined
  const fnEnd = fn ? fn.afterTransition : undefined

  if (!bn || !tr) return
  const trn = tr + '-' + state
  const trnActive = trn + '-active'
  const trnTo = trn + '-to'

  if (tr.length !== 0) {
    addAndRemoveCssClass(el, [trn])
    el.transitionStage = 0

    el.addEventListener('transitionstart', () => {
      addAndRemoveCssClass(el, [trnTo], [trn])
      el.transitionStage = 1
    }, { once: true })

    el.addEventListener('transitionrun', () => {
      addAndRemoveCssClass(el, [trnActive])
      el.transitionStage = 2
    }, { once: true })

    el.addEventListener('transitionend', () => {
      addAndRemoveCssClass(el, undefined, [trn, trnActive, trnTo])
      el.transitionStage = 3
      if (fnEnd) fnEnd(el)
    }, { once: true })
  }
}

export class ObserverService {
  private _obKey: string
  private readonly _factory: ObserverFactory
  private readonly obsFn: IntersectionObserverCallback
  private _fnMap: Map<String, BindFunctions> = new Map()

  constructor (config: LazyTransitionConfig) {
    this._factory = new ObserverFactory(config)
    this._obKey = 'default'
    this.obsFn = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        handleElementInView(entry, config, this)
      })
    }
    this.factory.createObserver(this.observerKey, config, this.obsFn)
  }

  //return observer with active key from the observer factory
  get observer () {
    return this._factory.getObserver(this.observerKey)!
  }

  get observerKey () {
    return this._obKey
  }

  get fnMap () {
    return this._fnMap
  }

  get factory () {
    return this._factory
  }

  // change observer reference to the one with provided name
  // create one if it does not exist
  changeObserver (name: string, root?: Element) {
    this._factory.has(name) ?
      this._obKey = name :
      this.createObserver(name, root)
  }

  // add an observer with the provided root or null root
  // using default observer function
  // make the observer use the provided callback or default
  createObserver (name: string, root?: Element, callback?: IntersectionObserverCallback) {
    const config = this.factory.config
    // set the root element
    config.options.root = root ? root : null

    // create the observer
    this.factory.createObserver(name, config, callback || this.obsFn)
  }

  startObserving (el: FunctionalElement, binding: ObserverBinding): void {
    el.binding = binding
    if (binding.isVue !== false) binding.isVue = true

    // set the observer key
    el.observerKey = this.observerKey

    // if a callback is specified, attach it
    if (hasCallback(el)) {
      const fn = genKey(el)
      el.setAttribute('ltr-id', fn)
      el.trId = fn
      this.fnMap.set(fn, {
        onView: binding.onView,
        afterTransition: binding.afterTransition,
        onExit: binding.onExit
      })
    }

    // attach events if a transition is specified and addEvents is true
    if (binding.isVue && binding.transition) addTransitionEvents(el, 'enter', this.fnMap)

    // observe element
    this.observer.observe(el)

    clearCallbacks(el)

    // add observing attribute after observing
    el.setAttribute('lazy-observing', 'true')
  }

  observeWith (observer: string, el: FunctionalElement, binding: ObserverBinding) {
    const preObs = this._obKey
    if (this.factory.has(observer)) {
      this._obKey = observer
    }

    this.changeObserver(observer)
    this.startObserving(el, binding)
    this.changeObserver(preObs)
  }

  stopObserving (el: FunctionalElement): void {
    // get the observer for the specific element
    this.factory.getObserver(el.observerKey)?.unobserve(el)
    el.removeAttribute('lazy-observing')
    el.removeAttribute('ltr-id')
  }

  disposeObserver (name?: string): void {
    this._factory.removeObserver(name || this.observerKey)
  }

  killAll (): void {
    this._fnMap.clear()
    this._obKey = ''
    this.factory.deleteAll()
  }
}

function genKey (el: FunctionalElement) {
  const str = makeStr(5);
  return `${ el.observerKey }-${ str }`
}

function clearCallbacks (el: FunctionalElement) {
  el.binding.onView = undefined
  el.binding.afterTransition = undefined
  el.binding.onExit = undefined
}
