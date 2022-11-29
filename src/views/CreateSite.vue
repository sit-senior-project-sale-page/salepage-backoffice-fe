<script setup>
import { reactive, ref } from "vue";
import { useMainStore } from "@/stores/main";
import { mdiAccount, mdiDomain, mdiRenameBox, mdiCards } from "@mdi/js";
import SectionMain from "@/components/Section/SectionMain.vue";
import CardBox from "@/components/Card/CardBox.vue";
import CardBoxModal from "@/components/Card/CardBoxModal.vue";
import FormFilePicker from "@/components/Form/FormFilePicker.vue";
import FormField from "@/components/Form/FormField.vue";
import FormControl from "@/components/Form/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";

import Swal from "sweetalert2";
import { storeToRefs } from "pinia";

const mainStore = useMainStore();

const { loading, error, statusSuccess, statusError } = storeToRefs(
  useMainStore()
);

const initProductOptionData = {
  name: null,
  price: null,
  discountPrice: null,
};
let productOption = reactive({ ...initProductOptionData });

const imagePreviewURL = ref([]);
const imagePreviewOptionURL = ref([]);

const initProduct = {
  domain: "",
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

const fileProduct = ref([]);
const fileProductOption = ref([]);

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
    Swal.fire({
      title: "ข้อมูลไม่ครบ",
      text: "โปรดกรอกโดเมนเว็ยไซต์",
      icon: "warning",
      toast: true,
      position: "top-right",
    });
  } else if (!form.product.name) {
    Swal.fire({
      title: "ข้อมูลไม่ครบ",
      text: "โปรดกรอกชื่อสินค้า",
      icon: "warning",
      toast: true,
      position: "top-right",
    });
  } else if (form.product.productOption.length == 0) {
    Swal.fire({
      title: "ข้อมูลไม่ครบ",
      text: "โปรดเพิ่มออฟชั่นสินค้าอย่างน้อย 1 ",
      icon: "warning",
      toast: true,
      position: "top-right",
    });
  } else if (fileProduct.value.length == 0) {
    Swal.fire({
      title: "ข้อมูลไม่ครบ",
      text: "โปรดเพิ่มภาพสินค้าอย่างน้อย 1 ",
      icon: "warning",
      toast: true,
      position: "top-right",
    });
  } else if (!form.product.detail) {
    Swal.fire({
      title: "ข้อมูลไม่ครบ",
      text: "โปรดกรอกรายละเอียดสินค้า",
      icon: "warning",
      toast: true,
      position: "top-right",
    });
  } else {
    const formData = new FormData();
    for (let index = 0; index < fileProduct.value.length; index++) {
      const fp = fileProduct.value[index];
      console.log("🚀 ~ file: CreateSite.vue ~ line 111 ~ submit ~ fp", fp);
      formData.append("product", fp);
    }

    for (let index = 0; index < fileProductOption.value.length; index++) {
      const fpo = fileProductOption.value[index];
      console.log("🚀 ~ file: CreateSite.vue ~ line 116 ~ submit ~ fp", fpo);

      formData.append("productOption", fpo);
    }
    formData.append("site", JSON.stringify({ ...form }));
    await mainStore.postFormData("site", formData);
    if (statusSuccess) {
      Swal.fire({
        title: "Success",
        text: "เพิ่มเว็บไซต์สำเร็จ",
        icon: "success",
        toast: true,
        position: "top-right",
      });
      Object.assign(form, initProduct);
    } else {
      Swal.fire({
        title: "Error",
        text: "เพิ่มเว็บไซต์ไม่สำเร็จ",
        icon: "error",
        toast: true,
        position: "top-right",
      });
    }
  }
};

const addProductOption = () => {
  const productOptionData = {
    ...productOption,
  };

  form.product.productOption.push(productOptionData);
  Object.assign(productOption, initProductOptionData);
};

const onFileChange = (e, type) => {
  e.preventDefault();

  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  if (files) {
    if (type) {
      imagePreviewURL.value.push(URL.createObjectURL(files[0]));
      fileProduct.value.push(files[0]);
    } else {
      imagePreviewOptionURL.value.push(URL.createObjectURL(files[0]));
      fileProductOption.value.push(files[0]);
    }
    URL.revokeObjectURL(files);
  }
};

