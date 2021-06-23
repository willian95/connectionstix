<template>
  <div>
    <NavbarView></NavbarView>
    <!------------------------------------>

    <div class="container main-checkout">
      <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
        <v-expansion-panel>
          <v-expansion-panel-header
            ><img
              class="icon-arrow"
              src="~assets/images/iconos/arrow.png"
              alt=""
            />
            Review your selected attraction(s)</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <div v-for="item in items" :key="item.item_id">
              <Detail :thumbnail="item.thumbnail" :itemId="item.item_id" :prices="item.pricing.price_types" :productName="item.product_name" :currencySymbol="currencySymbol" :currencyCode="currencyCode" :remove="remove" :order="order" :getItems="getItems" :discountEnabled="item.pricing.discounts_enabled"/>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!------------------------->
        
        <!--------------slider items------------->
        <v-expansion-panel>
          <v-expansion-panel-header
            ><img
              class="icon-arrow"
              src="~assets/images/iconos/arrow.png"
              alt=""
            />
            More options to choose for...</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-container>
              <v-sheet class="mt-5 mx-auto slide_events" elevation="8">
                <v-slide-group
                  mobile-break-point="1000"
                  show-arrows
                  center-active
                >
                  <v-btn
                    class="mx-2"
                    active-class="purple white--text"
                    depressed
                    rounded
                  ></v-btn>
                  <v-slide-item v-for="(slide, i) in slidesenvents" :key="i">
                    <v-card class="ma-4 card-slide_events">
                      <v-img contain :src="slide.image"></v-img>
                      <v-card-text>
                        <h3>{{ slide.title }}</h3>
                        <p>{{ slide.description }}</p>
                        <div class="txt-star">
                          <NuxtLink class="" :to="{ path: '/attraction' }">
                            <img
                              class="icon-cart"
                              src="~assets/images/iconos/cart2.png"
                              alt=""
                            />
                            Book now!</NuxtLink
                          >
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-slide-item>
                </v-slide-group>
              </v-sheet>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!------------Billing info------------------>
        <v-expansion-panel>
          <v-expansion-panel-header
            ><img
              class="icon-arrow"
              src="~assets/images/iconos/arrow.png"
              alt=""
            />
            Billing info</v-expansion-panel-header
          >
          <v-expansion-panel-content class="main-card">
            <template v-if="selectedPaymentProvider != ''">
              <v-row>
                <v-col cols="12" sm="1" md="3">
                  <label for="">First name</label>
                  <v-text-field
                    label="Pedro Pérez Pereira"
                    single-line
                    outlined
                    v-model="customer_first_name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="1" md="3">
                  <label for="">Lastname</label>
                  <v-text-field
                    label="1234 5678 9012 3456"
                    single-line
                    outlined
                    v-model="customer_last_name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="1" md="3">
                  <label for="">Email</label>
                  <v-text-field
                    label="1234 5678 9012 3456"
                    single-line
                    outlined
                    v-model="customer_email"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="1" md="3">
                  <label for="">Phone</label>
                  <v-text-field
                    label="1234 5678 9012 3456"
                    single-line
                    outlined
                    v-model="phone"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="1" md="3">
                  <label for="">Address 1</label>
                  <v-text-field
                    label="1234 5678 9012 3456"
                    single-line
                    outlined
                    v-model="address_line1"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="1" md="3">
                  <label for="">Address 2</label>
                  <v-text-field
                    label="1234 5678 9012 3456"
                    single-line
                    outlined
                    v-model="address_line2"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="1" md="3">
                  <label for="">City</label>
                  <v-text-field
                    label="1234 5678 9012 3456"
                    single-line
                    outlined
                    v-model="city"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="1" md="3">
                  <label for="">Province state</label>
                  <v-text-field
                    label="1234 5678 9012 3456"
                    single-line
                    outlined
                    v-model="province_state"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="1" md="3">
                  <label for="">Postal zip code</label>
                  <v-text-field
                    label="1234 5678 9012 3456"
                    single-line
                    outlined
                    v-model="postal_zip_code"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="1" md="3">
                  <label for="">Country</label>
                  <v-text-field
                    label="1234 5678 9012 3456"
                    single-line
                    outlined
                    v-model="country"
                  ></v-text-field>
                </v-col>
                
              </v-row>
              <v-row>
                <v-col cols="12" sm="1" md="3">
                  <label for="">Ticket delivery</label>
                  <v-select :items="deliveryMethods" solo v-model="ticket_delivery_method"></v-select>
                </v-col>

                
              </v-row>
              <v-row>
                <v-col cols="12" sm="1" md="3">
                  <label for="">Discount code</label>
                  <v-text-field
                    label="1234 5678 9012 3456"
                    single-line
                    outlined
                    v-model="discountCode"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="1" md="3">
                  <button class="btn btn-success" @click="setDiscountCode()">update order</button>
                </v-col>
              </v-row>
            </template>
            
            <div class="paymethod">
              <p>Payment Method</p>
              <v-row>
                <v-col cols="12" sm="4" md="4">
                  <v-radio-group v-model="radios" mandatory>
                    
                    <div class="radio-main" v-for="(paymentProvider, index) in paymentProviders" :key="'paymentProviders-'+index">
                      {{ paymentProvider.payment_provider_name }}
                      <v-radio :key="'radioButton-'+index" :value="index" @click="getInfoFromSelectedPaymentProvider()"></v-radio>
                    </div>

                    <!--<div class="radio-main">
                      <img src="~assets/images/iconos/visa.png" alt="" />
                      <v-radio label="" value="radio-2"></v-radio>
                    </div>-->
                  </v-radio-group>
                </v-col>

                <v-col class="center" cols="12" sm="4" md="4">
                  <div class="total_txt">
                    <p>Total</p>
                    <p>$ {{ total }} CAD</p>
                  </div>
                </v-col>
                <v-col class="center"  cols="12" sm="4" md="4">
                  <button class="btn" @click="checkout()">Proceed to Checkout</button>
                </v-col>
              </v-row>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <!---------------------------------------->
      <p><strong>Cancellation policy</strong></p>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem </p>
    </div>
  </div>
