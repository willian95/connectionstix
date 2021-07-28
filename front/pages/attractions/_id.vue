<template>
  <div class="details-custom">
    <client-only>
      <Navbar :transparent="false" :positionAbsolute="false"></Navbar>
    </client-only>
    <div >
      <div class="details-img mb-5"> 
        <img class="" :src="mainImage" alt="" v-show="!overlay"/>
        <div class="overlay" v-show="!overlay"></div>
        <div v-show="!overlay">
          <p><strong>{{ title }}</strong></p>
        </div>
      </div>
    </div>
    <!-------------------------------------------------->
    <v-container class="mt-5" v-if="images.length > 1">

       <!--<div class="content-mix-detail">
            <div class="row">
              <div class="col-md-12 ">
                <v-slide-group
                  class="list-unstyled mb-0"
                  mobile-break-point="1000"
                  center-active
                  show-arrows
                >
                  <v-btn
                    class="mx-2"
                    active-class="purple white--text"
                    depressed
                    rounded
                  ></v-btn>
                  <v-slide-item
                    class="mb-3"
                  v-for="(slide, i) in nearby"
                    :key="'nearby-' + i"
                  >
                    <NuxtLink class="no-underline" :to="{ path: '/attractions/'+slide.product_id }"
                      >
                      <v-card class="ma-4 card-slide_events">
                          <v-img contain :src="slide.thumbnail"></v-img>
                        <v-card-text>
                          <h3 class="no-underline">{{ slide.product_name }}</h3>
                          <div v-if="slide.pricing">
                            <p v-for="(price, index) in slide.pricing.prices" v-bind:key="index">
                            {{ slide.pricing.currency_symbol }} {{ price.current_price }} {{ slide.pricing.currency_code }} / {{ price.price_type_name }}
                          </p>
                          </div>
                          <div class="txt-star">
                            {{ $t('moreInfo') }}
                          </div>
                        </v-card-text>
                      </v-card>
                    </NuxtLink>
                  </v-slide-item>
                </v-slide-group>
              </div>
            </div>
          </div>-->

      <CoolLightBox 
        :items="images" 
        :index="lightboxIndex"
        :effect="'fade'"
        @close="lightboxIndex = null">
      </CoolLightBox>
      <v-sheet
        class="mt-5 mx-auto slider-images"
        elevation="8"
        max-width="100%"
      >
        <div class="content-mix-detail ">
          <div class="row">
            <v-slide-group class="images-wrapper" mobile-break-point="1000" show-arrows center-active>
              <v-btn
                class="mx-2"
                active-class="purple white--text"
                depressed
                rounded
              ></v-btn>

              <v-slide-item   v-for="(slide, i) in images" :key="i">
                <v-card width="250" class="ma-4  ">
                  <v-img contain :src="slide" @click="lightboxIndex = i"></v-img>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </div>
        </div>
      </v-sheet>
    </v-container>
    <no-ssr>
      <Details :description="description" :title="title" :highlights="highlights" :inclusions="inclusions" :exclusions="exclusions" :knowBeforeYouGoChecklist="knowBeforeYouGoChecklist" :knowBeforeYouGoOptional="knowBeforeYouGoOptional" :cancellationPolicy="cancellationPolicy" :operationHours="operationHours" :duration="duration" :address="address" :checkAvailability="checkAvailability" :pricing="pricing" :productId="productId" :nextDateAvailable="nextDateAvailable" :minimunHeight="minimunHeight"></Details>
    </no-ssr>
    <no-ssr>
      <v-container v-if="nearby.length > 0">
        <v-sheet class="mt-5 mx-auto slide_events" elevation="8">
          <div class="content-mix-detail content-mix-detail--attraction">
            <div class="row">
              <div class="col-md-12 ">
                <v-slide-group
                  class="list-unstyled mb-0"
                  mobile-break-point="1000"
                  center-active
                  show-arrows
                >
                  <v-btn
                    class="mx-2"
                    active-class="purple white--text"
                    depressed
                    rounded
                  ></v-btn>
                  <v-slide-item
                    class="mb-3"
                  v-for="(slide, i) in nearby"
                    :key="'nearby-' + i"
                  >
                    <NuxtLink class="no-underline" :to="{ path: '/attractions/'+slide.product_id }"
                      >
                      <v-card class="ma-4 card-slide_events">
                          <v-img contain :src="slide.thumbnail"></v-img>
                        <v-card-text>
                          <h3 class="no-underline">{{ slide.product_name }}</h3>
                          <div v-if="slide.pricing">
                            <p v-for="(price, index) in slide.pricing.prices" v-bind:key="index">
                            {{ slide.pricing.currency_symbol }} {{ price.current_price }} {{ slide.pricing.currency_code }} / {{ price.price_type_name }}
                          </p>
                          </div>
                          <div class="txt-star">
                            {{ $t('moreInfo') }}
                          </div>
                        </v-card-text>
                      </v-card>
                    </NuxtLink>
                  </v-slide-item>
                </v-slide-group>
              </div>
            </div>
          </div>

        </v-sheet>
      </v-container>

    </no-ssr>
  </div>
</template>

<script>
import Navbar from "~/components/Navbar";
import Details from "~/components/details/Details";

import CoolLightBox from 'vue-cool-lightbox';
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css';

