<template>
  <div class="content-panel">
   

    <div id="open-modal" :class="'modal-window open-modal '+modalClass">
        <div  class="modal-table" >
            {{ cancellationPolicy }}
            <button title="Close" class="modal-close" @click="closeCancellationPolicyModal()">x</button>
        </div>
            
    </div>


    <v-row no-gutters class="row-center">
      <v-col cols="12" sm="4" md="4">
        <v-card class="pa-2" outlined tile>
          <p class="txt-panel">$ {{ currencyFormatDE(total) }}</p>
          <div class="info-panel">
            <p>{{ productName }}</p>
            <img class="" :src="thumbnail" alt="" />
          </div>
        </v-card>
      </v-col>
      <v-col class="flex-customs" cols="12" sm="4" md="4">
        <v-card class="pa-2" outlined tile>
          <div class="main-min" v-for="(amount, index) in amounts" :key="index">
            <div class="flex">
              <p>{{ currencySymbol }} {{ currencyFormatDE(amount.price) }}</p>
            </div>
            <div class="content-mx">
              <div class="style-btn change-color" @click="substract(index)">
                -
              </div>
              <p>{{ amount.amount }}</p>
              <div class="style-btn change-color" @click="addItem(index)">
                +
              </div>
            </div>
          </div>
        </v-card>
        <div>
              <div class="main-min main-min_dates" v-if="cancellationPolicy">
            <button class="flex" @click="showCancellationPolicyModal(cancellationPolicy)">
              

              <img class="" v-if="iconColor == 'black'" src="/icons-black/info.png" alt="" />
              <img class="" v-if="iconColor == 'magenta'" src="/icons-magenta/info.png" alt="" />
              <p>{{ $t('cancellationPolicy') }}</p>
            </button>
          </div>
          <div class="main-min">
            <NuxtLink :to="localePath('/attractions/' + productId)">
              <button class="flex">
                <img class="" v-if="iconColor == 'black'" src="/icons-black/info.png" alt="" />
              <img class="" v-if="iconColor == 'magenta'" src="/icons-magenta/info.png" alt="" />
                <p style="color: #4a4a4a">{{ $t('moreInfo') }}</p>
              </button>
            </NuxtLink>
          </div>
        </div>
      </v-col>
      <v-col class="flex-customs-xs" cols="12" sm="3" md="3">
        <v-card class="pa-2" outlined tile>
         <div class="main-min main-min_dates" v-if="fromDatetime  != null">
            <h4>{{ $t('departure') }}</h4>
            <div class="flex" >
              <img class="" v-if="iconColor == 'black'" src="/icons-black/arrow1.png" alt="" />
              <img class="" v-if="iconColor == 'magenta'" src="/icons-magenta/arrow1.png" alt="" />
              <p>{{ dateString(fromDatetime.date)  }}</p>
            </div>
               <div class="flex" >
                  <img class="" v-if="iconColor == 'black'" src="/icons-black/reloj.png" alt="" />
                  <img class="" v-if="iconColor == 'magenta'" src="/icons-magenta/reloj.png" alt="" />
   
              <p>{{ fromDatetime.time }} {{ fromDatetime.ampm }}</p>
            </div>
          </div>

          <div class="main-min main-min_dates" v-if="toDatetime != null">
                <h4>{{ $t('return') }}</h4>
            <div class="flex" >
                  <img class="" v-if="iconColor == 'black'" src="/icons-black/arrow1.png" alt="" />
                  <img class="" v-if="iconColor == 'magenta'" src="/icons-magenta/arrow1.png" alt="" />
              <p>{{ dateString(toDatetime.date) }}</p>
            </div>
               <div class="flex" >
                  <img class="" v-if="iconColor == 'black'" src="/icons-black/reloj.png" alt="" />
                  <img class="" v-if="iconColor == 'magenta'" src="/icons-magenta/reloj.png" alt="" />
              <p>{{ toDatetime.time }} {{ toDatetime.ampm }}</p>
            </div>
          </div>

        
        </v-card>
        
      </v-col>
      <v-col cols="12" sm="1" md="1">
        <v-card
          class="pa-2"
          outlined
          tile
          style="cursor:pointer;"
          @click="remove(itemId)"
        >
          <img class="trash-icon" v-if="iconColor == 'black'" src="/icons-black/trash.png" alt="" />
          <img class="trash-icon" v-if="iconColor == 'magenta'" src="/icons-magenta/trash.png" alt="" />

        </v-card>
      </v-col>
    </v-row>
    <div :class="length > 1 && indexItem < length -1 ? checkoutItemClassBorder : checkoutItemClass">
      <div class="items">
        <v-text-field
          :label="$t('discountCode')"
         
          outlined
          v-model="discountCode"
          v-if="discountEnabled"
          @keyup="checkDiscountCode(itemId, discountCode)"
        ></v-text-field>
      </div>
      <div class="items itemend">
       <div class="end">
            <button class="btn change-color" :disabled="isDisabled && discountCode == discountCodeProp" @click="update()" v-show="!onLoadingUpdate">{{ $t('update') }}</button>
            <center>
                <v-progress-circular
                v-show="onLoadingUpdate == true"
                indeterminate
                color="primary"
                ></v-progress-circular>
            </center>
       </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: [
    "indexItem",
    "length",
    "cancellationPolicy",
    "productName",
    "thumbnail",
    "prices",
    "remove",
    "itemId",
    "currencyCode",
    "currencySymbol",
    "order",
    "getItems",
    "checkUpdatedItems",
    "productId",
    "discountEnabled",
    "discountCodeProp",
    "checkDiscountCode",
    "fromDatetime",
    "toDatetime",
    "iconColor"
  ],
  data() {
    return {
        total: 0,
        amounts: [],
        priceTypes: [],
        oldAmounts: [],
        isDisabled: true,
        discountCode: "",
        onLoadingUpdate:false,
        modalClass:"custom-modal-close",
        modalProductClass:"custom-modal-close",
        onLoadingProduct:false,
      
        mainImage:"",
        title:"",
        images:[],
        description:"",
        checkoutItemClass:"main-accions",
        checkoutItemClassBorder:"main-accions border-bottom-checkout"


    };
  },
  methods: {
    
    setTotal() {
      this.total = 0;
      this.amounts.forEach(data => {
        this.total = this.total + data.amount * data.price;
      });
    },
    substract(index) {
      if (this.amounts[index].amount > 0) {
        this.amounts[index].amount--;
        this.setTotal();
        this.checkOldAndNewAmounts();
        this.checkUpdatedItems(this.amounts, this.productId);
      }
    },
    addItem(index) {
      
      if((this.amounts[index].amount + 1) <= process.env.MAX_AMOUNT){

        this.amounts[index].amount++;
        this.setTotal();
        this.checkOldAndNewAmounts();
        this.checkUpdatedItems(this.amounts, this.productId);

      }

    },
    checkOldAndNewAmounts() {
      this.isDisabled = true;
      this.amounts.forEach((data, index) => {
        if (this.amounts[index].amount != this.oldAmounts[index].amount) {
          this.isDisabled = false;
        }
      });
    },
    currencyFormatDE(num) {
      return (
          num
          .toFixed(2) // always two decimal digits
          //.replace('.', ',') // replace decimal point character with ,
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      ) // use . as a separator
    },
    async update() {
      let discountResponse = true;
      
      let updateResponse = true;
        this.onLoadingUpdate = true
      //if (this.discountCode != "") {
      discountResponse = await this.setDiscountCode();
      //}

      if (!this.isDisabled) {
        updateResponse = await this.updateAmounts();
      }

      if (discountResponse && updateResponse) {
        this.$swal({
          text: "Item updated",
          icon: "success"
        }).then(ans => {
          //this.discountCode = "";
          this.getItems();
        });
      }

      this.onLoadingUpdate = false
    },
    async setDiscountCode() {
      let res = await this.$axios.post("orders/discount-item", {
        order_number: this.order,
        item_id: this.itemId,
        discountCode: this.discountCode,
        pid:window.localStorage.getItem("pid")
      });

      if (res.data.status.result_messages[0] != "OK") {
        this.$swal({
          text: res.data.status.result_messages[0],
          icon: "error"
        });
        return false;
      }

      return true;
    },
    async updateAmounts() {
      this.formatPriceTypes();

      let res = await this.$axios.post("orders/item-update", {
        request_number: this.order,
        item_id: this.itemId,
        price_types: this.priceTypes,
        pid:window.localStorage.getItem("pid")
      });

      if (res.data.status.result_messages[0] != "OK") {
        this.$swal({
          text: res.data.status.result_messages[0],
          icon: "error"
        });

        return false;
      }

      return true;
    },
    formatPriceTypes() {
      this.priceTypes = [];
      this.amounts.forEach(data => {
        if (data.amount > 0) {
          this.priceTypes.push({
            price_type_id: data.priceTypeId,
            quantity: data.amount
          });
        }
      });
    },

    setNewAmount(newVal) {
      this.amounts = [];
      this.oldAmounts = [];
      this.isDisabled = true;

      newVal.forEach((data, index) => {
        this.amounts.push({
          priceTypeId: data.price_type_id,
          amount: data.quantity,
          price: data.current_price
        });
        this.oldAmounts.push({
          priceTypeId: data.price_type_id,
          amount: data.quantity,
          price: data.current_price
        });
      });
    },

    showCancellationPolicyModal(policy){
    
        this.cancellationPolicy = policy
        this.modalClass = "custom-modal-open"

    },
    closeCancellationPolicyModal(){
      
        this.modalClass = "custom-modal-close"

    },
    showProductModal(id){

        this.modalProductClass = "custom-modal-open"

    },
    closeProductModal(){
      
        this.modalProductClass = "custom-modal-close"

    },
    async fetchProduct(){

      let res = await this.$axios.get("products/"+this.productId, {
        params:{
          pid:window.localStorage.getItem("pid")
        }
      })
      this.mainImage = res.data.images[0]
      this.title = res.data.product_name
      this.images = res.data.images
      this.description = res.data.long_description


    },

    async getConfig() {
      let config = await this.$axios.get("configcms");

      if (config.data.hero) {
        this.backImage = process.env.SERVER_URL + config.data.hero;
      }

      if(config.data.color){
        if(process.browser){
          $(".change-color").css("background", config.data.color);
          $(".change-font-primary-color").css("color", config.data.color);
        }
      }

      if(config.data.textColor){
        if(process.browser){
          $(".change-font-color").css("color",  config.data.textColor);
        }
      }
    

    },

    dateString(date){

      let year = date.substring(0, 4)
      let month = date.substring(5, 7)
      let day = date.substring(8, 10)

      let hour = date.substring(11, 16)

      if(this.$i18n.locale == "en"){
        return month+"-"+day+"-"+year
      }else{  
        return day+"-"+month+"-"+year
      }
      

    },
    
  },
  created() {
    this.prices.forEach((data, index) => {
      this.amounts.push({
        priceTypeId: data.price_type_id,
        amount: data.quantity,
        price: data.current_price
      });
      this.oldAmounts.push({
        priceTypeId: data.price_type_id,
        amount: data.quantity,
        price: data.current_price
      });
    });
    this.discountCode = this.discountCodeProp
    this.fetchProduct()
    this.setTotal();
  },
  watch: {
    prices: function(newVal, oldVal) {
      this.setNewAmount(newVal);
    }
  },
  mounted() {
    this.getConfig()
  }
};
</script>

