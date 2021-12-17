import VueRouter from "vue-router";
import Vue from "vue";
import LoginAdmin from "../pages/adminLogin.vue";
import LoginUser from "../pages/userLogin.vue";
import AdminDashboard from "../pages/adminDashboard.vue";
import UserGame from "../pages/userGame.vue";
import NotFound from "../pages/notFoundPage.vue";
import LoadScript from "vue-plugin-load-script";

Vue.use(LoadScript);

Vue.use(VueRouter);

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    Buffer.from(base64, "base64")
      .toString("ascii")
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

const isLoginAdmin = (to, from, next) => {
  if (to.name === "AdminLogin") {
    if (localStorage.tokenAdmin) {
      const jwtPayload = parseJwt(localStorage.tokenAdmin);
      if (jwtPayload.exp < Date.now() / 1000) {
        // token expired
        localStorage.removeItem("tokenAdmin");
        localStorage.removeItem("refreshtokenAdmin");
        sessionStorage.removeItem("timeExpire");
        next();
        return;
      } else {
        next({
          path: "/dashboard",
        });
        return;
      }
    } else {
      next();
      return;
    }
  } else if (to.name === "AdminDashboard") {
    if (localStorage.getItem("tokenAdmin")) {
      const jwtPayload = parseJwt(localStorage.tokenAdmin);
      if (jwtPayload.exp < Date.now() / 1000) {
        // token expired
        localStorage.removeItem("tokenAdmin");
        localStorage.removeItem("refreshtokenAdmin");
        sessionStorage.removeItem("timeExpire");
        next({
          path: "/admin",
        });
        return;
      } else {
        next();
        return;
      }
    } else {
      next({
        path: "/admin",
      });
      return;
    }
  }
};

const isLoginUser = (to, from, next) => {
  if (to.name === "UserLogin") {
    if (localStorage.getItem("tokenUser")) {
      const jwtPayloadUser = parseJwt(localStorage.tokenUser);
      if (jwtPayloadUser.exp < Date.now() / 1000) {
        localStorage.removeItem("tokenUser");
        localStorage.removeItem("tokenRefreshUser");
        sessionStorage.removeItem("timeExpireUser");
        next();
        return;
      } else {
        next({
          path: "/usergame",
        });
        return;
      }
    } else {
      next();
      return;
    }
  } else if (to.name === "UserGame") {
    if (localStorage.getItem("tokenUser")) {
      const jwtPayloadUser = parseJwt(localStorage.tokenUser);
      if (jwtPayloadUser.exp < Date.now() / 1000) {
        localStorage.removeItem("tokenUser");
        localStorage.removeItem("tokenRefreshUser");
        sessionStorage.removeItem("timeExpireUser");
        next({ path: "/" });
        return;
      } else {
        next();
        return;
      }
    } else {
      next({
        path: "/",
      });
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
      path: "/usergame/",
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