const clearimg = () => {
  imagePreviewURL.value.splice(0, imagePreviewURL.value.length);
};

const modalOneActive = ref(false);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain form class="mx-auto section" @submit.prevent="submit">
      <CardBox>
        <div class="text-center font-semibold text-lg pb-8">
          Create SalePage
        </div>

        <FormField label="Website name">
          <FormControl
            v-model="form.domain"
            :icon="mdiDomain"
            placeholder="xxxx.upforsale.shop"
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

          <!-- <div
            v-if="imagePreviewURL"
            class="w-full flex space-x-5 rounded-lg overflow-auto"
          > -->
          <div class="w-full flex space-x-5 rounded-lg overflow-x-auto">
            <img
              v-for="productimage in imagePreviewURL"
              :key="productimage"
              :src="productimage"
              style="width: 145px; height: 145px"
              class="object-cover rounded-lg"
            />
          </div>

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
          <!-- </div> -->
          <div class="flex space-x-5">
            <FormFilePicker
              v-model="customElementsForm.file"
              color="contrast"
              label="upload product photos"
              @change="onFileChange($event, true)"
            />
            <BaseButton
              v-if="imagePreviewURL.length > 0"
              label="Clear"
              outline
              color="contrast"
              @click="clearimg"
            />
          </div>
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
          has-confirm
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

            <img
              v-if="fileProductOption.values.length > 0"
              :src="fileProductOption.values"
              style="width: 145px; height: 145px"
              class="object-cover rounded-lg"
            />

            <FormFilePicker
              v-model="customElementsForm.file"
              color="contrast"
              label="upload option photo"
              @change="onFileChange($event)"
            />
          </FormField>
        </CardBoxModal>

        <div class="space-y-3">
          <div class="font-bold">Product options</div>
          <!-- <TableList
            v-if="form.product.productOption.length > 0"
            :data-table="form.product.productOption"
            @menu-delete-data="deleteProductOption"
          /> -->

          <div class="w-full overflow-x-auto relative shadow-md sm:rounded-lg">
            <table class="text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                <tr
                  v-for="(productOption, index) in form.product.productOption"
                  :key="productOption.name"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <!-- image -->
                  <td class="p-4 w-32">
                    <img
                      :src="imagePreviewOptionURL[index]"
                      :alt="productOption.name"
                      class="w-24 h-24 object-cover rounded-lg"
                    />
                  </td>

                  <!-- product option name -->
                  <td
                    class="py-4 px-6 font-semibold text-gray-900 dark:text-white"
                  >
                    {{ productOption.name }}
                  </td>

                  <!-- price -->
                  <td
                    class="py-4 px-6 font-semibold text-gray-900 dark:text-white"
                  >
                    {{ productOption.price }}
                  </td>

                  <!-- discount code -->
                  <td
                    class="py-4 px-6 font-semibold text-gray-900 dark:text-white"
                  >
                    {{ productOption.discountPrice ?? "ไม่มีลดราคา" }}
                  </td>

                  <!-- button remove  -->
                  <td class="py-4 px-6">
                    <a
                      href="#"
                      class="font-medium text-red-600 dark:text-red-500 hover:underline"
                      @click="deleteProductOption(index)"
                      >Remove</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <BaseButton
            label="Add product options"
            color="contrast"
            @click="modalOneActive = true"
          />
        </div>

        <!-- <div
          v-if="imagePreviewOptionURL"
          class="w-full mt-3 flex space-x-5 rounded-lg overflow-auto"
        >
          <div
            v-for="productOptionimage in imagePreviewOptionURL"
            :key="productOptionimage"
          >
            <img
              :src="productOptionimage"
              alt
              class="w-36 h-36 object-cover rounded-lg"
            />
          </div>
        </div> -->

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
        <div class="w-full flex justify-end">
          <BaseButton
            type="submit"
            color="info"
            label="Submit"
            :disabled="loading"
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
.productimg {
  width: 145px !important;
  height: 145px !important;
}
</style>
