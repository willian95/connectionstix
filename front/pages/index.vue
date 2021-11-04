<template>
  <div class="" id="app" data-app>
    <div>
      <client-only>
        <Navbar/>
      </client-only>
      <!---    <Logo />-->
      <Banner
        :getFilteredProducts="getFilteredProducts"
        :backImage="backImage"
        :getTags="getTags"
        v-show="!overlay"
      />
      <div class="content-mix ">
        <div :class="overlay == true ? 'overlay-index-margin row' : 'row'">
          <div class="col-md-12 ">
            <v-slide-group
              class="list-unstyled mb-0"
              mobile-break-point="1000"
              show-arrows
              v-if="tagList.length > 0"
            >
              <v-btn
                class="mx-2"
                active-class="purple white--text"
                depressed
                rounded
              ></v-btn>
              <v-slide-item
                class="mb-3"
                v-for="(tag, index) in tagList"
                :key="'tag-' + index"
              >
                <v-card  :class="selectedTag == tag.tag_id ? selectedCardTag : cardTag"  @click="getProductsByTag(tag.tag_id, tag.name)">
                  <div class="content-icons">
                    <img class="img-icon img-icon-nohover" :src="tag.icon" alt="" />
                  <img :class="isSafari ? 'img-icon icon-selected-safari' : 'img-icon icon-selected'" :src="tag.icon_selected" alt="" />
                  <!--<img :class="'img-icon icon-selected'" :src="tag.icon_selected" alt="" />-->
                  </div>
                  <div class="cursore-pointer color-txt">
                    {{ tag.name }}
                  </div>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </div>
          <div class="col-md-12" id="projects-list">
            <div class="m-auto w-100">
              <div></div>
              <p class="title-mix" v-if="tagList.length > 0">{{ tagName }}</p>

              <div>
                <h3 class="text-center" v-if="showNoProductsMessage">
                  {{ $t("NoProductsFound") }}
                </h3>
              </div>

              <client-only v-show="productsShow">
                <isotope
                  class="mix-grid"
                  ref="projects"
                  :list="projects"
                  :options="{}"
                >
                  <div

                    class="text-white thumbnail "
                    v-for="(item, index) in projects"
                    :key="'projects-' + index"
                  >
                   <NuxtLink
                              :to="
                                localePath('/attractions/' + item.product_id)
                              "
                              >
                    <div class="cursore-pointer d-block pos-r p-1 item-content">
                      <img class="w-100" :src="item.thumbnail" />
                      <div
                        class="pin pin-xy d-flex text-white thumbnail-overlay  text-mix"
                      >
                        <div class="m-auto fs-16 star-txt ">
                          <h3>{{ item.product_name }}</h3>
                          <p
                            v-for="(price, index) in item.pricing.prices"
                            v-bind:key="'item-' + index"
                          >
                            {{ item.pricing.currency_symbol }}
                            {{ currencyFormatDE(price.current_price) }}
                            /
                            {{ price.price_type_name }}
                          </p>
                          <div class="txt-star">
                         <!---   <NuxtLink
                              :to="
                                localePath('/attractions/' + item.product_id)
                              "
                              >{{ $t("moreInfo") }}</NuxtLink
                            >-->
                            <span class="primary-text-color">{{ $t("moreInfo") }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    </NuxtLink
                            >
                  </div>
                </isotope>
              </client-only>
            </div>
          </div>
        </div>
      </div>
      
      <!--<div>
        <form id="payment-form">

          <div id="card-container"></div>

          <button id="card-button" type="button">Pay $1.00</button>

        </form>

        <div id="payment-status-container"></div>

      </div>-->

    </div>
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";
import Banner from "~/components/home/Banner";

export default {
  components: { Navbar, Banner },
  data() {
    return {
      cardTag:"ma-4 w-card_slider",
      selectedCardTag:"",
      filterOption: "See All",
      tagList: [],
      backImage: "/banner.png",
      overlay: true,
      projects: [],
      tagName:"See All",
      showNoProductsMessage:false,
      selectedTag: 0,
      country:"",
      province:"",
      city:"",
      isSafari:false,
      primaryColor:"",

      productsShow:false
    };
  },

  methods: {
    filter(key) {
      if (this.filterOption !== key) {
        this.$refs.projects.filter(key);
        this.filterOption = key;
      }
    },
    currencyFormatDE(num) {
      return (
          num
          .toFixed(2) // always two decimal digits
          //.replace('.', ',') // replace decimal point character with ,
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      ) // use . as a separator
    },
    async getAllProducts() {
      //alert("getAllProducts")
      let res = await this.$axios.get("products/all");
      this.projects = res.data;

      
      if(process.browser){

        window.setTimeout(() => {
          $(".primary-text-color").css("color", this.primaryColor)
        }, 100)

      }
    },
    async getFilteredProducts(countryCode, state, city, isClicked = false) {
      
      if(this.selectedTag == 0){
        this.getTags(city)
        this.getAllProducts()

      }else{
        
        this.country = countryCode
      this.province = state
      this.city = city
      this.tagName = "See All"
      this.selectedTag = 0

      this.productsShow = false

      //await this.getTags(city)
      this.getProductsByTag(this.selectedTag, this.tagName)

      this.showNoProductsMessage = false
      let res = await this.$axios.post("products/list", {
        country: countryCode,
        state: state,
        city: city
      });

      this.projects = []

      if (res.data.status.result_messages[0] == "OK") {
        this.projects = res.data.data.products;


      } else {

        this.projects = []
        this.showNoProductsMessage = true

      }

      let distance = $("#projects-list").offset().top

      if(isClicked){
        window.setTimeout(() => {
          $('html, body').animate({
            scrollTop: distance
        }, 2000);
        }, 500)
      }

      if(process.browser){

        window.setTimeout(() => {
          $(".primary-text-color").css("color", this.primaryColor)
        }, 100)

      }
      }

      

      this.productsShow = true


    },
    async getProductsByTag(tag, tagName) {

      this.productsShow = false
      let payload = {}
      this.showNoProductsMessage = false

      this.tagName = tagName
      this.selectedTag = tag

      payload = {
        "tag": tag,
        "country": this.country ? this.country : '',
        "state":this.province ? this.province : '',
        "city":this.city ? this.city : ''
      }

      let res = await this.$axios.post("products/list", payload);

      this.projects = []

      if (res.data.status.result_messages[0] == "OK") {
        this.projects = res.data.data.products;



      } else {
        this.projects = []
        this.showNoProductsMessage = true
      }

      if(process.browser){

        window.setTimeout(() => {
          $(".primary-color").css("color", this.primaryColor)
        }, 100)

      }

      this.productsShow = true


    },
    async getTags(cityCode) {

      //alert("getTags")

      let res = await this.$axios.get("tags/all?cityCode="+cityCode);
      this.tagList = res.data;

      if(process.browser){
        window.setTimeout(() => {
          $(".v-icon").css("color", this.primaryColor)
        }, 100)
      }


      //if(this.tagList.length == 0){
        //this.getAllProducts()
      //}

    },
    async getConfig() {
      let config = await this.$axios.get("configcms");
      this.overlay = config.data.overlay;


      if (config.data.hero) {
        this.backImage = process.env.SERVER_URL + config.data.hero;
      }

      this.primaryColor = config.data.color


      /*if(this.overlay == true){
        await this.getTags("")
        await this.getAllProducts()
      }*/




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
      console.log("tokenize", paymentMethod)
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
      let locationId = "L74RZ4F8MG058"
      const body = JSON.stringify({
        locationId,
        sourceId: token,
      });

      const paymentResponse = await this.$axios.post('/payment/pay', {
        body
      });

      console.log("paymentResponse", paymentResponse)

      if (paymentResponse.data.payment.status == "COMPLETED") {
        return paymentResponse;
      }

      alert("error")
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
        payments = window.Square.payments("sandbox-sq0idb-ZKVcp6GXp8XHkFu5egx0jQ", "L74RZ4F8MG058");
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
  created() {

    this.getConfig();
    if(process.browser){
      this.isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

      this.selectedCardTag = this.isSafari ? "ma-4 w-card_slider selectedCardTagSafari" : "ma-4 w-card_slider selectedCardTag"

      this.createCardPayment()
    }

    

  },
};
</script>

<style lang="scss">

.overlay-index-margin{
  margin-top: 120px !important;
}

.content-mix .v-icon.v-icon{
  margin-top: -40px;
}

.content-mix {
  padding: 0 10rem;

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
    text-align: center;
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
body{
  overflow: hidden;
}

.selectedCardTag {
  .icon-selected{
    opacity: 1 !important;
  }
  .color-txt{
    color: #000;
    font-weight: bold;
  }
}

.selectedCardTagSafari {
  .icon-selected-safari{
    opacity: 1 !important;
    top:0;
    margin-top: 0;
  }
  .color-txt{
    color: #000;
    font-weight: bold;
  }
}


.w-card_slider{
.content-icons{
  position:relative;
  transition: .6s;
  & .icon-selected{
      position: absolute;
      left: 0;
      opacity: 0;
      top:0;

  }

  & .icon-selected-safari{
      position: absolute;
      left: 0;
      opacity: 0;
      top:0;
  }
}
  &:hover, &:focus {
     .img-icon-nohover{
        opacity: 0;
    }
    .icon-selected{
      opacity: 1;

    }
    .color-txt{
      color: #000;
      font-weight: bold;
    }
    .icon-selected-safari{
      opacity: 1;
      top: 0;
      margin-top: -0.5rem;
    }

}

.v-card--link:before {
    background: transparent;

}
}

#payment-form {
  max-width: 550px;
  min-width: 300px;
  margin: 150px auto;
}

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

h3 {
  margin: 0;
}

p {
  line-height: 24px;
}

label {
  font-size: 12px;
  width: 100%;
}

input:focus {
  border: 1px solid #006aff;
}

button {
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

button:active {
  background-color: rgb(0, 85, 204);
}

button:disabled {
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
