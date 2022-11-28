import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { fetchWrapper } from "../helpers/fetch-wrapper";
const routes = [
  // {
  //   // Document title tag
  //   // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
  //   meta: {
  //     title: "Dashboard",
  //   },
  //   path: "/",
  //   name: "dashboard",
  //   component: () => import("@/views/HomeView.vue"),
  // },
  {
    meta: {
      title: "Tables",
    },
    path: "/tables",
    name: "tables",
    component: () => import("@/views/TablesView.vue"),
  },
  {
    meta: {
      title: "Sites",
    },
    path: "/",
    name: "sites",
    component: () => import("@/views/SiteView.vue"),
  },
  {
    meta: {
      title: "Sites",
    },
    path: "/site/:id",
    name: "sites-view",
    component: () => import("@/views/SitePageDetail.vue"),
  },
  {
    meta: {
      title: "Products",
    },
    path: "/products",
    name: "products",
    component: () => import("@/views/ProductView.vue"),
  },
  // {
  //   meta: {
  //     title: "Orders",
  //   },
  //   path: "/orders",
  //   name: "orders",
  //   component: () => import("@/views/OrderView.vue"),
  // },
  {
    meta: {
      title: "Subscription",
    },
    path: "/subscription",
    name: "Subscription",
    component: () => import("@/views/Subscription.vue"),
  },
  {
    meta: {
      title: "Forms",
    },
    path: "/forms",
    name: "forms",
    component: () => import("@/views/FormsView.vue"),
  },
  {
    meta: {
      title: "Create Site",
    },
    path: "/create-salepage",
    name: "create-salepage",
    component: () => import("@/views/CreateSite.vue"),
  },
  {
    meta: {
      title: "Edit Site",
    },
    path: "/edit/site/:id",
    name: "edit-salepage",
    component: () => import("@/views/EditSite.vue"),
  },
  {
    meta: {
      title: "Profile",
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
  },
  {
    meta: {
      title: "Ui",
    },
    path: "/ui",
    name: "ui",
    component: () => import("@/views/UiView.vue"),
  },
  // {
  //   meta: {
  //     title: "Responsive layout",
  //   },
  //   path: "/responsive",
  //   name: "responsive",
  //   component: () => import("@/views/ResponsiveView.vue"),
  // },
  {
    meta: {
      title: "Login",
    },
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    meta: {
      title: "Signup",
    },
    path: "/signup",
    name: "Signup",
    component: () => import("@/views/SignupView.vue"),
  },
  {
    meta: {
      title: "Error",
    },
    path: "/error",
    name: "error",
    component: () => import("@/views/ErrorView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (!auth.user && auth.accessToken) {
    const profile = await fetchWrapper.get(`user/profile`);
    localStorage.setItem("user", JSON.stringify(profile.data));
  }

  if (auth.user && !auth.accessToken) {
    localStorage.removeItem("user");
  }

  if (authRequired && !auth.accessToken) {
    auth.returnUrl = to.fullPath;
    return "/login";
  }
});

export default router;
