<template>

    <div class="row">
                            
        <div class="col-xl-4">
            <!--begin::Mixed Widget 16-->
            <div class="card card-custom card-stretch gutter-b">
                <!--begin::Header-->
                <div class="card-header border-0 pt-5">
                    <div class="card-title">
                        <div class="card-label">
                            <div class="font-weight-bolder">
                                <h2>Colors</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <!--end::Header-->
                <!--begin::Body-->
                <div class="card-body d-flex flex-column">
                    
                    <!--begin::Items-->
                    <div>
                        <div class="row row-paddingless mb-10">
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="">Primary color</label>
                                    <input type="color" class="form-control" v-model="primaryColor">
                                </div>
                            </div>
                            
                            <div class="col-12">
                                <p class="text-center">
                                    <button class="btn btn-success" @click="updateColor()">update</button>
                                </p>
                            </div>
                        </div>
                        
                    </div>
                    <!--end::Items-->
                </div>
                <!--end::Body-->
            </div>
            <!--end::Mixed Widget 16-->
        </div>

    </div>

</template>

<script>
    export default {
        layout:"cms/dashboard",
        data(){
            return{
                primaryColor:""
            }
        },
        methods:{

            async updateColor(){

                let res = await this.$axios.post("/colors/store", {
                    color: this.primaryColor
                })

                if(res.data.success == true){
                    this.$swal({
                        text:"Primary color updated",
                        icon:"success"
                    })
                }

            },
            async getColor(){

                let res = await this.$axios.get("/colors/1")

                this.primaryColor = res.data[0].color

            }

        },
        created(){

            this.getColor()

        }

    }
</script>