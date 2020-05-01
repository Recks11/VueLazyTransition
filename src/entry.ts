import _Vue, { PluginFunction } from 'vue'
import { lazyAnimateDirective, lazyAnimateGroup } from '@/directive'
import { InstallableComponent, LazyTransitionConfig } from '../lazy-transition'
import LazyTransitionComponent from '@/component/LazyTransition.vue'
import { ObserverService } from '@/service/ObserverService'
import { createObserverService } from '@/service/observer';

interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

// install function executed by Vue.use()
const install: InstallFunction = function installLazyAnimate(Vue: typeof _Vue, config?: LazyTransitionConfig) {
  if (install.installed) return
  // add global variable
  Vue.prototype.$lazyObserver = createObserverService(config)

  install.installed = true
  // Add Component
  Vue.component('LazyTransition', LazyTransitionComponent)

  // Add Directive
  lazyAnimateDirective(Vue)
  lazyAnimateGroup(Vue)

  //addMixin
  // addMixin(Vue)
};

// Create module definition for Vue.use()
const LazyTransitionPlugin = {
  install,
};

// To auto-install when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  GlobalVue = (global as any).Vue
}
if (GlobalVue) {
  (GlobalVue as typeof _Vue).use(LazyTransitionPlugin)
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(LazyTransitionComponent as any as InstallableComponent).install = install;
//
//export installation objects
export default {
  Observer: ObserverService,
  install: install
}

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
