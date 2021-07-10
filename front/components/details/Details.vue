<template>
  <v-container class="grey lighten-5 custom-details">
    <v-row no-gutters>
      <v-col cols="12" sm="4" md="4">
        <v-card class="pa-2 book-shadows mb-2" outlined tile>
          <div id="open-modal" :class="'modal-window open-modal ' + modalClass">
            <div class="modal-table">
  
                <table style="width: 100%">
                <thead>
                  <tr>
                    <th class="th-start">{{ $t("fromDatetime") }}</th>
                    <th class="th-start">{{ $t("toDatetime") }}</th>
                  </tr>
                </thead>
                <tbody>
                         <div class="content-tables">
                  <tr
                    v-for="(date, index) in availableDates"
                    :key="'date-' + index"
                  >
                    <td class="td-flex">
                      <v-radio-group
                        v-model="selectedAvailableDate"
                        name="rowSelector"
                      >
                        <v-radio :value="index" />
                      </v-radio-group>
                      {{ dateString(date.from_datetime) }}
                    </td>
                    <td>{{ dateString(date.to_datetime) }}</td>
                  </tr>
                         </div>
                </tbody>
              </table>
        

              <button
                title="Close"
                class="modal-close"
                @click="closeDatesModal()"
              >
                x
              </button>
              <div class="btn-modal">
                <button class="btn" @click="chooseDate()">
                  {{ $t("chooseDate") }}
                </button>
              </div>
            </div>
          </div>

          <div>
            <div class="flex" v-if="checkAvailability">
              <client-only>
                <div class="date-custom">
                  <img src="~assets/images/iconos/calendar.png" alt="" />
                  <date-picker
                    placeholder="MM/DD/YYYY"
                    format="MM/dd/yyyy"
                    v-model="date_today"
                  />
                </div>

                <!--<div class="date-custom">
                  <img src="~assets/images/iconos/calendar.png" alt="" />
                  <date-picker
                    placeholder="MM/DD/YYYY"
                    format="MM/dd/yyyy"
                    v-model="next_date"
                  />
                </div>-->
              </client-only>
            </div>

            <div
              class="main-min"
              v-for="(price, index) in pricing.prices"
              :key="'price-' + index"
            >
              <div class="flex">
                <p>
                  {{ price.price_type_name }} {{ pricing.currency_symbol }}
                  {{ currencyFormatDE(price.current_price) }}
                </p>
                <small
                  >(<span v-if="price.age.minimum"
                    >min: {{ price.age.minimum }} {{ price.age.unit }}</span
                  >
                  <span v-if="price.age.maximum"
                    >max: {{ price.age.maximum }} {{ price.age.unit }}</span
                  >)</small
                >
              </div>
              <div class="content-mx">
                <div
                  class="style-btn change-color"
                  @click="substract(price.price_type_id)"
                >
                  -
                </div>
                <p v-if="prices.length > 0">{{ prices[index].amount }}</p>
                <div
                  class="style-btn change-color"
                  @click="add(price.price_type_id, price.current_price)"
                >
                  +
                </div>
              </div>
            </div>
          </div>

          <div class="main-book">
            <div class="main-price">
              <p><strong>Total </strong></p>
              <p>
                <strong
                  >{{ pricing.currency_symbol }} {{ currencyFormatDE(total) }}
                  {{ pricing.currency_code }}</strong
                >
              </p>
            </div>
            <button
              v-show="onLoadingBook == false"
              :disabled="total <= 0"
              class="btn change-color change-font-color"
              @click="bookNow()"
            >
              {{ $t("bookNow") }}
            </button>
            <v-progress-circular
              v-show="onLoadingBook == true"
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" md="8">
        <v-card class="pa-2 card-shadows" outlined tile>
          <h3 class="title-custom">{{ title }}</h3>
          
          <h3 class="title-custom" v-if="address != '  '">
            {{ $t("attractionAddress") }}
          </h3>
          <p>{{ address }}</p>

          <v-row class="mt-1">
            <v-col class="line" cols="6" md="6">
              <h3 class="title-custom">{{ $t("openingHours") }}</h3>

              <table class="table" v-for="(openingHour, index) in operationHours" :key="'open-' + index">
                <tr>
                  <td style="width: 120px;"><strong>{{ openingHour.day }}:</strong></td>
                  <td>
                    <span
                      v-if="openingHour.open == null && openingHour.close == null"
                      >{{ $t("closedAllDay") }}</span
                    >
                    <span v-else>
                      {{ hourString(openingHour.open) }} to {{ hourString(openingHour.close) }}
                    </span>
                  </td>
                </tr>

              </table>
            </v-col>
            <v-col cols="6" md="6" v-if="duration.length">
              <h3 class="title-custom">{{ $t("duration") }}</h3>

              <p>{{ duration.length }} {{ duration.unit }}</p>

              <!--<h3 class="title-custom mt2">Minimum height & age</h3>
              <ul>
                <li>5,6 - 1,70 CM</li>
                <li>8 years ></li>
              </ul>-->
            </v-col>
          </v-row>
          <div class="descripon">
            <h3 class="title-custom" v-if="description">
              {{ $t("description") }}
            </h3>
            <p v-if="description">
              {{ description }}
            </p>

            <h3 class="title-custom mt4" v-if="highlights.length > 0">
              {{ $t("hightlights") }}
            </h3>
            <ul class="highlight">
              <li
                v-for="(highlight, index) in highlights"
                :key="'highlight-' + index"
              >
                {{ highlight }}
              </li>
            </ul>

            <div>
              <h3 class="title-custom mt4">{{ $t("knowBefore") }}</h3>
              <div class="know-info">
                <div
                  class="item"
                  v-for="(inclusion, index) in inclusions"
                  :key="'inclusion-' + index"
                >
                  <div>
                  
                    <p>{{ inclusion }}:</p>
                  </div>
                  <img src="~assets/images/iconos/check.png" alt="" />
                </div>
                <div
                  class="item"
                  v-for="(exclusion, index) in exclusions"
                  :key="'exclusion-' + index"
                >
                  <div>
              
                    <p>{{ exclusion }}:</p>
                  </div>
                  <img src="~assets/images/iconos/nocheck.png" alt="" />
                </div>
              </div>
              <div class="know-info">
                <div
                  class="item"
                  v-for="(know, index) in knowBeforeYouGoChecklist"
                  :key="'know-' + index"
                >
                  <div>
                    <img :src="know.icon" alt="" />
                    <p>{{ know.label }}</p>
                  </div>
                  <img src="~assets/images/iconos/check.png" alt="" v-if="know.value" />
                  <img src="~assets/images/iconos/nocheck.png" alt="" v-else />
                </div>
              </div>

              <ul>
                <li
                  v-for="(optional, index) in knowBeforeYouGoOptional"
                  :key="'optional-' + index"
                >
                  {{ optional }}
                </li>
              </ul>
            </div>

            <h3 class="title-custom mt4" v-if="cancellationPolicy">{{ $t("cancellationPolicy") }}</h3>
            <p>
              {{ cancellationPolicy }}
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: [
    "description",
    "title",
    "highlights",
    "inclusions",
    "exclusions",
    "knowBeforeYouGoChecklist",
    "knowBeforeYouGoOptional",
    "cancellationPolicy",
    "operationHours",
    "duration",
    "address",
    "checkAvailability",
    "nextDateAvailable",
    "pricing",
    "productId"
  ],
  data() {
    return {
      prices: [],
      priceTypes: [],
      total: 0,
      date_today: new Date(),
      next_date: "",
      modalClass: "custom-modal-close",
      selectedAvailableDate: "",
      fromDate: "",
      toDate: "",
      onLoadingBook: false,
      headers: [
        { text: "From", value: "from_datetime", sortable: false },
        { text: "To", value: "to_datetime", sortable: false }
      ],
      availableDates: []
    };
  },
  methods: {
    add(priceTypeId, price) {
      let res = this.checkDuplicate(priceTypeId, price);

      if (res.exists == true) {
        if((this.prices[res.priceIndex].amount + 1) <= process.env.MAX_AMOUNT){
          this.prices[res.priceIndex].amount = this.prices[res.priceIndex].amount + 1;
        }
        
      }

      this.getTotal();
    },
    currencyFormatDE(num) {
      return (
          num
          .toFixed(2) // always two decimal digits
          .replace('.', ',') // replace decimal point character with ,
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      ) // use . as a separator
    },
    chooseDate() {
      if (this.selectedAvailableDate >= 0) {
        this.closeDatesModal();
        this.fromDate = this.availableDates[
          this.selectedAvailableDate
        ].from_datetime;
        this.toDate = this.availableDates[
          this.selectedAvailableDate
        ].to_datetime;
        this.getLocalStorageOrders();
      } else {
        this.$swal({
          text: this.$t("youHaveToChooseDate"),
          icon: "error"
        });
      }
    },
    showDatesModal() {
      this.modalClass = "custom-modal-open";
    },
    closeDatesModal() {
      this.modalClass = "custom-modal-close";
      this.onLoadingBook = false;
    },
    substract(priceTypeId) {
      let res = this.checkDuplicate(priceTypeId);

      if (res.exists == true) {
        if (this.prices[res.priceIndex].amount > 0) {
          this.prices[res.priceIndex].amount =
            this.prices[res.priceIndex].amount - 1;
        }
      }

      this.getTotal();
    },
    checkDuplicate(priceTypeId) {
      let exists = false;
      let priceIndex = 0;
      this.prices.forEach((data, index) => {
        if (data.priceTypeId == priceTypeId) {
          exists = true;
          priceIndex = index;
        }
      });

      return { exists, priceIndex };
    },
    showAmount(priceTypeId) {
      var sum = 0;
      this.prices.forEach(data => {
        if (data.priceTypeId == priceTypeId) {
          sum = sum + data.amount;
        }
      });

      return sum;
    },
    async getCartCount(order) {
      let res = await this.$axios.get("orders/item-count/" + order);
      return res.data.data.number_of_items;
    },
    getTotal() {
      this.total = 0;
      this.prices.forEach(data => {
        this.total += data.amount * data.price;
      });
    },
    bookNow() {
      this.onLoadingBook = true;
      if (this.checkAvailability == true) {
        this.availabilityCheck();
      } else {
        this.getLocalStorageOrders();
      }
    },
    async availabilityCheck() {
      this.formatPriceTypes();

      let res = await this.$axios.post("products/availability", {
        id: this.productId,
        from_date: this.date_today,
        to_date: this.next_date,
        price_types: this.priceTypes
      });

      if (res.data.status) {
        if (res.data.status.result_messages[0] != "OK") {
          this.onLoadingBook = false;
          this.$swal({
            text: res.data.status.result_messages[0],
            icon: "error"
          });
        } else {
          this.availableDates = res.data.data.availability;
          this.showDatesModal();
        }
      }
    },
    async getLocalStorageOrders() {
      if (process.browser) {
        let order = window.localStorage.getItem("orders");
        if (order == null) {
          order = await this.storeOrder();
        }

        await this.addItem(order);
        this.onLoadingBook = false;
      }
    },
    async storeOrder() {
      let res = await this.$axios.post("orders/create");
      window.localStorage.setItem("orders", res.data.order_number);
      return res.data.order_number;
    },
    async addItem(order) {
      this.formatPriceTypes();

      let res = await this.$axios.post("orders/add-item", {
        request_number: order,
        product_id: this.productId,
        price_types: this.priceTypes,
        from_datetime: this.fromDate,
        to_datetime: this.toDate
      });

      if (res.data.status.result_messages[0] == "OK") {
        let numberItems = await this.getCartCount(order);
        await this.$store.dispatch("storeCartAmount", { amount: numberItems });

        this.$swal({
          text: this.$t("productBooked"),
          icon: "success"
        }).then(ans => {
          this.prices.forEach((data, index) => {
            this.prices[index].amount = 0;
          });

          this.$router.push(this.localePath({ name: "checkout" }));
        });
      } else {
        if (res.data.status.result_code == 1000) {
          window.localStorage.removeItem("orders");
          this.getLocalStorageOrders();
        } else {
          this.$swal({
            text: res.data.status.result_messages[0],
            icon: "error"
          });
        }
      }
    },
    formatPriceTypes() {
      this.priceTypes = [];
      this.prices.forEach(data => {
        if (data.amount > 0) {
          this.priceTypes.push({
            price_type_id: data.priceTypeId,
            quantity: data.amount
          });
        }
      });
    },
    dateString(date){

      let year = date.substring(0, 4)
      let month = date.substring(5, 7)
      let day = date.substring(8, 10)

      if(this.$i18n.locale == "en"){
        return month+"-"+day+"-"+year
      }else{  
        return day+"-"+month+"-"+year
      }
      

    },
    hourString(hour){

      let timeArray = hour.split(":")
      
      let hourPart = parseInt(timeArray[0])
      let minutePart = timeArray[1]


      let meridian = "am"

      if(parseInt(hourPart) > 12){
        meridian = "pm"
        hourPart = parseInt(hourPart) - 12
        
      }

      else if(parseInt(hourPart) == "00"){
        meridian = "am"
        hourPart = 12
      }

      
      hourPart = hourPart < 10 ? "0"+hourPart : hourPart
      
      return hourPart + ":" + minutePart + " " + meridian
      

    }
  },
  watch: {
    pricing: function(newVal, oldVal) {
      newVal.prices.forEach(data => {
        this.prices.push({
          priceTypeId: data.price_type_id,
          amount: 0,
          price: data.current_price
        });
      });

      setTimeout(() => {
        if (process.browser) {
          let color = localStorage.getItem("color");
          let textColor = localStorage.getItem("textColor");

          if (color) {
            $(".change-color").css("background", color);
          }

          if(textColor){
            $(".change-font-color").css("color", textColor);
          }

        }
      }, 1000);
    },
    nextDateAvailable: function(newVal, oldVal) {
      this.next_date = newVal;
    }
  },
  mounted() {
    
    if (process.browser) {
    
      let color = localStorage.getItem("color");

      if (color) {
        $(".change-color").css("background", color);
      }

    }
  }
};
</script>

