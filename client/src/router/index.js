import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Chat from '../views/Chat.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    beforeEnter(to, from, next){
      localStorage.setItem("username", null);
      next({path: '/login'})
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: "Logout",
    beforeEnter(to, from, next){
      localStorage.setItem("username", null);
      next({path: '/login'})
    }
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    beforeEnter: (to, from, next) => {
      let username = localStorage.getItem("username");

      if (
        username == "null" || 
        username == null || 
        username == undefined || 
        username.length == 0
      ){
        next({path: "/login"})
      } else{
        next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