</template>
<script>

import Detail from "~/components/checkout/Detail";

export default {
  data: () => ({
    
    order:"",
    currencySymbol:"",
    currencyCode:"",
    items:[],
    total:0,
    panel: [0, 1, 2, 3],
    disabled: false,
    readonly: false,
    paymentProviders:[],
    radios:0,
    selectedPaymentProvider:"",

    customer_first_name:"",
    customer_last_name:"",
    customer_email:"",
    phone:"",
    address_line1:"",
    address_line2:"",
    city:"",
    province_state:"",
    postal_zip_code:"",
    country:"",
    payment_provider_id:"",
    payment_data:"",
    deliveryMethods:["text", "email"],
    ticket_delivery_method:"email",
    payment_data:"",
    discountCode:"",

    slidesenvents: [
      {
        title: "The water boat",
        image: "http://imgfz.com/i/6eIWYLv.png",
        description: "$38 CAD/Person"
      },
      {
        title: "The wonderland",
        image: "http://imgfz.com/i/6eIWYLv.png",
        description: "$33 CAD/Person"
      },
      {
        title: "The night trip",
        image: "http://imgfz.com/i/6eIWYLv.png",
        description: "$27 CAD/Person"
      },
      {
        title: "The night trip",
        image: "http://imgfz.com/i/6eIWYLv.png",
        description: "$27 CAD/Person"
      }
    ]
  }),
  components:{Detail},
  methods:{

    async getItems(){

      if(process.browser){

        let order = window.localStorage.getItem("orders")
        if(order != null){

          let res = await this.$axios.get("orders/item-list/"+order)
          this.items = res.data.items
          this.currencyCode = res.data.currency_code
          this.currencySymbol = res.data.currency_symbol
          this.order = order
          this.getTotal()
        }

      }

    },
    getTotal(){
      this.total = 0
      this.items.forEach(data => {
  
        data.pricing.price_types.forEach(prices => {
          this.total = this.total + (prices.current_price * prices.quantity)
        })
        
      })
    },
    async getCartCount(order){

      let res = await this.$axios.get("orders/item-count/"+order)
      return res.data.data.number_of_items

    },

    async remove(itemId){

      let res = await this.$axios.post("/orders/item-delete", {
        "request_number": this.order,
        "item_id": itemId
      })

      var _this = this

      if(res.data.status.result_messages[0] == "OK"){

          let numberItems = await this.getCartCount(this.order)
          await this.$store.dispatch("storeCartAmount", {amount: numberItems})
          
          this.$swal({
            text:"Product removed",
            icon: "success"
          }).then(ans =>{

            _this.getItems()

          })
        }else{

          this.$swal({
            text:res.data.status.result_messages[0],
            icon: "error"
          })

        }

    },
    getInfoFromSelectedPaymentProvider(){
      this.paymentProviders.forEach((data, index) => {

        if(index == this.radios){

          this.selectedPaymentProvider = data

        }

      })
    },
    async getPaymentProviders(){

      let res = await this.$axios.post("checkout/payment-providers",{
        order_number: this.order
      })

      this.paymentProviders = res.data.data

      this.getInfoFromSelectedPaymentProvider()

    },
    setFields(){

      let request = null
      

        request = {
          customer_first_name:this.customer_first_name,
          customer_last_name:this.customer_last_name,
          customer_email:this.customer_email,
          phone:this.phone,
          address_line1:this.address_line1,
          address_line2:this.address_line2,
          city:this.city,
          province_state:this.province_state,
          postal_zip_code:this.postal_zip_code,
          country:this.country,
          order_number:this.order,
          payment_provider_id:this.payment_provider_id,
          payment_data:this.payment_data,
          ticket_delivery_method:this.ticket_delivery_method
        }

      

      return request

    },
    async checkout(){

      this.payment_provider_id = this.selectedPaymentProvider.payment_provider_id

      if(this.payment_provider_id == 26){
        this.payment_data = {
          "order_id":this.order
        }
      }else if(this.payment_provider_id == 4){
       
      }else if(this.payment_provider_id == 0){

        this.payment_data = null

      }

      let request = this.setFields()

      let res = await this.$axios.post("checkout",request)

      console.log(res)


    },
    async setDiscountCode(){

      let res = await this.$axios.post("orders/discount-order",{
          "order_number": this.order,
          "discount_code": this.discountCode
      })

      if(res.data.status.result_messages[0] != "OK"){

          this.$swal({
              text:res.data.status.result_messages[0],
              icon: "error"
          })
   
      }else{

        this.$swal({
          text:res.data.status.result_messages[0],
          icon: "success"
        }).then(ans => {

          this.getItems()

        })
      }

      

    },

  },
  async created(){
    await this.getItems()
    if(this.order){
      this.getPaymentProviders()
    }
  }
};
</script>

