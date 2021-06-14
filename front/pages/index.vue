<template>
  <div class="" id="app" data-app>
    <div>
        <Navbar />
      <!---    <Logo />-->
      <Banner />
      <div class="content-mix mt-12">
        <div class="row">
          <div class="col-md-12 ">
            <ul class="list-unstyled mb-0">
              <li class="mb-3" v-for="(val, key) in option.getFilterData">
                <div>
                     <svg xmlns="http://www.w3.org/2000/svg" width="30.5" height="30.5" viewBox="0 0 30.5 30.5">
                      <g id="Grupo_418" data-name="Grupo 418" transform="translate(-238.833 -1228.035)">
                        <rect id="Rectángulo_161" data-name="Rectángulo 161" width="12.856" height="12.856" rx="3" transform="translate(238.833 1228.035)" fill="#ef1856"/>
                        <rect id="Rectángulo_162" data-name="Rectángulo 162" width="12.856" height="12.856" rx="3" transform="translate(255.977 1228.035)" fill="#ef1856"/>
                        <rect id="Rectángulo_163" data-name="Rectángulo 163" width="12.856" height="12.856" rx="3" transform="translate(238.833 1245.179)" fill="#ef1856"/>
                        <rect id="Rectángulo_164" data-name="Rectángulo 164" width="12.856" height="12.856" rx="3" transform="translate(255.977 1245.179)" fill="none" stroke="#ef1856" stroke-miterlimit="10" stroke-width="1"/>
                      </g>
                  </svg>
                </div>
                <div
                  class="cursore-pointer"
                  :class="[
                    key === filterOption ? 'text-success' : 'text-white'
                  ]"
                  @click="filter(key)"
                >
                  {{ key }}
                </div>
              </li>
            </ul>
          </div>
          <div class="col-md-12">
            <div class="m-auto w-100">
              <div>
            

              </div>
              <p class="title-mix">See all</p>
              <no-ssr>
                <isotope
                  class="mix-grid"
                  ref="projects"
                  :options="option"
                  :list="projects"
                >
                  <div
                    class="text-white thumbnail "
                    v-for="(item, index) in projects"
                    :key="index"
                  >
                    <div class="cursore-pointer d-block pos-r p-1">
                      <img
                        class="w-100"
                        :src="require(`../assets/images/${item.thumbnail}`)"
                      />
                      <div
                        class="pin pin-xy d-flex text-white thumbnail-overlay  text-mix"
                      >
                        <div class="m-auto fs-16 star-txt ">
                          <h3>{{ item.title }}</h3>
                          <p>{{ item.description }}</p>
                          <div class="txt-star">
                            <NuxtLink class="" :to="{ path: '/attraction' }"
                              >More info</NuxtLink
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

      option: {
        getFilterData: {
          "See All"() {
            return true;
          },
          " Hop on/ Hop off"(itemElem) {
            return itemElem.categories
              .map(x => x === "Hop on/ Hop off")
              .includes(true);
          },
          "Boat tours"(itemElem) {
            return itemElem.categories
              .map(x => x === "Boat tours")
              .includes(true);
          },
          "Outdoors & adventures"(itemElem) {
            return itemElem.categories
              .map(x => x === "Outdoors & adventures")
              .includes(true);
          },
          "Scheduled city tours"(itemElem) {
            return itemElem.categories
              .map(x => x === "Scheduled city tours")
              .includes(true);
          },
          "Museums & theme parks"(itemElem) {
            return itemElem.categories
              .map(x => x === "Museums & theme parks")
              .includes(true);
          }
        }
      },

      projects: [
        {
          title: "Niagara falls",
          thumbnail: "banner.png",
          description: "$45 Cad/Person",
          categories: [" Hop on/ Hop off", "Scheduled city tours"]
        },
        {
          title: "The night trip",
          thumbnail: "banner.png",
          description: "$27 Cad/Person",
          categories: ["Boat tours"]
        },
        {
          title: "the eater boat",
          thumbnail: "banner.png",
          description: "$38 Cad/Person",
          categories: ["Hop on/ Hop off"]
        },
        {
          title: "The night trip",
          thumbnail: "banner.png",
          description: "$45 Cad/Person",
          categories: ["Outdoors & adventures"]
        }
      ]
    };
  },

  methods: {
    filter(key) {
      if (this.filterOption !== key) {
        this.$refs.projects.filter(key);
        this.filterOption = key;
      }
    }
  }
};
</script>

<style  lang="scss">
.content-mix {
  padding: 0 10rem;
  margin-bottom: 12rem;
    @include respond-to(xs) {
  padding: 0 0;
         margin-bottom: 20rem;
    }

  & ul {
    list-style: none;
    display: flex;
    text-align: center;
    width: 100%;
        @include respond-to(xs) {
    display: inline-flex;
    overflow: scroll;
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
    font-size: .8rem;
    min-width: 80px;
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
    & h3,p {
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
  .text-success{
    color: #ef1856;
    border-bottom: 1px solid #ef1856;
  }
}
</style>
