import Vue, { VNode } from 'vue'
import Dev from '@/serve-dev.vue'
import LazyTransition  from '@/entry'

Vue.config.productionTip = false;
Vue.use(LazyTransition)

new Vue({
  render: (h): VNode => h(Dev),
}).$mount('#app');
