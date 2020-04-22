import { IntersectionObserverConfig, VueElement } from '../../lazy-animate';

// handle element in view
function handleElementInView (entry: IntersectionObserverEntry, observer: IntersectionObserver, intersectionRatio: number, config: IntersectionObserverConfig) {
  // get the element
  const vueElement: VueElement = entry.target as VueElement
  config.root = null
  if (entry.isIntersecting) {
    if (entry.intersectionRatio >= intersectionRatio) {
      vueElement.__vue__.$data.show = true
      vueElement.style.minHeight = ''

      if (vueElement.isFromDirective) {
        vueElement.style.transform = 'translateX(0)'
        vueElement.style.opacity = '1'

        observer.unobserve(vueElement)
        vueElement.style.removeProperty('transform')
        vueElement.style.removeProperty('opacity')
        return
      }

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

  get observer () {
    return this._observer
  }

  startObserving (el: VueElement): void {
    this.observer.observe(el)
  }

  stopObserving (el: VueElement): void {
    this.observer.unobserve(el)
  }
}