export default {
  components: { Navbar, Details,  CoolLightBox },

  data: () => ({
    productId:"",
    mainImage:"",
    title:"",
    images:[],
    overlay:true,
    description:"",
    highlights:[],
    inclusions:[],
    exclusions:[],
    knowBeforeYouGoChecklist:[],
    knowBeforeYouGoOptional:[],
    cancellationPolicy:"",
    operationHours:[],
    duration:"",
    address:"",
    checkAvailability:false,
    nextDateAvailable:"",
    pricing:[],
    nearby:[],
    lightboxIndex:null,
    minimunHeight:[]
  }),
  methods:{

    async getData(id){

      let res = await this.$axios.get("products/"+id)
      
      this.mainImage = res.data.images[0]
      this.title = res.data.product_name
      this.images = res.data.images
      this.description = res.data.long_description
      this.highlights = res.data.highlights ? res.data.highlights : []
      this.inclusions = res.data.inclusions ? res.data.inclusions : []
      this.exclusions = res.data.exclusions ? res.data.exclusions : []
      let knowBeforeYouGo = res.data.know_before_you_go ? res.data.know_before_you_go : []
      this.minimunHeight = res.data.minimum_height ? res.data.minimum_height : []

      if(knowBeforeYouGo.hasOwnProperty("checklist")){
        this.knowBeforeYouGoChecklist = res.data.know_before_you_go.checklist
      }

      if(knowBeforeYouGo.hasOwnProperty("bullet_list")){
        this.knowBeforeYouGoOptional = res.data.know_before_you_go.bullet_list
      }

      this.cancellationPolicy = res.data.cancellation_policy
      this.operationHours = res.data.hours_of_operation ? res.data.hours_of_operation : []
      this.duration = res.data.duration
      let country = res.data.address.country ? res.data.address.country : '' 
      let city = res.data.address.city ? res.data.address.city : ''
      
      let state = res.data.address.province_state ? res.data.address.province_state : ''
      let street1 = res.data.address.street_line_1 ? res.data.address.street_line_1 : '' 
      let street2 = res.data.address.street_line_2 ? res.data.address.street_line_2 : ''
      let zipCode = res.data.address.postal_zip_code ? res.data.address.postal_zip_code : ''

      let streetComma1 = street1 != "" && (city != "" || state != "" || country != "" || street2 != "" || zipCode != "") ? "," : ''
      let cityComma = city != "" && (state != "" || country != "" || street2 != "" || zipCode != "") ? "," : ''
      let stateComma = state != "" && (country != "" || street2 != "" || zipCode != "") ? "," : ''
      let countryComma = country != "" && (street2 != "" || zipCode != "") ? "," : ''
      let street2Comma = street2 != "" && zipCode != "" ? "," : ''

      this.address = street1+streetComma1+" "+city+cityComma+" "+state+stateComma+" "+country+countryComma+" "+street2+street2Comma+" "+zipCode

      this.checkAvailability = res.data.availability.check_availability
      this.nextDateAvailable = res.data.availability.next_available
      this.pricing = res.data.pricing

    },
    async getNearbyProducts(id){

      let res = await this.$axios.get("products/nearby/"+id)
      this.nearby = res.data ? res.data : []

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

      if(config.data.color){
        if(process.browser){
          localStorage.setItem("color", config.data.color)
        }
      }
      
    }
    

  },
  created(){
    this.productId = this.$route.params.id
    this.getData(this.$route.params.id)
    this.getNearbyProducts(this.$route.params.id)
    this.getConfig()

  },
  watch: {
    $route () {
      
    }
  },
};
</script>

<style lang="scss">

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
      color: #ef1856;
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
    color: #ef1856;
    border-bottom: 1px solid #ef1856;
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
    color: #ef1856;
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

.no-underline{
  text-decoration: none !important;
}
.content-mix-detail--attraction{
  .v-sheet.v-card {
    text-align: start!important;
  }
  .txt-star{
        color: #ef1856;
    text-decoration: underline;
  }
}
.details-custom {
  .details-img {
    position: relative;

    img {
     height: 60vh;
      object-fit: cover;
         @include respond-to(xs) {
height: 30vh;
         }
    }

    p {
      position: absolute;
      bottom: 2rem;
      width: 100%;
      text-align: center;
      font-size: 2.5rem;
      color: #fff;
    }
  }
  .overlay {
    background-color: #00000061;
    content: "";
    top: 0;
    width: 100%;
   height: 60vh;
    position: absolute;
     @include respond-to(xs) {
height: 30vh;
         }
  }
  .v-slide-group__content {
    gap: 20px;
  }
  .v-sheet.v-card:not(.v-sheet--outlined) {
    box-shadow: none;
  }
  .slider-images {
    margin-top: 0.6rem;
    margin-bottom: 3rem;
  }

  .mdi-chevron-left {
       color: #ef1856 !important;
    position: absolute;
    left: -3rem;
    z-index: 1;
    top: 2rem;
    font-size: 5rem;
  }
 
  .mdi-chevron-right {
    color: #ef1856 !important;
    position: absolute;
    right: 0;
    z-index: 1;
    top: 2rem;
    font-size: 5rem;
  }
  .theme--light.v-btn.v-btn--has-bg {
    background-color: transparent;
    display: none;
  }
  .v-image__image {
    width: 100%;
    background-size: cover;
    height: 100%;
    border-radius: 11px;
  }
  .theme--light.v-image {
    height: 140px;
        cursor: pointer;
  }
  .theme--light.v-sheet--outlined {
    border: none;
  }
}
.slide_events{
      margin-bottom: 7rem;
margin-top: 4rem;
  .card-slide_events {
     box-shadow: 0px 2px 10px rgb(0 0 0 / 25%)!important;
    border-radius: 15px;
        margin-bottom: 1rem;
  .theme--light.v-image {
   width: 335px;
    height: 190px;
  }
}
.v-card__text {
    color: #000!important;
    p{
          font-weight: 500;
    }
    a{
      color: #ef1856;
    }
}
}

.vdp-datepicker__calendar header {
    display: contents!important;

}
</style>
