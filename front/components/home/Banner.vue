<template>
  <div class="banner">
    <img class="background" :src="backImage" alt="" />
    <div class="banner__content">
      <img :src="logo" alt="" />
      <h2>Book now!</h2>
      <p>$15 CAD/Person</p>
      <span> < 5 years kids/Free of charge*</span>
      <!------------------------------------>
      <v-container class="content-choose">
        <v-row >
          <v-col class="d-flex" cols="12" sm="4">
            <label for="">Choose country</label>
            <v-select v-model="country" :items="countries" label="Select..." item-text="country_code" solo @change="getStates()"></v-select>
          </v-col>

          <v-col class="d-flex" cols="12" sm="4">
            <label for="">Choose state/province</label>
            <v-select v-model="state" :items="states" label="Select..." item-text="name" item-value="province_state_code" solo @change="getCities()"></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="4">
            <label for="">Choose city</label>
            <v-select v-model="city" :items="cities" label="Select..." item-text="name" item-value="city_code" solo></v-select>
          </v-col>
        </v-row>
        <div class="center">
          <button class="btn" @click="getFilteredProducts(country, state, city)" id="goBtn">
            Go
          </button>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  props:['getFilteredProducts', 'backImage'],
  data: () => ({
    countries: [],
    states: [],
    cities: [],
    country:"",
    state:"",
    city:"",
    image:"",
    logo:""
  }),
  methods:{

    async getCountries(){

      let res = await this.$axios.get("countries/all")
      this.countries = res.data

    },
    async getStates(){

      this.states = []
      this.cities = []
      let res = await this.$axios.get("provinces/"+this.country)
      this.states = res.data

    },
    async getCities(){

      this.cities = []
      let res = await this.$axios.get("cities/"+this.country+"/"+this.state)
      this.cities = res.data
      

    },
    async getLogo(){

      if(process.browser){
        this.logo = window.localStorage.getItem("logo")
      }

    }

  },
  mounted(){
    this.getCountries()
    this.getLogo()
    if(process.browser){
      let color = localStorage.getItem("color")
      
      document.getElementById("goBtn").style.background = color;
    }    
  }

};
</script>

<style lang="scss">
.banner {
  height: 80vh;
  position: relative;

  & .background {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &::before {
    background-color: #000;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.4;
  }

  & .banner__content {
    position: absolute;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    top: 5rem;
    color: #fff;
    @include respond-to(xs) {
      top: 2rem;
    }

    img {
      width: 100%;
      height: 100px;
      object-fit: contain;
      margin-bottom: 2.5rem;
      @include respond-to(xs) {
        width: 85%;
        margin-bottom: 0;
      }
    }

    h2 {
      font-weight: bold;
      color: #fff;
      font-size: 2.5rem;
      @include respond-to(xs) {
        font-size: 2rem;
      }
    }
    p {
      font-size: 1.2rem;
      margin-bottom: 0.3rem;
    }
    span {
      font-size: 1.2rem;
       @include respond-to(xs) {
           font-size: 1rem;
       }
    }
  }

  & .content-choose {
    background: #fff;
    box-shadow: 0 0 10px #00000052;
    border-radius: 1.5rem;
    padding: 2rem 2rem;
    max-width: 72%;
    margin-top: 4rem;
    @include respond-to(xs) {
      max-width: 92%;
    }

    & label {
      color: #000;
      font-size: 1.2rem;
      @include respond-to(xs) {
        font-size: 1rem;
      }
    }
  }
  .btn {
    padding: 1rem 5.8rem;
    margin-top: 1rem;
  }

  .v-input textarea {
    padding-right: 1rem;
}
.center{
      text-align: center;
}
}
.v-text-field.v-text-field--solo .v-input__control {
  min-height: 10px;
}
.row.no-gutters > .col,
.row.no-gutters > [class*="col-"] {
  padding: 0 0.5rem 0;
}
.v-text-field.v-text-field--enclosed {
  margin-top: 0.3rem;
}
.v-label {
  font-size: 10px;
}
.v-select__selection--comma {
  color: #000;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 0 1rem;
}
</style>
