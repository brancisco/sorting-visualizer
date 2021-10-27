import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.prototype.$d3FinishedLoading = import('d3').then(d3 => {
    Vue.prototype.$d3 = d3
    return d3
})

const app = new Vue({
   render: (h) => h(App),
   store
})

app.$mount('#app')