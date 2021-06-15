<template>
  <div class="details-custom">
    <NavbarView></NavbarView>
    <div>
      <div class="details-img">
        <img class="" src="~assets/images/banner-2.png" alt="" />
        <div class="overlay"></div>
        <div>
          <p><strong>Niagara falls awesomeness!</strong></p>
        </div>
      </div>
    </div>
    <!-------------------------------------------------->
    <v-container>
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

          <v-slide-item v-for="(slide, i) in slides" :key="i">
            <v-card width="250" class="ma-4  ">
              <v-img contain :src="slide.image"></v-img>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </v-container>
    <Details></Details>
    <!---------------------------------------------------------------->
    <v-container>
      <v-sheet class="mt-5 mx-auto slide_events" elevation="8">
        <v-slide-group mobile-break-point="1000" show-arrows center-active>
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
                  <NuxtLink class="" :to="{ path: '/attraction' }"
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
    slides: [
      {
        image: "http://imgfz.com/i/uF6NS3t.png"
      },
      {
        image: "http://imgfz.com/i/g8w5z3H.png"
      },
      {
        image: "http://imgfz.com/i/MUVFK2N.png"
      },
      {
        image: "http://imgfz.com/i/uF6NS3t.png"
      },
      {
        image: "http://imgfz.com/i/6eIWYLv.png"
      },
      {
        image: "http://imgfz.com/i/6eIWYLv.png"
      },
      {
        image: "http://imgfz.com/i/6eIWYLv.png"
      }
    ],
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
  })
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
