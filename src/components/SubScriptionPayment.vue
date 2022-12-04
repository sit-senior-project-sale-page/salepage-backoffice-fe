<script setup>
const props = defineProps({
  plan: String,
});

console.log(props.plan);
</script>

<template>
  <div
    class="mt-10 text-sm font-light rounded-2xl bg-white p-6 text-black md:space-y-3"
    style="border-color: #000000; border-width: 1.5px"
  >
    <div class="text-xl font-semibold mb-5">
      Please Deposit To Bank KTB 7340605223
    </div>

    <div
      v-if="props.plan == 'STARTER'"
      class="p-3 rounded-lg"
      style="border-color: #20293a; border-width: 1.5px"
    >
      <div class="font-semibold mb-3" style="color: #20293a">Starter Plan</div>
      <div class="rounded-lg text-xl font-medium plan2">
        <span class="mr-5">Amount 299 THB</span><span>1 SalePage</span>
      </div>
      <div class="rounded-lg text-xl font-medium plan2"></div>
    </div>

    <div
      v-if="props.plan == 'BUSINESS'"
      class="p-3 rounded-lg"
      style="border-color: #c5d4e1; border-width: 1.5px"
    >
      <div class="font-semibold mb-3" style="color: #20293a">Business Plan</div>
      <div class="rounded-lg text-xl font-medium plan2">
        <span class="mr-5">Amount 1299 THB</span><span>5 SalePage</span>
      </div>
      <div class="rounded-lg text-xl font-medium plan2"></div>
    </div>
  </div>
</template>
