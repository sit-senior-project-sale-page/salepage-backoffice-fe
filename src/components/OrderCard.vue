<template>
  <div
    style="border-width: 1px; border-color: #dfdfdf; height: 70px"
    class="card bg-white rounded-xl mx-auto p-2 md:px-3 flex space-x-3 justify-center mb-3 cursor-pointer"
  >
    <div
      class="font-bold text-center text-xs my-auto text-black"
      style="font-size: 10px"
    >
      <div>18 Sep</div>
      <div class="-mt-1">2022</div>
    </div>
    <div class="font-bold text-left text-sm my-auto">
      <div style="font-size: 10px">
        <span class="font-light text-black">order number:</span>
        <span style="color: #ffc24c">3905483</span>
      </div>
      <div
        class="font-semibold -mt-1 text-ellipsis whitespace-nowrap overflow-hidden"
        style="color: #0f385f; width: 136px"
      >
        Jiraphat Phulprapha
      </div>
    </div>
    <div class="flex">
      <div class="md:flex md:space-x-3 my-auto">
        <div class="text-center my-auto flex md:flex-col">
          <div
            class="font-light hidden md:block"
            style="color: #8f8f8f; font-size: 10px"
          >
            TOTAL
          </div>
          <div style="color: #ffc24c" class="font-semibold text-sm">1299 ฿</div>
        </div>
        <div class="text-center my-auto flex md:flex-col">
          <div
            class="font-light hidden md:block"
            style="color: #8f8f8f; font-size: 10px"
          >
            PARCEL STATUS
          </div>
          <div style="color: #35c502" class="font-semibold text-sm">
            SHIPPED
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
