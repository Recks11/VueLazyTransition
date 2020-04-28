import _Vue, { PluginFunction } from 'vue'
import { lazyAnimateDirective, lazyAnimateGroup } from '@/directive'

// Import vue component
import LazyTransition from '@/component/lazy-transition.vue'
import { createObserverService } from '@/service/observer'
import { LazyAnimationConfig } from '../lazy-transition'

// Define typescript interfaces for autoinstaller
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

// install function executed by Vue.use()
const install: InstallFunction = function installLazyAnimate(Vue: typeof _Vue, config?: LazyAnimationConfig) {
  if (install.installed) return
  install.installed = true
  // Add Component
  Vue.component('LazyTransition', LazyTransition)

  // Add Directive
  lazyAnimateDirective(Vue)
  lazyAnimateGroup(Vue)

  // add global variable
  Vue.prototype.$lazyObserver = createObserverService(config)
};

// Create module definition for Vue.use()
const LazyAnimation = {
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
  (GlobalVue as typeof _Vue).use(LazyAnimation)
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// (LazyAnimate as any as InstallableComponent).install = install;
//
// // Export component by default
export default LazyAnimation

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
