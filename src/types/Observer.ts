import { IntersectionObserverConfig } from './config'

export declare class ObserverService {
  constructor (options?: IntersectionObserverConfig, intersectionRatio?: number)

  get observer (): IntersectionObserver

  startObserving (el: Element): void
  stopObserving (el: Element): void
}
