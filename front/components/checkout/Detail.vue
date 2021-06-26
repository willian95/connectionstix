<template>

    <div class="content-panel">
        <v-row no-gutters class="row-center">
            <v-col cols="12" sm="4" md="4">
                <v-card class="pa-2" outlined tile>
                <p class="txt-panel">$ {{ total }} CAD</p>
                <div class="info-panel">
                    <p>{{ productName }}</p>
                    <img class="" :src="thumbnail" alt="" />
                </div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="4" md="4">
                <v-card class="pa-2" outlined tile>
                <div class="main-min" v-for="(amount, index) in amounts" :key="index">
                    <div class="flex">
                    
                    <p>{{ currencySymbol }} {{ amount.price }} {{ currencyCode }}</p>
                    </div>
                    <div class="content-mx">
                    <div class="style-btn change-color" @click="substract(index)">-</div>
                    <p>{{ amount.amount }}</p>
                    <div class="style-btn change-color" @click="addItem(index)">+</div>
                    </div>
                </div>

                <v-text-field
                    :label="$t('discountCode')"
                    single-line
                    outlined
                    v-model="discountCode"
                    v-if="discountEnabled"
                    ></v-text-field>

                <button class="btn" :disabled="isDisabled  && discountCode == ''" @click="update()">{{ $t('update') }}</button>
                
                </v-card>
            </v-col>
            <v-col cols="12" sm="3" md="3">
                <!--<v-card class="pa-2" outlined tile>
                    <div class="main-min">
                        <div class="flex">
                        <img
                            class=""
                            src="~assets/images/iconos/calendar.png"
                            alt=""
                        />
                        <p>11/22/2021</p>
                        </div>
                    </div>
                    <div class="main-min">
                        <div class="flex">
                        <img
                            class=""
                            src="~assets/images/iconos/reloj.png"
                            alt=""
                        />
                        <p>2:00 PM</p>
                        </div>
                    </div>
                    <div class="main-min">
                        <div class="flex">
                        <img
                            class=""
                            src="~assets/images/iconos/info.png"
                            alt=""
                        />
                        <p>More info</p>
                        </div>
                    </div>
                </v-card>-->
            </v-col>
            <v-col cols="12" sm="1" md="1">
                <v-card class="pa-2" outlined tile style="cursor:pointer;" @click="remove(itemId)">
                    <img
                        class="trash-icon"
                        src="~assets/images/iconos/trash.png"
                        alt=""
                    />
                </v-card>
            </v-col>
        </v-row>
    </div>

</template>

<script>
export default {

    props:["productName", "thumbnail", "prices", "remove", "itemId", "currencyCode", "currencySymbol", "order", "getItems", "discountEnabled", "checkUpdatedItems", "productId"],
    data(){
        return{
            total:0,
            amounts:[],
            priceTypes:[],
            oldAmounts:[],
            isDisabled:true,
            discountCode:""
        }
    },
    methods: {
        setTotal(){

            this.total = 0
            this.amounts.forEach(data => {

                this.total = this.total + (data.amount * data.price)

            })

        },
        substract(index){

            if(this.amounts[index].amount > 0){
                this.amounts[index].amount --
                this.setTotal()
                this.checkOldAndNewAmounts()
                this.checkUpdatedItems(this.amounts, this.productId)
            }

        },
        addItem(index){
            
            this.amounts[index].amount++
            this.setTotal()
            this.checkOldAndNewAmounts()
            this.checkUpdatedItems(this.amounts, this.productId)


        },
        checkOldAndNewAmounts(){

            this.isDisabled = true
            this.amounts.forEach((data, index) => {

                if(this.amounts[index].amount != this.oldAmounts[index].amount){
                    this.isDisabled = false
                }

            })

        },
        async update(){
            let discountResponse = true
            let updateResponse = true

            if(this.discountCode != ""){
                discountResponse = await this.setDiscountCode()
            }

            if(!this.isDisabled){
                updateResponse = await this.updateAmounts()
            }

            if(discountResponse && updateResponse){

                this.$swal({
                    text:"Item updated",
                    icon: "success"
                }).then(ans => {
                    this.discountCode = ""
                    this.getItems()

                })

            }

        },
        async setDiscountCode(){

            let res = await this.$axios.post("orders/discount-item",{
                "order_number": this.order,
                "item_id": this.itemId,
            })

            if(res.data.status.result_messages[0] != "OK"){

                this.$swal({
                    text:res.data.status.result_messages[0],
                    icon: "error"
                })
                return false
            }

            return true

        },
        async updateAmounts(){

            this.formatPriceTypes()

            let res = await this.$axios.post("orders/item-update",{
                "request_number": this.order,
                "item_id": this.itemId,
                "price_types": this.priceTypes
            })

            if(res.data.status.result_messages[0] != "OK"){

                this.$swal({
                    text:res.data.status.result_messages[0],
                    icon: "error"
                })

                return false

            }

            return true

        },
        formatPriceTypes(){
            this.priceTypes = []
            this.amounts.forEach(data => {

                if(data.amount > 0){
                    this.priceTypes.push({"price_type_id": data.priceTypeId, "quantity": data.amount})
                } 
            

            })

        },

        setNewAmount(newVal){

            this.amounts = []
            this.oldAmounts = []
            this.isDisabled = true

            newVal.forEach((data, index) => {

                this.amounts.push({priceTypeId: data.price_type_id, amount: data.quantity, price: data.current_price})
                this.oldAmounts.push({priceTypeId: data.price_type_id, amount: data.quantity, price: data.current_price})

            })

        }

    },
    created(){
        
        this.prices.forEach((data, index) => {

            this.amounts.push({priceTypeId: data.price_type_id, amount: data.quantity, price: data.current_price})
            this.oldAmounts.push({priceTypeId: data.price_type_id, amount: data.quantity, price: data.current_price})

        })

        this.setTotal()

    },
    watch:{
        prices: function(newVal, oldVal){

            this.setNewAmount(newVal)

        }
    },
    mounted(){
        if(process.browser){
            let color = localStorage.getItem("color")
            if(color){
                $(".change-color").css("background", color)
            }
        }

    }
}
</script>

<style lang="scss">
.section_check {
 display: flex;
    padding: 8px !important;
    align-items: center;
      border-bottom: 1px solid #f7f7f7;
    margin-top: 12px;
    justify-content: space-between;
    @include respond-to(xs) {
display: block;
    }

    .v-input {

    max-width: 300px;
     @include respond-to(xs) {
margin-right: 0;
    max-width: 100%;
     }
}
 .v-input__control > .v-input__slot {
  
  min-height: 40px;
}
.v-text-field--outlined .v-label {
    top: 10px;
}
.btn{
    margin-top: -2rem;
}
    }
</style>