<style lang="scss">
.main-checkout {
  margin-top: 5rem;
  margin-bottom: 5rem;
  padding: 0 6rem;

  .v-card {
    border: none;
  }

  .end {
    display: flex;
    justify-content: flex-end;
    font-weight: bold;
    line-height: 1.2;
    margin-bottom: 2rem;
    text-align: end;

    div {
      text-align: center;
    }
  }

  .v-expansion-panel--active > .v-expansion-panel-header {
    background: #ef1856;
    color: #fff;
    min-height: 45px;
    font-size: 1rem;

    .v-icon {
      display: none;
    }
  }

  .icon-arrow {
    width: 20px;
    height: 20px;
    display: flex;
    flex: unset!important;
    margin-right: 10px;
  }

  .info-panel {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      position: absolute;
      color: #fff;
      font-weight: 600;
      font-size: 1rem;
    }

    img {
      border-radius: 15px;
      height: 150px;
      width: 300px;
      object-fit: cover;
    }
  }

  .content-panel {
    margin-top: 3rem;

    .flex {
      display: flex;
    }

    .txt-panel {
      text-align: center;
      font-weight: bold;
      font-size: 1.1rem;
      padding-bottom: 9px;
    }

    .row-center {
      display: flex;
      align-items: center;
    }

    .main-min {
      display: grid;
      margin-bottom: 1rem;
      grid-template-columns: 1fr 1fr;

      img {
        width: 25px;
        height: 27px;
        object-fit: contain;
        margin-right: 10px;
      }

      .content-mx {
        display: flex;
        margin-left: 1.4rem;

        p {
          margin: 0 0.8rem;
        }

        .style-btn {
          background: #ef1856;
          border-radius: 18%;
          height: 21px;
          width: 20px;
          color: #fff;
          font-size: 1.2rem;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      }
    }

    .trash-icon {
      width: 20px;
      height: 25px;
    }
  }

  .v-expansion-panel-content {
    display: flex;
    border: 1px solid #d2d2d2;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .v-expansion-panel::before {
    box-shadow: none;
  }

  .content-panel_style {
    margin-top: 4rem;
    border-radius: 20px;

    .main-min {
      p {
        font-weight: 500;
      }
    }

    .mt4 {
      margin-top: 1.4rem;
    }
  }

  .flex-center {
    align-items: center;
    margin-top: 2rem;
  }

  .main-flex {
    display: flex !important;
  }

  .mt--5 {
    margin-top: -6rem;
  }

  /************/
  .slide_events {
    margin-bottom: 0;
    margin: 3rem 0;
    .mdi-chevron-left {
      color: #ef1856 !important;
      z-index: 1;
      top: 1rem;
      font-size: 5rem;
      right: 20px;

      font-size: 5rem;
    }
    .mdi-chevron-left::before {
      color: #ef1856;
    }
    .mdi-chevron-right {
      color: #ef1856 !important;
      z-index: 1;

      font-size: 5rem;
    }
    .v-image__image--contain {
      background-size: cover;
    }
    .card-slide_events {
      box-shadow: 0px 2px 10px rgb(0 0 0 / 25%) !important;
      border-radius: 15px;
      margin-bottom: 1rem;
      .theme--light.v-image {
        width: 274px;
        height: 182px;
         @include respond-to(xs) {
          width: 163px;
          height: 87px;
         }
      }
    }
    .v-card__text {
      color: #000 !important;
      p {
        font-weight: 500;
      }
      a {
        color: #ef1856;
      }
    }
    .v-btn:not(.v-btn--round).v-size--default {
      display: none;
    }

    .v-slide-group__next,
    .v-slide-group__prev {
      flex: 0 1 34px;
      min-width: 0;
    }
    .v-slide-group__content {
      gap: 18px;
    }
    .icon-cart {
      width: 21px;
      height: 21px;
      object-fit: contain;
      padding-top: 4px;
      margin-right: 7px;
      margin-top: 0.5rem;
    }
  }
}
.v-input .v-label {

    padding-left: 10px;
}
.paymethod {
  
  .theme--light.v-label {
    font-size: 1rem;
    color: #000 !important;
    padding-left: 1rem;
 
  }
  .v-text-field--filled > .v-input__control > .v-input__slot,
  .v-text-field--full-width > .v-input__control > .v-input__slot,
  .v-text-field--outlined > .v-input__control > .v-input__slot {
    min-height: 45px;
  }
  .v-radio-group {
    display: flex;
  }
  .v-input--radio-group--column .v-input--radio-group__input {
    flex-direction: initial;
  }
  .radio-main {
    text-align: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 3rem;
    img {
      width: 50px;
      height: 50px;
      object-fit: contain;
    }
  }
  .theme--light.v-icon {
    color: rgb(239 24 86);
  }
  .total_txt {
    text-align: center;
    p {
      font-weight: bold;
      color: #000;
      font-size: 1.2rem;
    }
  }
  .btn{
    padding: 10px;
    text-decoration: none;
  }
  .center{
        justify-content: center;
    align-items: center;
    display: flex;
  }

}
 .main-card {
    padding-top: 3rem;
        margin-bottom: 5rem;
 }
   button:disabled {
    background: #b9b9b9!important;
}
 .btn{
 
background: #EF1856;
    color: #fff;
    min-width: auto;
    border-radius: 9px!important;
    padding: .5rem 2rem;
    font-size: .7rem;
 }
</style>
