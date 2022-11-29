<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
} from "@mdi/js";
import SectionMain from "@/components/Section/SectionMain.vue";
import CardBoxWidget from "@/components/Card/CardBoxWidget.vue";
import CardBox from "@/components/Card/CardBox.vue";
import CardBoxComponentEmpty from "@/components/Card/CardBoxComponentEmpty.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/Section/SectionTitleLineWithButton.vue";
import OrderCard from "../components/Order/OrderCard.vue";
import OrderDetail from "../components/Order/OrderDetail.vue";
import CardBoxModal from "@/components/Card/CardBoxModal.vue";
import { useRoute } from "vue-router";

const mainStore = useMainStore();

const route = useRoute();

mainStore.fetch("orderBySiteId", `order/site/${route.params.id}`);

const orders = computed(() => mainStore.orderBySiteId);

const orderClickById = ref({});
const modalOneActive = ref(false);

const click = (order) => {
  orderClickById.value = order;
  modalOneActive.value = true;
};

const orderWait = (array) => {
  return array.filter((o) => o.status == "WAIT").length;
};

const orderApprove = (array) => {
  return array.filter((o) => o.status == "APPROVE").length;
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="Overview Site"
      >
      </SectionTitleLineWithButton>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          color="text-blue-500"
          :icon="mdiCartOutline"
          :number="orders.length"
          label="Order All"
        />
        <CardBoxWidget
          color="text-yellow-500"
          :icon="mdiCartOutline"
          :number="orderWait(orders)"
          label="Order Wait"
        />
        <CardBoxWidget
          color="text-emerald-500"
          :icon="mdiCartOutline"
          :number="orderApprove(orders)"
          label="Order Approve"
        />
      </div>

      <SectionTitleLineWithButton :icon="mdiAccountMultiple" title="Order" />
      <CardBox>
        <div v-if="orders.length > 0">
          <div
            class="grid gap-y-3 justify-items-center md:grid-cols-2 xl:grid-cols-3"
          >
            <OrderCard
              v-for="order in orders"
              :key="order.id"
              :order-props="order"
              @click="click(order)"
            />
          </div>
        </div>
        <div v-else>
          <CardBoxComponentEmpty />
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
