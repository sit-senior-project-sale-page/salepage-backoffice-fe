<script setup>
import { ref, toRefs } from "vue";
const props = defineProps({
  siteProps: Object,
});

const { siteProps } = toRefs(props);
const site = ref(siteProps.value);
</script>

<template>
  <div class="bg-white rounded-xl box mx-auto p-5 justify-center">
    <div class="mr-3">
      <img
        :src="site?.Product?.ProductImage[0]?.data"
        class="rounded-lg object-cover hover:scale-110"
      />
    </div>
    <div class="font-medium capitalize text-left flex flex-col justify-between">
      <div class="cursor-pointer transition-all text-black sitename text-center text-lg pt-3">
        {{ site?.domain }}
      </div>
      <div class="flex space-x-1 mt-5">
        <RouterLink
          :to="`/edit/site/${site.id}`"
          class=" py-2 px-3 text-xs font-medium text-center rounded-md text-black w-full sm:w-auto hover:bg-gray-100"
          style="border-color: #000000; border-width: 1.5px"
        >
          View Detail
        </RouterLink>
        <RouterLink
          :to="`/site/${site.id}`"
          class=" py-2 px-3 text-xs font-medium text-center rounded-md text-black w-full sm:w-auto hover:bg-gray-100"
          style="border-color: #000000; border-width: 1.5px"
        >
          View Order
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 640px) {
  .box {
    display: flex;
    width: 360px;
  }
  img {
    width: 120px !important;
    height: 120px !important;
  }
  .sitename{
    text-align: left;
  }
}
</style>
