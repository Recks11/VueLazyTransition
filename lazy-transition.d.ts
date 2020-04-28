import Vue, { PluginFunction, PluginObject } from 'vue';
import { DirectiveBinding } from 'vue/types/options';


interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}
export interface InstallableComponent extends PluginObject<Vue> {
  install: InstallFunction;
}

declare const LazyTransition: InstallableComponent;

export default LazyTransition;

export type IntersectionObserverConfig = {
  root?: any;
  rootMargin?: string;
  threshold: number | number[];
}

export type LazyAnimationConfig = {
  options: IntersectionObserverConfig;
  intersectionRatio: number;
}

export declare class ObserverService {
  constructor (options: IntersectionObserverConfig, intersectionRatio: number)

  get observer (): IntersectionObserver

  startObserving (el: Element): void
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
