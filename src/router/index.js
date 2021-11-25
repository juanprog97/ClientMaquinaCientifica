import VueRouter from 'vue-router';
import Vue from 'vue';
import LoginAdmin from "../pages/adminLogin.vue";
import LoginUser from "../pages/userLogin.vue";
import AdminDashboard from "../pages/adminDashboard.vue"


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
    path: "/",
    name: "UserLogin",
    component: LoginUser,
  },
  {
    path: "/admin",
    name: "AdminLogin",
    component: LoginAdmin,
    },
    {
      path: "/dashboard",
      name: "AdminDashboard",
      component: AdminDashboard,
      meta: {
      isLogged: true
      }
    }
  
  ]
})

// router.beforeEach((to, from, next) => {
//     if(to.)
// })

export default router;