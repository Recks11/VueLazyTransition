import _Vue from 'vue'

const lazyAnimateDirective = (app: typeof _Vue) => app.directive('lazyanimate', {
  bind: (el, binding, vnode, oldVnode) => {
    console.log(el)
  }
})

export default lazyAnimateDirective
