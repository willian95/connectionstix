

<template>
  <div>
    <div class="paymentDimmer" v-show="onLoadingPay">
      <div class="dimmer-body">
        <div>
          <h3 class="dimmer-body-white">{{ $t("wait") }}</h3>
         <center>
            <v-progress-circular
            indeterminate
            color="#fff"
          ></v-progress-circular>
         </center>
        </div>

      </div>

    </div>

    <v-app style="height: 50px;">
      <client-only>
      <Navbar></Navbar>
      </client-only>
    </v-app>

    <!------------------------------------>


    <div class="container main-checkout">
      <client-only>


      <v-expansion-panels v-model="panel" :disabled="disabled" multiple v-show="renderPage">
        <v-expansion-panel>

            <v-expansion-panel-header class="change-color"
            ><img
              class="icon-arrow"
              src="~assets/images/iconos/arrow.png"
              alt=""
            />
            {{ $t("reviewSelectedAttractions") }}
            </v-expansion-panel-header>


          <v-expansion-panel-content>
            <center>


                <v-progress-circular
                  v-show="onLoadingAttraction"
                  indeterminate
                  color="primary"
                ></v-progress-circular>


            </center>



            <div v-for="(item, index) in items" :key="'item-' + item.item_id">
              <Detail
                :indexItem="index"
                :length="items.length"
                :thumbnail="item.thumbnail"
                :itemId="item.item_id"
                :productId="item.product_id"
                :prices="item.pricing.price_types"
                :productName="item.product_name"
                :currencySymbol="currencySymbol"
                :currencyCode="currencyCode"
                :remove="remove"
                :order="order"
                :getItems="getItems"
                :discountEnabled="item.pricing.discounts_enabled"
                :discountCodeProp="item.pricing.discount_code == null ? '' : item.pricing.discount_code"
                :checkUpdatedItems="checkUpdatedItems"
                :cancellationPolicy="item.cancellation_policy"
                :checkDiscountCode="checkDiscountCode"
                :fromDatetime="item.from_datetime"
                :toDatetime="item.to_datetime"
                :iconColor="iconColor"
              />
            </div>

          </v-expansion-panel-content>
        </v-expansion-panel>

        <!------------------------->
        <!--------------slider items------------->
        <v-expansion-panel v-show="nearbyProducts.length > 0 && renderPage">
          <v-expansion-panel-header class="change-color"
            ><img
              class="icon-arrow"
              src="~assets/images/iconos/arrow.png"
              alt=""
            />
            {{ $t("moreOptions") }}</v-expansion-panel-header
          >

          <v-expansion-panel-content>


                <client-only>

                  <VueSlickCarousel v-bind="settings"  ref="nearbyProductCarousel" v-if="nearbyProducts.length" @afterChange="afterChange">

                    <div v-for="(slide, i) in nearbyProducts" :key="i">
                      <NuxtLink
                        class="no-underline"
                        :to="{ path: '/attractions/' + slide.product_id }"
                      >
                        <v-card class="ma-4 card-slide_events slick-custom">
                          <v-img contain :src="slide.thumbnail"></v-img>
                          <v-card-text>
                            <h3>{{ slide.product_name }}</h3>
                            <div class="txt-star"></div>
                          </v-card-text>
                        </v-card>
                      </NuxtLink>
                    </div>



                  </VueSlickCarousel>
                  <i aria-hidden="true" @click="showPrev()" :class="carouselIndex == 0 ? arrowLeftClassDisabled : arrowLeftClass" style="cursor: pointer;"></i>
                  <i v-if="width > 600" aria-hidden="true" @click="showNext()" :class="carouselIndex >= nearbyProducts.length - 3 ? arrowRightClassDisabled : arrowRightClass" style="cursor: pointer;"></i>
                  <i v-else aria-hidden="true" @click="showNext()" :class="carouselIndex == nearbyProducts.length ? arrowRightClassDisabled : arrowRightClass" style="cursor: pointer;"></i>


                </client-only>



          </v-expansion-panel-content>
        </v-expansion-panel>
        <!------------Billing info----------------->
        <v-expansion-panel v-show="renderPage">
          <v-expansion-panel-header class="change-color"
            ><img
              class="icon-arrow"
              src="~assets/images/iconos/arrow.png"
              alt=""
            />
            {{ $t("billingInfo") }}</v-expansion-panel-header
          >
          <v-expansion-panel-content class="main-card ">
            <v-row class="card-line">
                  <v-col class="line" cols="12" sm="12" md="6">
                <v-row class="" v-show="isGrandTotalDiscountEnabled">
                  <v-col  cols="12" sm="12" md="12">

                    <v-text-field
                      :label='$t("discountCode")'

                      outlined
                      v-model="discountCode"
                    ></v-text-field>

                       <button class="btn change-color" @click="setDiscountCode()">
                      {{ $t("updateOrder") }}
                    </button>
                     <v-progress-circular
                      v-show="onLoadingOrderUpdate == true"
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </v-col>

                </v-row>
              </v-col>
              <v-col class="center" cols="12" sm="12" md="6">
                <v-row>
                  <v-col class="center" cols="12" sm="12" md="12">
                    <div class="total_txt">
                      <p>Total</p>
                      <p>{{ grandTotalCurrencySymbol }} {{ currencyFormatDE(total) }} {{ grandTotalCurrencyCode }}</p>
                    </div>
                  </v-col>

                  <v-col class="center" cols="12" sm="12" md="12">
                    <div class="">
                      <button
                        id="btn-checkout"
                        class="btn change-color"
                        @click="setShowCheckout()"
                      >
                        {{ $t("checkout") }}
                      </button>
                      <button id="btn-black-shopping" class="color btn btn-borde" @click="checkCanContinueShopping()">
                        {{ $t("continueShopping") }}
                      </button>

                    </div>
                  </v-col>
                </v-row>
              </v-col>

            </v-row>

            <div class="main-form" v-show="showCheckout">
              <v-row>
                <v-col cols="12" sm="12" md="4">

                  <v-text-field
                    :label='"* "+$t("firstName")'

                    outlined
                    v-model="customer_first_name"
                  ></v-text-field>
                  <LocalErrorShow :errors="localErrors" :name="'name'" v-show="payButtonDisabled"/>
                </v-col>
                <v-col cols="12" sm="12" md="4">

                  <v-text-field
                    :label='"* "+$t("lastname")'

                    outlined
                    v-model="customer_last_name"
                  ></v-text-field>
                  <LocalErrorShow :errors="localErrors" :name="'lastname'" v-show="payButtonDisabled"/>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    :label='"* "+$t("email")'

                    outlined
                    v-model="customer_email"
                  ></v-text-field>
                  <LocalErrorShow :errors="localErrors" :name="'email'" v-show="payButtonDisabled"/>
                </v-col>

                <v-col cols="12" sm="12" md="4">
                  <label style="opacity: 0;" for="">* {{ $t("phone") }}</label>
                  <v-text-field
                    :label='"* "+$t("phone")'

                    outlined
                    v-model="phone"
                    @keypress="isNumber($event)"
                  ></v-text-field>
                  <LocalErrorShow :errors="localErrors" :name="'phone'" v-show="payButtonDisabled"/>
                </v-col>
                  <v-col cols="12" sm="12" md="4">
                  <label for="">{{ $t("ticketDelivery") }}</label>
                  <v-select
                    ref="select"
                    :items="deliveryMethods"
                    solo
                    v-model="ticket_delivery_method"
                  ></v-select>
                </v-col>
              </v-row>
              <!--<v-row>

              </v-row>--->
              <v-row class="paymethod" v-show="showCheckout">


                <v-col cols="12">
                  <h3 class="title-custom">{{ $t("paymentMethod") }}</h3>
                </v-col>
                  <v-col cols="12" sm="4" md="4" v-for="(paymentProvider, index) in paymentProviders" :key="'paymentProviders-' + index">

                    <button :class="selectedPaymentProvider.payment_provider_id == paymentProvider.payment_provider_id ? selectedPaymentProviderActiveClass : 'btn btn-inactiveClass primary-btn-color'" @click="getInfoFromSelectedPaymentProvider(index)" v-show="paymentProvider.payment_provider_id == 4 || paymentProvider.payment_provider_id == 0">
                        <fa v-show="paymentProvider.payment_provider_id == 4" :icon="['fas','credit-card']" class="mr-1"></fa>

                        <fa v-show="paymentProvider.payment_provider_id == 0" :icon="['fas','flask']" class="mr-1"></fa>
                        {{
                          paymentProvider.payment_provider_name ==
                          "Authorize.net"
                            ? "Pay with card"
                            : paymentProvider.payment_provider_name
                        }}
                    </button>
                    

                    


                    <div v-show="paymentProvider.payment_provider_id == 26">
                      <button :class="selectedPaymentProvider.payment_provider_id == paymentProvider.payment_provider_id ? selectedPaymentProviderActiveClass : 'btn btn-inactiveClass primary-btn-color'" @click="getInfoFromSelectedPaymentProvider(index)">
                        <fa v-show="paymentProvider.payment_provider_id == 26" :icon="['fab','paypal']" class="mr-1"></fa>
                        {{ paymentProvider.payment_provider_name }}
                      </button>
                      <paypal-checkout
                        style="opacity: 0;margin-top: -40px;"
                        v-show="!paypalButtonDisabled"
                        :env="paypalEnv"
                        :amount="total.toString()"
                        :currency="grandTotalCurrencyCode"
                        :locale="$i18n.locale.toString() == 'en' ? $i18n.locale.toString()+'_US' : $i18n.locale.toString()+'_'+$i18n.locale.toString().toUpperCase()"
                        :client="{[paypalEnv]:paypalClientInfo}"
                        v-on:payment-authorized="paypalResponse"
                        v-on:payment-cancelled="paypalCancel"
                      >
                      </paypal-checkout>
                    </div>

                    <div v-show="paymentProvider.payment_provider_id == 27">
                      <button :class="selectedPaymentProvider.payment_provider_id == paymentProvider.payment_provider_id ? selectedPaymentProviderActiveClass : 'btn btn-inactiveClass primary-btn-color'" @click="getInfoFromSelectedPaymentProvider(index)">
                        <!--{{ paymentProvider.payment_provider_name }}-->
                        <fa :icon="['fas','credit-card']" class="mr-1"></fa>
                        Pay with card
                      </button>
                      
                    </div>

                    <div v-show="paymentProvider.payment_provider_id == 28">
                      <button :class="selectedPaymentProvider.payment_provider_id == paymentProvider.payment_provider_id ? selectedPaymentProviderActiveClass : 'btn btn-inactiveClass primary-btn-color'" @click="getInfoFromSelectedPaymentProvider(index)">
                        <!--{{ paymentProvider.payment_provider_name }}-->
                        <fa :icon="['fas','credit-card']" class="mr-1"></fa>
                        Pay with card
                      </button>
                      
                    </div>

                    

                  </v-col>

              </v-row>

              <v-row
                v-show="selectedPaymentProvider.prompt_billing_address == true"
                class="paymethod"
              >
                <v-col cols="12" class="billingAddressMarginTop">
                  <h3 class="title-custom">{{ $t("billingAddress") }}</h3>
                </v-col>
                <v-col cols="12" sm="12" md="4">

                  <v-text-field

                    :label='"* "+$t("address1")'
                    :placeholder='"* "+$t("address1")'

                    outlined
                    v-model="address_line1"
                  ></v-text-field>
                  <LocalErrorShow
                    :errors="localErrors"
                    :name="'address_line1'"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="4">

                  <v-text-field
                    :label='$t("address2")'

                    outlined
                    v-model="address_line2"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                     :label='"* "+$t("city")'

                    outlined
                    v-model="city"
                  ></v-text-field>
                  <LocalErrorShow :errors="localErrors" :name="'city'" />
                </v-col>
                <v-col cols="12" sm="12" md="4">

                  <v-text-field
                    :label='"* "+$t("provinceState")'

                    outlined
                    v-model="province_state"
                  ></v-text-field>
                  <LocalErrorShow
                    :errors="localErrors"
                    :name="'province_state'"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    :label='"* "+$t("postalCode")'

                    outlined
                    v-model="postal_zip_code"

                  ></v-text-field>
                  <LocalErrorShow
                    :errors="localErrors"
                    :name="'postal_zip_code'"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    :label='"* "+$t("country")'

                    outlined
                    v-model="country"
                  ></v-text-field>
                  <LocalErrorShow :errors="localErrors" :name="'country'" />
                </v-col>
              </v-row>
              <v-row class="paymethod" v-show="showCheckout  && !onLoadingCheckout">
                <v-col class="center" cols="12" sm="12" md="12">
                  
                  <button
                    class="btn change-color primary-btn-color"
                    @click="showRequiredFields()"
                    v-show="payButtonDisabled && selectedPaymentProvider.payment_provider_id == 4"
                  >
                    {{ $t("payNow") }}
                  </button>
                  <button
                    class="btn change-color primary-btn-color"
                    @click="showRequiredFields()"
                    v-show="payButtonDisabled && selectedPaymentProvider.payment_provider_id == 0"
                  >
                    {{ $t("payNow") }}
                  </button>
                  <button
                    class="btn change-color primary-btn-color"
                    @click="checkout()"
                    v-show="selectedPaymentProvider.payment_provider_id == 0 && !payButtonDisabled"
                  >
                    {{ $t("payNow") }}
                  </button>

                  <button
                    
                     @click="scrollToTop()"
                    v-show="
                      selectedPaymentProvider.payment_provider_id == 4 &&
                        !payButtonDisabled
                    "
                    type="button"

                    class="AcceptUI btn change-color primary-btn-color"
                    data-billingAddressOptions='{"show":false, "required":false}'
                    :data-apiLoginID="authorizeLoginId"
                    :data-clientKey="authorizeClientKey"
                    data-acceptUIFormBtnTxt="Submit"
                    data-acceptUIFormHeaderTxt="Card Information"
                    data-paymentOptions='{"showCreditCard": true, "showBankAccount": false}'
                    data-responseHandler="payResponse"
                  >
                    {{ $t("payNow") }} 
                  </button>

                   
                    <v-col cols="12" v-show="selectedPaymentProvider.payment_provider_id == 27">
                      <div id="payment-container">
                        <form id="payment-form">
                          <div id="card-container"></div>
                          <button id="card-button" type="button">{{ $t('checkout') }} ${{ total }}</button>
                        </form>
                        <div id="payment-status-container"></div>
                      </div>
                    
                    </v-col>

                    <v-col cols="8" v-show="selectedPaymentProvider.payment_provider_id == 28">
                      <form method="post" id="payment-form" v-on:submit.prevent="cloverCreateToken()" style="margin-top: 40px" v-show="address_line1 && city && province_state && postal_zip_code && country">
                    
                        <div class="row">
                            <div class="col-12">
                              <div id="card-date" class="field third-width"></div>
                            </div>
                        </div>
                        
                        
                        <div class="row">
                            <div class="col-12">
                              <div id="card-cvv" class="field third-width"></div>
                            </div>
                        </div>
                       
                        
                        <div class="row">
                            <div class="col-12">
                              <div id="card-postal-code" class="field third-width"></div>
                            </div>
                            
                        </div>

                        <div class="row" style="margin-top: -90px;">
                            <div class="col-12">
                              <div id="card-number" class="field card-number"></div>
                            </div>
                            
                        </div>
                        <div class="input-errors" id="card-date-errors" style="margin-top: -65px;" role="alert"></div>
                         <div class="input-errors" id="card-cvv-errors" role="alert"></div>
                         <div class="input-errors" id="card-postal-code-errors" role="alert"></div>
                         <div class="input-errors" id="card-number-errors" role="alert"></div>
                        <div id="card-response" role="alert"></div>

                        <div class="button-container" style="margin-top: 25px;">
                            <button id="button-final-checkout" class="color btn btn-borde">{{ $t('checkout') }} ${{ total }}</button>
                        </div>
                        
                      </form>
                    
                    </v-col>

                    
           


                </v-col>
              </v-row>
              <!--<center v-show="onLoadingCheckout">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </center>-->
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      </client-only>
    </div>
  </div>