<style lang="scss">
.content-tables{
      height: 35vh;
    overflow-x: hidden;
}
.custom-details {
  .title-custom {
    font-size: 1.6rem;
  }

  .custom-ubication {
    display: inline-flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 1rem 0px 3rem;

    .map {
      width: 300px;
      height: 100%;
      @include respond-to(xs) {
        width: 150px;
      }
    }

    div {
      margin-left: 4rem;
      @include respond-to(xs) {
        margin-left: 0rem;
      }

      ul {
        list-style: none;
 @include respond-to(xs) {
display: flex;
 }
        img {
          width: 100px;
          height: 100%;
          object-fit: contain;
          @include respond-to(xs) {
            width: 65px;
          }
        }
      }
    }
  }

  ul {
    list-style: none;
  }

  p {
    font-size: 1.1rem;
    @include respond-to(xs) {
      font-size: 0.8rem;
    }
  }

  .line::before {
    content: "";
    position: absolute;
    border-right: 2px solid #00000014;
    height: 200px;
    right: 53%;
  }

  .vdp-datepicker .day-heder{
    font-size: 12px;
  }

  .mt-1 {
    margin: 1rem 0;

    .col-md-6 {
      padding-left: 0;
      span {
        font-weight: 400;
      }
    }

    li {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .mt2 {
      margin-top: 2rem;
    }
  }

  .know-info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 1.2rem 0;
    margin-bottom: 2rem;
    grid-gap: 1.5rem 12rem;
    max-width: 90%;
    @include respond-to(xs) {
      grid-gap: 1.5rem 2.5rem;
    }

    img {
      width: 35px;
      height: 35px;
      object-fit: contain;
      @include respond-to(xs) {
        width: 25px;
        height: 25px;
      }
    }

    .item {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;

      p {
        margin-bottom: 0;
        margin-left: 1rem;
      }

      div {
        display: inline-flex;
      }
    }
  }

  .icon-question {
    width: 50px;
    height: 50px;
  }

  .info-icon_a {
    max-width: 33rem;
    margin-bottom: 3rem;

    a {
      display: flex;
      color: #000;
      align-items: center;

      svg {
        margin-right: 13px;
      }
    }
  }

  .icon-map {
    width: 71px !important;
    height: 100px !important;
    margin-left: 2rem;
    @include respond-to(xs) {
      width: 40px !important;
    }
  }

  .main-min {
    display: grid;
    margin-bottom: 2rem;
    grid-template-columns: 1fr 1fr;
        font-weight: 700;
.flex{
      align-items: start;
}
    @include respond-to(xs) {
      padding: 20px;
      margin-bottom: 0;
    }
@include respond-to(sm) {
padding: 3px;
}
    img {
      width: 25px;
      height: 27px;
      object-fit: contain;
      margin-right: 10px;
    }

    .content-mx {
      display: flex;
      margin-left: 1.4rem;
     
      @include respond-to(sm) {
        gap: 0rem;
      }
@include respond-to(md) {
     gap: 0rem;
}
      p {
        margin: 0 0.8rem;
      }

      .style-btn {
        background: #ef1856;
        border-radius: 18%;
        height: 21px;
        width: 20px;
        color: #fff;
        font-size: 1.2rem;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }

  .book-shadows {
    box-shadow: 0px 0px 8px #00000033;
    max-width: 360px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2rem;
    .main-book {
      line-height: 0;
      text-align: center;
      position: relative;
      margin-top: 1rem;
      &::before {
        content: "";
        position: absolute;
        border-top: 1px solid #00000026;
        width: 150%;
        left: -2rem;
        top: -19px;
      }
      .btn {
        margin-top: 1rem;
        padding: 17px 37px;
        width: 100%;
        text-decoration: none;
      }
    }
  }
  .main-price {
    display: flex;
    justify-content: space-between;
    width: 200px;
    margin-bottom: 1.3rem;
    @include respond-to(xs) {
      width: auto;
    }
  }
  .mb-2 {
    margin-bottom: 2rem;
  }

  .mt4{
    margin-top: 4rem;
  }

  /**********modal**********/
  .interior {
    margin-bottom: 2rem;
  }
  .modal-window {
    position: fixed;
    background-color: rgb(0 0 0 / 57%);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    transition: all 0.3s;
  }
  .modal-window:target {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
  }
  .modal-window .modal-table {
    width: 700px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em;
    background: white;
    padding-top: 4rem;
    @include respond-to(xs) {
      width: 100%;
    }
  }
  .modal-window header {
    font-weight: bold;
  }
  .modal-window h1 {
    font-size: 150%;
    margin: 0 0 15px;
  }

  .modal-close {
    color: #7d7d7d;
    line-height: 50px;
    font-size: 1.5rem;
    position: absolute;
    top: 0;
    width: auto;
    text-decoration: none;
    right: 29px;
  }
  .modal-close:hover {
    color: black;
  }

  .modal-window > div {
    border-radius: 1rem;
  }

  .modal-window div:not(:last-of-type) {
    margin-bottom: 15px;
  }

  .theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > thead
    > tr:last-child
    > th {
    color: #ffff;
    font-size: 1.2rem;
  }
  .v-data-table-header {
    background: #ef1856;
    color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .text-start:nth-child(1) {
      opacity: 0;
    }
  }
  .v-data-footer {
    display: none;
  }
  .theme--light.v-data-table {
    border: 1px solid #00000017;
  }

  .theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > td:not(.v-data-table__mobile-row),
  .theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > th:not(.v-data-table__mobile-row) {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    border-bottom: 0;
    color: #000;
    font-size: 1.2rem;
  }
}

.date-custom {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  border: 1px solid rgba(6, 6, 6, 0.32157);
  border-radius: 7px;
  text-align: center;

  padding: 0.4rem 0;
  padding: 8px 1rem;
  align-items: center;
     @include respond-to(sm) {
font-size: .7rem;
     }
  & input {
    /*border: 1px solid #06060652;*/
    border-radius: 7px;
    text-align: center;
    max-width: 150px;
  }
  img {
    width: 27px;
    margin-right: -15px;
      @include respond-to(sm) {
    width: 20px;
      }
  }
}
.flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
     @include respond-to(xs) {
 margin-bottom: 1rem;
  p{
                font-size: .7rem;
          }
     }
        @include respond-to(sm) {
          p{
                font-size: .7rem;
          }
      }
}
.modal-table {
  max-height: 400px;
  overflow: auto;
  height: 500px;
  .td-flex {
    display: flex;
    align-items: center;
    height: 4rem;
    @include respond-to(xs) {
      font-size: 0.8rem;
    }
  }
  .v-input--selection-controls {
    margin-top: 24px;

    margin-right: 18px;
  }
  tr {
    display: flex;
    justify-content: space-around;
        align-items: center;
    @include respond-to(xs) {
      display: revert;

      font-size: 0.8rem;
    }
  }
  thead {
    background: #ef1856;
    color: #fff;
    border-top-right-radius: 10px;
  }
}
.custom-modal-open {
  visibility: visible;
  opacity: 1;
}

.custom-modal-close {
  display: none;
}
.th-start {
  text-align: start;
}
.btn-modal {
  position: fixed;
  bottom: 1rem;
  left: 0;
  right: 0;
  margin-top: 2rem;
  text-align: center;
  @include respond-to(xs) {
    bottom: -1rem;
  }
  .btn {
    padding: 0.5rem 1.5rem;
  }
}
.highlight{
  list-style: unset!important;
    margin-left: 1.5rem;
        margin-top: 1rem;
}
</style>
