<template>
  <div class="" id="app" data-app>
    <div>
      <Navbar :transparent="!overlay" :positionAbsolute="true"/>
      <!---    <Logo />-->
      <Banner :getFilteredProducts="getFilteredProducts" :backImage="backImage" v-show="!overlay"/>
      <div class="content-mix mt-12">
        <div class="row">
          <div class="col-md-12 ">
            <ul class="list-unstyled mb-0">
              <li class="mb-3" v-for="(tag, index) in tagList" :key="'tag-'+index">
                <div>
                  <img class="img-icon" :src="tag.icon" alt="" />
                </div>
                <div
                  class="cursore-pointer"
                >
                  {{ tag.name }}
                </div>
              </li>
            </ul>
          </div>
          <div class="col-md-12">
            <div class="m-auto w-100">
              <div></div>
              <p class="title-mix">See all</p>
              <no-ssr>
                <isotope class="mix-grid" ref="projects" :list="projects" :options="{}">
                  <div
                    class="text-white thumbnail "
                    v-for="(item, index) in projects"
                    :key="'projects-'+index"
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
                            v-bind:key="'item-'+index"
                          >
                            {{ item.pricing.currency_symbol }}
                            {{ price.current_price }}
                            {{ item.pricing.currency_code }} /
                            {{ price.price_type_name }}
                          </p>
                          <div class="txt-star">
                            <NuxtLink
                              :to="localePath('/attractions/' + item.product_id)"
                              >{{ $t('moreInfo') }}</NuxtLink
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
      backImage:'/banner.png',
      overlay:true,
      projects: []
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
    async getProductsByTag(tag) {
      let res = await this.$axios.post("products/list", {
        tag: tag
      });

      console.log(res);

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

      if(config.data.overlay){
        if(process.browser){
          
          localStorage.setItem("overlay", config.data.overlay)
          
        }
      }

      
      
    }
  },
  created() {
    this.getTags();
    this.getAllProducts();
    this.getConfig()
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
    /* display: grid;
  grid-template-columns: 1fr 1fr 1fr;*/
    display: flex;
    flex-wrap: wrap;
    grid-gap: 3rem;
    text-align: start;
    & .item {
      position: relative !important;
      left: auto !important;
      top: 0 !important;
      box-shadow: 0px 2px 10px #00000040;
      border-radius: 15px;
      text-align: start;
      width: 30%;
      @include respond-to(xs) {
        width: 100%;
        margin: 10px;
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
      font-weight: 400;
      color: #ef1856;
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
}
</style>