</template>
<script>
import Detail from "~/components/checkout/Detail";
import LocalErrorShow from "../components/localError.vue";
 import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  computed: {
    payButtonDisabled() {
      var regex = /\S+@\S+\.\S+/;

      if (this.selectedPaymentProvider.prompt_billing_address == true) {
        if (
          this.customer_first_name == "" ||
          this.customer_last_name == "" ||
          this.customer_email == "" ||
          this.phone == "" ||
          this.address_line1 == "" ||
          this.city == "" ||
          this.province_state == "" ||
          this.postal_zip_code == "" ||
          this.country == "" ||
          this.address_line1 == "" ||
          this.requestForUpdate == true ||
          !regex.test(this.customer_email)
        ) {
          return true;
        }
      } else {
        if (
          this.customer_first_name == "" ||
          this.customer_last_name == "" ||
          this.customer_email == "" ||
          this.phone == "" ||
          this.requestForUpdate == true ||
          !regex.test(this.customer_email)
        ) {

          return true;
        }
      }
      return false;
    },
    paypalButtonDisabled() {
      var regex = /\S+@\S+\.\S+/;

      if (
        this.customer_first_name == "" ||
        this.customer_last_name == "" ||
        this.customer_email == "" ||
        this.phone == "" ||
        this.requestForUpdate == true ||
        !regex.test(this.customer_email)
      ) {

        return true;
      }

      return false;
    }
  },
  data: () => ({
    cloverToken:"",
    renderPage:false,
    order: "",
    currencySymbol: "",
    currencyCode: "",
    items: [],
    nearbyProducts: [],
    clover:"",
    settings:{
      arrows:false,
      swipe:false,
      infinite:false,
      slidesToShow:3,
      slidesToScroll:1,
      responsive:[

        {
          "breakpoint": 768,
          "settings": {
            "slidesToShow": 3,
            "slidesToScroll": 1,
            "initialSlide": 0,

          },
           "breakpoint": 480,
          "settings": {
            "slidesToShow": 1,
            "slidesToScroll": 1,
            "initialSlide": 0,

          },
        }
      ]
    },
    total: 0,
    carouselIndex:0,
    arrowLeftClass:"v-icon notranslate mdi mdi-chevron-left theme--light custom-color-arrow",
    arrowRightClass:"v-icon notranslate mdi mdi-chevron-right theme--light custom-color-arrow",
    arrowLeftClassDisabled:"v-icon notranslate mdi mdi-chevron-left theme--light disabledArrow custom-color-arrow",
    arrowRightClassDisabled:"v-icon notranslate mdi mdi-chevron-right theme--light disabledArrow custom-color-arrow",
    grandTotalCurrencyCode:"",
    grandTotalCurrencySymbol:"",
    panel: [0, 1, 2, 3],
    disabled: false,
    readonly: false,
    paymentProviders: [],
    radios: 0,
    isGrandTotalDiscountEnabled: false,
    selectedPaymentProvider: "",
    localErrors: [],
    newItemValues: [],
    oldItemValues: [],
    itemsAmountUpdated: true,
    requestForUpdate: false,
    discountCodeRequestForUpdate: false,
    paypalEnv: "sandbox",
    onLoadingAttraction:false,
    onLoadingOrderUpdate:false,
    onLoadingCheckout:false,
    selectedPaymentProviderActiveClass:"btn primary-btn-color",
    customer_first_name: "",
    customer_last_name: "",
    customer_email: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    province_state: "",
    postal_zip_code: "",
    country: "",
    payment_provider_id: "",
    payment_data: "",
    deliveryMethods: ["text", "email"],
    ticket_delivery_method: "email",
    payment_data: "",
    discountCode: "",
    showPayButton: false,
    checkoutCount: 0,
    showCheckout: false,
    paypalOrder:"",
    width:0,
    oldDiscountCodes:[],
    newDiscountCodes:[],
    onLoadingPay:false,
    authorizeLoginId:"",
    authorizeClientKey:"",
    paypalClientInfo:"",
    showPaypalButton:false,
    textColor:"",
    primaryColor:"",
    iconColor:"black",
    createdPaymentAmount:0
  }),
  components: { Detail, LocalErrorShow },
  methods: {
    getWidth() {
      if (self.innerWidth) {
        return self.innerWidth;
      }

      if (document.documentElement && document.documentElement.clientWidth) {
        return document.documentElement.clientWidth;
      }

      if (document.body) {
        return document.body.clientWidth;
      }
    },
    afterChange(page){
      this.width = this.getWidth()
      this.carouselIndex = page

    },
    showNext() {

      this.$refs.nearbyProductCarousel.next()
    },
    showPrev() {

      this.$refs.nearbyProductCarousel.prev()

    },
    payResponse(response) {

      var index = 0
      this.paymentProviders.forEach((data, paymentProviderIndex) => {
        if (data.payment_provider_id == 26) {
          index = paymentProviderIndex
        }
      });

      if(this.selectedPaymentProvider.payment_provider_id == 26){
        this.getInfoFromSelectedPaymentProvider(index)
      }

      if (this.checkoutCount == 0) {
        this.onLoadingPay = true
        this.payButtonDisabled = true
        this.payment_data = {
          opaque_data_descriptor: response.opaqueData.dataDescriptor,
          opaque_data_value: response.opaqueData.dataValue
        };

        this.checkout();
        this.checkoutCount++;
      }
    },

    checkDiscountCode(itemId, discountCode){
      this.newDiscountCodes.forEach((data, index) => {
        if(data.item == itemId){
          this.newDiscountCodes[index].discount = discountCode
        }
      })
      this.checkForDiscountUdateRequest()
    },
    checkForDiscountUdateRequest(){
      this.discountCodeRequestForUpdate = false
      this.newDiscountCodes.forEach((newDiscount) => {
        this.oldDiscountCodes.forEach((oldDiscount) => {
          if(newDiscount.item == oldDiscount.item){
            if(newDiscount.discount != oldDiscount.discount){
              this.discountCodeRequestForUpdate = true
            }
          }
        })
      })
    },
    currencyFormatDE(num) {
      return (
          num
          .toFixed(2) // always two decimal digits
          //.replace('.', ',') // replace decimal point character with ,
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      ) // use . as a separator
    },
    async getItems() {
      if (process.browser) {
        let order = window.localStorage.getItem("orders");
        if (order != null) {
           this.onLoadingAttraction = true
          let res = await this.$axios.get("orders/item-list/" + order, {
        params:{
          pid:window.localStorage.getItem("pid")
        }
      });
          this.onLoadingAttraction = false
          this.items = res.data.items;
          this.currencyCode = res.data.currency_code;
          this.currencySymbol = res.data.currency_symbol;
          this.order = order;
          this.requestForUpdate = false;
          this.discountCodeRequestForUpdate = false
          this.items.forEach((item, index) => {
            item.pricing.price_types.forEach((price, index) => {
              this.oldItemValues.push({
                amount: price.quantity,
                price_type_id: price.price_type_id,
                product_id: item.product_id
              });
            });
          });
          this.items.forEach((item, index) => {
            this.oldDiscountCodes.push({"item":item.item_id, "discount": item.pricing.discount_code == null ? '' : item.pricing.discount_code})
            this.newDiscountCodes.push({"item":item.item_id, "discount":item.pricing.discount_code == null ? '' : item.pricing.discount_code})
          });
          await this.getTotal();
        }
      }
    },
    async getTotal() {
      let res = await this.$axios.get("orders/totals/" + this.order, {
        params:{
          pid:window.localStorage.getItem("pid")
        }
      });
      this.total = res.data.grand_total;
      this.discountCode = res.data.discounts.length > 0 ? res.data.discounts[0].discount_code : ''
      this.isGrandTotalDiscountEnabled = res.data.discounts_enabled
      this.grandTotalCurrencyCode = res.data.currency_code
      this.grandTotalCurrencySymbol = res.data.currency_symbol
    },
    setShowCheckout() {
      if (this.requestForUpdate == true || this.discountCodeRequestForUpdate == true) {

        this.$swal({
          text: this.$t("oneOrMoreItemsUpdate"),
          icon: "error"
        });
      }else{
        this.showCheckout = true;
      }

    },
    checkCanContinueShopping(){
      if (this.requestForUpdate == true || this.discountCodeRequestForUpdate) {

        this.$swal({
          text: this.$t("oneOrMoreItemsUpdate"),
          icon: "error"
        });
      }else{
        this.$router.push(this.localePath({ path: "/" }));
      }
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    async getCartCount(order) {
      let res = await this.$axios.get("orders/item-count/" + order, {
        params:{
          pid:window.localStorage.getItem("pid")
        }
      });
      return res.data.data.number_of_items;
    },
    async remove(itemId) {
      let res = await this.$axios.post("/orders/item-delete", {
        request_number: this.order,
        item_id: itemId,
        pid:window.localStorage.getItem("pid")
      });
      var _this = this;
      if (res.data.status.result_messages[0] == "OK") {
        let numberItems = await this.getCartCount(this.order);
        await this.$store.dispatch("storeCartAmount", { amount: numberItems });
        if(this.items.length > 1){
          this.$swal({
            text: this.$t("productRemoved"),
            icon: "success"
          }).then(ans => {
            _this.getItems();
          });
        }else{
          this.$swal({
            text: this.$t("shoppingCartEmpty"),
            icon: "success"
          }).then(ans => {
            this.$router.push(this.localePath({ path: "/" }));
          });
        }
      } else {
        this.$swal({
          text: res.data.status.result_messages[0],
          icon: "error"
        });
      }
    },
    getInfoFromSelectedPaymentProvider(index) {

      this.firstRequiredFields()
      if(this.localErrors.length){
        return
      }

      this.paymentProviders.forEach((data, paymentProviderIndex) => {
        if (index == paymentProviderIndex) {
          this.selectedPaymentProvider = data;
        }
      });

      if(this.selectedPaymentProvider.payment_provider_id == 26){
        this.showRequiredFields()
      }

      if(this.selectedPaymentProvider.payment_provider_id == 27){
        if(this.createdPaymentAmount == 0){
          this.createCardPayment()
        }
        this.createdPaymentAmount++

      }

      if(this.selectedPaymentProvider.payment_provider_id == 28){
        
        this.clover = new Clover(this.selectedPaymentProvider.data.merchant_public_key);
        const elements = this.clover.elements();

        const cloverStyles = {
            'card-number input': {
                'width': '80%',
                'font-size': 'inherit',
                'border': '1px gray solid',
                'padding': '25px',
                'margin': '20px',
                'border-radius': '5px',
                'color': 'rgba(0, 0, 0, 0.87)'
            },
            'card-number img':{
              'margin-top': '28px',
              'margin-right': '20%'
            },
            'card-date input': {
                'width': '80%',
                'font-size': 'inherit',
                'border': '1px gray solid',
                'padding': '25px',
                'margin': '20px',
                'border-radius': '5px',
                'color': 'rgba(0, 0, 0, 0.87)'
            },
            'card-cvv input': {
                'width': '80%',
                'font-size': 'inherit',
                'border': '1px gray solid',
                'padding': '25px',
                'margin': '20px',
                'border-radius': '5px',
                'color': 'rgba(0, 0, 0, 0.87)'
            },
            'card-postal-code input': {
                'width': '80%',
                'font-size': 'inherit',
                'border': '1px gray solid',
                'padding': '25px',
                'margin': '20px',
                'border-radius': '5px',
                'color': 'rgba(0, 0, 0, 0.87)'
            }
        };

        const cardNumber = elements.create('CARD_NUMBER', cloverStyles);
        const cardDate = elements.create('CARD_DATE', cloverStyles);
        const cardCvv = elements.create('CARD_CVV', cloverStyles);
        const cardPostalCode = elements.create('CARD_POSTAL_CODE', cloverStyles);
        
        cardNumber.mount('#card-number');
        cardDate.mount('#card-date');
        cardCvv.mount('#card-cvv');
        cardPostalCode.mount('#card-postal-code'); 

        const form = document.getElementById('payment-form');

      }


    },
    cloverCreateToken(){

      $("#card-number-errors").html("")
      $("#card-date-errors").html("")
      $("#card-cvv-errors").html("")
      $("#card-cvv-errors").html("")
      $("#card-postal-code-errors").html("")

      //let clover = new Clover(this.selectedPaymentProvider.data.merchant_public_key);
      //const elements = clover.elements();

      //console.log(clover.createToken())
      var _this = this
      this.clover.createToken()
        .then(function(result) {

        if (result.errors) {
          Object.values(result).forEach(function (value) {
            console.log("value", value)
            if(value.CARD_NUMBER){
              $("#card-number-errors").html(value.CARD_NUMBER)
            }

            if(value.CARD_DATE){
              $("#card-date-errors").html(value.CARD_DATE)
            }

            if(value.CARD_CVV){
              $("#card-cvv-errors").html(value.CARD_CVV)
            }

            if(value.CARD_POSTAL_CODE){
              $("#card-postal-code-errors").html(value.CARD_POSTAL_CODE)
            }

          });
        } else {
          _this.cloverTokenHandler(result.token);
        }
      });

    },
    cloverTokenHandler(token) {
      
      this.cloverToken = token
      // Insert the token ID into the form so it gets submitted to the server
      var form = document.getElementById('payment-form');
      var hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'cloverToken');
      hiddenInput.setAttribute('value', token);
      this.cloverCheckout()
      //form.appendChild(hiddenInput);
      //form.submit();
    },
    async getPaymentProviders() {
      let res = await this.$axios.post("checkout/payment-providers", {
        order_number: this.order,
        pid:window.localStorage.getItem("pid")
      });
      let providers = res.data.data
      providers.forEach((data, index) =>{
        if(data.payment_provider_id == 4){
          this.authorizeLoginId = data.data.an_api_login_id
          this.authorizeClientKey = data.data.an_public_client_key
        }
        if(data.payment_provider_id == 26){
          this.paypalClientInfo = data.data.client_id
        }
      })
      this.paymentProviders = res.data.data;

    },
    setFields() {
      let request = null;
      request = {
        customer_first_name: this.customer_first_name,
        customer_last_name: this.customer_last_name,
        customer_email: this.customer_email,
        phone: this.phone,
        address_line1: this.address_line1,
        address_line2: this.address_line2,
        city: this.city,
        province_state: this.province_state,
        postal_zip_code: this.postal_zip_code,
        country: this.country,
        order_number: this.order,
        payment_provider_id: this.payment_provider_id,
        payment_data: this.payment_data,
        ticket_delivery_method: this.ticket_delivery_method,
        pid:window.localStorage.getItem("pid")
      };
      return request;
    },
    checkUpdatedItems(newPrices, productId) {
      newPrices.forEach((prices, index) => {
        let itemIndex = this.newItemValues.findIndex(
          item =>
            item.price_type_id == prices.priceTypeId &&
            item.product_id == productId
        );
        if (itemIndex < 0) {
          this.newItemValues.push({
            amount: prices.amount,
            price_type_id: prices.priceTypeId,
            product_id: productId
          });
        } else {
          this.newItemValues[itemIndex].amount = prices.amount;
          this.newItemValues[itemIndex].price_type_id = prices.priceTypeId;
          this.newItemValues[itemIndex].product_id = productId;
        }
      });
      this.checkProductsDifferences();
    },
    checkProductsDifferences() {
      this.requestForUpdate = false;
      this.newItemValues.forEach((newValues, index) => {
        this.oldItemValues.forEach((oldValues, index) => {
          if (
            newValues.product_id == oldValues.product_id &&
            newValues.price_type_id == oldValues.price_type_id
          ) {
            if (newValues.amount != oldValues.amount) {
              this.requestForUpdate = true;
            }
          }
        });
      });
    },

    firstRequiredFields(){
      this.localErrors = []
      var regex = /\S+@\S+\.\S+/;
      if (this.customer_first_name == "") {
        this.localErrors.push({
          name: "name",
          message: this.$t("firstnameRequired")
        });
      }
      if (this.customer_last_name == "") {
        this.localErrors.push({
          name: "lastname",
          message: this.$t("lastnameRequired")
        });
      }
      if (this.customer_email == "") {
        this.localErrors.push({
          name: "email",
          message: this.$t("emailRequired")
        });
      } else if (!regex.test(this.customer_email)) {
        this.localErrors.push({
          name: "email",
          message: this.$t("emailNotValid")
        });
      }
      if (this.phone == "") {
        this.localErrors.push({
          name: "phone",
          message: this.$t("phoneRequired")
        });
      }

    },

    showRequiredFields() {
      this.localErrors = [];
      
      
      if (this.selectedPaymentProvider.prompt_billing_address == true) {
        if (this.address_line1 == "") {
          this.localErrors.push({
            name: "address_line1",
            message: this.$t("addres1Required")
          });
        }
        if (this.city == "") {
          this.localErrors.push({
            name: "city",
            message: this.$t("cityRequired")
          });
        }
        if (this.province_state == "") {
          this.localErrors.push({
            name: "province_state",
            message: this.$t("provinceRequired")
          });
        }
        if (this.postal_zip_code == "") {
          this.localErrors.push({
            name: "postal_zip_code",
            message: this.$t("zipCodeRequired")
          });
        }
        if (this.country == "") {
          this.localErrors.push({
            name: "country",
            message: this.$t("countryRequired")
          });
        }

      }
    },
    scrollToTop(){


        $('html, body').animate({
            scrollTop: 0
        }, 300);


    },
    async checkout() {
      this.payment_provider_id = this.selectedPaymentProvider.payment_provider_id;
      if(this.payment_provider_id == 26){
        this.payment_data = {
          "order_id": this.paypalOrder
        }
      }

      let request = this.setFields();
      this.onLoadingCheckout = true
      let res = await this.$axios.post("checkout", request);
      this.onLoadingCheckout = false
      this.onLoadingPay = false
      this.payButtonDisabled = false
      if (res.data.status.result_messages[0] == "OK") {
        this.$swal({
          text: this.$t('paymentSuccessful'),
          icon: "success"
        }).then(ans => {
          localStorage.removeItem("orders");
          this.$store.dispatch("storeCartAmount", { amount: 0});
          this.$router.push("/");
        });
      } else {
        this.$swal({
          text: res.data.status.result_code[0],
          icon: "error"
        });
        this.checkoutCount = 0;
      }
    },
    async cloverCheckout() {
      this.payment_provider_id = this.selectedPaymentProvider.payment_provider_id;
      
      let request = {
        customer_first_name: this.customer_first_name,
        customer_last_name: this.customer_last_name,
        customer_email: this.customer_email,
        phone: this.phone,
        address_line1: this.address_line1,
        address_line2: this.address_line2,
        city: this.city,
        province_state: this.province_state,
        postal_zip_code: this.postal_zip_code,
        country: this.country,
        order_number: this.order,
        payment_provider_id: this.payment_provider_id,
        source: this.cloverToken,
        ticket_delivery_method: this.ticket_delivery_method,
        pid:window.localStorage.getItem("pid")
      }
      this.onLoadingCheckout = true
      let res = await this.$axios.post("checkout", request);
      this.onLoadingCheckout = false
      this.onLoadingPay = false
      this.payButtonDisabled = false
      if (res.data.status.result_messages[0] == "OK") {
        this.$swal({
          text: this.$t('paymentSuccessful'),
          icon: "success"
        }).then(ans => {
          localStorage.removeItem("orders");
          this.$store.dispatch("storeCartAmount", { amount: 0});
          this.$router.push("/");
        });
      } else {
        this.$swal({
          text: res.data.status.result_code[0],
          icon: "error"
        });
        this.checkoutCount = 0;
      }
    },
    async setDiscountCode() {
      this.onLoadingOrderUpdate = true
      let res = await this.$axios.post("orders/discount-order", {
        order_number: this.order,
        discountCode: this.discountCode,
        pid:window.localStorage.getItem("pid")
      });
      this.onLoadingOrderUpdate = false
      if (res.data.status.result_messages[0] != "OK") {
        this.$swal({
          text: res.data.status.result_messages[0],
          icon: "error"
        });
      } else {
        this.$swal({
          text: res.data.status.result_messages[0],
          icon: "success"
        }).then(ans => {
          this.getItems();
        });
      }
    },
    paypalCancel(response){
      var index = 0
      this.paymentProviders.forEach((data, paymentProviderIndex) => {
        if (data.payment_provider_id == 26) {
          index = paymentProviderIndex
        }
      });
      this.getInfoFromSelectedPaymentProvider(index)
    },
    paypalResponse(response) {

      var index = 0
      this.paymentProviders.forEach((data, paymentProviderIndex) => {
        if (data.payment_provider_id == 26) {
          index = paymentProviderIndex
        }
      });
      this.getInfoFromSelectedPaymentProvider(index)
      this.payButtonDisabled= true
      this.onLoadingPay =true
      this.paypalOrder = response.orderID
      this.checkout()
    },
    loadLibraries() {
      this.renderPage = false
      if (process.browser) {
        window.setTimeout(() => {
          this.showPayButton = true;
          let recaptchaScript = document.createElement("script");
          recaptchaScript.setAttribute(
            "src",
            "https://jstest.authorize.net/v1/Accept.js"
          );
          document.body.appendChild(recaptchaScript);
          let acceptUi = document.createElement("script");
          acceptUi.setAttribute(
            "src",
            "https://jstest.authorize.net/v3/AcceptUI.js"
          );
          document.body.appendChild(acceptUi);
          window.payResponse = this.payResponse;
          this.renderPage = true
        }, 1000);
      }
    },
    async nearbyProductsFetch() {
      var itemIdArray = [];
      this.items.forEach(data => {
        itemIdArray.push(data.item_id);
      });
      let res = await this.$axios.get("products/nearby/" + itemIdArray[0], {
        params:{
          pid:window.localStorage.getItem("pid")
        }
      });
      this.nearbyProducts = res.data;

      if(process.browser){
        $(".custom-color-arrow").css("color", this.primaryColor)
      }

    },
    async getConfig() {
      let config = await this.$axios.get("configcms");
      if (config.data.hero) {
        this.backImage = process.env.SERVER_URL + config.data.hero;
      }
      if (config.data.logo) {
        if (process.browser) {
          localStorage.setItem(
            "logo",
            process.env.SERVER_URL+config.data.logo
          );
        }
      }
      if (config.data.color) {
        if (process.browser) {
          localStorage.setItem("color", config.data.color);
          this.primaryColor = config.data.color

        }
      }
      if (config.data.textColor) {
        if (process.browser) {
          this.textColor = config.data.textColor
          localStorage.setItem("textColor", config.data.textColor);
        }
      }

      this.iconColor = config.data.iconColor
    },

    displayPaymentResults(status) {
      const statusContainer = document.getElementById(
        'payment-status-container'
      );
      if (status === 'SUCCESS') {
        statusContainer.classList.remove('is-failure');
        statusContainer.classList.add('is-success');
      } else {
        statusContainer.classList.remove('is-success');
        statusContainer.classList.add('is-failure');
      }
      statusContainer.style.visibility = 'visible';
    },
    async initializeCard(payments) {
      const card = await payments.card();
      await card.attach('#card-container');
      return card;
    },
    async tokenize(paymentMethod) {
     
      const tokenResult = await paymentMethod.tokenize();
      if (tokenResult.status === 'OK') {
        return tokenResult.token;
      } else {
        let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
        if (tokenResult.errors) {
          errorMessage += ` and errors: ${JSON.stringify(
            tokenResult.errors
          )}`;
        }
        throw new Error(errorMessage);
      }
    },
    async createPayment(token) {
      let locationId = this.selectedPaymentProvider.data.location_id
      const body = JSON.stringify({
        locationId,
        sourceId: token,
      });

      this.payment_provider_id = this.selectedPaymentProvider.payment_provider_id;
      if(this.payment_provider_id == 27){
        this.payment_data = {
          source_id: token,
        };
      }
      let request = this.setFields();
      this.onLoadingCheckout = true
      let res = await this.$axios.post("checkout", request);
      this.onLoadingCheckout = false
      this.onLoadingPay = false
      this.payButtonDisabled = false
      if (res.data.status.result_messages[0] == "OK") {
        this.$swal({
          text: this.$t('paymentSuccessful'),
          icon: "success"
        }).then(ans => {
          localStorage.removeItem("orders");
          this.$store.dispatch("storeCartAmount", { amount: 0});
          this.$router.push("/");
        });
      } else {
        this.$swal({
          text: res.data.status.result_code[0],
          icon: "error"
        });
        this.checkoutCount = 0;
      }


      /*const paymentResponse = await this.$axios.post('/payment/pay', {
        body
      });

      if (paymentResponse.data.payment.status == "COMPLETED") {
        return paymentResponse;
      }
      alert("error")*/
      //const errorBody = await paymentResponse.text();
      //throw new Error(errorBody);
    },
    async handlePaymentMethodSubmission(event, paymentMethod) {
      
      try {
        console.log("handlePaymentMethodSubmission try", paymentMethod)
        // disable the submit button as we await tokenization and make a payment request.
        const cardButton = document.getElementById('card-button');
        cardButton.disabled = true;
        
        const token = await this.tokenize(paymentMethod);
        const paymentResults = await this.createPayment(token);
        this.displayPaymentResults('SUCCESS');
        console.debug('Payment Success', paymentResults);
      } catch (e) {
        console.log("handlePaymentMethodSubmission catch", e)
        cardButton.disabled = false;
        //displayPaymentResults('FAILURE');
        console.error(e.message);
      }
    },
    async createCardPayment(){
      //const payments = Square.payments("sandbox-sq0idb-ZKVcp6GXp8XHkFu5egx0jQ", "L74RZ4F8MG058");
      if (!window.Square) {
        throw new Error('Square.js failed to load properly');
      }
      let payments;
      try {
        payments = window.Square.payments(this.selectedPaymentProvider.data.application_id, this.selectedPaymentProvider.data.location_id);
      } catch {
        const statusContainer = document.getElementById(
          'payment-status-container'
        );
        statusContainer.className = 'missing-credentials';
        statusContainer.style.visibility = 'visible';
        return;
      }
      let card;
      try {
        card = await this.initializeCard(payments);
      } catch (e) {
        console.error('Initializing Card failed', e);
        return;
      }
      const cardButton = document.getElementById('card-button');
      var _this = this
      cardButton.addEventListener('click', async function (event) {
        console.log("createCardPayment event", event)
        console.log("createCardPayment card", card)
        await _this.handlePaymentMethodSubmission(event, card);
      });
    }

  },
  async created() {
    await this.getConfig();
    await this.getItems();
    this.nearbyProductsFetch();
    if (this.order) {
      await this.getPaymentProviders();
      this.loadLibraries();
    }

    if (process.browser) {

        $(".change-color").css("background", this.primaryColor);
        $(".btn-borde").css("border-color", this.primaryColor);
        $(".btn-borde").css("color", this.primaryColor)
        $(".primary-btn-color").css("background", this.primaryColor)


        $(".change-text-color").css("color", this.textColor)

        

    }
  },
  mounted() {
    this.paypalEnv = process.env.PAYPAL_ENV;

    if (process.browser) {
      let color = localStorage.getItem("color");
      let textColor = localStorage.getItem("textColor");
      if (color) {
        $(".change-color").css("background", color);

      }
      if (textColor) {
        $(".change-text-color").css("color", textColor)

      }

      //const clover = new Clover('e8e5915de43a3b53bb00013abd18fa7f');

    }

  },
};
</script>
<style lang="scss">

