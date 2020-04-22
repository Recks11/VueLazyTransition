import Vue, { PluginFunction, VueConstructor } from 'vue';
import { DirectiveBinding } from 'vue/types/options';


interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}
export interface InstallableComponent extends VueConstructor<Vue> {
  install: InstallFunction;
}

declare const LazyAnimate: InstallableComponent;

export default LazyAnimate;

export type IntersectionObserverConfig = {
  root: any;
  rootMargin: string;
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
