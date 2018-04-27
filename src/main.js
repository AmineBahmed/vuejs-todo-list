// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.directive('autofocus', {
  inserted (el, binding, vnode) {
    el.focus()
	}
})

Vue.filter('capitalize', val => {
  return val.charAt(0).toUpperCase() + val.slice(1)
})

Vue.filter('pluralize', (val, val2) => {
	return val === 1 ? val + ' ' + val2 : val + ' ' + val2 + 's'
})

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
