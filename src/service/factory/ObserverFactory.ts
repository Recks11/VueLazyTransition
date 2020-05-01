import { isDev } from '@/service/util/Helpers'
import { LazyTransitionConfig } from '@/../types'

export class ObserverFactory {
  private observerMap: Map<String, IntersectionObserver> = new Map<String, IntersectionObserver>()
  private lastConfig: LazyTransitionConfig

  constructor (config: LazyTransitionConfig) {
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

  createObserver (name: string, config?: LazyTransitionConfig, obsFn?: IntersectionObserverCallback) {
    // save last Observer configuration
    if (config) this.lastConfig = config

    // remove existing observer if it exists
    this.removeObserver(name)
    // if an observer function is provided, add a new observer wit that function
    if (obsFn) this.observerMap.set(name, new IntersectionObserver(obsFn!, config?.options))

    else if (isDev()) {
      console.info('observer handler function is not defined')
    }
  }

  removeObserver (name: string) {
    const storedObserver = this.observerMap.get(name)
    if (storedObserver) {
      storedObserver.takeRecords().forEach(
        entry => entry.target.removeAttribute('lazy-observing'))
      storedObserver.disconnect()
      this.observerMap.delete(name)
    }
  }

  deleteAll() {
    for (let key of this.observerMap.keys()) {
      this.removeObserver(key.toString())
    }
  }
}
