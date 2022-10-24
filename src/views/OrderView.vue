<script setup>
import { mdiTableBorder } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import TableSampleDynamic from "../components/TableSampleDynamic.vue";
import OrderDetail from "../components/OrderDetail.vue";
import OrderCard from "../components/OrderCard.vue";
import { ref } from "vue";
import CardBoxModal from "@/components/CardBoxModal.vue";

const modalOneActive = ref(false);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain
      form
      color="white"
      class="mx-auto section rounded-lg"
      @submit.prevent="submit"
    >
      <CardBox class="mb-6">
        <div class="text-center font-semibold text-lg pb-8">Orders</div>
        <!-- <div class="grid col2" data-fetch="order" v-for="order in order" :key="order"> -->
        <div class="grid col2">
          <OrderCard @click="modalOneActive = true" />
        </div>

        <!-- <TableSampleDynamic checkable data-fetch="order" /> -->
      </CardBox>
    </SectionMain>

    <CardBoxModal v-model="modalOneActive" button-label="Confirm">
      <div class="rounded-lg overflow-hidden mx-2">
        <OrderDetail />
      </div>
    </CardBoxModal>
  </LayoutAuthenticated>
</template>

<style scoped>
@media (min-width: 768px) {
  .card {
    width: 360px;
  }
}
@media (min-width: 900px) {
  .section {
    width: 860px;
  }
  .col2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
.detail {
  position: absolute;
  top: 0px;
  height: 100vh;
  width: 100vw;
  overflow: auto;
}
@media (min-width: 1280px) {
  .detail {
  }
}
</style>
