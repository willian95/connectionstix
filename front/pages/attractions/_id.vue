<template>
  <div class="details-custom">
    <NavbarView></NavbarView>
    <div>
      <div class="details-img">
        <img class="" :src="mainImage" alt="" />
        <div class="overlay"></div>
        <div>
          <p><strong>{{ title }}</strong></p>
        </div>
      </div>
    </div>
    <!-------------------------------------------------->
    <v-container v-if="images.length > 1">
      <v-sheet
        class="mt-5 mx-auto slider-images"
        elevation="8"
        max-width="100%"
      >
        <v-slide-group mobile-break-point="1000" show-arrows center-active>
          <v-btn
            class="mx-2"
            active-class="purple white--text"
            depressed
            rounded
          ></v-btn>

          <v-slide-item v-for="(slide, i) in images" :key="i">
            <v-card width="250" class="ma-4  ">
              <v-img contain :src="slide"></v-img>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </v-container>
    <Details :description="description" :title="title" :highlights="highlights" :inclusions="inclusions" :exclusions="exclusions" :knowBeforeYouGoChecklist="knowBeforeYouGoChecklist" :knowBeforeYouGoOptional="knowBeforeYouGoOptional" :cancellationPolicy="cancellationPolicy" :operationHours="operationHours" :duration="duration" :address="address" :checkAvailability="checkAvailability" :pricing="pricing"></Details>
    <!---------------------------------------------------------------->
    <v-container v-if="nearby.length > 0">
      <v-sheet class="mt-5 mx-auto slide_events" elevation="8">
        <v-slide-group mobile-break-point="1000" show-arrows center-active>
          <v-btn
            class="mx-2"
            active-class="purple white--text"
            depressed
            rounded
          ></v-btn>
          <v-slide-item v-for="(slide, i) in nearby" :key="i">
            <v-card class="ma-4 card-slide_events">
                <v-img contain :src="slide.thumbnail"></v-img>
              <v-card-text>
                <h3>{{ slide.product_name }}</h3>
                <div v-if="slide.pricing">
                  <p v-for="(price, index) in slide.pricing.prices" v-bind:key="index">
                  {{ slide.pricing.currency_symbol }} {{ price.current_price }} {{ slide.pricing.currency_code }} / {{ price.price_type_name }}
                </p>
                </div>
                <div class="txt-star">
                  <NuxtLink class="" :to="{ path: '/attractions/'+slide.product_id }"
                    >More info</NuxtLink
                  >
                </div>
              </v-card-text>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </v-container>
  </div>
</template>

<script>
import NavbarView from "~/components/NavbarView";
import Details from "~/components/details/Details";
export default {
  components: { NavbarView, Details },

  data: () => ({
    mainImage:"",
    title:"",
    images:[],
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
    pricing:[],
    nearby:[],
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
      if(knowBeforeYouGo.hasOwnProperty("checklist")){
        this.knowBeforeYouGoChecklist = res.data.know_before_you_go.checklist
      }

      if(knowBeforeYouGo.hasOwnProperty("bullet_list")){
        this.knowBeforeYouGoOptional = res.data.know_before_you_go.bullet_list
      }

      this.cancellationPolicy = res.data.cancellation_policy
      this.operationHours = res.data.hours_of_operation ? res.data.hours_of_operation : []
      this.duration = res.data.duration
      let country = res.data.address.country
      let city = res.data.address.city
      let state = res.data.address.province_state
      let street1 = res.data.address.street_line_1 ? res.data.address.street_line_1 : '' 
      let street2 = res.data.address.street_line_2 ? res.data.address.street_line_2 : ''
      let zipCode = res.data.address.postal_zip_code ? res.data.address.postal_zip_code : ''

      this.address = street1+" "+street2+" "+zipCode

      this.checkAvailability = res.data.availability.check_availability
      this.pricing = res.data.pricing

    },
    async getNearbyProducts(id){

      let res = await this.$axios.get("products/nearby/"+id)
      this.nearby = res.data ? res.data : []

    }

  },
  created(){

    this.getData(this.$route.params.id)
    this.getNearbyProducts(this.$route.params.id)

  }
};
</script>

<style lang="scss">
.details-custom {
  .details-img {
    position: relative;

    img {
      height: 84vh;
      object-fit: cover;
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
    height: 84vh;
    position: absolute;
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
  .mdi-chevron-left::before {
    color: #ef1856;
  }
  .mdi-chevron-right {
    color: #ef1856 !important;
    position: absolute;
    right: 0;
    z-index: 1;
    top: 2rem;
    font-size: 5rem;

    left: 73rem;
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
  }
  .theme--light.v-sheet--outlined {
    border: none;
  }
}
.slide_events{
      margin-bottom: 7rem;

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

</style>
