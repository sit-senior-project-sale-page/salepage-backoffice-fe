<script setup>
import { ref } from "vue";

const userSwitchVal = ref(false);

const props = defineProps({
  user: Object,
});

console.log(props.user);
</script>

<template>
  <div
    class="mt-10 text-sm font-light rounded-2xl bg-white p-6 text-black md:hidden space-y-3"
    style="border-color: #000000; border-width: 1.5px"
  >
    <div class="text-xl font-semibold mb-5">Monthly subscribtion</div>

    <div
      v-if="plan == 'starter'"
      class="p-3 rounded-lg"
      style="border-color: #20293a; border-width: 1.5px"
    >
      <div class="font-semibold mb-3" style="color: #20293a">Starter Plan</div>
      <div class="rounded-lg text-xl font-medium plan2">
        <span class="mr-5">299 THB</span><span>1 SalePage</span>
      </div>
      <div class="rounded-lg text-xl font-medium plan2"></div>
    </div>
    <div
      v-if="plan != 'starter'"
      class="p-3 rounded-lg"
      style="border-color: #c5d4e1; border-width: 1.5px"
      @click="plan = 'starter'"
    >
      <div class="font-semibold mb-3" style="color: #20293a">Starter Plan</div>
      <div class="rounded-lg text-xl font-medium plan2">
        <span class="mr-5">299 THB</span><span>1 SalePage</span>
      </div>
      <div class="rounded-lg text-xl font-medium plan2"></div>
    </div>

    <div
      v-if="plan == 'business'"
      class="p-3 rounded-lg"
      style="border-color: #20293a; border-width: 1.5px"
    >
      <div class="font-semibold mb-3" style="color: #20293a">Starter Plan</div>
      <div class="rounded-lg text-xl font-medium plan2">
        <span class="mr-5">1299 THB</span><span>5 SalePage</span>
      </div>
      <div class="rounded-lg text-xl font-medium plan2"></div>
    </div>
    <div
      v-if="plan != 'business'"
      class="p-3 rounded-lg"
      style="border-color: #c5d4e1; border-width: 1.5px"
      @click="plan = 'business'"
    >
      <div class="font-semibold mb-3" style="color: #20293a">Starter Plan</div>
      <div class="rounded-lg text-xl font-medium plan2">
        <span class="mr-5">1299 THB</span><span>5 SalePage</span>
      </div>
      <div class="rounded-lg text-xl font-medium plan2"></div>
    </div>
  </div>
  <div
    class="mt-10 text-sm font-light rounded-2xl bg-white p-6 text-black hidden md:block"
    style="border-color: #000000; border-width: 1.5px"
  >
    <div class="text-xl font-semibold mb-5">Monthly subscribtion</div>
    <div class="grid grid-cols-3">
      <div></div>
      <div
        v-if="plan == 'starter'"
        class="p-2 md:px-4 mx-auto rounded-lg text-center text-white font-semibold cursor-pointer plan1"
      >
        Starter Plan
      </div>
      <div
        v-if="plan != 'starter'"
        class="p-2 md:px-4 mx-auto rounded-lg text-center text-white font-semibold cursor-pointer deselect1"
        @click="plan = 'starter'"
      >
        Starter Plan
      </div>
      <div
        v-if="plan == 'business'"
        class="p-2 px-4 mx-auto rounded-lg text-center text-white font-semibold cursor-pointer plan1"
      >
        Business Plan
      </div>
      <div
        v-if="plan != 'business'"
        class="p-2 px-4 mx-auto rounded-lg text-center text-white font-semibold cursor-pointer deselect1"
        @click="plan = 'business'"
      >
        Business Plan
      </div>
    </div>

    <div class="grid grid-cols-3 my-5">
      <div class="font-light my-auto">Price</div>
      <div
        v-if="plan == 'starter'"
        class="mx-auto rounded-lg text-center text-xl font-medium plan2"
      >
        299 THB
      </div>
      <div
        v-if="plan != 'starter'"
        class="mx-auto rounded-lg text-center text-xl font-medium deselect2"
      >
        299 THB
      </div>
      <div
        v-if="plan == 'business'"
        class="mx-auto rounded-lg text-center text-xl font-medium plan2"
      >
        1299 THB
      </div>
      <div
        v-if="plan != 'business'"
        class="mx-auto rounded-lg text-center text-xl font-medium deselect2"
      >
        1299 THB
      </div>
    </div>

    <div
      class="w-full my-auto"
      style="height: 0.5px; background-color: #000000"
    />

    <div class="grid grid-cols-3 mt-5">
      <div class="font-light my-auto">SalePage Amount</div>
      <div
        v-if="plan == 'starter'"
        class="mx-auto rounded-lg text-center text-xl font-medium plan2"
      >
        1
      </div>
      <div
        v-if="plan != 'starter'"
        class="mx-auto rounded-lg text-center text-xl font-medium deselect2"
      >
        1
      </div>
      <div
        v-if="plan == 'business'"
        class="mx-auto rounded-lg text-center text-xl font-medium plan2"
      >
        5
      </div>
      <div
        v-if="plan != 'business'"
        class="mx-auto rounded-lg text-center text-xl font-medium deselect2"
      >
        5
      </div>
    </div>
  </div>
</template>
