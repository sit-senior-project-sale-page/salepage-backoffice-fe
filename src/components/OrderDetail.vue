<script setup>
import FormControl from "@/components/FormControl.vue";
import { ref, toRefs } from "vue";
import { useMainStore } from "@/stores/main";
import Swal from "sweetalert2";
import { storeToRefs } from "pinia";
import BaseButton from "@/components/BaseButton.vue";
const mainStore = useMainStore();

const { loading } = storeToRefs(useMainStore());

const props = defineProps({
  orderProps: Object,
});

const { orderProps } = toRefs(props);
const order = ref(orderProps.value);

console.log("order", order);

const trackingNumber = ref("");
const shippedBy = ref("");

const cancleOrder = async (orderId) => {
  const response = await mainStore.post(`order/receive/${orderId}`, {
    status: false,
  });
  console.log(response);
  if (response) {
    Swal.fire({
      title: "Success",
      text: "ยกเลิกออเดอร์สำเร็จ",
      icon: "success",
      toast: true,
      position: "top-right",
    });
  } else {
    Swal.fire({
      title: "Error",
      text: "ยกเลิกออเดอร์ไม่สำเร็จ",
      icon: "error",
      toast: true,
      position: "top-right",
    });
  }
};

const sendCustomerReceipt = async (orderId) => {
  const response = await mainStore.post(`order/receive/${orderId}`, {
    status: true,
  });
  console.log(response);
  if (response) {
    Swal.fire({
      title: "Success",
      text: "ส่งอีเมลคอมเฟิร์มการสั่งซื้อสำเร็จ",
      icon: "success",
      toast: true,
      position: "top-right",
    });
  } else {
    Swal.fire({
      title: "Error",
      text: "ส่งอีเมลคอมเฟิร์มการสั่งซื้อไม่สำเร็จ",
      icon: "error",
      toast: true,
      position: "top-right",
    });
  }
};

const sendCustomerTrackingNumber = async (orderId) => {
  if (trackingNumber.value === "") {
    Swal.fire({
      title: "ข้อมูลไม่ครบ",
      text: "โปรดกรอกหมายเลขการส่งสินค้า",
      icon: "warning",
      toast: true,
      position: "top-right",
    });
  } else if (shippedBy.value === "") {
    Swal.fire({
      title: "ข้อมูลไม่ครบ",
      text: "โปรดกรอกบริษัทขนส่งสินค้า",
      icon: "warning",
      toast: true,
      position: "top-right",
    });
  } else {
    const response = await mainStore.post(`order/shipped/${orderId}`, {
      trackingNumber: trackingNumber.value,
      shippedBy: shippedBy.value,
    });
    console.log(response);
    if (response) {
      Swal.fire({
        title: "Success",
        text: "ส่งอีเมลคอมเฟิร์มการสั่งซื้อสำเร็จ",
        icon: "success",
        toast: true,
        position: "top-right",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "ส่งอีเมลคอมเฟิร์มการสั่งซื้อไม่สำเร็จ",
        icon: "error",
        toast: true,
        position: "top-right",
      });
    }
  }
};
</script>
<template>
  <!-- <div class="absolute top-0 w-screen h-screen overflow-auto z-20 bg pt-24"> -->
  <div class="lg:p-5 pt-10 mx-auto text-dark dark:text-slate-100">
    <div class="text-center">
      <div class="text-2xl font-bold">
        Order <span style="color: #ffb522">#{{ order.uid }}</span>
      </div>
      <div class="font-light text-sm text-gray-400">
        {{ new Date(order.createdAt).getDate() }}/{{
          new Date(order.createdAt).getMonth()
        }}/{{ new Date(order.createdAt).getFullYear() }}
      </div>
    </div>
    <div class="w-full my-5 bg-white" style="height: 1px" />
    <div class="space-y-1">
      <div class="text-lg font-bold">Contact Info</div>
      <div class="font-light">customer : {{ order.customerName }}</div>
      <div class="font-light">
        phone number : {{ order.customerPhoneNumber }}
      </div>
      <div class="font-light">email : {{ order.customerEmail }}</div>
      <div class="font-light">
        slip : <img :src="order.customerPaymentSlip" />
      </div>
    </div>
    <div class="my-5">
      <div
        class="p-2 grid grid-cols-7 font-semibold bg-gray-800 text-white ove"
      >
        <div class="col-span-4">Item</div>
        <div class="text-center">Qty</div>
        <div class="col-span-2 text-right">Sub total</div>
      </div>

      <!-- loop order item -->

      <div v-for="orderDetail in order.orderDetail" :key="orderDetail.id">
        <div class="my-3">
          <div class="grid grid-cols-7 px-1">
            <div class="w-48 text-ellipsis col-span-4 pl-1">
              {{ orderDetail.productOption.name }}
            </div>
            <div class="my-auto px-1 text-center">
              {{ orderDetail.quantity }}
            </div>
            <div class="my-auto text-right col-span-2">
              {{ orderDetail.priceAmount }} ฿
            </div>
          </div>
          <div
            class="w-full mt-3"
            style="height: 1px; background-color: #e2e2e2"
          />
        </div>
      </div>

      <div class="text-white">
        <!-- <div class="-mt-3 p-1 grid grid-cols-5 bg-gray-800">
          <div class="col-span-2"></div>
          <div class="text-right pr-5 font-semibold col-span-2">
            Delivery fee
          </div>
          <div class="text-right">40 ฿</div>
        </div> -->
        <div class="p-1 grid grid-cols-5 bg-gray-800">
          <div class="col-span-2"></div>
          <div class="text-right pr-5 font-semibold col-span-2">Total</div>
          <div class="text-right">{{ order.totalAmount }}</div>
        </div>
      </div>
    </div>

    <div class="font-semibold my-10 space-y-5">
      <div>
        Tracking number
        <FormControl
          v-model="trackingNumber"
          placeholder="Fill the parcel tracking number"
        />
      </div>
      <div>
        Shipping by
        <FormControl v-model="shippedBy" placeholder="Ex. Kerry Express" />
      </div>
    </div>
    <div class="w-full my-5" style="height: 1px; background-color: #e2e2e2" />
    <BaseButton
      class="rounded-md text-white border-transparent p-3 w-full text-center my-5 bg-green-500 hover:bg-green-600"
      :disabled="loading"
      label="APPROVE and
    Send Customer Receipt"
      @click="sendCustomerReceipt(order.id)"
    />
    <BaseButton
      class="rounded-md border-transparent text-white p-3 w-full text-center my-5 bg-yellow-500 hover:bg-yellow-600"
      label="DELIVERED and Send Customer Parcel Tracking NO"
      @click="sendCustomerTrackingNumber(order.id)"
    />
    <BaseButton
      class="rounded-md border-transparent text-white p-3 w-full text-center my-5 bg-red-500 hover:bg-red-600"
      label="Cancle Order"
      @click="cancleOrder(order.id)"
    />
  </div>
  <!-- </div> -->
</template>
<style scoped>
.bg {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