.disabledArrow{
  color:#95a5a6 !important;
}

.no-underline{
  text-decoration: none;
}

.paymentDimmer{

  height:100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index:99999;

}

#button-final-checkout{
  color: #000;
}

#btn-black-shopping{
  color: #000;
}

.dimmer-body{
  display: flex;
  align-items: center;
  justify-content: center;
  width:100%;
  height: 100%;
}

#btn-checkout{
  @include respond-to(md) {
    margin-bottom: 10px;
  }
  @include respond-to(sm) {
    margin-bottom: 10px;
  }
  @include respond-to(xs) {
    margin-bottom: 10px;
  }
}

.dimmer-body-white{
  color:#fff;
}

.v-select__selections{
  padding-left: 20px;
}

.billingAddressMarginTop{
  margin-top:3rem;
}
.main-checkout {
  margin-top: 5rem;
  margin-bottom: 5rem;
  padding: 0 6rem;
  @include respond-to(xs) {
    padding: 0 0.5rem;
  }
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
  .v-expansion-panel-header {
    background: #b9b9b9;
    color: #fff;
  }
  .v-expansion-panel--active > .v-expansion-panel-header {
    background: #000;
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
    flex: unset !important;
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
      @include respond-to(xs) {
        width: 100%;
      }
    }
  }
  .content-panel {
    margin-top: 3rem;
    @include respond-to(xs) {
      text-align: center;
    }
    .flex {
      display: flex;
      flex-direction: initial;
      justify-content: flex-start;
      text-align: start;
      @include respond-to(xs) {
        justify-content: start;
      }
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
        a{
        color: #f02d65;
        text-decoration: none;
      }
      @include respond-to(xs) {
           margin-top: 1rem;
      }
      @include respond-to(sm) {
          p{
                font-size: .7rem;
          }
      }
      img {
        width: 25px;
        height: 27px;
        object-fit: contain;
        margin-right: 10px;
      }
      .content-mx {
        display: flex;
        margin-left: 1.4rem;
        @include respond-to(xs) {
          align-items: center;
          justify-content: center;
          margin-left: 0;
        }
        p {
          margin: 0 0.8rem;
        }
        .style-btn {
          background: #000;
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
       .main-min_dates{
  grid-template-columns: 1fr;
  h4{
    margin-bottom: .6rem;
font-weight: initial;
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
      color: #000 !important;
      z-index: 1;
      top: 1rem;
      font-size: 5rem;
      right: 20px;
      font-size: 5rem;
    }
    /*.mdi-chevron-left::before {
      color: #000;
    }*/
    .mdi-chevron-right {
      color: #000 !important;
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
        color: #000;
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
.active-payment-provider{
  background-color:#989898!important;
}
.paymethod {
   @include respond-to(sm) {
.v-input--radio-group__input {
    display: flex;
    justify-content: center;
}
   }
  .theme--light.v-label {
    font-size: 1rem;
    padding-left: 1rem;
  }
  .v-text-field--filled > .v-input__control > .v-input__slot,
  .v-text-field--full-width > .v-input__control > .v-input__slot,
  .v-text-field--outlined > .v-input__control > .v-input__slot {
    min-height: 50px;
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
    @include respond-to(xs) {
    margin-left: 0;
    margin-bottom: 3rem;
    }
       @include respond-to(sm) {
margin-right: 4rem;
    margin-bottom: 3rem;
       }
    img {
      width: 50px;
      height: 50px;
      object-fit: contain;
    }
  }

  .btn {
    padding: 11px 40px;
    text-decoration: none;
    font-size: .8rem;
  }
  .center {
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
  background: #b9b9b9 !important;
}
.btn {
  color: #fff;
  min-width: auto;
  border-radius: 9px !important;
  padding: 0.5rem 2rem;
  font-size: 0.7rem;
  @include respond-to(xs) {
width: 100%;
  }
}
.center {
  text-align: center;
}
.total_txt {
  font-size: 1.2rem;
  text-align: center;
  p {
    font-weight: bold;
    color: #000;
    font-size: 1.2rem;
  }
}
.center2 {
  justify-content: center;
  align-items: center;
}
.card-line{
  .line{
    border-right: 1px solid #00000021;
  }
  .v-input__slot{
    width: 60%;
      @include respond-to(xs) {
width: 100%;
      }
  }
}
.btn-borde{
      border: 1px solid;
    background: transparent!important;
    color: #000;
}
.main-form{
  margin-top: 5rem;
}
.paymethod{
  p{
    font-weight: bold;
        margin-left: 1rem;
  }
}
  .paymethod{
    text-align: center;
  }
  .title-custom{
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

.content-mix-detail {
  padding: 0 0rem;

  @include respond-to(xs) {
    padding: 0 0;

    .mt-12 {
      margin-top: 23rem;
    }
  }
  @include respond-to(sm) {
    padding-bottom: 0rem;
  }
  @include respond-to(md) {
    overflow: hidden;
    padding: 0 3rem;
  }

  & ul {
    list-style: none;
    display: flex;
    text-align: center;
    width: 100%;
    @include respond-to(xs) {
      display: inline-flex;
      overflow: scroll;
      margin-top: 3rem;
    }
    @include respond-to(sm) {
      text-align: center;
      justify-content: center;
    }
  }
  & li {
    color: #00000066;
    font-weight: 500;
    line-height: 1;
    padding: 0 3rem;
    cursor: pointer;
    @include respond-to(xs) {
      line-height: 1.3;
      padding: 0;
      font-size: 0.8rem;
      min-width: 90px;
    }
    @include respond-to(md) {
      padding: 0 1.5rem;
    }
  }
  & .title-mix {
    text-align: center;
    font-weight: bold;
    font-size: 2rem;
    margin: 21px;
  }
  .projects {
    .thumbnail {
      width: 243px;
      height: 149px;
      text-align: start;
      .thumbnail-overlay {
        opacity: 0;
        background-color: rgba(black, 0.8);
        transition: opacity 0.25s ease-in-out;
      }

      &:hover {
        .thumbnail-overlay {
          opacity: 1;
        }
      }
    }
  }
  .mix-grid {
     position: relative;
    height: auto !important;
    grid-gap: 3rem;
    gap: 3rem;
    display: grid;
    grid-auto-rows: 18rem;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
      @include respond-to(xs) {
margin: 1rem;
      }
    @include respond-to(md) {
      grid-gap: 2rem;
      height: max-content !important;
    }
    & .item {
        position: unset !important;
    left: auto !important;
    top: 0 !important;
    box-shadow: 0px 2px 10px rgb(0 0 0 / 25%);
    /* border-radius: 15px; */
    height: -webkit-max-content;
    height: -moz-max-content;
    height: max-content;
    display: contents;

      @include respond-to(xs) {
        margin: 10px;
      }
      @include respond-to(sm) {
        /* width: 43%;*/
        margin: 10px;
        height: max-content;
      }

      & img {
        height: 170px;
        width: 100%;
        object-fit: cover;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
      }
    }
    & .text-mix {
      font-weight: bold;
      font-size: 1.1rem;
      padding: 10px 10px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      text-align: start;
      & .star-txt {
        text-align: start !important;
      }
    }
    & .item-content{
     box-shadow: 0px 2px 10px rgb(0 0 0 / 25%);
    border-radius: 15px;
    }
    & h3{
          width: 250px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    }
    & h3,
    p {
      text-align: start;
    }
    p {
      font-weight: 500;
          font-size: 1rem;
    }
    span {
      font-size: 0.9rem;
      font-weight: 800;
      color: #000;
    text-decoration: underline;
    }
    a{
          text-decoration: none;
              color: #000;
    }
    @include respond-to(sm) {
      height: auto !important;
    }
    .txt-star {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      text-align: start;
    }
  }
  .text-success {
    color: #000;
    border-bottom: 1px solid #000;
  }
  .img-icon {
    width: 100%;
    height: 100%;
    margin-bottom: 0.5rem;
        object-fit: contain;
    @include respond-to(xs) {
      width: 25px;
    }
  }
  .theme--light.v-btn.v-btn--has-bg {
    display: none;
  }
  .v-sheet.v-card {
    text-align: start;
    box-shadow: none !important;
    color: #c9c9c9;
    display: flex;
    flex-direction: column;
    //justify-content: center;
    align-items: center;
  }
  .v-icon.v-icon {
    color: #000;
    font-size: 5rem !important;
  }
  .v-slide-group__content {
    justify-content: center;
  }
  .w-card_slider {
    width: 160px;
    cursor: pointer;
      @include respond-to(xs) {
width: 104px;
      }
  }
}

.content-mix-detail--checkout{
  .v-sheet.v-card {
    text-align: start!important;
  }
  .txt-star{
        color: #000;
    text-decoration: underline;
  }
}

.custom-color-arrow{
  color: #000;
}

 .slick-custom{

    margin: 1rem;


    .v-responsive__content{
          height: 190px;
               @include respond-to(xs) {
                height: auto;
               }
                @include respond-to(md) {
                height: auto;
               }
                @include respond-to(md2) {
                height: auto;
               }
}
h3{
      color: #000;
}
 }
   .mdi-chevron-left{
   position: absolute!important;
    top: 47%;
    left: -9px;
    font-size: 3.5rem!important;
 }
 .mdi-chevron-right{
   position: absolute!important;
    top: 47%;
    right: -9px;
    font-size: 3.5rem!important;
 }

 .btn-inactiveClass{
   background-color: #989898 !important;
 }



#card-date{
  margin-top: -100px;
}

#card-cvv{
  margin-top: -100px;
}

#card-postal-code{
  margin-top: -100px;
}

/*#payment-form {
  max-width: 550px;
  min-width: 300px;
  margin: 150px auto;
}*/

 .buyer-inputs {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  border: none;
  margin: 0;
  padding: 0;
}

#card-container {
  margin-top: 45px;
  /* this height depends on the size of the container element */
  /* We transition from a single row to double row at 485px */
  /* Settting this min-height minimizes the impact of the card form loading */
  min-height: 90px;
}

#gift-card-container {
  margin-top: 45px;
  min-height: 90px;
}

@media screen and (max-width: 500px) {
  #card-container {
    min-height: 140px;
  }
}

#ach-button {
  margin-top: 20px;
}

#landing-page-layout {
  width: 80%;
  margin: 150px auto;
  max-width: 1000px;
}

