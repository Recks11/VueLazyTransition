import { LazyAnimationConfig } from '@/../lazy-transition'
import { ObserverService } from '@/service/ObserverService'

const defaultObserverConfig: LazyAnimationConfig = {
  options: {
    root: null,
    rootMargin: '0px',
    threshold: [0.5, 0.75, 1]
  },
  intersectionRatio: 0
}

function initConfig (config: LazyAnimationConfig) {
  config.options.root = config.options.root === undefined ?
    config.options.root = defaultObserverConfig.options.root :
    config.options.root

  config.options.rootMargin = config.options.rootMargin === undefined ?
    config.options.rootMargin = defaultObserverConfig.options.rootMargin :
    config.options.rootMargin

  config.options.threshold = config.options.threshold === undefined ?
    config.options.threshold = defaultObserverConfig.options.threshold :
    config.options.threshold

  return config
}

export function createObserverService (config?: LazyAnimationConfig | undefined): ObserverService {
  if (config !== undefined) {
    config = initConfig(config)

    return new ObserverService(config)
  } else {
    return new ObserverService(defaultObserverConfig)
  }
}
