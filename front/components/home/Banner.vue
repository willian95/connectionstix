<template>
  <div class="banner">
    <img class="background" src="~assets/images/banner.png" alt="" />
    <div class="banner__content">
      <img src="~assets/images/logo_color.png" alt="" />
      <h2>Book now!</h2>
      <p>$15 CAD/Person</p>
      <span> < 5 years kids/Free of charge*</span>
      <!------------------------------------>
      <v-container class="content-choose">
        <v-row no-gutters>
          <v-col class="d-flex" cols="12" sm="4">
            <label for="">Choose country</label>
            <v-select :items="country" label="US" solo></v-select>
          </v-col>

          <v-col class="d-flex" cols="12" sm="4">
            <label for="">Choose state/province</label>
            <v-select :items="state" label="Florida" solo></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="4">
            <label for="">Choose city</label>
            <v-select :items="city" label="Tampa" solo></v-select>
          </v-col>
        </v-row>
        <div class="center">
          <a class="btn">
            Go
          </a>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    country: ["US", "US"],
    state: ["Florida", "Florida"],
    city: ["Tampa", "Tampa"]
  })
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
