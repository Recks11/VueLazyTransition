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

  startObserving (el: FunctionalElement | VueElement | Element, binding: ObserverBinding): void

  observeWith (observer: string, el: FunctionalElement | VueElement | Element, binding: ObserverBinding): void

  stopObserving (el: FunctionalElement | VueElement | Element): void

  disposeObserver (): void

  killAll(): void
}

export type ObserverBinding = {
  transition?: string;
  isVue?: boolean;
  onView?: (el: BoundElement) => void;
  afterTransition?: (el: BoundElement) => void;
  onExit?: (el: BoundElement) => void;
}

// interface to expose vue instance to components
export interface VueElement extends HTMLElement {
  __vue__: Vue
}

export interface FunctionalElement extends VueElement {
  trId: string
  transitionStage: number
  observerKey: string
  binding: ObserverBinding
}

// Function tuple for Function Map
export interface BindFunctions {
  onView?: (el: BoundElement) => void;
  afterTransition?: (el: BoundElement) => void;
  onExit?: (el: BoundElement) => void;
}

// exposed interface which excludes __vue__ suggestion
export interface BoundElement extends HTMLElement{
  observerKey: string
  binding: ObserverBinding
}

