<script setup>
import SectionMain from "@/components/Section/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain class="mx-auto section">
      <div class="text-center font-semibold text-lg pb-8">Home</div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
<style scoped>
@media (min-width: 900px) {
  .section {
    width: 1000px;
  }
}
</style>
