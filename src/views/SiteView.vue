<script setup>
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { computed } from "vue";
import Swal from "sweetalert2";
import { RouterLink } from "vue-router";
import { useMainStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import SiteCard from "../components/SiteCard.vue";

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

const siteDate = computed(() => sites.value);
console.log("🚀 ~ file: SiteView.vue ~ line 30 ~ siteDate", siteDate);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain form color="white" class="mx-auto section rounded-lg">
      <CardBox class="mb-6 sm:pb-12">
        <div class="text-center font-semibold text-lg pb-8">My SalePage</div>
        <div v-if="siteDate.length > 0" class="grid lg:grid-cols-2 gap-y-7 lg:w-10/12 mx-auto">
          <SiteCard
            v-for="site in siteDate"
            :key="site.id"
            :site-props="site"
          />
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
