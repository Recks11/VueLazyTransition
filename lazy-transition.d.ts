import Vue, { PluginFunction, PluginObject } from 'vue';
import { DirectiveBinding } from 'vue/types/options';

interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

export interface InstallableComponent extends PluginObject<Vue> {
  install: InstallFunction;
}

declare const LazyTransition: {
  Observer: ObserverService,
  install: InstallFunction
};

export default LazyTransition;

export type IntersectionObserverConfig = {
  root?: any;
  rootMargin?: string;
  threshold: number | number[];
}

export type LazyTransitionConfig = {
  options: IntersectionObserverConfig;
  intersectionRatio: number;
}

export declare class ObserverService {
  constructor (options: IntersectionObserverConfig, intersectionRatio: number)

  get observer (): IntersectionObserver

  get observerKey (): string

  addObserver (name: string, root?: Element): void

  changeObserver (name: string, root?: Element): void

  startObserving (el: FunctionalVueElement | VueElement, callback?: Function, transitionName?: string, addEvents?: boolean): void

  stopObserving (el: Element): void

  disposeObserver (): void
}

declare module 'vue/types/vue' {
  interface Vue {
    $lazyObserver: ObserverService;
  }
}

export interface VueElement extends HTMLElement {
  __vue__: Vue
  isFromDirective: boolean
  binding: DirectiveBinding
}

export interface FunctionalVueElement extends VueElement {
  observerKey: string
  callback?: Function
  transition?: string
}

export type FunctionalElementBinding = {
  transition?: string
  onView: Function
}
