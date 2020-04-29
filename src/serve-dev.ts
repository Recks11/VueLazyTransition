import Vue, { VNode } from 'vue';
import Dev from '@/serve-dev.vue';
import LazyTransition  from '@/entry';

Vue.config.productionTip = false;
Vue.use(LazyTransition, {
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
