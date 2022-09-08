<script setup>
import { reactive, ref } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiBallotOutline,
  mdiAccount,
  mdiDomain,
  mdiLink,
  mdiWarehouse,
  mdiRenameBox,
  mdiCards,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import TableList from "@/components/TableList.vue";

// const selectOptions = [
//   { id: 1, label: "Business development" },
//   { id: 2, label: "Marketing" },
//   { id: 3, label: "Sales" },
// ];

const mainStore = useMainStore();

const initProductOptionData = {
  name: "",
  quantity: null,
  price: null,
  discountPrice: null,
};
let productOption = reactive({ ...initProductOptionData });

const form = reactive({
  memberId: 1,
  domain: "",
  shortLink: "",
  lineAccountId: "",
  messengerAccountId: "",
  product: {
    name: "",
    detail: "",
    discountCode: "",
    productOption: [],
  },
});

const customElementsForm = reactive({
  checkbox: ["lorem"],
  radio: "one",
  switch: ["one"],
  file: null,
});

const submit = () => {
  console.log("form", form);
  mainStore.post("site", { ...form });
};

const addProductOption = () => {
  const productOptionData = { ...productOption };
  form.product.productOption.push(productOptionData);
  Object.assign(productOption, initProductOptionData);
};

const modalOneActive = ref(false);

// const formStatusWithHeader = ref(false);

// const formStatusCurrent = ref(0);

// const formStatusOptions = ["info", "success", "danger", "warning"];

// const formStatusSubmit = () => {
//   formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
//     ? formStatusCurrent.value + 1
//     : 0;
// };
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain form @submit.prevent="submit">
      <SectionTitleLineWithButton
        :icon="mdiBallotOutline"
        title="Create Site"
        main
      >
      </SectionTitleLineWithButton>
      <CardBox>
        <FormField label="ข้อมูลเว็บไซต์">
          <FormControl
            v-model="form.domain"
            :icon="mdiDomain"
            placeholder="xxxx.dmr.co.th"
          />
          <FormControl
            v-model="form.shortLink"
            :icon="mdiLink"
            placeholder="Short Link"
          />
        </FormField>

        <FormField label="ข้อมูลการติดต่อ">
          <FormControl
            v-model="form.lineAccountId"
            :icon="mdiAccount"
            placeholder="Line ID"
          />
          <FormControl
            v-model="form.messengerAccountId"
            type="shortLink"
            :icon="mdiAccount"
            placeholder="Facebook Messager ID"
          />
        </FormField>
      </CardBox>

      <SectionTitleLineWithButton :icon="mdiWarehouse" title="Create Product">
      </SectionTitleLineWithButton>
      <CardBox>
        <FormField label="ข้อมูลสินค้า">
          <FormControl
            v-model="form.product.name"
            :icon="mdiRenameBox"
            placeholder="ชื่อสินค้า"
          />
          <FormControl
            v-model="form.product.discountCode"
            :icon="mdiCards"
            placeholder="โค้ดส่วนลด"
          />
        </FormField>

        <!-- <FormField label="Dropdown">
          <FormControl v-model="form.department" :options="selectOptions" />
        </FormField> -->

        <BaseDivider />

        <FormField
          label="รายละเอียดสินค้า"
          help="Your detail. Max 255 characters"
        >
          <FormControl
            v-model="form.product.detail"
            type="textarea"
            placeholder="Explain your product detail"
          />
        </FormField>

        <FormField label="ภาพสินค้า">
          <FormFilePicker v-model="customElementsForm.file" label="Upload" />
        </FormField>

        <CardBoxModal
          v-model="modalOneActive"
          title="Please confirm action"
          button-label="Confirm"
          has-cancel
          @confirm="addProductOption"
        >
          <FormField label="ชื่อตัวเลือกสินค้า">
            <FormControl
              v-model="productOption.name"
              :icon="mdiDomain"
              placeholder="ชื่อตัวเลือกสินค้า"
            />
            <FormControl
              v-model="productOption.quantity"
              :icon="mdiLink"
              placeholder="จำนวนสินค้า"
              type="number"
            />

            <FormControl
              v-model="productOption.price"
              :icon="mdiAccount"
              placeholder="ราคา"
              type="number"
            />
            <FormControl
              v-model="productOption.discountPrice"
              :icon="mdiAccount"
              placeholder="ราคาส่วนลด (ถ้ามี)"
              type="number"
            />
          </FormField>
        </CardBoxModal>

        <FormField label="ตัวเลือกสินค้า">
          <BaseButton
            label="เพิ่มตัวเลือกสินค้า"
            color="info"
            @click="modalOneActive = true"
          />
        </FormField>

        <FormField label="ตัวเลือกสินค้า">
          <CardBox>
            <CardBoxComponentEmpty
              v-if="form.product.productOption.length === 0"
            />
            <TableList
              v-if="form.product.productOption.length > 0"
              :data-table="form.product.productOption"
            />
          </CardBox>
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton
              type="submit"
              color="info"
              label="Submit"
              @click="submit"
            />
            <BaseButton type="reset" color="info" outline label="Reset" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
