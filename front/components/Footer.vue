<template>
  <footer class="" id="footer">
    <client-only>
      <div class="row ">
        <div class="container">
          <div class="content-footer">
            <div class="center">
              <img class="brand" :src="footerLogo" alt="" />
            </div>
            <div class="flex-footer">
              <ul>
                <li>
                  <NuxtLink class="nav-link" to="">{{
                    $t("ourCompany")
                  }}</NuxtLink>
                </li>
                <li>
                  <NuxtLink class="nav-link line-decorate" to=""
                    ><strong>{{ $t("termConditions") }}</strong></NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink class="nav-link line-decorate" to=""
                    ><strong>{{ $t("privacyPolicy") }}</strong></NuxtLink
                  >
                </li>
              </ul>

              <ul>
                <li>
                  <NuxtLink class="nav-link" to="">{{
                    $t("contactUs")
                  }}</NuxtLink>
                </li>
                <li>
                  <NuxtLink class="nav-link line-decorate" to=""
                    ><strong>{{ $t("helpSupport") }}</strong></NuxtLink
                  >
                </li>
              </ul>

              <ul>
                <li>
                  <NuxtLink class="nav-link" to="">{{
                    $t("stayConnect")
                  }}</NuxtLink>
                </li>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="135"
                    height="21.401"
                    viewBox="0 0 135 21.401"
                  >
                    <g
                      id="Grupo_381"
                      data-name="Grupo 381"
                      transform="translate(-2098.368 -3844.824)"
                    >
                      <g id="Grupo_380" data-name="Grupo 380">
                        <g id="Grupo_375" data-name="Grupo 375">
                          <g id="Grupo_374" data-name="Grupo 374">
                            <g id="Grupo_372" data-name="Grupo 372">
                              <path
                                id="Trazado_374"
                                data-name="Trazado 374"
                                d="M2144.5,3855.607v10.139a.264.264,0,0,0,.264.264h3.765a.264.264,0,0,0,.264-.264v-10.3h2.73a.264.264,0,0,0,.263-.242l.262-3.1a.263.263,0,0,0-.263-.286h-2.992v-2.2a.935.935,0,0,1,.935-.934h2.1a.264.264,0,0,0,.264-.265v-3.1a.264.264,0,0,0-.264-.264h-3.554a3.777,3.777,0,0,0-3.777,3.777v2.993h-1.883a.264.264,0,0,0-.264.264v3.1a.264.264,0,0,0,.264.264h1.883Z"
                                fill="#fff"
                                fill-rule="evenodd"
                              />
                            </g>
                            <g id="Grupo_373" data-name="Grupo 373">
                              <path
                                id="Trazado_375"
                                data-name="Trazado 375"
                                d="M2196.442,3848.923a8.9,8.9,0,0,1-2.176.615c.347-.058.846-.686,1.05-.94a3.94,3.94,0,0,0,.712-1.306c.018-.037.029-.084-.008-.112a.127.127,0,0,0-.116.01,11.009,11.009,0,0,1-2.557.979.173.173,0,0,1-.177-.047,2.037,2.037,0,0,0-.224-.229,4.513,4.513,0,0,0-1.239-.759,4.313,4.313,0,0,0-1.9-.306,4.547,4.547,0,0,0-1.8.509,4.657,4.657,0,0,0-1.455,1.188,4.472,4.472,0,0,0-.868,1.739,4.715,4.715,0,0,0-.046,1.837c.014.1.005.116-.088.1a13.655,13.655,0,0,1-8.788-4.472c-.1-.117-.158-.117-.242.008a4.456,4.456,0,0,0,.76,5.265,7.17,7.17,0,0,0,.54.476,4.481,4.481,0,0,1-1.7-.476c-.1-.064-.154-.027-.163.089a2.647,2.647,0,0,0,.028.5,4.5,4.5,0,0,0,2.777,3.592,2.691,2.691,0,0,0,.563.172,5.018,5.018,0,0,1-1.663.051c-.121-.023-.168.038-.121.154a4.676,4.676,0,0,0,3.494,2.926c.159.028.317.028.476.065-.01.014-.019.014-.028.028a5.54,5.54,0,0,1-2.387,1.265,8.54,8.54,0,0,1-3.624.464c-.2-.029-.236-.027-.289,0s-.006.079.056.13c.247.163.5.308.755.448a12.03,12.03,0,0,0,2.423.969,12.9,12.9,0,0,0,12.527-2.929c2.567-2.551,3.467-6.069,3.467-9.591,0-.138.163-.214.26-.286a8.653,8.653,0,0,0,1.744-1.774.687.687,0,0,0,.152-.339v-.019C2196.569,3848.867,2196.529,3848.884,2196.442,3848.923Z"
                                fill="#fff"
                              />
                            </g>
                          </g>
                        </g>
                        <g id="Grupo_377" data-name="Grupo 377">
                          <g id="Grupo_376" data-name="Grupo 376">
                            <path
                              id="Trazado_376"
                              data-name="Trazado 376"
                              d="M2115.975,3849.808a1.242,1.242,0,1,1-1.241-1.241A1.242,1.242,0,0,1,2115.975,3849.808Zm-1.546,5.566a5.214,5.214,0,1,1-5.214-5.215A5.221,5.221,0,0,1,2114.429,3855.374Zm-1.874,0a3.34,3.34,0,1,0-3.34,3.34A3.345,3.345,0,0,0,2112.555,3855.374Zm7.214-4.19a6.36,6.36,0,0,0-6.36-6.36h-8.68a6.361,6.361,0,0,0-6.361,6.36v8.68a6.361,6.361,0,0,0,6.361,6.361h8.68a6.36,6.36,0,0,0,6.36-6.361Zm-2.088,8.585a4.368,4.368,0,0,1-4.368,4.368h-8.488a4.369,4.369,0,0,1-4.369-4.368v-8.489a4.369,4.369,0,0,1,4.369-4.368h8.488a4.368,4.368,0,0,1,4.368,4.368Z"
                              fill="#fff"
                            />
                          </g>
                        </g>
                        <g id="Grupo_379" data-name="Grupo 379">
                          <g id="Grupo_378" data-name="Grupo 378">
                            <path
                              id="Trazado_377"
                              data-name="Trazado 377"
                              d="M2233.368,3853.108a4.279,4.279,0,0,0-4.279-4.279h-11.013a4.279,4.279,0,0,0-4.279,4.279v4.833a4.279,4.279,0,0,0,4.279,4.279h11.013a4.279,4.279,0,0,0,4.279-4.279Zm-6.056,2.543-4.925,2.428c-.192.1-.864-.035-.864-.254v-4.983c0-.222.677-.361.869-.251l4.707,2.555C2227.3,3855.259,2227.512,3855.544,2227.312,3855.651Z"
                              fill="#fff"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              </ul>
            </div>
          </div>

          <div class="col-md-12">
            <v-card-text class="py-2 white--text text-center last">
              <strong>
                Connections TIX Inc Copyright © {{ $t("allRightsReserved") }}
                {{ new Date().getFullYear() }}</strong
              >
            </v-card-text>
          </div>
        </div>
      </div>
    </client-only>
  </footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-instagram", "mdi-facebook", "mdi-twitter", "mdi-linkedin"],
    footerLogo: "",
  }),
  methods: {
    async getLogo() {
      if (process.browser) {
        this.footerLogo = window.localStorage.getItem("footerLogo");
      }
    }
  },
  mounted() {
    this.getLogo();
    if (process.browser) {
      let color = localStorage.getItem("color");
      if (color) {
        document.getElementById("footer").style.background = color;
      }
    }
  }
};
</script>
<style lang="scss">
footer {
  background: #ef1856;
margin-top: 3rem;
  & img {
    width: 200px;
    height: 100%;
  }
  ul {
    list-style: none;

    color: #fff;

    @include respond-to(xs) {
      width: 50%;

      &:nth-child(3) {
        width: 100%;
        text-align: center;
        margin-top: 3rem;
      }
    }

    @include respond-to(sm) {
      width: 30%;

      &:nth-child(3) {
        width: 33%;

        margin-top: 0;
      }
    }
  }
  li {
    padding-right: 9rem;
    @include respond-to(xs) {
      padding-right: 2rem;
      padding-left: 2rem;
    }
  }
  a {
    color: #fff;
    text-decoration-line: none;
  }
  .flex-footer {
    display: inline-flex;
    margin-top: 3rem;
    @include respond-to(xs) {
      display: flex;

      flex-wrap: wrap;
    }
  }

  strong {
    font-weight: 500;
  }
  .last {
    text-align: center;
    color: #fff;
    font-size: 1rem;
    border-top: 2px solid #fff;
    margin-top: 5rem;
    @include respond-to(xs) {
      margin-top: 1rem;
    }
  }
  @include respond-to(xs) {
    .center {
      text-align: center;
    }
  }
}
</style>
