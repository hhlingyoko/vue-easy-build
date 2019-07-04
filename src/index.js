import Vue from 'vue';
import App from './App';

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});
// js热更新
if (module.hot) {
  module.hot.accept();
}