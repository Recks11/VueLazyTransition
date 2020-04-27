import { IntersectionObserverConfig, VueElement } from '@/../lazy-animate'
import { isVueComponent, addAndRemoveCssClass } from '@/service/Helpers'
import { DirectiveBinding } from 'vue/types/options'

// add and remove vue transition classes
function addTransitionEvents (el: Element, binding: DirectiveBinding, state: string) {
  const element = el as HTMLElement

  const className = binding.value
  const transition = className + '-' + state
  const transitionActive = transition + '-active'
  const transitionTo = transition + '-to'

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

// Run when element is in view
function handleElementInView (entry: IntersectionObserverEntry,
                              intersectionRatio: number,
                              config: IntersectionObserverConfig,
                              observerInstance: ObserverService) {
  // get the element
  const vueElement: VueElement = entry.target as VueElement
  config.root = null
  if (entry.isIntersecting) {
    if (entry.intersectionRatio >= intersectionRatio) {
      if (isVueComponent(vueElement)) {
        vueElement.__vue__.$data.show = true
        vueElement.style.minHeight = ''
      }

      if (vueElement.isFromDirective) {
        addAndRemoveCssClass(vueElement,
          [vueElement.binding.value + '-enter-active'],
          [vueElement.binding.value + '-enter'])

        // Stop observing after object is in view and transition is done
        observerInstance.stopObserving(vueElement)
        return
      }
      // Stop observing after object is in view and transition is done
      observerInstance.stopObserving(vueElement)
    }
  }
}


export class ObserverService {
  private readonly _observer!: IntersectionObserver

  constructor (options: IntersectionObserverConfig, intersectionRatio: number) {
    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          handleElementInView(entry, intersectionRatio, options, this)
        })
      }, options)
  }

  get observer () {
    return this._observer
  }

  startObserving (el: VueElement): void {
    if (el.isFromDirective) addTransitionEvents(el, el.binding, 'enter')

    this.observer.observe(el)
  }

  stopObserving (el: VueElement): void {
    this.observer.unobserve(el)
  }

  disposeObserver (): void {
    this.observer.disconnect();
  }
}
