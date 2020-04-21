import { ObserverService } from './Observer'

declare module 'vue/types/vue' {
    interface Vue {
      $lazyObserver: ObserverService;
    }
  }
  
  export interface VueElement extends HTMLElement {
    __vue__: Vue
  }
  