#its-working {
  color: #737373;
}

#example-container {
  width: 100%;
  border: 1px solid #b3b3b3;
  padding: 48px;
  margin: 32px 0;
  border-radius: 12px;
}

#example-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

#payment-container h3 {
  margin: 0;
}

#payment-container p {
  line-height: 24px;
}

#payment-container label {
  font-size: 12px;
  width: 100%;
}

#payment-container input {
  padding: 12px;
  width: 100%;
  border-radius: 5px;
  border-width: 1px;
  margin-top: 20px;
  font-size: 16px;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

#payment-container input:focus {
  border: 1px solid #006aff;
}

#payment-container button {
  color: #ffffff;
  background-color: #006aff;
  border-radius: 5px;
  cursor: pointer;
  border-style: none;
  user-select: none;
  outline: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  padding: 12px;
  width: 100%;
  box-shadow: 1px;
}

#payment-container button:active {
  background-color: rgb(0, 85, 204);
}

#payment-container button:disabled {
  background-color: rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.3);
}

#payment-status-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  border-radius: 50px;
  margin: 0 auto;
  width: 225px;
  height: 48px;
  visibility: hidden;
}

#payment-status-container.missing-credentials {
  width: 350px;
}

#payment-status-container.is-success:before {
  content: '';
  background-color: #00b23b;
  width: 16px;
  height: 16px;
  margin-right: 16px;
  -webkit-mask: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM11.7071 6.70711C12.0968 6.31744 12.0978 5.68597 11.7093 5.29509C11.3208 4.90422 10.6894 4.90128 10.2973 5.28852L11 6C10.2973 5.28852 10.2973 5.28853 10.2973 5.28856L10.2971 5.28866L10.2967 5.28908L10.2951 5.29071L10.2886 5.29714L10.2632 5.32224L10.166 5.41826L9.81199 5.76861C9.51475 6.06294 9.10795 6.46627 8.66977 6.90213C8.11075 7.4582 7.49643 8.07141 6.99329 8.57908L5.70711 7.29289C5.31658 6.90237 4.68342 6.90237 4.29289 7.29289C3.90237 7.68342 3.90237 8.31658 4.29289 8.70711L6.29289 10.7071C6.68342 11.0976 7.31658 11.0976 7.70711 10.7071L11.7071 6.70711Z' fill='black' fill-opacity='0.9'/%3E%3C/svg%3E");
  mask: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM11.7071 6.70711C12.0968 6.31744 12.0978 5.68597 11.7093 5.29509C11.3208 4.90422 10.6894 4.90128 10.2973 5.28852L11 6C10.2973 5.28852 10.2973 5.28853 10.2973 5.28856L10.2971 5.28866L10.2967 5.28908L10.2951 5.29071L10.2886 5.29714L10.2632 5.32224L10.166 5.41826L9.81199 5.76861C9.51475 6.06294 9.10795 6.46627 8.66977 6.90213C8.11075 7.4582 7.49643 8.07141 6.99329 8.57908L5.70711 7.29289C5.31658 6.90237 4.68342 6.90237 4.29289 7.29289C3.90237 7.68342 3.90237 8.31658 4.29289 8.70711L6.29289 10.7071C6.68342 11.0976 7.31658 11.0976 7.70711 10.7071L11.7071 6.70711Z' fill='black' fill-opacity='0.9'/%3E%3C/svg%3E");
}

