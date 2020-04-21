import { IntersectionObserverConfig } from '../types'
import { VueElement } from '../types'

// handle element in view
function handleElementInView (entry: IntersectionObserverEntry, observer: IntersectionObserver, intersectionRatio: number, config: IntersectionObserverConfig) {
  // get the element
  const vueElement: VueElement = entry.target as VueElement
  config.root = null
  if (entry.isIntersecting) {
    if (entry.intersectionRatio >= intersectionRatio) {
      vueElement.__vue__.$data.show = true
      vueElement.style.minHeight = ''
      vueElement.style.display = 'contents'

      // Stop observing after object is in view
      observer.unobserve(entry.target)
    }
  }
}

export class ObserverService {
  private readonly _observer!: IntersectionObserver

  constructor (options: IntersectionObserverConfig, intersectionRatio: number) {
    this._observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          handleElementInView(entry, obs, intersectionRatio, options)
        })
      }, options)
  }

  startObserving (el: Element): void {
    this.observer.observe(el)
  }

  get observer () {
    return this._observer
  }

  stopObserving (el: Element): void {
    this.observer.unobserve(el)
  }
}