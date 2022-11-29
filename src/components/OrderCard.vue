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
    class="card bg-white rounded-xl p-2 md:px-3 flex justify-center cursor-pointer"
  >
    <div
      class="font-bold text-center text-xs my-auto text-black mr-2"
      style="font-size: 10px"
    >
      <div>
        {{ new Date(order.createdAt).getDate() }}
        {{ month[new Date(order.createdAt).getMonth() - 1] }}
      </div>
      <div class="-mt-1">{{ new Date(order.createdAt).getFullYear() }}</div>
    </div>
    <div class="font-bold text-left text-sm my-auto" style="color: #ffb522">
      <div
        class="text-ellipsis whitespace-nowrap overflow-hidden"
        style="font-size: 10px; width: 136px"
      >
        <span class="font-light text-black">order number: </span>
        <span>{{ order.uid }}</span>
      </div>
      <div
        class="font-semibold -mt-1 text-ellipsis whitespace-nowrap overflow-hidden"
        style="color: #0f385f; width: 136px"
      >
        {{ order.customerName }}
      </div>
    </div>
    <div class="flex">
      <div class="md:flex my-auto w-20 md:w-auto">
        <div class="text-center my-auto flex md:flex-col">
          <div
            class="font-light hidden md:block"
            style="color: #8f8f8f; font-size: 10px"
          >
            TOTAL
          </div>
          <div style="color: #ffb522" class="font-semibold text-sm mx-auto">
            {{ order.totalAmount }} ฿
          </div>
        </div>
        <div class="text-center my-auto flex md:flex-col md:w-20">
          <div
            class="font-light hidden md:block"
            style="color: #8f8f8f; font-size: 10px"
          >
            STATUS
          </div>
          <div style="color: #35c502" class="font-semibold text-sm mx-auto">
            {{ order.status }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      month: [
        "Jan",
        "Febr",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    };
  },
  mounted() {
    // console.log(Date(order.createdAt).getMonth());
  },
};
</script>
<style scoped>
.card {
  width: 100%;
}
@media (min-width: 425px) {
  .card {
    width: 330px;
  }
}
</style>
