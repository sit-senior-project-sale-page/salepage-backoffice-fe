<script setup>
import { reactive, ref, computed, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import BaseButtons from "@/components/BaseButtons.vue";
import { useSiteStore } from "@/stores/site";
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
import { useRoute, useRouter } from "vue-router";
import { usePlanStore } from "@/stores/plan.js";
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();
const userPlanStore = usePlanStore();
const { plan, loading: loadingPlan } = storeToRefs(usePlanStore());

onMounted(() => {
  userPlanStore.fetchPlan();
});

watch(
  () => loadingPlan.value,
  (p, v) => {
    if (!p) {
      if (!plan.value) {
        Swal.fire({
          title: "Error",
          text: "Please Supscription plan",
          icon: "error",
          allowOutsideClick: false,
        }).then((t) => {
          if (t.isConfirmed) {
            router.push("subscription");
          }
        });
      }
    }
  },
  {
    immediate: true,
  }
);

const { site, loading, loadingUpdate } = storeToRefs(useSiteStore());

const { fetchSiteById, updateSite } = useSiteStore();

fetchSiteById(route.params.id);

const updateProductOption = ref({});

const deleteProductOptionIds = ref([]);
const updateProductOptionImageIds = ref([]);
const deleteProductImageIds = ref([]);

const updateProductImage = ref([]);
const updateProductOptionImage = ref([]);
const createProductOptionImage = ref([]);
const imagePreviewURL = ref([]);
const imagePreviewOptionURL = ref();
const imageOnlyPreviewOptionURL = ref();

const modelEditProductOption = ref(false);
const modelCreateProductOption = ref(false);

let productOption = reactive({
  name: null,
  price: 0,
  discountPrice: 0,
  quantity: null,
  dataImage: "",
});

const deleteProductImage = (index, productImageId) => {
  site.value.Product.ProductImage.splice(index, 1);
  if (productImageId) {
    deleteProductImageIds.value.push(productImageId);
  }
};

const deleteProductOption = (index, productOptionId) => {
  site.value.Product.ProductOption.splice(index, 1);
  deleteProductOptionIds.value.push(productOptionId);
};

const editProductOption = (index, data) => {
  modelEditProductOption.value = true;
  updateProductOption.value = data;
};

const saveEditProductOption = (productOptionImageId) => {
  if (imageOnlyPreviewOptionURL.value) {
    updateProductOption.value.dataImage = imageOnlyPreviewOptionURL.value;
    imageOnlyPreviewOptionURL.value = "";
    updateProductOptionImageIds.value.push(productOptionImageId);
  }
};

const addProductOption = () => {
  site.value.Product.ProductOption.push({
    ...productOption,
    dataImage: imagePreviewOptionURL.value,
    type: "create",
  });
  Object.assign(productOption, {
    name: null,
    price: null,
    discountPrice: null,
    quantity: null,
  });

  imagePreviewOptionURL.value = "";
};

const onFileChange = (e, type) => {
  e.preventDefault();

  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  if (files) {
    if (type == "editProductImage") {
      imagePreviewURL.value.push(URL.createObjectURL(files[0]));
      updateProductImage.value.push(files[0]);
      console.log("updateProductImage", updateProductImage);
      site.value.Product.ProductImage.push({
        data: URL.createObjectURL(files[0]),
      });
    } else if (type == "addProductOption") {
      imagePreviewOptionURL.value = URL.createObjectURL(files[0]);
      createProductOptionImage.value.push(files[0]);
    } else {
      updateProductOptionImage.value.push(files[0]);
      imageOnlyPreviewOptionURL.value = URL.createObjectURL(
        files[0]
      ).toString();
      updateProductOption.value.dataImage = "";
    }
    URL.revokeObjectURL(files);
  }
};

const submit = async () => {
  if (!site.value.Product.detail) {
    Swal.fire({
      title: "Missing field",
      text: "Please enter a product detail",
      icon: "warning",
      toast: true,
      position: "top-right",
    });
  } else if (site.value.Product.ProductImage.length < 1) {
    Swal.fire({
      title: "Missing field",
      text: "Please add at least 1 product photo",
      icon: "warning",
      toast: true,
      position: "top-right",
    });
  } else if (site.value.Product.ProductOption.length < 1) {
    Swal.fire({
      title: "Missing field",
      text: "Please add at least 1 product option",
      icon: "warning",
      toast: true,
      position: "top-right",
    });
  } else {
    const formData = new FormData();

    formData.append(
      "updateProductOption",
      JSON.stringify({
        detail: site.value.Product.detail,
        discountCode: site.value.Product.discountCode,
        productOption: site.value.Product.ProductOption.filter(
          (t) => !t.type
        ).map((t) => {
          return {
            id: t.id,
            name: t.name,
            price: t.price,
            quantity: t.quantity,
            discountPrice: t.discountPrice,
          };
        }),
      })
    );

    formData.append(
      "createProductOption",
      JSON.stringify({
        productOption: site.value.Product.ProductOption.filter(
          (t) => t.type === "create"
        ).map((t) => {
          return {
            name: t.name,
            price: t.price,
            quantity: t.quantity,
            discountPrice: t.discountPrice,
          };
        }),
      })
    );

    formData.append(
      "deleteProductImageIds",
      JSON.stringify(deleteProductImageIds.value)
    );
    formData.append(
      "deleteProductOptionIds",
      JSON.stringify(deleteProductOptionIds.value)
    );
    formData.append(
      "updateProductOptionImageIds",
      JSON.stringify(updateProductOptionImageIds.value)
    );
    for (let index = 0; index < updateProductImage.value.length; index++) {
      const createProductImage = updateProductImage.value[index];
      formData.append("createProductImage", createProductImage);
    }

    for (
      let index = 0;
      index < updateProductOptionImage.value.length;
      index++
    ) {
      const updateProductOptionImagee = updateProductOptionImage.value[index];

      formData.append("updateProductOptionImage", updateProductOptionImagee);
    }

    for (
      let index = 0;
      index < createProductOptionImage.value.length;
      index++
    ) {
      const createProductOptionImagee = createProductOptionImage.value[index];

      formData.append("createProductOptionImage", createProductOptionImagee);
    }

    await updateSite(`product/${route.params.id}`, formData)
      .then(() => {
        loadingUpdate.value = false;
        Swal.fire({
          title: "Success",
          text: "Edited success",
          icon: "success",
          toast: true,
          position: "top-right",
          allowOutsideClick: false,
        }).then((t) => {
          if (t.isConfirmed) {
            fetchSiteById(route.params.id);
          }
        });
      })
      .catch((error) => {
        loadingUpdate.value = false;
        console.log("error from network editSite", error);
        Swal.fire({
          title: "Error",
          text: "Fail to edit",
          icon: "error",
          toast: true,
          position: "top-right",
          allowOutsideClick: false,
        });
      });
  }
};

const clearimg = () => {
  imagePreviewURL.value.splice(0, imagePreviewURL.value.length);
};
</script>

<template>
  <LayoutAuthenticated>
    <p v-if="loading" class="text-center font-semibold text-lg pb-8">
      Loading Data....
    </p>
    <SectionMain v-else class="mx-auto w-full">
      <CardBox>
        <div class="text-center font-semibold text-lg pb-8">Edit SalePage</div>
        <div>
          <FormField label="Website name">
            <FormControl
              :icon="mdiDomain"
              :placeholder="site.domain"
              :disabled="true"
            />
          </FormField>

          <FormField label="Product">
            <FormControl
              :icon="mdiRenameBox"
              :placeholder="site.Product.name"
              :disabled="true"
            />
            <FormControl
              v-model="site.Product.discountCode"
              :icon="mdiCards"
              placeholder="Discount code"
            />
          </FormField>
        </div>
        <BaseDivider />

        <div class="space-y-5">
          <div class="font-bold flex">
            <div class="mt-auto">Product Photos</div>
          </div>

          <div class="w-full flex space-x-5 rounded-lg overflow-x-auto">
            <img
              v-for="(productimage, index) in site.Product?.ProductImage"
              :key="productimage"
              :src="productimage.data"
              style="width: 145px; height: 145px"
              class="object-cover rounded-lg flex"
              @click="deleteProductImage(index, productimage.id)"
            />
          </div>

          <div class="flex space-x-5">
            <FormFilePicker
              color="contrast"
              label="upload product photos"
              @change="onFileChange($event, `editProductImage`)"
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
            site.Product?.detail.length +
            '/255 characters'
          "
        >
          <FormControl
            v-model="site.Product.detail"
            type="textarea"
            placeholder="Explain your product detail"
          />
        </FormField>

        <CardBoxModal
          v-model="modelCreateProductOption"
          title="Add Product option"
          button-label="Confirm"
          has-cancel
          has-confirm
          button="success"
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
            <FormControl
              v-model="productOption.quantity"
              :icon="mdiAccount"
              placeholder="discounted price (optional)"
              type="number"
            />

            <img
              v-if="imagePreviewOptionURL"
              :src="imagePreviewOptionURL"
              style="width: 145px; height: 145px"
              class="object-cover rounded-lg"
            />

            <FormFilePicker
              color="contrast"
              label="upload option photo"
              @change="onFileChange($event, `addProductOption`)"
            />
          </FormField>
        </CardBoxModal>

        <CardBoxModal
          v-model="modelEditProductOption"
          title="Edit Product option"
          button-label="Confirm"
          has-cancel
          has-confirm
          @confirm="saveEditProductOption(updateProductOption.id)"
        >
          <FormField>
            <FormControl
              v-model="updateProductOption.name"
              :icon="mdiDomain"
              placeholder="option name"
            />

            <FormControl
              v-model="updateProductOption.price"
              :icon="mdiAccount"
              placeholder="price"
              type="number"
            />
            <FormControl
              v-model="updateProductOption.discountPrice"
              :icon="mdiAccount"
              placeholder="discounted price (optional)"
              type="number"
            />

            <FormControl
              v-model="updateProductOption.quantity"
              :icon="mdiAccount"
              placeholder="discounted price (optional)"
              type="number"
            />

            <img
              v-if="updateProductOption.dataImage"
              :src="updateProductOption.dataImage"
              style="width: 145px; height: 145px"
              class="object-cover rounded-lg flex mx-auto"
            />

            <img
              v-if="imageOnlyPreviewOptionURL"
              :src="imageOnlyPreviewOptionURL"
              style="width: 145px; height: 145px"
              class="object-cover rounded-lg flex mx-auto"
            />

            <FormFilePicker
              color="contrast"
              label="upload option photo"
              class="mx-auto flex"
              @change="onFileChange($event)"
            />
          </FormField>
        </CardBoxModal>

        <BaseDivider />

        <div class="space-y-3">
          <div class="font-bold">Product options</div>

          <div class="w-full overflow-y-auto relative shadow-md sm:rounded-lg">
            <table
              class="min-w-full text-sm leading-normal text-gray-500 dark:text-gray-400"
            >
              <thead>
                <tr>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Discount Price
                  </th>

                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  ></th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(productOption, index) in site.Product?.ProductOption"
                  :key="productOption.name"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td class="p-4 w-32">
                    <img
                      :src="productOption.dataImage"
                      :alt="productOption.name"
                      class="w-24 h-24 object-cover rounded-lg"
                    />
                  </td>

                  <td class="py-4 px-6 font-semibold dark:text-white">
                    {{ productOption.name }}
                  </td>

                  <td
                    class="py-4 px-6 font-semibold text-gray-900 dark:text-white"
                  >
                    {{ productOption.price }}
                  </td>

                  <td
                    class="py-4 px-6 font-semibold text-gray-900 dark:text-white"
                  >
                    {{ productOption.discountPrice }}
                  </td>

                  <td
                    class="py-4 px-6 font-semibold text-gray-900 dark:text-white"
                  >
                    {{ productOption.quantity }}
                  </td>
                  <td class="py-4 px-6">
                    <button
                      class="border border-yellow-300 p-2 rounded font-medium text-yellow-600 hover:bg-yellow-500 hover:text-white"
                      @click="editProductOption(index, productOption)"
                    >
                      Edit
                    </button>
                  </td>
                  <td class="py-4 px-6">
                    <button
                      class="border border-red-300 p-2 rounded font-medium text-red-600 hover:bg-red-500 hover:text-white"
                      @click="deleteProductOption(index, productOption.id)"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <BaseButton
            label="Add product options"
            color="info"
            @click="modelCreateProductOption = true"
          />
        </div>

        <div class="w-full flex justify-end mt-4">
          <BaseButtons>
            <BaseButton
              color="success"
              label="Save"
              :disabled="loadingUpdate"
              @click="submit"
            ></BaseButton>
          </BaseButtons>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

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
