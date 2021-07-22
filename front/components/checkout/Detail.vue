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
      <v-col cols="12" sm="4" md="4">
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
      </v-col>
      <v-col cols="12" sm="3" md="3">
        

        <v-card class="pa-2" outlined tile>
          <div class="main-min" v-if="cancellationPolicy">
            <button class="flex" @click="showCancellationPolicyModal(cancellationPolicy)">
              <img class="" src="~assets/images/iconos/info.png" alt="" />
              <p>{{ $t('cancellationPolicy') }}</p>
            </button>
          </div>
          <div class="main-min">
            <NuxtLink :to="localePath('/attractions/' + productId)">
              <button class="flex">
                <img class="" src="~assets/images/iconos/info.png" alt="" />
                <p class="text-dark">{{ $t('moreInfo') }}</p>
              </button>
            </NuxtLink>
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
          <img
            class="trash-icon"
            src="~assets/images/iconos/trash.png"
            alt=""
          />
        </v-card>
      </v-col>
    </v-row>
    <div class="main-accions">
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
    "checkDiscountCode"
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
        description:""


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
        discountCode: this.discountCode
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
        price_types: this.priceTypes
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

      let res = await this.$axios.get("products/"+this.productId)
      this.mainImage = res.data.images[0]
      this.title = res.data.product_name
      this.images = res.data.images
      this.description = res.data.long_description


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
    if (process.browser) {
      let color = localStorage.getItem("color");
      if (color) {
        $(".change-color").css("background", color);
      }
    }
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

.main-accions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-bottom: 1px solid #00000024;
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
        padding-top: 4rem;
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
</style>
