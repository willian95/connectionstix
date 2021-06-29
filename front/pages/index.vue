<template>
  <div class="" id="app" data-app>
    <div>
      <client-only>
        <Navbar :transparent="!overlay" :positionAbsolute="true" />
      </client-only>
      <!---    <Logo />-->
      <Banner
        :getFilteredProducts="getFilteredProducts"
        :backImage="backImage"
        v-show="!overlay"
      />
      <div class="content-mix ">
        <div class="row">
          <div class="col-md-12 ">
            <v-slide-group
              class="list-unstyled mb-0"
              mobile-break-point="1000"
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
                v-for="(tag, index) in tagList"
                :key="'tag-' + index"

                @click="getProductsByTag(tag.tag_id, tag.name)"
              >
                <v-card  class="ma-4 w-card_slider ">
                  <div>
                    <img class="img-icon" :src="tag.icon" alt="" />
                  </div>
                  <div class="cursore-pointer">
                    {{ tag.name }}
                  </div>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </div>
          <div class="col-md-12">
            <div class="m-auto w-100">
              <div></div>
              <p class="title-mix">{{ tagName }}</p>
              <no-ssr>
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
                    <div class="cursore-pointer d-block pos-r p-1">
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
                            {{ price.current_price }}
                            {{ item.pricing.currency_code }} /
                            {{ price.price_type_name }}
                          </p>
                          <div class="txt-star">
                            <NuxtLink
                              :to="
                                localePath('/attractions/' + item.product_id)
                              "
                              >{{ $t("moreInfo") }}</NuxtLink
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </isotope>
              </no-ssr>
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
      filterOption: "See All",
      tagList: [],
      backImage: "/banner.png",
      overlay: true,
      projects: [],
      tagName:"See all"
    };
  },

  methods: {
    filter(key) {
      if (this.filterOption !== key) {
        this.$refs.projects.filter(key);
        this.filterOption = key;
      }
    },
    async getAllProducts() {
      let res = await this.$axios.get("products/all");
      this.projects = res.data;
    },
    async getFilteredProducts(countryCode, state, city) {
      let res = await this.$axios.post("products/list", {
        country: countryCode,
        state: state,
        city: city
      });

      if (res.data.status.result_messages[0] == "OK") {
        this.projects = res.data.data.products;
      } else {
        //show products not found
      }
    },
    async getProductsByTag(tag, tagName) {

      this.tagName = tagName

      let res = await this.$axios.post("products/list", {
        tag: tag
      });

      if (res.data.status.result_messages[0] == "OK") {
        this.projects = res.data.data.products;
      } else {
        //show products not found
      }
    },
    async getTags() {
      let res = await this.$axios.get("tags/all");
      this.tagList = res.data;
    },
    async getConfig() {
      let config = await this.$axios.get("configcms");
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
    }
  },
  created() {
    this.getTags();
    this.getAllProducts();
    this.getConfig();
  }
};
</script>

<style lang="scss">
.content-mix {
  padding: 0 10rem;
  margin-bottom: 12rem;
  @include respond-to(xs) {
    padding: 0 0;
    padding-bottom: 25rem;
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
    /* display: flex; */
    /* flex-wrap: wrap; */
    gap: 3rem;
    display: grid;
    grid-auto-rows: 18rem;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    @include respond-to(md) {
      grid-gap: 2rem;
      height: max-content !important;
    }
    & .item {
      position: relative !important;
      left: auto !important;
      top: 0 !important;
      box-shadow: 0px 2px 10px #00000040;
      border-radius: 15px;
      text-align: start;
      height: max-content;

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
    & h3,
    p {
      text-align: start;
    }
    p {
      font-weight: 500;
    }
    a {
      font-size: 0.9rem;
      font-weight: 800;
      color: #ef1856;
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
    width: 40px;
    height: 100%;
    margin-bottom: 0.5rem;
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
    justify-content: center;
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
</style>
