import {
  addAndRemoveCssClass,
  getVueInstance,
  hasCallback,
  isLazyTransitionComponent, makeStr,
  setTransition
} from '@/service/util/Helpers'
import { ObserverFactory } from '@/service/factory/ObserverFactory'
import { FunctionalVueElement, FunTupule, LazyTransitionConfig, ObserverBinding, VueElement } from '@/../types'

function startTransition (element: VueElement, transition: string) {
  addAndRemoveCssClass(element,
    [transition + '-enter-active'],
    [transition + '-enter'])
}

// Run when element is in view
// @TODO (Make Replaceable)
export function handleElementInView (entry: IntersectionObserverEntry,
                                     config: LazyTransitionConfig,
                                     obSer: ObserverService) {
  // get the element
  const elm: FunctionalVueElement = entry.target as FunctionalVueElement

  config.options.root // to be used later for more customisation

  if (entry.isIntersecting) {
    if (entry.intersectionRatio >= config.intersectionRatio) {
      // and more than the specified percentage is in view

      if (isLazyTransitionComponent(elm)) {
        getVueInstance(elm).$data.lazyTransitionShow = true
        elm.removeAttribute('style')

      } else {

        const transition = elm.transition
        const id = elm.getAttribute('ltr-id')

        // if there is a transition, start transition
        if (transition && transition.length !== 0) {
          startTransition(elm, transition)
        }

        if (hasCallback(elm) && id) {
          if (obSer.calMap.has(id)) {
            const fnTpl = obSer.calMap.get(id)
            if (fnTpl) {
              if (fnTpl.onView) fnTpl.onView()
              // if (fnTpl.onExit) fnTpl.onExit()
            }
          }
          elm.callback = false
          elm.removeAttribute('ltr-id')
        }
      }
      // Stop observing after object is in view and transition is done
      obSer.stopObserving(elm)
    }
  }
}

// add and remove vue transition classes
function addTransitionEvents (el: FunctionalVueElement, state: string) {
  if (!el.transition) return
  const tr = el.transition
  const trn = el.transition + '-' + state
  const trnActive = trn + '-active'
  const trnTo = trn + '-to'

  if (tr.length !== 0) {
    addAndRemoveCssClass(el, [trn])

    el.addEventListener('transitionstart', () => {
      addAndRemoveCssClass(el, [trnTo], [trn])
    }, { once: true })

    el.addEventListener('transitionrun', () => {
      addAndRemoveCssClass(el, [trnActive])
    }, { once: true })

    el.addEventListener('transitionend', () => {
      addAndRemoveCssClass(el, undefined, [trn, trnActive, trnTo])
    }, { once: true })
  }
}

export class ObserverService {
  private _obKey: string
  private readonly _factory: ObserverFactory
  private readonly obsFn: IntersectionObserverCallback
  private _calMap: Map<String, FunTupule> = new Map()

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

  get calMap () {
    return this._calMap
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

  startObserving (el: FunctionalVueElement,
                  binding: ObserverBinding): void {

    // if a callback is specified, attach it
    // TODO(Test if it can be gotten in DOM. if it can, remove it lol)
    if (binding.onView) {
      el.callback = true
      const fn = genKey(el)
      el.setAttribute('ltr-id', fn)
      this._calMap.set(fn, { onView: binding.onView, onExit: binding.onExit })
    }

    // add transition name to element
    if (binding.vueTransition) setTransition(el, binding.transition)

    // attach events if a transition is specified and addEvents is true
    if (binding.vueTransition && binding.transition) addTransitionEvents(el, 'enter')

    // set the observer key
    el.observerKey = this.observerKey

    // observe element
    this.observer.observe(el)

    // add observing attribute after observing
    el.setAttribute('lazy-observing', 'true')
  }

  observeWith (observer: string, el: FunctionalVueElement, binding: ObserverBinding) {
    const preObs = this._obKey
    if (this.factory.has(observer)) {
      this._obKey = observer
    }
    this.changeObserver(observer)
    this.startObserving(el, binding)
    this.changeObserver(preObs)
  }

  stopObserving (el: FunctionalVueElement): void {
    // get the observer for the specific element
    this.factory.getObserver(el.observerKey)?.unobserve(el)
    el.removeAttribute('lazy-observing')
    el.removeAttribute('ltr-id')
  }

  disposeObserver (name?: string): void {
    this._factory.removeObserver(name || this.observerKey)
  }

  killAll (): void {
    this._calMap.clear()
    this.factory.deleteAll()
  }
}

function genKey (el: FunctionalVueElement) {
  const str = makeStr(5);
  return `${ el.observerKey }-${ str }`
}
