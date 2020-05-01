import { LazyTransitionConfig } from '@/../lazy-transition'
import { handleElementInView, ObserverService } from '@/service/ObserverService'

export class ObserverFactory {
  private readonly observerService: ObserverService
  private observerMap: Map<String, IntersectionObserver> = new Map<String, IntersectionObserver>()
  private lastConfig: LazyTransitionConfig


  private defaultCallback =
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        handleElementInView(entry, this.config, this.observerService)
      })
    };

  constructor (config: LazyTransitionConfig, observerService: ObserverService) {
    this.observerService = observerService
    this.lastConfig = config
  }

  get config () {
    return this.lastConfig
  }

  has (name: string) {
    return this.observerMap.has(name)
  }

  getObserver (name: string) {
    return this.observerMap.get(name)
  }

  createObserver (name: string, config?: LazyTransitionConfig) {
    if (config) this.lastConfig = config
    this.removeObserver(name)
    const observer = new IntersectionObserver(this.defaultCallback, this.config.options)
    this.observerMap.set(name, observer)
  }

  removeObserver (name: string) {
    const storedObserver = this.observerMap.get(name)
    if (storedObserver) {
      storedObserver.disconnect()
      this.observerMap.delete(name)
    }
  }
}
