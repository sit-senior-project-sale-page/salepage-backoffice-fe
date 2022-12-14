<script setup>
import { computed, ref, toRefs } from "vue";
import CardBoxModal from "@/components/Card/CardBoxModal.vue";
import TableCheckboxCell from "@/components/Table/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";

const props = defineProps({
  checkable: Boolean,
  dataTable: { type: Array },
});

const emit = defineEmits(["menu-delete-data"]);

const deleteData = (event, index) => {
  emit("menu-delete-data", event, index);
};

const { dataTable } = toRefs(props);
const items = ref(dataTable.value);
const keyItems = ref(
  dataTable.value.length > 0 ? Object.keys(dataTable.value[0]) : {}
);

// watch(
//   () => dataTable.value,
//   () => {
//     keyItems.value = Object.keys(items.value[0]);
//   }
// );

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(5);

const currentPage = ref(0);

const checkedRows = ref([]);

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
};

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client);
  } else {
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === client.id
    );
  }
};
</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Sample modal">
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Please confirm"
    button="danger"
    has-cancel
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
    >
      {{ checkedRow.name }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th v-for="(column, index) in keyItems" :key="index">
          {{ column.toUpperCase() }}
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(client, indexColumnClient) in itemsPaginated"
        :key="client.name"
      >
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, client)"
        />
        <td v-for="(column, indexColumn) in keyItems" :key="indexColumn">
          {{ client[column] ?? "No data found" }}
        </td>
        <td>
          <BaseButton
            type="reset"
            color="danger"
            outline
            label="Delete"
            @click="deleteData($event, indexColumnClient)"
          />
        </td>
      </tr>
    </tbody>
  </table>

  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
