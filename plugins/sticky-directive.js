import Vue from 'vue'
import Sticky from 'vue-sticky-directive'

if (process.browser) {
  Vue.use(Sticky)
}
