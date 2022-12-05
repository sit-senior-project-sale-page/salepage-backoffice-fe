import { defineStore } from "pinia";
import { fetchWrapper } from "@/helpers";
import router from "../router";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("user")),
    type: localStorage.getItem("type"),
    accessToken: localStorage.getItem("accessToken"),
    returnUrl: null,
    loadingPost: false,
  }),
  actions: {
    async login(username, password, app = "USER") {
      const user = await fetchWrapper.post(`auth/login`, {
        username,
        password,
        app: app,
      });

      if (user) {
        this.accessToken = user?.data.accessToken;
        const profile = await fetchWrapper.get(`user/profile`);
        this.user = profile.data;
      }

      if (app == "ADMIN") {
        localStorage.setItem("type", 1);
      }
      localStorage.setItem("user", JSON.stringify(this.user));
      localStorage.setItem("accessToken", this.accessToken);

      // redirect to previous url or default to home page
      router.push(this.returnUrl || "/");
    },

    logout() {
      this.user = null;
      this.accessToken = null;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("type");
      router.push("/login");
    },

    async register(data) {
      this.loadingPost = true;
      return await fetchWrapper.post(`register`, data);
    },
  },
});
