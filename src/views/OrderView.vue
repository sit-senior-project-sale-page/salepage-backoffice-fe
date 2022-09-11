<script setup>
import { mdiTableBorder } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import TableSampleDynamic from "../components/TableSampleDynamic.vue";
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Orders" main>
      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>
        <TableSampleDynamic checkable data-fetch="order" />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
