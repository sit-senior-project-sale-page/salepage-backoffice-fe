<script setup>
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { computed } from "vue";
import Swal from "sweetalert2";
import { RouterLink } from "vue-router";
import { useMainStore } from "@/stores/main";
import { storeToRefs } from "pinia";

const mainStore = useMainStore();
mainStore
  .fetch(
    "sites",
    `site?${new URLSearchParams({
      search: "product",
    })}`
  )
  .catch((error) => {
    Swal.fire({
      title: "Error",
      text: error,
      icon: "error",
    });
  });

const { sites } = storeToRefs(useMainStore());
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain
      form
      color="white"
      class="mx-auto section rounded-lg"
      @submit.prevent="submit"
    >
      <CardBox class="mb-6 pb-12">
        <div class="text-center font-semibold text-lg pb-8">My SalePage</div>
        <div class="grid md:grid-cols-3 gap-y-8">
          <div v-for="site in sites" :key="site.id">
            <div class="h-40 w-40 rounded-lg mx-auto mb-3 overflow-hidden">
              <img
                :src="site.Product.ProductImage[0].data"
                class="hover:scale-110 transition-all cursor-pointer"
              />
            </div>
            <div class="font-medium text-center capitalize">
              <span class="cursor-pointer transition-all">{{
                site.domain
              }}</span
              ><br />
              <RouterLink
                :to="`/edit/site/${site.id}`"
                class="my-1 mr-1 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
              >
                View Detail
              </RouterLink>
              <RouterLink
                :to="`/site/${site.id}`"
                class="my-1 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                View Order
              </RouterLink>
            </div>
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<style scoped>
@media (min-width: 900px) {
  .section {
    width: 860px;
  }
}
</style>
