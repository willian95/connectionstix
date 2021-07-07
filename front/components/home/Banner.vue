<template>
 <div class="main-banner">
 <div class="banner">
    <img v-if="backImage" class="background" :src="backImage" alt="" />
    <div class="banner__content">
      <img v-if="logo" :src="logo" alt="" />
      <h2>{{ $t("bookNow") }}</h2>
      <p>{{ $t("homePrice") }}</p>
      <span>{{ $t("homeKidPrice") }}</span>
      <!------------------------------------>
      <v-container class="content-choose">
        <v-row>
          <v-col class="d-flex" cols="12" sm="4">
            <label for="">{{ $t("chooseCountry") }}</label>
            <v-select
              v-model="country"
              :items="countries"
              label="Select..."
              item-text="name"
              item-value="country_code"
              solo
              @change="getStates()"
            ></v-select>
          </v-col>

          <v-col class="d-flex" cols="12" sm="4">
            <label for="">{{ $t("chooseState") }}</label>
            <v-select
              v-model="state"
              :items="states"
              label="Select..."
              item-text="name"
              item-value="province_state_code"
              solo
              @change="getCities()"
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="4">
            <label for="">{{ $t("chooseCity") }}</label>
            <v-select
              v-model="city"
              :items="cities"
              label="Select..."
              item-text="name"
              item-value="city_code"

              solo
            ></v-select>
          </v-col>
        </v-row>
        <div class="center">
          <button
            class="btn"
            @click="getFilteredProducts(country, state, city)"
            id="goBtn"
          >
            {{ $t("homeGo") }}
          </button>
        </div>
      </v-container>
    </div>
  </div>
 </div>
</template>

<script>
export default {
  props: ["getFilteredProducts", "backImage"],
  data: () => ({
    countries: [],
    states: [],
    cities: [],
    country: "",
    state: "",
    city: "",
    image: "",
    logo: "",
    orderNumber:"",
  }),
  methods: {
    async getCountries() {

      this.getOrderNumber()

      let res = await this.$axios.get("countries/all?orderNumber="+this.orderNumber);
      this.countries = res.data;

      this.countries.forEach(data => {

        if(data.selected == true){
          this.country = data.country_code
          this.getStates()
        }

      })

    },
    async getStates() {
     
      this.states = [];
      this.cities = [];
      let res = await this.$axios.get("provinces/" + this.country+"/"+this.orderNumber+"?orderNumber="+this.orderNumber);
      this.states = res.data;

      this.states.forEach(data => {

        if(data.selected == true){
          this.state = data.province_state_code
          this.getCities()
        }

      })
    },
    async getCities() {
      this.cities = [];
      let res = await this.$axios.get(
        "cities/" + this.country + "/" + this.state+"?orderNumber="+this.orderNumber
      );
      this.cities = res.data;

      this.cities.forEach(data => {

        if(data.selected == true){
          this.city = data.city_code

          if(this.orderNumber){
            this.getFilteredProducts(this.country, this.state, this.city)
          }

        }

      })

      
    },
    async getLogo() {
      if (process.browser) {
        this.logo = window.localStorage.getItem("logo");
      }
    },
    async getConfig() {
      let config = await this.$axios.get("configcms");
      console.log("config", config);
      this.overlay = config.data.overlay;

      if (config.data.hero) {
        this.backImage = process.env.SERVER_URL + config.data.hero;
      }

      if (config.data.logo) {
        if (process.browser) {
          localStorage.setItem(
            "logo",
            process.env.SERVER_URL + config.data.logo
          );
        }
      }

      if (config.data.color) {
        if (process.browser) {
          localStorage.setItem("color", config.data.color);
        }
      }

      if (config.data.overlay) {
        if (process.browser) {
          localStorage.setItem("overlay", config.data.overlay);
        }
      }

      this.getLogo();
    },
    getOrderNumber(){

      let order = window.localStorage.getItem("orders")

      if(order != null){
        this.orderNumber = order
      }

    }
  },
  mounted() {
    this.getCountries();
    this.getConfig();
    if (process.browser) {
      let color = localStorage.getItem("color");

      if (color) {
        document.getElementById("goBtn").style.background = color;
      }
    }
  },
};
</script>

<style lang="scss">
.main-banner{
height: 110vh;
   @include respond-to(xs) {
     height: 145vh;
   }  
       @include respond-to(sm) {
         height: 95vh;
       }
        @include respond-to(md) {
height: 122vh;
        }
}
.banner {
  height: 80vh;
  position: relative;
    @include respond-to(xs) {
height: 60vh;
    }
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
      font-size: 1.4rem;
      margin-bottom: 0.3rem;
          font-weight: 700;
    }
    span {
      font-size: 1.4rem;
          font-weight: 700;
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
          margin-top: 1rem;
    }
    @include respond-to(sm) {
      .btn {
        margin-bottom: 0rem;
      }
    }
    @include respond-to(md) {
      max-width: 85%;
    }
    & label {
      color: #000;
      font-size: 1.2rem;
      font-weight: 700;
      @include respond-to(xs) {
        font-size: 1rem;
      }
    }
    .v-select__slot {
    height: 8vh;

}
  }
  .btn {
  
    padding: .8rem 5.8rem;
    margin-top: 1rem;
    font-size: 1.5rem;
    font-weight: 600;

  }

  .v-input textarea {
    padding-right: 1rem;
  }
  .center {
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
