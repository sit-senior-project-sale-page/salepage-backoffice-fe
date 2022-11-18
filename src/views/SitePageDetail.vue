<script setup>
import { computed, ref, onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
} from "@mdi/js";
import * as chartConfig from "@/components/Charts/chart.config.js";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxTransaction from "@/components/CardBoxTransaction.vue";
import CardBoxClient from "@/components/CardBoxClient.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import OrderCard from "../components/OrderCard.vue";
import OrderDetail from "../components/OrderDetail.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import { useRoute } from "vue-router";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";

const chartData = ref(null);

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData();
};

onMounted(() => {
  fillChartData();
  // setInterval(loop, 2000);
});

const mainStore = useMainStore();

const clientBarItems = computed(() => mainStore.clients.slice(0, 4));

const transactionBarItems = computed(() => mainStore.history);

const route = useRoute();

mainStore.fetch("orderBySiteId", `order/site/${route.params.id}`);

const orders = computed(() => mainStore.orderById);
console.log("🚀 ~ file: SitePageDetail.vue ~ line 44 ~ orders", orders);

const orderClickById = ref({});
const modalOneActive = ref(false);
const click = (order) => {
  orderClickById.value = order;
  modalOneActive.value = true;
};
const orderWait = (array) => {
  return array.filter((o) => (o.status = "WAIT")).length;
};

const orderApprove = (array) => {
  return array.filter((o) => (o.status = "APPROVE")).length;
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

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col justify-between">
          <CardBoxTransaction
            v-for="(transaction, index) in transactionBarItems"
            :key="index"
            :amount="transaction.amount"
            :date="transaction.date"
            :business="transaction.business"
            :type="transaction.type"
            :name="transaction.name"
            :account="transaction.account"
          />
        </div>
        <div class="flex flex-col justify-between">
          <CardBoxClient
            v-for="client in clientBarItems"
            :key="client.id"
            :name="client.name"
            :login="client.login"
            :date="client.created"
            :progress="client.progress"
          />
        </div>
      </div>

      <SectionTitleLineWithButton :icon="mdiAccountMultiple" title="Order" />
      <CardBox class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="grid col2">
          <div v-for="order in orders" :key="order.id">
            <OrderCard :order-props="order" @click="click(order)" />
          </div>
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
