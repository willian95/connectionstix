<template>
  <v-container class="grey lighten-5 custom-details">
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <v-card class="pa-2 book-shadows mb-2" outlined tile>
          
          <div id="open-modal" :class="'modal-window open-modal '+modalClass">
            <div  class="modal-table" >
              <table style="width: 100%">
                <thead>
                  <tr>
                    <th class="th-start">From datetime</th>
                    <th class="th-start">To datetime</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(date, index) in availableDates" :key="'date-'+index">
                 
                    <td class="td-flex"> <v-radio-group
                        v-model="selectedAvailableDate"
                        name="rowSelector">
                        <v-radio :value="index"/>
                      </v-radio-group> 
                      {{ date.from_datetime.substring(0, 10) }}</td>
                    <td>{{ date.to_datetime.substring(0, 10) }}</td>
                  </tr>
                </tbody>
              </table>

              <button title="Close" class="modal-close" @click="closeDatesModal()">x</button>
              <div class="btn-modal">
                  <button class="btn" @click="chooseDate()">Choose date</button>
              </div>
            </div>
         
            
           
          </div>

          <div>
            <div class="flex" v-if="checkAvailability">
              <client-only>
              <div class="date-custom">
                <img src="~assets/images/iconos/calendar.png" alt="">
                  <date-picker
                  placeholder="MM/DD/YYYY"
                  format="MM/dd/yyyy"
                  v-model="date_today"
                />
              </div>

               <div class="date-custom">
                  <img src="~assets/images/iconos/calendar.png" alt="">
                  <date-picker
                  placeholder="MM/DD/YYYY"
                  format="MM/dd/yyyy"
                  v-model="next_date"
                />
               </div>
              </client-only>
            </div>

            <div
              class="main-min"
              v-for="(price, index) in pricing.prices"
              :key="'price-'+index"
            >
              <div class="flex">
                <p>
                  {{ price.price_type_name }} {{ pricing.currency_symbol }}
                  {{ price.current_price }} {{ pricing.currency_code }}
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
                <div class="style-btn" @click="substract(price.price_type_id)">
                  -
                </div>
                <p v-if="prices.length > 0">{{ prices[index].amount }}</p>
                <div
                  class="style-btn"
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
                  >{{ pricing.currency_symbol }} {{ total }}
                  {{ pricing.currency_code }}</strong
                >
              </p>
            </div>
            <button
              
              href=""
              class="btn"
              @click="bookNow()"
            >
              Book now
            </button>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <v-card class="pa-2 card-shadows" outlined tile>
          <h3 class="title-custom">{{ title }}</h3>
          <div class="custom-ubication">
            <img class="map" src="~assets/images/iconos/mapa.png" alt="" />
            <div>
              <p>
                Take me there/ <br />
                meeting point
              </p>
              <ul>
                <li>
                  <img src="~assets/images/iconos/1.png" alt="" />
                  <img
                    class="icon-map"
                    src="~assets/images/iconos/2.png"
                    alt=""
                  />
                </li>
              </ul>
            </div>
          </div>
          <h3 class="title-custom" v-if="address">Attraction address</h3>
          <p>{{ address }}</p>

          <v-row class="mt-1">
            <v-col class="line" cols="6" md="6">
              <h3 class="title-custom">Opening hours</h3>
              <ul>
                <li v-for="(openingHour, index) in operationHours" :key="'open-'+index">
                  {{ openingHour.day }}:
                  <span
                    v-if="openingHour.open == null && openingHour.close == null"
                    >Closed all day</span
                  >
                  <span v-else>
                    {{ openingHour.open }} to {{ openingHour.close }}
                  </span>
                </li>
              </ul>
            </v-col>
            <v-col cols="6" md="6" v-if="duration.length">
              <h3 class="title-custom">Duration</h3>

              <p>{{ duration.length }} {{ duration.unit }}</p>

              <!--<h3 class="title-custom mt2">Minimum height & age</h3>
              <ul>
                <li>5,6 - 1,70 CM</li>
                <li>8 years ></li>
              </ul>-->
            </v-col>
          </v-row>
          <div class="descripon">
            <h3 class="title-custom" v-if="description">Description</h3>
            <p v-if="description">
              {{ description }}
            </p>

            <h3 class="title-custom" v-if="highlights.length > 0">
              Highlights
            </h3>
            <ul>
              <li v-for="(highlight, index) in highlights" :key="'highlight-'+index">
                {{ highlight }}
              </li>
            </ul>

            <div>
              <h3 class="title-custom">Know before you go</h3>
              <div class="know-info">
                <div
                  class="item"
                  v-for="(inclusion, index) in inclusions"
                  :key="'inclusion-'+index"
                >
                  <div>
                    <!--<img src="~assets/images/iconos/pet.png" alt="" />-->
                    <p>{{ inclusion }}:</p>
                  </div>
                  <img src="~assets/images/iconos/check.png" alt="" />
                </div>
                <div
                  class="item"
                  v-for="(exclusion, index) in exclusions"
                  :key="'exclusion-'+index"
                >
                  <div>
                    <!--<img src="~assets/images/iconos/wheelcair.png" alt="" />-->
                    <p>{{ exclusion }}:</p>
                  </div>
                  <img src="~assets/images/iconos/nocheck.png" alt="" />
                </div>
              </div>
              <div class="know-info">
                <div
                  class="item"
                  v-for="(know, index) in knowBeforeYouGoChecklist"
                  :key="'know-'+index"
                >
                  <div>
                    <img :src="know.icon" alt="" />
                    <p>{{ know.label }}</p>
                  </div>
                  <img src="~assets/images/iconos/check.png" alt="" />
                </div>
              </div>

              <ul>
                <li
                  v-for="(optional, index) in knowBeforeYouGoOptional"
                  :key="'optional-'+index"
                >
                  {{ optional }}
                </li>
              </ul>
            </div>

            <h3 class="title-custom">Cancellation policy</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem
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
      next_date:"",
      modalClass:"custom-modal-close",
      selectedAvailableDate:"",
      fromDate:"",
      toDate:"",
      headers: [
        { text: "From", value: "from_datetime",sortable: false  },
        { text: "To", value: "to_datetime",sortable: false  },
      ],
      availableDates: []
    };
  },
  methods: {
    add(priceTypeId, price) {
      let res = this.checkDuplicate(priceTypeId, price);
      console.log(res, this.prices);
      if (res.exists == true) {
        this.prices[res.priceIndex].amount =
          this.prices[res.priceIndex].amount + 1;
      }

      this.getTotal();
    },
    chooseDate(){

      if(this.selectedAvailableDate != ""){
        this.closeDatesModal()
        this.fromDate = this.availableDates[this.selectedAvailableDate].from_datetime
        this.toDate = this.availableDates[this.selectedAvailableDate].to_datetime
        this.getLocalStorageOrders()
      }else{

        this.$swal({
          text:"You have to choose a date",
          icon: "error"
        })

      }

    },
    showDatesModal(){
     
      this.modalClass = "custom-modal-open"

    },
    closeDatesModal(){
      
      this.modalClass = "custom-modal-close"

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
      if(this.checkAvailability == true){

        this.availabilityCheck()
      }else{
        this.getLocalStorageOrders();
      }
      
    },
    async availabilityCheck(){

      this.formatPriceTypes();

      let res = await this.$axios.post("products/availability", {
        id: this.productId,
        from_date: this.date_today,
        to_date: this.next_date,
        price_types: this.priceTypes
      });

      if(res.data.status){
        if(res.data.status.result_messages[0] != "OK"){
     
          this.$swal({
            text:res.data.status.result_messages[0],
            icon:"error"
          })
        }else{
          
          this.availableDates = res.data.data.availability
          this.showDatesModal()

        }
      }
      

    },
    async getLocalStorageOrders() {
      if (process.browser) {
        let order = window.localStorage.getItem("orders");
        if (order == null) {
          order = await this.storeOrder();
        }

        this.addItem(order);
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
          text: "Product booked",
          icon: "success"
        }).then(ans => {
          this.prices.forEach((data, index) => {
            this.prices[index].amount = 0;
          });

          this.$router.push("/checkout");
        });
      } else {

        if(res.data.status.result_code == 1000){
          window.localStorage.removeItem("orders");
          this.getLocalStorageOrders()
        }else{
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
    },
    nextDateAvailable: function(newVal, oldVal) {
      this.next_date = newVal;
    }
  }
};
</script>

