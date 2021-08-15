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
        <div class="row">
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
                            <span class="primary-color">{{ $t("moreInfo") }}</span>
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
      $(".primary-color").css("color", this.primaryColor)
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
          $(".primary-color").css("color", this.primaryColor)
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




    }
  },
  created() {

    this.getConfig();
    if(process.browser){
      this.isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

      this.selectedCardTag = this.isSafari ? "ma-4 w-card_slider selectedCardTagSafari" : "ma-4 w-card_slider selectedCardTag"

    }
  }
};
</script>

<style lang="scss">
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
    margin-top: -0.5rem;
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

</style>
