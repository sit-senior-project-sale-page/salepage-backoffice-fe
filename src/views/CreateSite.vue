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

const mainStore = useMainStore();

const initProductOptionData = {
  name: null,
  price: null,
  discountPrice: null,
};
let productOption = reactive({ ...initProductOptionData });

const imagePreviewURL = ref("");
const initProduct = {
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
};

const form = reactive({
  ...initProduct,
});

const fileProduct = ref();

const customElementsForm = reactive({
  checkbox: ["lorem"],
  radio: "one",
  switch: ["one"],
  file: null,
});

const deleteProductOption = (event, index) => {
  form.product.productOption.splice(index, 1);
};

const reset = () => {
  Object.assign(form, { ...initProduct });
};

const submit = async () => {
  if (!form.domain) {
    alert("โปรดกรอกโดเมนเว็ยไซต์");
  } else if (!form.product.name) {
    alert("โปรดกรอกชื่อสินค้า");
  } else if (!form.product.detail) {
    alert("โปรดกรอกรายละเอียดสินค้า");
  } else {
    const formData = new FormData();
    formData.append("file", fileProduct.value);
    formData.append("site", JSON.stringify({ ...form }));
    const response = await mainStore.postFormData("site", formData);
    console.log(response);
    if (response.data.isSuccess) {
      alert("เพิ่มเว็บไซต์สำเร็จ");
      Object.assign(form, initProduct);
    } else {
      alert("เพิ่มเว็บไซต์ไม่สำเร็จ");
    }
  }
};

const addProductOption = () => {
  const productOptionData = { ...productOption };
  form.product.productOption.push(productOptionData);
  Object.assign(productOption, initProductOptionData);
};

const onFileChange = (e) => {
  e.preventDefault();
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  if (files) {
    imagePreviewURL.value = URL.createObjectURL(files[0]);
    URL.revokeObjectURL(files);
  } else {
    imagePreviewURL.value = "";
  }
  fileProduct.value = files[0];
};

const modalOneActive = ref(false);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain form @submit.prevent="submit" class="mx-auto section">
      <CardBox>
        <div class="text-center font-semibold text-lg pb-8">
          Create SalePage
        </div>
        <FormField label="Website name">
          <FormControl
            v-model="form.domain"
            :icon="mdiDomain"
            placeholder="xxxx.dmr.co.th"
          />
        </FormField>

        <FormField label="Product">
          <FormControl
            v-model="form.product.name"
            :icon="mdiRenameBox"
            placeholder="Product name"
          />
          <FormControl
            v-model="form.product.discountCode"
            :icon="mdiCards"
            placeholder="Discount code"
          />
        </FormField>

        <div class="space-y-5">
          <div class="font-bold flex">
            <div class="mt-auto">Product Photos</div>
          </div>

          <div
            class="w-full flex space-x-5 rounded-lg overflow-auto"
            v-if="imagePreviewURL"
          >
            <!-- <div v-for="productimage in productimages" :key="productimage">
            <div>{{productimage}}</div>
          </div> -->
            <img
              v-if="imagePreviewURL"
              :src="imagePreviewURL"
              alt
              class="w-36 h-36 object-cover rounded-lg"
            />
            <img
              v-if="imagePreviewURL"
              :src="imagePreviewURL"
              alt
              class="w-36 h-36 object-cover rounded-lg"
            />
            <img
              v-if="imagePreviewURL"
              :src="imagePreviewURL"
              alt
              class="w-36 h-36 object-cover rounded-lg"
            />
            <img
              v-if="imagePreviewURL"
              :src="imagePreviewURL"
              alt
              class="w-36 h-36 object-cover rounded-lg"
            />
            <img
              v-if="imagePreviewURL"
              :src="imagePreviewURL"
              alt
              class="w-36 h-36 object-cover rounded-lg"
            />
            <img
              v-if="imagePreviewURL"
              :src="imagePreviewURL"
              alt
              class="w-36 h-36 object-cover rounded-lg"
            />
            <!-- <img
            :src="productimages[0].name"
            alt
            class="w-36 h-36 object-cover rounded-lg"
          /> -->
            <!-- <img
            v-for="productimage in productimages" :key="productimage"
            :src="productimage"
            alt
            class="w-36 h-36 object-cover rounded-lg"
          /> -->
          </div>

          <FormFilePicker
            color="contrast"
            v-model="customElementsForm.file"
            label="upload file"
            @change="onFileChange($event)"
          />
        </div>
        <BaseDivider />

        <FormField
          label="Product detail"
          :help="
            'Your product detail ' +
            form.product.detail.length +
            '/255 characters'
          "
        >
          <FormControl
            v-model="form.product.detail"
            type="textarea"
            placeholder="Explain your product detail"
          />
        </FormField>

        <CardBoxModal
          v-model="modalOneActive"
          title="Product option"
          button-label="Confirm"
          has-cancel
          @confirm="addProductOption"
        >
          <FormField>
            <FormControl
              v-model="productOption.name"
              :icon="mdiDomain"
              placeholder="option name"
            />

            <FormControl
              v-model="productOption.price"
              :icon="mdiAccount"
              placeholder="price"
              type="number"
            />
            <FormControl
              v-model="productOption.discountPrice"
              :icon="mdiAccount"
              placeholder="discounted price (optional)"
              type="number"
            />
          </FormField>
        </CardBoxModal>

        <div class="space-y-3">
          <div class="font-bold">Product options</div>
          <TableList
            v-if="form.product.productOption.length > 0"
            :data-table="form.product.productOption"
            @menu-delete-data="deleteProductOption"
          />
          <BaseButton
            label="Add product options"
            color="contrast"
            @click="modalOneActive = true"
          />
        </div>
        <!-- <TableList
            v-if="form.product.productOption.length > 0"
            :data-table="form.product.productOption"
            @menu-delete-data="deleteProductOption"
          /> -->

        <!-- <FormField label="Product options">
          <CardBox>
            <CardBoxComponentEmpty
              v-if="form.product.productOption.length === 0"
            />
          </CardBox>
        </FormField> -->
        <div class="w-full flex justify-end text-">
          <BaseButton
            type="submit"
            color="info"
            label="Submit"
            @click="submit"
          />
        </div>
        <!-- <BaseButtons>
          <BaseButton
              type="reset"
              color="info"
              outline
              label="Reset"
              @click="reset"
            />
        </BaseButtons> -->
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script>
export default {
  // computed: {
  //   character: function(){
  //     return form.product.detail.length
  //   }
  // },
  // data() {
  //   return {
  //     productimages: [],
  //     productimage:''
  //   };
  // },
  // methods: {
  //   selectimage() {
  //     this.productimage = imagePreviewURL
  //     this.productimages.push(this.productimage)
  //     console.log(this.productimages);
  //   },
  // },
};
</script>
<style scoped>
@media (min-width: 900px) {
  .section {
    width: 860px;
  }
}
</style>