<style lang="scss">
.section_check {
  display: flex;
  padding: 8px !important;
  align-items: center;
  border-bottom: 1px solid #f7f7f7;
  margin-top: 12px;
  justify-content: space-between;
  @include respond-to(xs) {
    display: block;
  }

  .v-input {
    max-width: 300px;
    @include respond-to(xs) {
      margin-right: 0;
      max-width: 100%;
    }
  }
  .v-input__control > .v-input__slot {
    min-height: 40px;
  }
  .v-text-field--outlined .v-label {
    top: 10px;
  }
  .btn {
    margin-top: -2rem;
  }
}

.border-bottom-checkout{
  border-bottom: 1px solid #00000024;
}

.main-accions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  
  align-items: center;

  text-align: center;

  @include respond-to(xs) {
    display: block;

  }
     @include respond-to(sm) {
display: flex;
     }
  .items {
    width: 50%;
      @include respond-to(xs) {
width: 100%;
      }
       @include respond-to(sm) {
 width: 50%;
       }
  }
      .itemend{
         display: inline-grid;
    justify-content: end;
    text-align: end;
    align-items: end;
     @include respond-to(xs) {
justify-content: center;
    align-items: center;
    text-align: center;
     }
    }
  .v-input__slot {
     width: 58%;
    margin-left: 1rem;
        margin-top: 2rem!important;
         @include respond-to(xs) {
width: 100%;
    
    margin-left: 0rem;
         }
  }
 
