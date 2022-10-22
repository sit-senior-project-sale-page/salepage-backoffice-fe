import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";

export const useUsersStore = defineStore({
  id: "users",
  state: () => ({
    users: {},
  }),
  actions: {
    async profile() {
      this.users = { loading: true };
      fetchWrapper
        .get("user/profile")
        .then((users) => (this.users = users))
        .catch((error) => (this.users = { error }));
    },
  },
});