<style lang="scss">
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
width: 200px;

         }
    }

    div {
      margin-left: 4rem;
 @include respond-to(xs) {
margin-left: 0rem;
         }


      ul {
        list-style: none;

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
          font-size: .8rem;
       }
   
  }

  .line::before {
    content: "";
    position: absolute;
    border-right: 2px solid #00000014;
    height: 200px;
    right: 53%;
  }

  .mt-1 {
    margin: 1rem 0;

    .col-md-6 {
      padding-left: 0;
      span{
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

    @include respond-to(xs) {
     padding: 20px;
     margin-bottom: 0;
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
          gap: 1rem;

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

    padding-bottom: 3rem;
    padding-top: 3rem;
    padding-left: 13px;
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

  /**********modal**********/
  .interior{
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
  .modal-window .modal-table{
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
      .text-start:nth-child(1){
    opacity: 0; 
}
  }
  .v-data-footer{
    display: none;
  }
  .theme--light.v-data-table {

    border: 1px solid #00000017;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > th:not(.v-data-table__mobile-row) {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    border-bottom: 0;
    color: #000;
    font-size: 1.2rem;
}

}



.date-custom{
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    border: 1px solid rgba(6,6,6,0.32157);
    border-radius: 7px;
    text-align: center;
   
    padding: 0.4rem 0;
  padding: 8px 1rem;
    align-items: center;
 & input{
   /*border: 1px solid #06060652;*/
    border-radius: 7px;
    text-align: center;
        max-width: 150px;
 }
img{
      width: 27px;
      margin-right: -15px;
}
}
.flex{
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
        margin-bottom: 1rem;
}
.modal-table{
     max-height: 400px;
    overflow: auto;
  .td-flex{
        display: flex;
    align-items: center;
        height: 4rem;
  }
  .v-input--selection-controls {
    margin-top: 24px;
   
    margin-right: 18px;
}
tr{
  display: flex;
    justify-content: space-around;
}
thead{
  background: #ef1856;
    color: #fff;
    border-top-right-radius: 10px;
}
}
.custom-modal-open{
    visibility: visible;
    opacity: 1;
}

.custom-modal-close{
  display: none;
}
 .th-start{
    text-align: start;
  }
  .btn-modal
      {
        margin-top: 2rem;
    text-align: center;
    .btn{
      padding: .5rem 1.5rem;
    }
  }
</style>