.v-label {
    font-size: 13px;
}
 
}
.custom-modal-open{
    visibility: visible;
    opacity: 1;
}

.custom-modal-close{
  display: none;
}

  /**********modal**********/
  .interior{
    margin-bottom: 2rem;
  }
  .modal-window {
    position: fixed;
    background-color: rgb(0 0 0 / 57%);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    transition: all 0.3s;
  }
  .modal-window:target {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
  }
  .modal-window .modal-table{
    width: 700px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em;
    background: white;
        padding-top: 1rem;
        @include respond-to(xs) {
          width: 100%;
        }
  }
  .modal-window header {
    font-weight: bold;
  }
  .modal-window h1 {
    font-size: 150%;
    margin: 0 0 15px;
  }

  .modal-close {
    color: #7d7d7d;
    line-height: 50px;
    font-size: 1.5rem;
    position: absolute;
    top: 0;
    width: auto;
    text-decoration: none;
    right: 29px;
 
  }
  .modal-close:hover {
    color: black;
  }

  .modal-window > div {
    border-radius: 1rem;
  }

  .modal-window div:not(:last-of-type) {
    margin-bottom: 15px;
  }
  .flex-customs{
  display: flex;
flex-direction: column;
align-items: center;
}
   @include respond-to(xs) {
 .flex-customs-xs{
  display: flex;
flex-direction: column;
align-items: center;
}
   }
</style>
