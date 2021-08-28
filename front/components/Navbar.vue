<template>
  <header :class="transparent == true ? 'header-2 '+navbarClass : 'header-2 change-color '+navbarClass">
    <!---<NuxtLink class="nav-link" :to="{ path: '/attraction'}">Inicio</NuxtLink>--->
    <v-row class="p-1t" no-gutters>
     <v-col cols="3"   >
        <client-only>
        <nuxt-link :to="{ path: '/'}">
          <div v-if="transparent == true">
            <img v-if="secondaryLogo" class="brand" :src="secondaryLogo" alt="" />
          </div>
          <div v-else>
            <img v-if="logo && $route.path == '/' " class="brand" :src="logo" alt="" />
            <img v-if="secondaryLogo && $route.path != '/' " class="brand" :src="secondaryLogo" alt="" />
            
          </div>
        </nuxt-link>
      </client-only>
     </v-col>
    <v-col cols="4"  >
      <div class="select-language">
        <v-select :items="languages" solo v-model="language" @change="changeLanguage()"></v-select>
    </div>
    </v-col>
    <v-col class="text-end" cols="5" >
      <div class="style-icon_car">
        <NuxtLink class="nav-link" :to="localePath('/checkout')" v-if="numberItems > 0">
          <img src="~assets/images/iconos/cart.png" alt="">
          <p class="change-navbar-font-color">{{ numberItems }}</p>
        </NuxtLink>
        <div v-else class="nav-link" @click="showEmptyCartMessage()" style="cursor: pointer">
          <img src="~assets/images/iconos/cart.png" alt="">
        </div>
      </div>
    </v-col>
    </v-row>

  <!--  <div class="dflex-sec">
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
        <v-col class="d-flex" cols="7">
          <v-select :items="languages" solo v-model="language" @change="changeLanguage()"></v-select>
        </v-col>

      </div>
    </div>
    <div>
      <NuxtLink class="nav-link" :to="localePath('/checkout')" v-if="numberItems > 0">
        <img src="~assets/images/iconos/cart.png" alt="">
        <p class="change-navbar-font-color">{{ numberItems }}</p>
      </NuxtLink>
      <div v-else class="nav-link" @click="showEmptyCartMessage()" style="cursor: pointer">
        <img src="~assets/images/iconos/cart.png" alt="">
      </div>
    </div>--->
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
    logo:"",
    secondaryLogo:"",
    navbarClass:"",
    transparent:true,
    positionAbsolute:true,
    showNavbar:false
  }),
  methods:{
    showEmptyCartMessage(){

       this.$swal({
          text: this.$t("shoppingCartEmpty"),
          icon: "warning"
        })

    },
    async getCartCount(order){

      let res = await this.$axios.get("orders/item-count/"+order)
      return res.data.data.number_of_items

    },
     async getLocalStorageOrders(){

      if(process.browser){

        let order = window.localStorage.getItem("orders")
        if(order != null){
          let numberItems = await this.getCartCount(order)
          await this.$store.dispatch("storeCartAmount", {amount: numberItems})
        }
        

      }

    },
    changeLanguage(){

      this.$i18n.setLocale(this.language)

    },
    async getConfig(){

      let config = await this.$axios.get("configcms")
      this.overlay =  config.data.overlay

      if(this.$route.path == "/"){
        this.transparent=!this.overlay 
        this.positionAbsolute=!this.overlay 
      }else{

        this.transparent=this.overlay 
        this.positionAbsolute=this.overlay 

      }

      this.showNavbar = true

      if(config.data.hero){
        this.backImage = process.env.SERVER_URL+config.data.hero
      }

      if(config.data.color){
        if(process.browser){
         
          window.setTimeout(function(){
            $(".change-color").css("background-color", config.data.color);
          }, 400)
        }
      }

      

      if(config.data.logo){
      
        if(process.browser){
          this.logo = process.env.SERVER_URL+config.data.logo
        }
      }

      if(config.data.secondaryLogo){
      
        if(process.browser){
          this.secondaryLogo = process.env.SERVER_URL+config.data.secondaryLogo
        }
      }

      if(this.$route.path == "/"){
        if(this.positionAbsolute == true){
          this.navbarClass = "absolute-position"
        }

      }else{
        if(this.positionAbsolute == true){
          this.navbarClass = "absolute-position change-color"
        }else{
          this.navbarClass = ""
        }
      }

      
      
    }
  },
  created(){
      this.getConfig()
  },
  mounted(){

    this.getLocalStorageOrders()
    
    //this.getConfig()
    
    this.language = this.$i18n.locale

    

  },
  watch:{
    transparent: function(newVal, oldVal){

        
        //this.getColor()

    }
  },
};
</script>

<style lang="scss">
.absolute-position{
  position: absolute;
}

.nav-link .change-navbar-font-color{
  color: #000;
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
   .v-select__selections {
    padding-left: 0;
}
    /* @include respond-to(xs) {

 .select-language .v-select__selections {
    max-width: 74%;
}
   }*/

  .dflex-sec{
        display: inline-flex;
        align-items: inherit;
  }
  @include respond-to(xs) {
    padding: 0.5rem;
     align-items: center;
}
  }
  .brand {
    width: 200px;
    height: 100%;
    //object-fit: contain;
    display: block;
    @include respond-to(xs) {
    width: 110px;
    }
  }
  .select-language {
    width: 181px;
    overflow: hidden;
     @include respond-to(xs) {
            padding-top: 0;
    width: 136px;
    padding-left: 1rem;
.v-select__selections {
    padding-left: 0;
  
}
     }
    
      margin-left: 0;
      padding-top: 1.5rem;
   .v-text-field.v-text-field--solo .v-input__control {
          min-height: auto;
          padding: 0;
            }
            .v-select__selection--comma {
          margin: 0;
          margin-left: 2rem;
            }
            .v-input input {
          padding: 0 0rem;
            }
            .v-input__slot {
                margin-bottom: 0;
            }
      .d-flex{
        padding: 0;
      }
      .v-text-field.v-text-field--solo .v-label {

          padding-left: 0rem;
        
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
   .text-end{
   text-align: end;
   }
 .style-icon_car{
       display: flex;
    align-items: flex-end;
    width: 100%;
    text-align: end;
    justify-content: flex-end;

   img{
     width: 33px;
    height: 100%;
        @include respond-to(xs) {
    width: 27px;
        }
   }
 }
 .p-1t{
       padding-top: 1rem;
 }

</style>
