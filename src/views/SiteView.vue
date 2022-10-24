<script setup>
import { mdiTableBorder } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import TableSampleDynamic from "../components/TableSampleDynamic.vue";
import { reactive, ref, computed } from "vue";

import { useMainStore } from "@/stores/main";

const img = ref(
  "https://cf.shopee.co.th/file/f4b555ec1103020de76771be403c4bcc"
);

const mainStore = useMainStore();
mainStore.fetch("site");

const sites = computed(() => mainStore.site);
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
              <img :src="img" class="hover:scale-110 transition-all" />
            </div>
            <div class="font-medium text-center">{{ site.domain }}</div>
          </div>
        </div>
      </CardBox>
      <!-- <TableSampleDynamic data-fetch="site" /> -->
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
