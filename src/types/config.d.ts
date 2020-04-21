export type IntersectionObserverConfig = {
    root: any;
    rootMargin: string;
    threshold: number | number[];
  }
  
  export type LazyAnimationConfig = {
    options: IntersectionObserverConfig;
    intersectionRatio: number;
  }
  