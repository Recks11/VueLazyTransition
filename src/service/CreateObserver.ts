import { LazyAnimationConfig } from '../types'
import { ObserverService } from './ObserverService'

export function createObserverService (config: LazyAnimationConfig | undefined): ObserverService {
  if (config !== undefined) {
    return new ObserverService(config.options, config.intersectionRatio)
  } else {
    const defaultConfig: LazyAnimationConfig = {
      options: {
        root: null,
        rootMargin: '0px',
        threshold: [0.8, 0.9, 1]
      },
      intersectionRatio: 0
    }
    return new ObserverService(defaultConfig.options, defaultConfig.intersectionRatio)
  }
}
