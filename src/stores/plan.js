import { defineStore } from "pinia";
import { fetchWrapper } from "@/helpers";

export const usePlanStore = defineStore("plan", {
  state: () => ({
    plan: {},
    loading: false,
    loadingPost: false,
  }),
  getters: {
    getPlan: (state) => {
      return () => state.plan;
    },
  },
  actions: {
    async fetchPlan() {
      this.loading = true;
      try {
        this.plan = await fetchWrapper
          .get(`user/plan`)
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async registerPlan(data) {
      this.loadingPost = true;
      return await fetchWrapper.post(`user/plan`, data);
    },
  },
});
