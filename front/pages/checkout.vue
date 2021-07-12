<template>
  <div>
    <client-only>
    <Navbar :transparent="false"></Navbar>
    </client-only>
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
            <div v-for="item in items" :key="'item-' + item.item_id">
              <Detail
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
                  <v-slide-item v-for="(slide, i) in nearbyProducts" :key="i">
                    <NuxtLink
                      class=""
                      :to="{ path: '/attractions/' + slide.product_id }"
                    >
                      <v-card class="ma-4 card-slide_events">
                        <v-img contain :src="slide.thumbnail"></v-img>
                        <v-card-text>
                          <h3>{{ slide.product_name }}</h3>
                          <div class="txt-star"></div>
                        </v-card-text>
                      </v-card>
                    </NuxtLink>
                  </v-slide-item>
                </v-slide-group>
              </v-sheet>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!------------Billing info------------------>
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
                    <label for="">{{ $t("discountCode") }}</label>
                    <v-text-field
                      label="1234 5678 9012 3456"
                      single-line
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
                        class="btn change-color"
                        @click="setShowCheckout()"
                      >
                        {{ $t("checkout") }}
                      </button>
                      <button class="color btn btn-borde" @click="checkCanContinueShopping()">
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
                  <label for="">* {{ $t("firstName") }}</label>
                  <v-text-field
                    label="John"
                    single-line
                    outlined
                    v-model="customer_first_name"
                  ></v-text-field>
                  <LocalErrorShow :errors="localErrors" :name="'name'" />
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <label for="">* {{ $t("lastname") }}</label>
                  <v-text-field
                    label="Doe"
                    single-line
                    outlined
                    v-model="customer_last_name"
                  ></v-text-field>
                  <LocalErrorShow :errors="localErrors" :name="'lastname'" />
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <label for="">* {{ $t("email") }}</label>
                  <v-text-field
                    label="johndoe@email.com"
                    single-line
                    outlined
                    v-model="customer_email"
                  ></v-text-field>
                  <LocalErrorShow :errors="localErrors" :name="'email'" />
                </v-col>

                <v-col cols="12" sm="12" md="4">
                  <label for="">* {{ $t("phone") }}</label>
                  <v-text-field
                    label="555123123"
                    single-line
                    outlined
                    v-model="phone"
                    @keypress="isNumber($event)"
                  ></v-text-field>
                  <LocalErrorShow :errors="localErrors" :name="'phone'" />
                </v-col>
                  <v-col cols="12" sm="12" md="4">
                  <label for="">{{ $t("ticketDelivery") }}</label>
                  <v-select
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

                    <button :class="selectedPaymentProvider.payment_provider_id == paymentProvider.payment_provider_id ? selectedPaymentProviderActiveClass : 'btn'" @click="getInfoFromSelectedPaymentProvider(index)" v-show="paymentProvider.payment_provider_id == 4 || paymentProvider.payment_provider_id == 0">
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
                      <button :class="selectedPaymentProvider.payment_provider_id == paymentProvider.payment_provider_id ? selectedPaymentProviderActiveClass : 'btn'" @click="getInfoFromSelectedPaymentProvider(index), showRequiredFields()" v-if="selectedPaymentProvider.payment_provider_id != 26 || payButtonDisabled">
                        <fa v-show="paymentProvider.payment_provider_id == 26" :icon="['fab','paypal']" class="mr-1"></fa>
                        {{ paymentProvider.payment_provider_name }}
                      </button>

                      <paypal-checkout
                        v-if="selectedPaymentProvider.payment_provider_id == 26 && !payButtonDisabled"
                        :env="paypalEnv"
                        :amount="total.toString()"
                        :currency="grandTotalCurrencyCode"
                        :locale="$i18n.locale.toString() == 'en' ? $i18n.locale.toString()+'_US' : $i18n.locale.toString()+'_'+$i18n.locale.toString().toUpperCase()"
                        :client="selectedPaymentProvider.data ? {[paypalEnv]:selectedPaymentProvider.data.client_id} : ''"
                        v-on:payment-authorized="paypalResponse"
                      >
                      </paypal-checkout>
                    </div>
                    

                  </v-col>
               
              </v-row>

              <v-row
                v-if="selectedPaymentProvider.prompt_billing_address == true"
                class="paymethod"
              >
                <v-col cols="12">
                  <h3 class="title-custom">{{ $t("billingAddress") }}</h3>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <label for="">* {{ $t("address1") }}</label>
                  <v-text-field
                    label="john doe st"
                    single-line
                    outlined
                    v-model="address_line1"
                  ></v-text-field>
                  <LocalErrorShow
                    :errors="localErrors"
                    :name="'address_line1'"
                  />
                </v-col>

                <v-col cols="12" sm="12" md="4">
                  <label for="">{{ $t("address2") }}</label>
                  <v-text-field
                    label="john any st"
                    single-line
                    outlined
                    v-model="address_line2"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="4">
                  <label for="">* {{ $t("city") }}</label>
                  <v-text-field
                    label="San Diego"
                    single-line
                    outlined
                    v-model="city"
                  ></v-text-field>
                  <LocalErrorShow :errors="localErrors" :name="'city'" />
                </v-col>

                <v-col cols="12" sm="12" md="4">
                  <label for="">* {{ $t("provinceState") }}</label>
                  <v-text-field
                    label="California"
                    single-line
                    outlined
                    v-model="province_state"
                  ></v-text-field>
                  <LocalErrorShow
                    :errors="localErrors"
                    :name="'province_state'"
                  />
                </v-col>

                <v-col cols="12" sm="12" md="4">
                  <label for="">* {{ $t("postalCode") }}</label>
                  <v-text-field
                    label="100010101"
                    single-line
                    outlined
                    v-model="postal_zip_code"
                   
                  ></v-text-field>
                  <LocalErrorShow
                    :errors="localErrors"
                    :name="'postal_zip_code'"
                  />
                </v-col>

                <v-col cols="12" sm="12" md="4">
                  <label for="">* {{ $t("country") }}</label>
                  <v-text-field
                    label="USA"
                    single-line
                    outlined
                    v-model="country"
                  ></v-text-field>
                  <LocalErrorShow :errors="localErrors" :name="'country'" />
                </v-col>
              </v-row>

              <v-row class="paymethod" v-show="showCheckout  && !onLoadingCheckout">
                <v-col class="center" cols="12" sm="12" md="12">

                  <center>
                    <v-progress-circular
                      v-show="onLoadingPay"
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </center>


                  <button
                    class="btn change-color"
                    @click="showRequiredFields()"
                    v-if="payButtonDisabled && selectedPaymentProvider.payment_provider_id == 4"
                  >
                    {{ $t("payNow") }}
                  </button>

                  <button
                    class="btn change-color"
                    @click="showRequiredFields()"
                    v-if="payButtonDisabled && selectedPaymentProvider.payment_provider_id == 0"
                  >
                    {{ $t("payNow") }}
                  </button>

                  <button
                    class="btn change-color"
                    @click="checkout()"
                    v-show="selectedPaymentProvider.payment_provider_id == 0 && !payButtonDisabled"
                  >
                    {{ $t("payNow") }}
                  </button>
                 

                  <button
                    v-show="
                      selectedPaymentProvider.payment_provider_id == 4 &&
                        !payButtonDisabled
                    "
                    type="button"
                    class="AcceptUI btn change-color"
                    data-billingAddressOptions='{"show":false, "required":false}'
                    :data-apiLoginID="
                      selectedPaymentProvider.payment_provider_id == 4
                        ? selectedPaymentProvider.data.an_api_login_id
                        : ''
                    "
                    :data-clientKey="
                      selectedPaymentProvider.payment_provider_id == 4
                        ? selectedPaymentProvider.data.an_public_client_key
                        : ''
                    "
                    data-acceptUIFormBtnTxt="Submit"
                    data-acceptUIFormHeaderTxt="Card Information"
                    data-paymentOptions='{"showCreditCard": true, "showBankAccount": false}'
                    data-responseHandler="payResponse"
                  >
                    {{ $t("payNow") }}
                  </button>
          
                </v-col>
              </v-row>

              <center v-show="onLoadingCheckout">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </center>

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
    }
  },
  data: () => ({
    renderPage:false,
    order: "",
    currencySymbol: "",
    currencyCode: "",
    items: [],
    nearbyProducts: [],
    total: 0,
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
    selectedPaymentProviderActiveClass:"btn active-payment-provider",

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

    oldDiscountCodes:[],
    newDiscountCodes:[],
    onLoadingPay:false

  }),
  components: { Detail, LocalErrorShow },
  methods: {
    payResponse(response) {
      this.onLoadingPay = true
      this.payButtonDisabled = true
      this.payment_data = {
        opaque_data_descriptor: response.opaqueData.dataDescriptor,
        opaque_data_value: response.opaqueData.dataValue
      };

      if (this.checkoutCount == 0) {
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
          .replace('.', ',') // replace decimal point character with ,
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      ) // use . as a separator
    },
    async getItems() {
      if (process.browser) {
        let order = window.localStorage.getItem("orders");
        if (order != null) {
           this.onLoadingAttraction = true
          let res = await this.$axios.get("orders/item-list/" + order);
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
      let res = await this.$axios.get("orders/totals/" + this.order);
      this.total = res.data.grand_total;
      this.discountCode = res.data.discounts.length > 0 ? res.data.discounts[0].discount_code : '' 
      this.isGrandTotalDiscountEnabled = res.data.discounts_enabled
      this.grandTotalCurrencyCode = res.data.currency_code
      this.grandTotalCurrencySymbol = res.data.currency_symbol
    },
    setShowCheckout() {

      if (this.requestForUpdate == true || this.discountCodeRequestForUpdate) {
        
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
      let res = await this.$axios.get("orders/item-count/" + order);
      return res.data.data.number_of_items;
    },
    async remove(itemId) {
      let res = await this.$axios.post("/orders/item-delete", {
        request_number: this.order,
        item_id: itemId
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
      this.paymentProviders.forEach((data, paymentProviderIndex) => {
        if (index == paymentProviderIndex) {
          this.selectedPaymentProvider = data;
        }
      });
    },
    async getPaymentProviders() {
      let res = await this.$axios.post("checkout/payment-providers", {
        order_number: this.order
      });

      this.paymentProviders = res.data.data;

      this.getInfoFromSelectedPaymentProvider();
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
        ticket_delivery_method: this.ticket_delivery_method
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
    showRequiredFields() {

      this.localErrors = [];
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
    async setDiscountCode() {
      this.onLoadingOrderUpdate = true
      let res = await this.$axios.post("orders/discount-order", {
        order_number: this.order,
        discountCode: this.discountCode
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
    paypalResponse(response) {
      
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
        }, 3000);
      }
    },
    async nearbyProductsFetch() {
      var itemIdArray = [];

      this.items.forEach(data => {
        itemIdArray.push(data.item_id);
      });

      let res = await this.$axios.get("products/nearby/" + itemIdArray[0]);
      this.nearbyProducts = res.data;
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
        }
      }

      if (config.data.textColor) {
        if (process.browser) {
          localStorage.setItem("textColor", config.data.textColor);
        }
      }
    }
  },
  async created() {
    await this.getItems();
    this.nearbyProductsFetch();

    if (this.order) {
      this.getPaymentProviders();
    }

    this.getConfig();
    if (process.browser) {
      let color = localStorage.getItem("color");
      let textColor = localStorage.getItem("textColor");

      if (color) {
        $(".change-color").css("background", color);
      }

      if (textColor) {
        
        $(".change-text-color").css("color", textColor)
      }
    }
  },
  mounted() {
    this.paypalEnv = process.env.PAYPAL_ENV;
    this.loadLibraries();
    if (process.browser) {
      let color = localStorage.getItem("color");
      let textColor = localStorage.getItem("textColor");

      if (color) {
        $(".change-color").css("background", color);
        
      }

      if (textColor) {
        $(".change-text-color").css("color", textColor)
        
      }

      
    }
  },
  watch: {
    $route() {
      console.log("route changed", this.$route);
    }
  }
};
</script>

<style lang="scss">
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
      @include respond-to(xs) {
        justify-content: center;
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
    color: #000 !important;
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
  .theme--light.v-icon {
    color: rgb(239 24 86);
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
  background: #ef1856;
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
    color: #ef1856!important;
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
</style>
