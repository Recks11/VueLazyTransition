import { config } from '@vue/test-utils'
import { MockObserverService } from './mocks/ObserverService'

config.mocks = {
  $lazyObserver: new MockObserverService()
}
