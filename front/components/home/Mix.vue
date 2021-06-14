<!--<template>
      <div class="container mt-12">
        <div class="row">
          <div class="col-md-4 py-5">
            <ul class="list-unstyled mb-0">
              <li class="mb-3" v-for="(val, key) in option.getFilterData">
                <div
                  class="cursore-pointer"
                  :class="[
                    key === filterOption ? 'text-success' : 'text-white',
                  ]"
                  @click="filter(key)"
                >
                  {{ key }}
                </div>
              </li>
            </ul>
          </div>
          <div class="col-md-8 d-flex">
            <div class="m-auto w-100">
              <no-ssr>
                <isotope ref="projects" :options="option" :list="projects">
                  <div
                    class="text-white thumbnail"
                    v-for="(item, index) in projects"
                    :key="index"
                  >
                    <div class="cursore-pointer d-block pos-r p-1">
                      <img
                        class="w-100"
                        :src="require(`./assets/images/${item.thumbnail}`)"
                      />
                      <div
                        class="pin pin-xy d-flex text-white thumbnail-overlay"
                      >
                        <div class="m-auto fs-16 text-center">
                          {{ item.title }}
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
</template>

<script>


export default defineComponent({
 data() {
    return {
      filterOption: "See All",

      option: {
        getFilterData: {
          "See All"() {
            return true;
          },
          "Production Hop on/ Hop off"(itemElem) {
            return itemElem.categories
              .map((x) => x === "Hop on/ Hop off")
              .includes(true);
          },
          "Boat tours"(itemElem) {
            return itemElem.categories
              .map((x) => x === "Boat tours")
              .includes(true);
          },
          "Outdoors & adventures"(itemElem) {
            return itemElem.categories
              .map((x) => x === "Outdoors & adventures")
              .includes(true);
          },
          "Scheduled city tours"(itemElem) {
            return itemElem.categories
              .map((x) => x === "Scheduled city tours")
              .includes(true);
          },
          "Museums & theme parks"(itemElem) {
            return itemElem.categories
              .map((x) => x === "Museums & theme parks")
              .includes(true);
          },
        },
      },

      projects: [
        {
          title: "Niagara falls",
          thumbnail: "banner.png",
          categories: ["Production Hop on/ Hop off", "Scheduled city tours"],
        },
        {
          title: "The night trip",
          thumbnail: "banner.png",
          categories: ["Boat tours"],
        },
        {
          title: "the eater boat",
          thumbnail: "banner.png",
          categories: ["Hop on/ Hop off"],
        },
        {
          title: "The night trip",
          thumbnail: "banner.png",
          categories: ["Outdoors & adventures"],
        },
      ],
    };
  },

  methods: {
    filter(key) {
      if (this.filterOption !== key) {
        this.$refs.projects.filter(key);
        this.filterOption = key;
      }
    },
  },

})
</script>
--------->