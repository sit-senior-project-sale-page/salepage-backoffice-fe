import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";

export const useUsersStore = defineStore({
  id: "users",
  state: () => ({
    user: {},
    loading: false,
    error: {},
    statusSuccess: false,
    statusError: false,
  }),
  actions: {
    async profile() {
      fetchWrapper
        .get("user/profile")
        .then((user) => (this.user = user.data))
        .catch((error) => ((this.error = error), (this.statusError = true)));
    },
    async updateprofile(user) {
      this.loading = true;
      fetchWrapper
        .post("user/profile", user)
        .then(() => ((this.loading = false), (this.statusSuccess = true)))
        .catch(
          (error) => (
            (this.error = error),
            (this.statusError = true),
            (this.loading = false)
          )
        );
    },
    async updatepassword(data) {
      this.loading = true;
      fetchWrapper
        .post("user/profile/changepassword", data)
        .then(() => ((this.loading = false), (this.statusSuccess = true)))
        .catch(
          (error) => (
            console.log(error),
            (this.error = error),
            (this.statusError = true),
            (this.loading = false)
          )
        );
    },
  },
});
