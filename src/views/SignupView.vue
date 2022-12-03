<template>
  <div class="px-8 py-6 absolute">
    <img src="/upforsale.png" class="h-14 md:h-20 mx-auto md:mx-0" />
  </div>
  <div class="flex flex-col pt-32 md:pt-24 mb-44 text-center">
    <div v-if="state == 1" class="font-semibold text-xl">
      Start your membership
    </div>
    <div v-if="state == 2" class="font-semibold text-xl">Let we know you</div>
    <div v-if="state == 3" class="font-semibold text-xl">Let's get rich ;D</div>
    <div v-if="state == 4" class="font-semibold text-xl">Success 🎉</div>

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
      <div class="text-sm">create account</div>
      <div class="text-sm">information</div>
      <div class="text-sm">payment</div>
    </div>

    <div
      v-if="state == 1"
      id="state1"
      class="flex flex-col mt-20 px-5 mx-auto text-left w-screen"
      style="transition-duration: 0.25s"
    >
      <div class="text-3xl font-semibold">Create account</div>
      <div class="mt-3 text-sm font-light">
        Just a few more steps and you're done! <br />
        We hate paperwork, too.
      </div>
      <input
        v-model="id"
        minlength="6"
        maxlength="20"
        type="text"
        placeholder="Username"
        name="id"
        class="bg-white rounded-md p-3 mt-5 text-sm"
        style="border-width: 1.5px; border-color: #000000"
        @input="validateid()"
      />
      <div class="h-3">
        <span v-if="validate.id == false" class="text-red-500 text-xs">
          * your username must be at lease 6 characters long</span
        >
      </div>
      <input
        v-model="pw"
        minlength="6"
        maxlength="20"
        type="password"
        placeholder="Password"
        name="password"
        class="bg-white rounded-md p-3 mt-5 text-sm"
        style="border-width: 1.5px; border-color: #000000"
        @input="validatepw()"
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
      v-if="state == 2"
      id="state2"
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
      </div>
      <div class="flex space-x-3">
        <div class="w-full">
          <input
            v-model="fname"
            minlength="1"
            maxlength="20"
            type="text"
            placeholder="first name"
            name="first name"
            class="bg-white rounded-md p-3 mt-3 text-sm w-full"
            style="border-width: 1.5px; border-color: #000000"
            @input="validatefname"
          />
          <div class="h-5">
            <span v-if="validate.fname == false" class="text-red-500 text-xs">
              * please fill</span
            >
          </div>
        </div>
        <div class="w-full">
          <input
            v-model="lname"
            minlength="1"
            maxlength="20"
            type="text"
            placeholder="last name"
            name="last name"
            class="bg-white rounded-md p-3 mt-3 text-sm w-full"
            style="border-width: 1.5px; border-color: #000000"
            @input="validatelname"
          />
          <div class="h-5 pl-2">
            <span v-if="validate.lname == false" class="text-red-500 text-xs">
              * please fill</span
            >
          </div>
        </div>
      </div>
      <input
        v-model="email"
        minlength="6"
        maxlength="50"
        type="email"
        placeholder="E-mail"
        name="email"
        class="bg-white rounded-md p-3 mt-3 text-sm"
        style="border-width: 1.5px; border-color: #000000"
        @input="validateemail"
      />
      <div class="h-5">
        <span v-if="validate.email == false" class="text-red-500 text-xs">
          * please fill</span
        >
      </div>
      <input
        v-model="phone"
        minlength="6"
        maxlength="20"
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        placeholder="phone number"
        name="phone number"
        class="bg-white rounded-md p-3 mt-3 text-sm"
        style="border-width: 1.5px; border-color: #000000"
        @input="validatephone"
      />
      <div class="h-5">
        <span v-if="validate.phone == false" class="text-red-500 text-xs">
          * please fill</span
        >
      </div>

      <button
        v-if="
          fname.length < 1 ||
          lname.length < 1 ||
          email.length < 6 ||
          phone.length < 6
        "
        class="p-4 text-white rounded-md font-medium mt-8 mx-auto cursor-not-allowed"
        style="background-color: #e9e9e9"
      >
        Next
      </button>
      <button
        v-if="
          fname.length >= 1 &&
          lname.length >= 1 &&
          email.length >= 6 &&
          phone.length >= 6
        "
        class="p-4 text-white rounded-md font-medium mt-8 mx-auto"
        @click="state += 1"
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
      v-if="state == 3"
      id="state2-5"
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
        v-model="acnum"
        minlength="10"
        maxlength="20"
        placeholder="account number"
        name="bankac"
        class="bg-white rounded-md p-3 mt-8 text-sm"
        style="border-width: 1.5px; border-color: #000000"
        @input="validateacnum"
      />
      <div class="h-4">
        <span v-if="validate.acnum == false" class="text-red-500 text-xs">
          * please fill</span
        >
      </div>
      <input
        v-model="acname"
        minlength="6"
        maxlength="50"
        type="text"
        placeholder="account name"
        name="bankac"
        class="bg-white rounded-md p-3 mt-3 text-sm"
        style="border-width: 1.5px; border-color: #000000"
        @input="validateacname"
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
        @click="(state += 1) + signup()"
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
      v-if="state == 4"
      id="state4"
      class="flex flex-col mt-20 mx-auto text-left px-5"
      style="transition-duration: 0.25s"
    >
      <div
        class="p-8 w-56 text-center rounded-3xl"
        style="background-color: #f5f5f5"
      >
        <div
          class="w-full text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap"
        >
          @{{ id }}
        </div>
        <div class="w-full text-ellipsis overflow-hidden whitespace-nowrap">
          {{ fname }} {{ lname }}
        </div>
      </div>
      <button class="p-4 text-white rounded-md font-medium mt-8 mx-auto">
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
import { useMainStore } from "@/stores/main";

// const mainStore = useMainStore();

export default {
  data() {
    return {
      state: 1,
      state1: true,
      state2: false,
      state3: false,

      id: "",
      pw: "",

      // shopImage: "null",
      // selectedImage: null,
      // shopname: "",
      fname: "",
      lname: "",
      email: "",
      phone: "",
      // link: "",

      bank: "",
      acnum: "",
      acname: "",

      // plan: "single",

      validate: {
        id: true,
        pw: true,

        // shopname: true,
        fname: true,
        lname: true,
        email: true,
        phone: true,
        // link: true,

        bank: true,
        acnum: true,
        acname: true,

        // plan: true,
      },
    };
  },
  methods: {
    async signup() {
      // console.log("start");
      const mainStore = useMainStore();

      let user = {
        username: this.id,
        password: this.pw,

        firstname: this.fname,
        lastname: this.lname,
        email: this.email,
        mobileNumber: this.phone,

        via: this.bank,
        paymentAccountNumber: this.acnum,
        paymentAccountName: this.acname,
        paymentMethodCodeName: "TransferNumber",
      };
      await mainStore.post("register", user);

      // console.log("finish");
    },
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