#payment-status-container.is-success:after {
  content: 'Payment successful';
  font-size: 14px;
  line-height: 16px;
}

#payment-status-container.is-failure:before {
  content: '';
  background-color: #cc0023;
  width: 16px;
  height: 16px;
  margin-right: 16px;
  -webkit-mask: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L6.58579 8L4.29289 10.2929C3.90237 10.6834 3.90237 11.3166 4.29289 11.7071C4.68342 12.0976 5.31658 12.0976 5.70711 11.7071L8 9.41421L10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L9.41421 8L11.7071 5.70711C12.0976 5.31658 12.0976 4.68342 11.7071 4.29289C11.3166 3.90237 10.6834 3.90237 10.2929 4.29289L8 6.58579L5.70711 4.29289Z' fill='black' fill-opacity='0.9'/%3E%3C/svg%3E%0A");
  mask: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L6.58579 8L4.29289 10.2929C3.90237 10.6834 3.90237 11.3166 4.29289 11.7071C4.68342 12.0976 5.31658 12.0976 5.70711 11.7071L8 9.41421L10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L9.41421 8L11.7071 5.70711C12.0976 5.31658 12.0976 4.68342 11.7071 4.29289C11.3166 3.90237 10.6834 3.90237 10.2929 4.29289L8 6.58579L5.70711 4.29289Z' fill='black' fill-opacity='0.9'/%3E%3C/svg%3E%0A");
}

