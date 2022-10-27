<script setup>
import { ref, toRefs } from "vue";
const props = defineProps({
  orderProps: Object,
});

const { orderProps } = toRefs(props);
const order = ref(orderProps.value);
</script>
<template>
  <div
    style="border-width: 1px; border-color: #dfdfdf; height: 70px"
    class="card bg-white rounded-xl mx-auto p-2 md:px-3 flex space-x-3 justify-center mb-3 cursor-pointer"
  >
    <div
      class="font-bold text-center text-xs my-auto text-black"
      style="font-size: 10px"
    >
      <div>
        {{ new Date(order.createdAt).getDate() }}/
        {{ new Date(order.createdAt).getMonth() }}/
      </div>
      <div class="-mt-1">{{ new Date(order.createdAt).getFullYear() }}</div>
    </div>
    <div class="font-bold text-left text-sm my-auto">
      <div style="font-size: 10px">
        <span class="font-light text-black">order number:</span>
        <span style="color: #ffb522">{{ order.uid }}</span>
      </div>
      <div
        class="font-semibold -mt-1 text-ellipsis whitespace-nowrap overflow-hidden"
        style="color: #0f385f; width: 136px"
      >
        {{ order.customerName }}
      </div>
    </div>
    <div class="flex">
      <div class="md:flex md:space-x-3 my-auto">
        <div class="text-center my-auto flex md:flex-col">
          <div
            class="font-light hidden md:block"
            style="color: #8f8f8f; font-size: 10px"
          >
            TOTAL
          </div>
          <div style="color: #ffb522" class="font-semibold text-sm">
            {{ order.totalAmount }} ฿
          </div>
        </div>
        <div class="text-center my-auto flex md:flex-col">
          <div
            class="font-light hidden md:block"
            style="color: #8f8f8f; font-size: 10px"
          >
            PARCEL STATUS
          </div>
          <div style="color: #35c502" class="font-semibold text-sm">
            {{ order.status }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
