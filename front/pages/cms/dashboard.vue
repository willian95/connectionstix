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

        <div class="col-xl-6">
            <!--begin::Mixed Widget 16-->
            <div class="card card-custom card-stretch gutter-b">
                <!--begin::Header-->
                <div class="card-header border-0 pt-5">
                    <div class="card-title">
                        <div class="card-label">
                            <div class="font-weight-bolder">
                                <h2>Hero image</h2>
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
                                    <label for="">Image</label>
                                    <input type="file" class="form-control" @change="onImageChange"  accept="image/*">
                                </div>
                            </div>

                            <div class="col-12">
                                <img :src="imagePreview" class="w-100" v-if="imagePreview">
                            </div>

                            <div v-if="pictureStatus == 'subiendo'" class="progress-bar progress-bar-striped" role="progressbar" aria-valuemin="0" aria-valuemax="100" :style="{'width': `${imageProgress}%`}">
                                {{ imageProgress }}%
                            </div>
                            
                            <p v-if="pictureStatus == 'uploading' && imageProgress < 100">Uploading</p>
                            <p v-if="pictureStatus == 'uploading' && imageProgress == 100">Wait a few more seconds</p>
                            <p v-if="pictureStatus == 'ready' && imageProgress == 100">Image ready</p>
                            
                            <div class="col-12">
                                <p class="text-center">
                                    <button class="btn btn-primary" :disabled="!file" v-if="onLoadingImage == false" @click="updateImage()">Update</button>
                                    <button class="btn btn-primary spinner spinner-white spinner-right" v-if="onLoadingImage == true">Uploading</button>
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
                primaryColor:"",
                imagePreview:"",
                file:"",
                finalPictureName:"",
                imageProgress:0,
                pictureStatus:"",
                onLoadingImage:false
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

            },
            async getHero(){

                let res = await this.$axios.get("/hero/1")

                this.imagePreview = process.env.SERVER_URL+res.data[0].image

            },
            onImageChange(e){
                let picture = e.target.files[0];

                this.imagePreview = URL.createObjectURL(picture);

                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;

                if(files[0]['type'].split('/')[0] == "image"){
                    this.file = files[0]
                }else{
                    this.$swal({
                        text:"You have to choose an image file",
                        icon:"error"
                    })
                    this.imagePreview = ""
                }
                
            },
            async updateImage(){

                this.onLoadingImage = true
                
                if(this.file != null){
                    this.imageProgress = 0;
                
                    let formData = new FormData()
                    formData.append("file", this.file)

                    var _this = this
                    this.pictureStatus = "uploading";
                    
                    var config = {
                        headers: { "X-Requested-With": "XMLHttpRequest" },
                        onUploadProgress: function(progressEvent) {
                            
                            var progressPercent = Math.round((progressEvent.loaded * 100.0) / progressEvent.total);
                        
                            _this.imageProgress = progressPercent
                        
                            
                        }
                    }

                    let res = await this.$axios.post("/files/upload", formData, config)
                    this.pictureStatus = "ready";
                    this.finalPictureName = res.data

                    this.onLoadingImage = false
                    this.file = null
                    await this.storeHero()

                }

            },
            async storeHero(){

                let res = await this.$axios.post("hero/store",{
                    image: this.finalPictureName
                })

                if(res.data.success == true){
                    this.$swal({
                        text:"Image uploaded",
                        icon:"success"
                    })
                }else{

                    this.$swal({
                        text:"Image could not be uploaded",
                        icon:"error"
                    })

                }

            }

        },
        created(){

            this.getColor()
            this.getHero()

        }

    }
</script>