<template>
  <div class="px-8 py-6 absolute">
    <img src="/upforsale.png" class="h-14 md:h-20 mx-auto md:mx-0" />
  </div>
  <div class="flex flex-col pt-32 md:pt-24 mb-44 text-center">
    <div class="font-semibold text-xl" v-if="state == 1">
      Start your membership
    </div>
    <div class="font-semibold text-xl" v-if="state == 2">Let we know you</div>
    <div class="font-semibold text-xl" v-if="state == 2.5">
      Let's get rich ;D
    </div>
    <div class="font-semibold text-xl" v-if="state == 3">Last step!</div>
    <div class="font-semibold text-xl" v-if="state == 4">Success 🎉</div>

    <div class="flex justify-center mt-5" style="transition-duration: 0.25s">
      <div
        v-if="state == 1"
        class="w-10 h-10 md:w-12 md:h-12 text-white rounded-full flex"
        style="background-color: #20293a"
      >
        <span class="mx-auto my-auto">1</span>
      </div>
      <div
        v-if="state > 1"
        class="w-10 h-10 md:w-12 md:h-12 text-white rounded-full flex"
        style="background-color: #35c502"
      >
        <span class="mx-auto my-auto">✔</span>
      </div>

      <div
        v-if="state == 1"
        class="w-20 md:w-32 my-auto"
        style="height: 1.5px; background-color: #20293a"
      />

      <div
        v-if="state > 1.75"
        class="w-20 md:w-32 my-auto"
        style="height: 1.5px; background-color: #35c502"
      />

      <div
        v-if="state == 1"
        class="w-10 h-10 md:w-12 md:h-12 text-white rounded-full flex"
        style="border-width: 1.5px; border-color: #20293a; color: #20293a"
      >
        <span class="mx-auto my-auto">2</span>
      </div>
      <div
        v-if="state == 2 || state == 2.5"
        class="w-10 h-10 md:w-12 md:h-12 text-white rounded-full flex"
        style="background-color: #20293a"
      >
        <span class="mx-auto my-auto">2</span>
      </div>
      <div
        v-if="state > 2.5"
        class="w-10 h-10 md:w-12 md:h-12 text-white rounded-full flex"
        style="background-color: #35c502"
      >
        <span class="mx-auto my-auto">✔</span>
      </div>

      <div
        v-if="state <= 2.5"
        class="w-20 md:w-32 my-auto"
        style="height: 1.5px; background-color: #20293a"
      />
      <div
        v-if="state > 2.5"
        class="w-20 md:w-32 my-auto"
        style="height: 1.5px; background-color: #35c502"
      />

      <div
        v-if="state < 3"
        class="w-10 h-10 md:w-12 md:h-12 text-white rounded-full flex"
        style="border-width: 1.5px; border-color: #20293a; color: #20293a"
      >
        <span class="mx-auto my-auto">3</span>
      </div>
      <div
        v-if="state == 3"
        class="w-10 h-10 md:w-12 md:h-12 text-white rounded-full flex"
        style="background-color: #20293a"
      >
        <span class="mx-auto my-auto">3</span>
      </div>
      <div
        v-if="state > 3"
        class="w-10 h-10 md:w-12 md:h-12 text-white rounded-full flex"
        style="background-color: #35c502"
      >
        <span class="mx-auto my-auto">✔</span>
      </div>
    </div>
    <div
      class="flex justify-center mt-5 -ml-8 space-x-12 md:space-x-28"
      style="color: #20293a; transition-duration: 0.25s"
    >
      <div class="text-sm pl-2">create account</div>
      <div class="text-sm">your shop</div>
      <div class="text-sm">choose plan</div>
    </div>

    <div
      id="state1"
      v-if="state == 1"
      class="flex flex-col mt-20 px-5 mx-auto text-left w-screen"
      style="transition-duration: 0.25s"
    >
      <div class="text-3xl font-semibold">Create account</div>
      <div class="mt-3 text-sm font-light">
        Just a few more steps and you're done! <br />
        We hate paperwork, too.
      </div>
      <input
        @input="validateid()"
        v-model="id"
        minlength="6"
        maxlength="20"
        type="text"
        placeholder="Username"
        name="id"
        class="bg-white rounded-md p-3 mt-5 text-sm"
        style="border-width: 1.5px; border-color: #000000"
      />
      <div class="h-3">
        <span v-if="validate.id == false" class="text-red-500 text-xs">
          * your username must be at lease 6 characters long</span
        >
      </div>
      <input
        @input="validatepw()"
        v-model="pw"
        minlength="6"
        maxlength="20"
        type="password"
        placeholder="Password"
        name="password"
        class="bg-white rounded-md p-3 mt-5 text-sm"
        style="border-width: 1.5px; border-color: #000000"
      />
      <div class="h-3">
        <span v-if="validate.pw == false" class="text-red-500 text-xs">
          * your password must be at lease 6 characters long</span
        >
      </div>

      <button
        v-if="id.length < 6 || pw.length < 6"
        class="p-4 text-white rounded-md font-medium mt-8 mx-auto cursor-not-allowed"
        style="background-color: #e9e9e9"
      >
        Next
      </button>

      <button
        v-if="id.length >= 6 && pw.length >= 6"
        class="p-4 text-white rounded-md font-medium mt-8 mx-auto"
        @click="state += 1"
      >
        Next
      </button>
    </div>

    <div
      id="state2"
      v-if="state == 2"
      class="flex flex-col mt-20 px-5 mx-auto text-left w-screen"
      style="transition-duration: 0.25s"
    >
      <div class="flex justify-between mb-3">
        <div>
          <div class="text-3xl font-semibold">Shop information</div>
          <div class="mt-3 text-sm font-light">
            Don't worry, we won't do anything <br />
            intruding on your privacy.
          </div>
        </div>
        <div>
          <div
            @click="selectImage"
            class="h-20 w-20 rounded-full flex cursor-pointer"
            style="border-width: 1.5px; border-color: #000000"
            :style="{
              'background-image': `url(${shopImage})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              'background-position': 'center',
            }"
          >
            <div v-if="shopImage == 'null'" class="mx-auto my-auto text-sm">
              add photo
            </div>
          </div>
          <input
            ref="fileInput"
            id="file"
            type="file"
            @input="pickImage"
            accept="image/*"
            class="p-1.5 rounded-lg w-4/6 ml-8 text-white hidden"
            style="background-color: #70b6b2"
          />
          <!-- <div class="h-5 text-center">
            <span class="text-red-500 text-xs"> * please fill</span>
          </div> -->
        </div>
      </div>
      <input
        @input="validateshopname"
        v-model="shopname"
        minlength="1"
        maxlength="50"
        type="text"
        placeholder="shop name"
        name="shopname"
        class="bg-white rounded-md p-3 mt-3 text-sm"
        style="border-width: 1.5px; border-color: #000000"
      />
      <div class="h-5">
        <span v-if="validate.shopname == false" class="text-red-500 text-xs">
          * please fill</span
        >
      </div>

      <div class="flex space-x-3">
        <div class="w-full">
          <input
            @input="validatefname"
            v-model="fname"
            minlength="1"
            maxlength="20"
            type="text"
            placeholder="first name"
            name="first name"
            class="bg-white rounded-md p-3 mt-3 text-sm w-full"
            style="border-width: 1.5px; border-color: #000000"
          />
          <div class="h-5">
            <span v-if="validate.fname == false" class="text-red-500 text-xs">
              * please fill</span
            >
          </div>
        </div>
        <div class="w-full">
          <input
            @input="validatelname"
            v-model="lname"
            minlength="1"
            maxlength="20"
            type="text"
            placeholder="last name"
            name="last name"
            class="bg-white rounded-md p-3 mt-3 text-sm w-full"
            style="border-width: 1.5px; border-color: #000000"
          />
          <div class="h-5 pl-2">
            <span v-if="validate.lname == false" class="text-red-500 text-xs">
              * please fill</span
            >
          </div>
        </div>
      </div>
      <input
        @input="validateemail"
        v-model="email"
        minlength="6"
        maxlength="50"
        type="email"
        placeholder="E-mail"
        name="email"
        class="bg-white rounded-md p-3 mt-3 text-sm"
        style="border-width: 1.5px; border-color: #000000"
      />
      <div class="h-5">
        <span v-if="validate.email == false" class="text-red-500 text-xs">
          * please fill</span
        >
      </div>
      <input
        @input="validatephone"
        v-model="phone"
        minlength="6"
        maxlength="20"
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        placeholder="phone number"
        name="phone number"
        class="bg-white rounded-md p-3 mt-3 text-sm"
        style="border-width: 1.5px; border-color: #000000"
      />
      <div class="h-5">
        <span v-if="validate.phone == false" class="text-red-500 text-xs">
          * please fill</span
        >
      </div>
      <input
        @input="validatelink"
        v-model="link"
        minlength="6"
        maxlength="200"
        type="text"
        placeholder="link of shop social media account or contact"
        name="link"
        class="bg-white rounded-md p-3 mt-3 text-sm"
        style="border-width: 1.5px; border-color: #000000"
      />
      <div class="h-5 space-x-1">
        <span v-if="validate.link == false" class="text-red-500 text-xs">
          * please fill</span
        >
        <span class="text-xs font-light mt-2" style="color: #aaaaaa"
          >ex. https://www.instagram.com/terryofficial.th/</span
        >
      </div>

      <button
        v-if="
          shopname.length < 1 ||
          fname.length < 1 ||
          lname.length < 1 ||
          email.length < 6 ||
          phone.length < 6 ||
          link.length < 1
        "
        class="p-4 text-white rounded-md font-medium mt-8 mx-auto cursor-not-allowed"
        style="background-color: #e9e9e9"
      >
        Next
      </button>
      <button
        v-if="
          shopname.length >= 1 &&
          fname.length >= 1 &&
          lname.length >= 1 &&
          email.length >= 6 &&
          phone.length >= 6 &&
          link.length >= 1
        "
        class="p-4 text-white rounded-md font-medium mt-8 mx-auto"
        @click="state += 0.5"
      >
        Next
      </button>
      <div
        class="mx-auto text-gray-400 hover:text-gray-600 px-3 py-2 mt-5 cursor-pointer"
        @click="state -= 1"
      >
        Back
      </div>
    </div>
    <div
      id="state2-5"
      v-if="state == 2.5"
      class="flex flex-col mt-20 px-5 mx-auto text-left w-screen"
      style="transition-duration: 0.25s"
    >
      <div class="text-3xl font-semibold">Shop payment</div>
      <div class="mt-3 text-sm font-light">
        Please enter a bank account for <br />
        customer to pay.
      </div>
      <select
        v-model="bank"
        minlength="6"
        maxlength="30"
        type="text"
        name="bankac"
        aria-placeholder="hi"
        class="bg-white rounded-md p-3 mt-3 text-sm cursor-pointer"
        style="border-width: 1.5px; border-color: #000000"
      >
        <option value="" disabled selected>bank</option>
        <option value="KASIKORNBANK">KASIKORNBANK</option>
        <option value="BANGKOKBANK">BANGKOKBANK</option>
        <option value="SCB">SCB</option>
        <option value="KRUNGSRI">KRUNGSRI</option>
        <option value="KRUNGTHAI">KRUNGTHAI</option>
        <option value="TTB">TTB</option>
        <option value="GSB">GSB</option>
        <option value="CITIBANK">CITIBANK</option>
        <option value="CITIBANK">UOB</option>
      </select>
      <input
        @input="validateacnum"
        v-model="acnum"
        minlength="10"
        maxlength="20"
        placeholder="account number"
        name="bankac"
        class="bg-white rounded-md p-3 mt-8 text-sm"
        style="border-width: 1.5px; border-color: #000000"
      />
      <div class="h-4">
        <span v-if="validate.acnum == false" class="text-red-500 text-xs">
          * please fill</span
        >
      </div>
      <input
        @input="validateacname"
        v-model="acname"
        minlength="6"
        maxlength="50"
        type="text"
        placeholder="account name"
        name="bankac"
        class="bg-white rounded-md p-3 mt-3 text-sm"
        style="border-width: 1.5px; border-color: #000000"
      />
      <div class="h-4">
        <span v-if="validate.acname == false" class="text-red-500 text-xs">
          * please fill</span
        >
      </div>

      <button
        v-if="bank.length < 1 || acnum.length < 10 || acname.length < 6"
        class="p-4 text-white rounded-md font-medium mt-8 mx-auto cursor-not-allowed"
        style="background-color: #e9e9e9"
      >
        Next
      </button>
      <button
        v-if="bank.length >= 1 && acnum.length >= 10 && acname.length >= 6"
        class="p-4 text-white rounded-md font-medium mt-8 mx-auto"
        @click="state += 0.5"
      >
        Next
      </button>
      <div
        class="mx-auto text-gray-400 hover:text-gray-600 px-3 py-2 mt-5 cursor-pointer"
        @click="state -= 0.5"
      >
        Back
      </div>
    </div>

    <div
      id="state3"
      v-if="state == 3"
      class="flex flex-col mt-20 mx-auto text-left px-5"
      style="transition-duration: 0.25s"
    >
      <div class="text-3xl font-semibold head">Choose your plan</div>

      <div
        class="mt-10 text-sm font-light rounded-2xl box"
        style="border-color: #000000; border-width: 1.5px"
      >
        <div class="text-xl font-semibold mb-5">Monthly subscribtion</div>
        <div class="grid grid-cols-3">
          <div></div>
          <div
            v-if="plan == 'single'"
            class="p-2 md:px-4 mx-auto rounded-lg text-center text-white font-semibold cursor-pointer plan1"
          >
            Single Plan
          </div>
          <div
            v-if="plan != 'single'"
            @click="plan = 'single'"
            class="p-2 md:px-4 mx-auto rounded-lg text-center text-white font-semibold cursor-pointer deselect1"
          >
            Single Plan
          </div>
          <div
            v-if="plan == 'me'"
            class="p-2 px-4 mx-auto rounded-lg text-center text-white font-semibold cursor-pointer plan1"
          >
            Exclusive Plan
          </div>
          <div
            @click="plan = 'me'"
            v-if="plan != 'me'"
            class="p-2 px-4 mx-auto rounded-lg text-center text-white font-semibold cursor-pointer deselect1"
          >
            Exclusive Plan
          </div>
        </div>

        <div class="grid grid-cols-3 my-5">
          <div class="font-light my-auto">Price</div>
          <div
            v-if="plan == 'single'"
            class="mx-auto rounded-lg text-center text-xl font-medium plan2"
          >
            299 THB
          </div>
          <div
            v-if="plan != 'single'"
            class="mx-auto rounded-lg text-center text-xl font-medium deselect2"
          >
            299 THB
          </div>
          <div
            v-if="plan == 'me'"
            class="mx-auto rounded-lg text-center text-xl font-medium plan2"
          >
            1299 THB
          </div>
          <div
            v-if="plan != 'me'"
            class="mx-auto rounded-lg text-center text-xl font-medium deselect2"
          >
            1299 THB
          </div>
        </div>

        <div
          class="w-full my-auto"
          style="height: 0.5px; background-color: #000000"
        />

        <div class="grid grid-cols-3 mt-5">
          <div class="font-light my-auto">SalePage Amount</div>
          <div
            v-if="plan == 'single'"
            class="mx-auto rounded-lg text-center text-xl font-medium plan2"
          >
            1
          </div>
          <div
            v-if="plan != 'single'"
            class="mx-auto rounded-lg text-center text-xl font-medium deselect2"
          >
            1
          </div>
          <div
            v-if="plan == 'me'"
            class="mx-auto rounded-lg text-center text-xl font-medium plan2"
          >
            5
          </div>
          <div
            v-if="plan != 'me'"
            class="mx-auto rounded-lg text-center text-xl font-medium deselect2"
          >
            5
          </div>
        </div>
      </div>
      <button
        class="p-4 text-white rounded-md font-medium mt-10 mx-auto"
        @click="state += 1"
      >
        Next
      </button>
      <div
        class="mx-auto text-gray-400 hover:text-gray-600 px-3 py-2 mt-5 cursor-pointer"
        @click="state -= 0.5"
      >
        Back
      </div>
    </div>

    <div
      id="state4"
      v-if="state == 4"
      class="flex flex-col mt-20 mx-auto text-left px-5"
      style="transition-duration: 0.25s"
    >
      <div
        class="p-8 w-56 text-center rounded-3xl"
        style="background-color: #f5f5f5"
      >
        <div
          class="rounded-full mx-auto"
          style="height: 150px; width: 150px"
          :style="{
            'background-image': `url(${shopImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            'background-position': 'center',
          }"
        />
        <div
          class="text-lg font-bold pt-3 w-full text-ellipsis overflow-hidden whitespace-nowrap"
        >
          {{ shopname }} 
        </div>
        <div class="w-full text-ellipsis overflow-hidden whitespace-nowrap">
          {{ id }}
        </div>
      </div>
      <button
        class="p-4 text-white rounded-md font-medium mt-8 mx-auto"
      >
        Done
      </button>
      <div
        class="mx-auto text-gray-400 hover:text-gray-600 px-3 py-2 mt-5 cursor-pointer"
        @click="state -= 1"
      >
        Back
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      state: 1,
      state1: true,
      state2: false,
      state3: false,

      id: "",
      pw: "",

      shopImage: "null",
      selectedImage: null,
      shopname: "",
      fname: "",
      lname: "",
      email: "",
      phone: "",
      link: "",

      bank: "",
      acnum: "",
      acname: "",

      plan: "single",

      validate: {
        id: true,
        pw: true,

        shopname: true,
        fname: true,
        lname: true,
        email: true,
        phone: true,
        link: true,

        bank: true,
        acnum: true,
        acname: true,

        plan: true,
      },
    };
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickImage(event) {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.shopImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
      this.shopImage = event.target.files[0];
    },
    validateid() {
      if (this.id.length >= 6) {
        this.validate.id = true;
      } else {
        this.validate.id = false;
      }
    },

    validatepw() {
      if (this.pw.length >= 6) {
        this.validate.pw = true;
      } else {
        this.validate.pw = false;
      }
    },

    validateshopname() {
      if (this.shopname.length >= 1) {
        this.validate.shopname = true;
      } else {
        this.validate.shopname = false;
      }
    },

    validatefname() {
      if (this.fname.length >= 1) {
        this.validate.fname = true;
      } else {
        this.validate.fname = false;
      }
    },

    validatelname() {
      if (this.lname.length >= 1) {
        this.validate.lname = true;
      } else {
        this.validate.lname = false;
      }
    },

    validateemail() {
      if (this.email.length >= 6) {
        this.validate.email = true;
      } else {
        this.validate.email = false;
      }
    },

    validatephone() {
      if (this.phone.length >= 10) {
        this.validate.phone = true;
      } else {
        this.validate.phone = false;
      }
    },

    validatelink() {
      if (this.link.length >= 1) {
        this.validate.link = true;
      } else {
        this.validate.link = false;
      }
    },

    validatebank() {
      if (this.bank.length >= 1) {
        this.validate.bank = true;
      } else {
        this.validate.bank = false;
      }
    },

    validateacnum() {
      if (this.acnum.length >= 10) {
        this.validate.acnum = true;
      } else {
        this.validate.acnum = false;
      }
    },

    validateacname() {
      if (this.acname.length >= 6) {
        this.validate.acname = true;
      } else {
        this.validate.acname = false;
      }
    },

    // firststate(){
    //     this.validateform1
    //     if(this.validateform1 == true){
    //         console.log('1');
    //     }
    // }
  },
};
</script>
<style scoped>
button {
  transition-duration: 0.25s;
  width: 100%;
  background-color: #ffb522;
}
button:hover {
  background-color: #f6a709;
}
.plan1 {
  background-color: #20293a;
  transition-duration: 0.25s;
}
.plan2 {
  color: #20293a;
  transition-duration: 0.25s;
}
.deselect1 {
  background-color: #c5d4e1;
  transition-duration: 00.25s;
}
.deselect1:hover {
  background-color: #89a9c8;
  transition-duration: 0.25s;
}
.deselect2 {
  color: #c5d4e1;
  transition-duration: 00.25s;
}

#choice2:hover .deselect2 {
  color: #89a9c8 !important;
}
@media (min-width: 480px) {
  #state1 {
    width: 480px;
  }
  #state2 {
    width: 480px;
  }
  #state2-5 {
    width: 480px;
  }
  /* #state4 {
    width: 480px;
  } */
}
.box {
  padding: 15px;
}
@media (min-width: 820px) {
  .box {
    width: 800px;
    padding: 40px;
  }
  .head {
    width: 800px;
  }
}
</style>
