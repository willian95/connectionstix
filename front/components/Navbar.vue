<template>
  <header>
    <!---<NuxtLink class="nav-link" :to="{ path: '/attraction'}">Inicio</NuxtLink>--->
    <div class="dflex-sec">
      <nuxt-link :to="{ path: '/'}"><img class="brand" :src="logo" alt="" /></nuxt-link>
      <div class="select-language">
        <v-col class="d-flex" cols="12" sm="4">
          <v-select :items="languages" solo v-model="language" @change="changeLanguage()"></v-select>
        </v-col>

      </div>
    </div>
    <div>
      <NuxtLink class="nav-link" :to="localePath('/checkout')">
      <img src="~assets/images/iconos/cart.png" alt="">
      <p>{{ numberItems }}</p>
      </NuxtLink>
    </div>
  </header>
</template>
<script>
export default {
  name: "Navbar",
  computed: {
      numberItems () {
          return this.$store.getters["getCartAmount"] != 0 ? this.$store.getters["getCartAmount"].amount : 0
      }
  },
  data: () => ({
    languages: ["en", "es"],
    language:"",
    logo:""
  }),
  methods:{
    async getCartCount(order){

      let res = await this.$axios.get("orders/item-count/"+order)
      return res.data.data.number_of_items

    },
     async getLocalStorageOrders(){

      if(process.browser){

        let order = window.localStorage.getItem("orders")
        let numberItems = await this.getCartCount(order)
        await this.$store.dispatch("storeCartAmount", {amount: numberItems})

      }

    },
    async getLogo(){

      if(process.browser){
        this.logo = window.localStorage.getItem("logo")
      }

    },
    changeLanguage(){

      this.$i18n.setLocale(this.language)

    }
  },
  mounted(){

    this.getLocalStorageOrders()
    this.getLogo()
    this.language = this.$i18n.locale

  }
};
</script>

<style lang="scss">
header {
    display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  background: transparent;
  padding: 0.5rem 7rem;
  position: absolute;
  z-index: 9;
  top: 0;
 
  .dflex-sec{
        display: inline-flex;
        align-items: inherit;
  }
  @include respond-to(xs) {
    padding: 0.5rem;
        align-items: baseline;
  }
  .brand {
    width: 200px;
    height: 100%;
    object-fit: contain;
    @include respond-to(xs) {
    width: 110px;
    }
  }
  .select-language {
   display: inline-flex;
    @include respond-to(xs) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-left: 0;

      .d-flex{
        padding: 0;
      }
.v-text-field.v-text-field--solo .v-label {

    padding-left: 0rem;
   
}
    }
    .v-select__slot {
      height: auto;
      color: #fff;
      border: none;
    }
    .v-input .v-label {
      color: white !important;
      font-size: 1rem;
      @include respond-to(xs) {
        font-size: 0.7rem;
      }
    }
    .v-select__selections {
      max-width: 65%;
       @include respond-to(xs) {
  max-width: 55%;
      }
    }
    .mdi-menu-down::before {
      color: #fff;
      @include respond-to(xs) {
        font-size: 0.9rem;
      }
    }
    .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
      border-color: rgba(0, 0, 0, 0.42);
      display: none;
    }
    .theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
      background: transparent;
    }
    .v-select__selection--comma {
      color: #fff;
      
    }
  }
 
}
</style>
