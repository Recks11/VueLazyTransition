import { FunctionalVueElement, LazyTransitionConfig, VueElement } from '@/../lazy-transition'
import { addAndRemoveCssClass, getVueInstance, isFunctionalElement, isVueComponent } from '@/service/Helpers'
import { ObserverFactory } from '@/service/factory/ObserverFactory'

function startTransition (element: VueElement, transition: string) {
  addAndRemoveCssClass(element,
    [transition + '-enter-active'],
    [transition + '-enter'])
}

// Run when element is in view
export function handleElementInView (entry: IntersectionObserverEntry,
                              config: LazyTransitionConfig,
                                     obSer: ObserverService) {
  // get the element
  const vueElement: FunctionalVueElement = entry.target as FunctionalVueElement

  config.options.root // to be used later for more customisation

  if (entry.isIntersecting) { // if element is intersecting
    if (entry.intersectionRatio >= config.intersectionRatio) {
      // and more than the specified percentage is in view
      if (isVueComponent(vueElement)) {
        // handle component syntax
        // TODO(make it more specific to Lazy-Transition)
        getVueInstance(vueElement).$data.show = true
        vueElement.removeAttribute('style')
      }

      let transition = '' // transition is empty

      // if element comes from a directive, the transition is either the transition value or the transition string
      if (vueElement.isFromDirective) {
        transition = vueElement.binding.value.transition || vueElement.binding.value
      }

      if (vueElement.transition) {
        transition = vueElement.transition
      }

      // if there is a transition, start transition
      if (transition && transition.length !== 0) {
        startTransition(vueElement, transition.toString())
      }


      if (isFunctionalElement(vueElement)) {
        obSer.stopObserving(vueElement)
        const functionalEl = vueElement as FunctionalVueElement
        functionalEl.callback!()
        functionalEl.callback = undefined
      }
      // Stop observing after object is in view and transition is done
      obSer.stopObserving(vueElement)
    }
  }
}

// add and remove vue transition classes
function addTransitionEvents (el: Element, transitionName: string, state: string) {
  if (transitionName === undefined) return
  const element = el as HTMLElement

  const transition = transitionName + '-' + state
  const transitionActive = transition + '-active'
  const transitionTo = transition + '-to'

  if (transitionName && transitionName.length !== 0) {
    addAndRemoveCssClass(element, [transition])

    element.addEventListener('transitionstart', () => {
      addAndRemoveCssClass(element, [transitionTo], [transition])
    }, { once: true })

    element.addEventListener('transitionrun', () => {
      addAndRemoveCssClass(element, [transitionActive])
    }, { once: true })

    element.addEventListener('transitionend', () => {
      addAndRemoveCssClass(element, undefined, [transitionActive, transition, transitionTo])
    }, { once: true })
  }
}

export class ObserverService {
  public static instances: number
  private _observerKey: string;
  private readonly observerFactory: ObserverFactory

  constructor (config: LazyTransitionConfig) {
    this.observerFactory = new ObserverFactory(config, this)
    this.observerFactory.createObserver('default')
    this._observerKey = 'default'
    ObserverService.instances = (ObserverService.instances || 0) + 1
  }

  get observer () {
    return this.observerFactory.getObserver(this.observerKey)!
  }

  get observerKey () {
    return this._observerKey
  }

  get factory () {
    return this.observerFactory
  }

  changeObserver(name: string, root?: Element) {
    if (this.observerFactory.has(name)) {
      this._observerKey = name
    } else {
      this.addObserver(name, root)
    }
  }

  addObserver(name: string, root?: Element) {
    const config = this.factory.config
    config.options.root = root ? root : null
    this.factory.createObserver(name, config)
    this.changeObserver(name)
  }

  startObserving (el: FunctionalVueElement, callback?: Function, transition?: string, addEvents?: boolean): void {
    // if a callback is specified, it will be attached here
    if (callback) el.callback = callback

    // attach events if the element comes from a directive
    if (el.isFromDirective) addTransitionEvents(el, el.binding.value.transition || el.binding.value, 'enter')

    // attach events if a transition is specified and addEvents is true
    if (addEvents && transition) addTransitionEvents(el, transition, 'enter')
    // if the element is not from a directive (this method is called elsewhere) then the transition is the specified string
    if (transition) el.transition = transition

    el.observerKey = this.observerKey
    // observe element
    this.observer.observe(el)
    // add observing attribute
    el.setAttribute('lazy-observing', 'true')
  }

  stopObserving (el: FunctionalVueElement): void {
    this.factory.getObserver(el.observerKey)?.unobserve(el)
    el.removeAttribute('lazy-observing')
  }

  disposeObserver (): void {
    this.observer.takeRecords().forEach(entry => {
      entry.target.removeAttribute('lazy-observing')
    })
    this.observer.disconnect();
    this.observerFactory.removeObserver(this.observerKey)
  }
}
