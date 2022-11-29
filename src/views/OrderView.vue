<script setup>
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import OrderDetail from "../components/OrderDetail.vue";
import OrderCard from "../components/OrderCard.vue";
import { ref, computed } from "vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import { useMainStore } from "@/stores/main";

defineProps({
  siteId: Number,
});
const mainStore = useMainStore();
mainStore.fetch("order", "order");

const orders = computed(() => mainStore.order);

const orderClickById = ref({});
const modalOneActive = ref(false);
const click = (order) => {
  orderClickById.value = order;
  modalOneActive.value = true;
};
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
        <div class="">
          <!-- <div v-for="order in orders" :key="order.id">
            <OrderCard :order-props="order" @click="click(order)" />
          </div> -->
        </div>
      </CardBox>
    </SectionMain>

    <CardBoxModal
      v-model="modalOneActive"
      button-label="Confirm"
      class="rounded-none"
      :has-confirm="false"
      :has-cancle="false"
    >
      <div v-if="orderClickById.id" class="overflow-hidden mx-2">
        <OrderDetail :order-props="orderClickById" />
      </div>
    </CardBoxModal>
  </LayoutAuthenticated>
</template>

<style scoped>
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
</style>
