import VueRouter from "vue-router";
import Vue from "vue";
import LoginAdmin from "../pages/adminLogin.vue";
import LoginUser from "../pages/userLogin.vue";
import AdminDashboard from "../pages/adminDashboard.vue";
import UserGame from "../pages/userGame.vue";
import NotFound from "../pages/notFoundPage.vue";
Vue.use(VueRouter);

const isLoginAdmin = (to, from, next) => {
  if (to.name === "AdminLogin") {
    if (localStorage.getItem("tokenAdmin") == null) {
      next();
      return;
    } else {
      next({
        path: "/dashboard",
      });
      return;
    }
  } else if (to.name === "AdminDashboard") {
    if (localStorage.getItem("tokenAdmin") == null) {
      next({
        path: "/admin",
      });
      return;
    } else {
      next();
      return;
    }
  }
};

const isLoginUser = (to, from, next) => {
  if (to.name === "UserLogin") {
    if (localStorage.getItem("tokenUser") == null) {
      next();
      return;
    } else {
      next({
        path: "/usergame",
      });
      return;
    }
  } else if (to.name === "UserGame") {
    if (localStorage.getItem("tokenUser") == null) {
      next({
        path: "/",
      });
      return;
    } else {
      next();
      return;
    }
  }
};

const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes: [
    {
      path: "/",
      name: "UserLogin",
      component: LoginUser,
      beforeEnter: isLoginUser,
    },
    {
      path: "/usergame",
      name: "UserGame",
      component: UserGame,
      beforeEnter: isLoginUser,
    },
    {
      path: "/admin",
      name: "AdminLogin",
      component: LoginAdmin,
      beforeEnter: isLoginAdmin,
    },
    {
      path: "/dashboard",
      name: "AdminDashboard",
      component: AdminDashboard,
      beforeEnter: isLoginAdmin,
    },
    {
      path: "*",
      name: "notfound",
      component: NotFound,
    },
  ],
});

export default router;
