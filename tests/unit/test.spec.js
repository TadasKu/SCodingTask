import { createLocalVue, mount } from '@vue/test-utils'
import Vue from 'vue'
import Footer from '../../src/components/Footer.vue'
import Header from '../../src/components/Header.vue'
import {BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import '../../src/styles/app.scss'
import VueRouter from 'vue-router'
import Home from '../../src/views/Home.vue'
import Issues from '../../src/views/Issues.vue'
Vue.use(BootstrapVue)
var possiblePaths = ['/', '/issues/open', '/issues/done', '/issues/trashed']
describe('Footer', () => {
    const wrapper = mount(Footer);
    it('Has footer', () => {
        expect(wrapper.html()).toContain('SCodingas Task')
    })
  })

  describe('Header', () => {
    const wrapper = mount(Header);
    it('Has header', () => {
        expect(wrapper.html()).toContain('ToDo')
    })
  })

  describe('Routes', () => {
    Vue.use(VueRouter)
    const router = new VueRouter({routes: [
        {path: '/issues/:status', name: 'Issues', component: Issues},
        {path: '/', name: 'Home', component: Home},
    ]})
    const vm = new Vue({
      el: document.createElement('div'),
      router: router,
      render: h => h('router-view')
    })
    router.beforeEach((to, from, next) => {
        if (!possiblePaths.includes(to.path)) {
          next('/')
        }
        next()
      })
    it('Issues route status:open', done => {
      router.push({name: 'Issues', params: {status: "open"}})
      Vue.nextTick(() => {
        expect(vm.$route.fullPath).toEqual('/issues/open')
        done()
      })
    })
    it('Issues route status:done', done => {
        router.push({name: 'Issues', params: {status: "done"}})
        Vue.nextTick(() => {
          expect(vm.$route.fullPath).toEqual('/issues/done')
          done()
        })
      })
      it('Issues route status:trashed', done => {
        router.push({name: 'Issues', params: {status: "trashed"}})
        Vue.nextTick(() => {
          expect(vm.$route.fullPath).toEqual('/issues/trashed')
          done()
        })
      })
      it('Issues route status:invalid', done => {
        router.push({name: 'Issues', params: {status: "invalid"}})
        Vue.nextTick(() => {
         expect(vm.$route.fullPath).toEqual('/')
          done()
        })
      })
    it('Home route', done => {
        router.push({name: 'Home'})
        Vue.nextTick(() => {
          expect(vm.$el.querySelector('h4').textContent).toContain('Click button to open an "Open Issues" page!')
          done()
        })
      })
  })