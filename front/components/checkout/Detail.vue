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
                
                <p>{{ amount.price }} {{ currencySymbol }} {{ amount.price }} {{ currencyCode }}</p>
                </div>
                <div class="content-mx">
                <div class="style-btn" @click="substract(index)">-</div>
                <p>{{ amount.amount }}</p>
                <div class="style-btn" @click="addItem(index)">+</div>
                </div>
            </div>

            <button class="btn" :disabled="isDisabled" @click="update()">Update</button>
            
            </v-card>
        </v-col>
        <v-col cols="12" sm="3" md="3">
            <v-card class="pa-2" outlined tile>
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
            </v-card>
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

    props:["productName", "thumbnail", "prices", "remove", "itemId", "currencyCode", "currencySymbol", "order", "getItems"],
    data(){
        return{
            total:0,
            amounts:[],
            priceTypes:[],
            oldAmounts:[],
            isDisabled:true
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
            }

        },
        addItem(index){
            
            this.amounts[index].amount++
            this.setTotal()
            this.checkOldAndNewAmounts()

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

            this.formatPriceTypes()

            let res = await this.$axios.post("orders/item-update",{
                "request_number": this.order,
                "item_id": this.itemId,
                "price_types": this.priceTypes
            })

            if(res.data.status.result_messages[0] == "OK"){
                this.$swal({
                    text:"Product updated",
                    icon: "success"
                }).then(ans =>{
                    
                    this.getItems()

                })
            }else{

                this.$swal({
                    text:res.data.status.result_messages[0],
                    icon: "error"
                })

            }

        },
        formatPriceTypes(){
            this.priceTypes = []
            this.amounts.forEach(data => {

                if(data.amount > 0){
                    this.priceTypes.push({"price_type_id": data.priceTypeId, "quantity": data.amount})
                } 
            

            })

        }
    },
    created(){
        
        this.prices.forEach((data, index) => {

            this.amounts.push({priceTypeId: data.price_type_id, amount: data.quantity, price: data.current_price})
            this.oldAmounts.push({priceTypeId: data.price_type_id, amount: data.quantity, price: data.current_price})

        })

        this.setTotal()

    }
}
</script>