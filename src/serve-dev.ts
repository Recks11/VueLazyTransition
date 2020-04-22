import Vue, { VNode } from 'vue';
import Dev from '@/serve-dev.vue';
import { LazyAnimation } from '@/entry';

Vue.config.productionTip = false;
Vue.use(LazyAnimation, {
  options: {
    root: null,
    rootMargin: '0px',
    threshold: [0.5],
  },
  intersectionRatio: 0.5
})

new Vue({
  render: (h): VNode => h(Dev),
}).$mount('#app');
