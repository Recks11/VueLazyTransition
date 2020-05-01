import Vue, { PluginFunction, PluginObject } from 'vue'

interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

export interface InstallableComponent extends PluginObject<Vue> {
  install: InstallFunction;
}

declare const LazyTransitionPlugin: {
  Observer: ObserverService,
  install: InstallFunction
};

declare module 'vue/types/vue' {
  interface Vue {
    $lazyObserver: ObserverService;
  }
}

export default LazyTransitionPlugin;

export type LazyTransitionConfig = {
  options: IntersectionObserverConfig;
  intersectionRatio: number;
}

export type IntersectionObserverConfig = {
  root?: any;
  rootMargin?: string;
  threshold: number | number[];
}

export declare class ObserverService {
  constructor (options: IntersectionObserverConfig, intersectionRatio: number)

  get observer (): IntersectionObserver

  get observerKey (): string

  createObserver (name: string, root?: Element): void

  changeObserver (name: string, root?: Element): void

  startObserving (el: FunctionalVueElement | VueElement | Element, binding: ObserverBinding): void

  observeWith (observer: string, el: FunctionalVueElement | VueElement | Element, binding: ObserverBinding): void

  stopObserving (el: FunctionalVueElement | VueElement | Element): void

  disposeObserver (): void
}

export type ObserverBinding = {
  transition?: string;
  vueTransition?: boolean;
  onView?: Function;
  onExit?: Function;
}

export interface VueElement extends HTMLElement {
  __vue__: Vue
  isFromDirective: boolean
  binding: ObserverBinding
}

export interface FunctionalVueElement extends VueElement {
  observerKey: string
  callback?: boolean
  // exitCallback?: Function // To be used later
  transition?: string
  // customTransition?: string // to be used later
}

export interface FunTupule {
  onView?: Function
  onExit?: Function
}

