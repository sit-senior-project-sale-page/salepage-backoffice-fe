import { defineStore } from "pinia";
import { fetchWrapper } from "@/helpers";
import router from "../router";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("user")),
    accessToken: localStorage.getItem("accessToken"),
    returnUrl: null,
  }),
  actions: {
    async login(username, password) {
      const user = await fetchWrapper.post(`auth/login`, {
        username,
        password,
      });

      if (user) {
        this.accessToken = user?.data.accessToken;
        const profile = await fetchWrapper.get(`user/profile`);
        this.user = profile.data;
      }

      // update pinia state

      // store user details and jwt in local storage to keep user logged in between page refreshes
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
      router.push("/login");
    },
  },
});