#payment-status-container.is-failure:after {
  content: 'Payment failed';
  font-size: 14px;
  line-height: 16px;
}

#payment-status-container.missing-credentials:before {
  content: '';
  background-color: #cc0023;
  width: 16px;
  height: 16px;
  margin-right: 16px;
  -webkit-mask: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L6.58579 8L4.29289 10.2929C3.90237 10.6834 3.90237 11.3166 4.29289 11.7071C4.68342 12.0976 5.31658 12.0976 5.70711 11.7071L8 9.41421L10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L9.41421 8L11.7071 5.70711C12.0976 5.31658 12.0976 4.68342 11.7071 4.29289C11.3166 3.90237 10.6834 3.90237 10.2929 4.29289L8 6.58579L5.70711 4.29289Z' fill='black' fill-opacity='0.9'/%3E%3C/svg%3E%0A");
  mask: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L6.58579 8L4.29289 10.2929C3.90237 10.6834 3.90237 11.3166 4.29289 11.7071C4.68342 12.0976 5.31658 12.0976 5.70711 11.7071L8 9.41421L10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L9.41421 8L11.7071 5.70711C12.0976 5.31658 12.0976 4.68342 11.7071 4.29289C11.3166 3.90237 10.6834 3.90237 10.2929 4.29289L8 6.58579L5.70711 4.29289Z' fill='black' fill-opacity='0.9'/%3E%3C/svg%3E%0A");
}

#payment-status-container.missing-credentials:after {
  content: 'applicationId and/or locationId is incorrect';
  font-size: 14px;
  line-height: 16px;
}
</style>
