<template>
  <!-- <div class="absolute top-0 w-screen h-screen overflow-auto z-20 bg pt-24"> -->
  <div class="lg:p-5 lg:pt-14 mx-auto text-dark dark:text-slate-100">
    <div class="text-center">
      <div class="text-2xl font-bold">
        Order <span style="color: #ffc24c">#3905483</span>
      </div>
      <div class="font-light text-sm text-gray-400">18 Sep 2022</div>
    </div>
    <div class="w-full my-5 bg-white" style="height: 1px" />
    <div class="space-y-1">
      <div class="text-lg font-bold">Contact Info</div>
      <div class="font-light">customer : Premsak Tanatip</div>
      <div class="font-light">phone number : 0627697711</div>
      <div class="font-light">email : premsak@mail.com</div>
    </div>
    <div class="my-5">
      <div
        class="p-2 grid grid-cols-7 font-semibold bg-gray-800 text-white ove"
      >
        <div class="col-span-4">Item</div>
        <div class="text-center">Qty</div>
        <div class="col-span-2 text-right">Sub total</div>
      </div>

      <!-- loop order item -->
      <div class="my-3">
        <div class="grid grid-cols-7 px-1">
          <div class="w-48 text-ellipsis col-span-4 pl-1">
            Terry Sleeping Mask - Double pack
          </div>
          <div class="my-auto px-1 text-center">100</div>
          <div class="my-auto text-right col-span-2">2970 ฿</div>
        </div>
        <div
          class="w-full mt-3"
          style="height: 1px; background-color: #e2e2e2"
        />
      </div>
      <div class="my-3">
        <div class="grid grid-cols-7 px-1">
          <div class="w-48 text-ellipsis col-span-4 pl-1">
            Terry Sleeping Mask - Double pack
          </div>
          <div class="my-auto px-1 text-center">100</div>
          <div class="my-auto text-right col-span-2">2970 ฿</div>
        </div>
        <div
          class="w-full mt-3"
          style="height: 1px; background-color: #e2e2e2"
        />
      </div>
      <div class="my-3">
        <div class="grid grid-cols-7 px-1">
          <div class="w-48 text-ellipsis col-span-4 pl-1">
            Terry Sleeping Mask - Double pack
          </div>
          <div class="my-auto px-1 text-center">100</div>
          <div class="my-auto text-right col-span-2">2970 ฿</div>
        </div>
        <div
          class="w-full mt-3"
          style="height: 1px; background-color: #e2e2e2"
        />
      </div>
      <div class="text-white">
        <div class="-mt-3 p-1 grid grid-cols-5 bg-gray-800">
          <div class="col-span-2"></div>
          <div class="text-right pr-5 font-semibold col-span-2">
            Delivery fee
          </div>
          <div class="text-right">40 ฿</div>
        </div>
        <div class="p-1 grid grid-cols-5 bg-gray-800">
          <div class="col-span-2"></div>
          <div class="text-right pr-5 font-semibold col-span-2">Total</div>
          <div class="text-right">3460 ฿</div>
        </div>
      </div>
    </div>
    <div class="font-semibold my-10">
      <div>parcel number: TH9201844813908409</div>
      <div>shipping by: Kerry Express</div>
    </div>
    <div class="mt-10 text-center font-extralight text-gray-400">
      terryofficial.th
    </div>
    <div class="w-full my-5" style="height: 1px; background-color: #e2e2e2" />
    <button
      class="rounded-md text-white p-3 w-full text-center my-5"
      style="background-color: #ffc24c"
    >
      send customer receipt
    </button>
  </div>
  <!-- </div> -->
</template>
<style scoped>
.bg {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
