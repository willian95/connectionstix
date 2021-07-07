<template>
  <header :class="transparent == true ? 'header-2 '+navbarClass : 'header-2 change-color '+navbarClass" >
    <!---<NuxtLink class="nav-link" :to="{ path: '/attraction'}">Inicio</NuxtLink>--->
    <div class="dflex-sec">
      <client-only>
        <nuxt-link :to="{ path: '/'}">
          <div v-if="transparent == true">
            <img v-if="logo" class="brand" :src="logo" alt="" />
          </div>
          <div v-else>
            <img v-if="secondaryLogo" class="brand" :src="secondaryLogo" alt="" />
          </div>
        </nuxt-link>
      </client-only>
      <div class="select-language">
        <v-col class="d-flex" cols="12" sm="5">
          <v-select :items="languages" solo v-model="language" @change="changeLanguage()"></v-select>
        </v-col>

      </div>
    </div>
    <div>
      <NuxtLink class="nav-link" :to="localePath('/checkout')">
        <img src="~assets/images/iconos/cart.png" alt="">
        <p class="change-navbar-font-color">{{ numberItems }}</p>
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
  props:["transparent", "positionAbsolute"],
  data: () => ({
    languages: ["en", "es"],
    language:"",
    logo:"",
    secondaryLogo:"",
    navbarClass:""
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

      if(process.browser){
        this.secondaryLogo = window.localStorage.getItem("secondaryLogo")
      }

    },
    changeLanguage(){

      this.$i18n.setLocale(this.language)

    },
    getColor(){
      if(process.browser){
        if(this.transparent == false){
          let color = localStorage.getItem("color")

      
          if(color){
            $(".change-color").css("background", color)
            $(".change-navbar-font-color").css("color", color)
            
          }

     
            
        

        }else{
          $(".header-2").css("background", "transparent")
        }
      }
    },
    async getConfig(){

      let config = await this.$axios.get("configcms")
      this.overlay =  config.data.overlay

      if(config.data.hero){
        this.backImage = process.env.SERVER_URL+config.data.hero
      }

      if(config.data.logo){
      
        if(process.browser){
          localStorage.setItem("logo",  process.env.SERVER_URL+config.data.logo)
        }
      }

      if(config.data.secondaryLogo){
      
        if(process.browser){
          localStorage.setItem("secondaryLogo",  process.env.SERVER_URL+config.data.secondaryLogo)
          console.log("secondLogo", config.data.secondaryLogo)
        }
      }

      if(config.data.footerLogo){
      
        if(process.browser){
          localStorage.setItem("footerLogo",  process.env.SERVER_URL+config.data.footerLogo)
        }
      }

      if(config.data.color){
        if(process.browser){
          localStorage.setItem("color", config.data.color)
        }
      }


      if(config.data.textColor){
        if(process.browser){
          localStorage.setItem("textColor", config.data.textColor)
        }
      }

      if(config.data.overlay){
        if(process.browser){
          
          localStorage.setItem("overlay", config.data.overlay)
          
        }
      }

      this.getLogo()
      
    }
  },
  mounted(){

    this.getLocalStorageOrders()

    this.getConfig()
    this.getColor()
    this.language = this.$i18n.locale

    if(this.positionAbsolute == true){
      this.navbarClass = "absolute-position"
    }

  },
  watch:{
    transparent: function(newVal, oldVal){

        this.transparent = newVal
        this.getColor()

    }
  },
};
</script>

<style lang="scss">
.absolute-position{
  position: absolute;
}


header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  background: transparent;
  padding: 0.5rem 7rem;
  z-index: 9;
  top: 0;
   @include respond-to(sm) {
   padding: 1rem;
   }

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

    @include respond-to(xs) {
      display: grid;

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
