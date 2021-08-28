<template>

    <div class="row">

        <div class="col-xl-12">
            <div class="card card-custom card-stretch gutter-b">
                <div class="card-body d-flex flex-column">
                    <div class="row">
                        <div class="col-lg-4">
                     
                            <!--begin::Mixed Widget 16-->
                            <div class="card card-custom card-stretch gutter-b">
                                <!--begin::Header-->
                                <div class="card-header border-0 pt-5">
                                    <div class="card-title">
                                        <div class="card-label">
                                            <div class="font-weight-bolder">
                                                <h2>Colors & overlay</h2>
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
                                            
                                        </div>

                                        <div class="row row-paddingless mb-10">
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label for="">Text color</label>
                                                    <input type="color" class="form-control" v-model="textColor">
                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                    <!--end::Items-->
                                    <!--begin::Items-->
                                    <div>
                                        <div class="row row-paddingless mb-10">
                                            <div class="col-12">
                                                <div class="form-group form-check">
                                                    <input type="checkbox" class="form-check-input" id="overlay" v-model="overlay">
                                                    <label class="form-check-label" for="overlay">Overlay</label>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                    <!--end::Items-->

                                    <!--begin::Items-->
                                    <div>
                                        <div class="row row-paddingless mb-10">
                                            <div class="col-12">
                                                <div class="form-group form-check">
                                                    <label class="form-check-label" for="overlay">Icons color</label>
                                                    <select class="form-control" v-model="iconColor">
                                                        <option value="magenta">Magenta</option>
                                                        <option value="black">Black</option>
                                                    </select>
                                                    
                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                    <!--end::Items-->
                                </div>
                                <!--end::Body-->
                            </div>
                            <!--end::Mixed Widget 16-->
                            
           

                        </div>

                        <div class="col-lg-4">
                            <!--begin::Mixed Widget 16-->
                            <div class="card card-custom card-stretch gutter-b">
                                <!--begin::Header-->
                                <div class="card-header border-0 pt-5">
                                    <div class="card-title">
                                        <div class="card-label">
                                            <div class="font-weight-bolder">
                                                <h2>Hero image (1250px * 850px JPG)</h2>
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
                                            
                                        </div>
                                        
                                    </div>
                                    <!--end::Items-->
                                </div>
                                <!--end::Body-->
                            </div>
                            <!--end::Mixed Widget 16-->
                        </div>

                        <div class="col-lg-4">
                            <!--begin::Mixed Widget 16-->
                            <div class="card card-custom card-stretch gutter-b">
                                <!--begin::Header-->
                                <div class="card-header border-0 pt-5">
                                    <div class="card-title">
                                        <div class="card-label">
                                            <div class="font-weight-bolder">
                                                <h2>Logo</h2>
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
                                                    <label for="">Main Logo (443px * 95px PNG)</label>
                                                    <input type="file" class="form-control" @change="onLogoChange"  accept="image/*">
                                                </div>
                                            </div>

                                            <div class="col-12">
                                                <img :src="logoPreview" class="w-100" v-if="logoPreview">
                                            </div>

                                            <div v-if="logoStatus == 'subiendo'" class="progress-bar progress-bar-striped" role="progressbar" aria-valuemin="0" aria-valuemax="100" :style="{'width': `${imageProgress}%`}">
                                                {{ logoProgress }}%
                                            </div>
                                            
                                            <p v-if="logoStatus == 'uploading' && logoProgress < 100">Uploading</p>
                                            <p v-if="logoStatus == 'uploading' && logoProgress == 100">Wait a few more seconds</p>
                                            <p v-if="logoStatus == 'ready' && logoProgress == 100">Image ready</p>
                                            
                                        </div>

                                        <div class="row row-paddingless mb-10">
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label for="">Second Logo (443px * 95px PNG)</label>
                                                    <input type="file" class="form-control" @change="onSecondLogoChange"  accept="image/*">
                                                </div>
                                            </div>

                                            <div class="col-12">
                                                <img :src="secondLogoPreview" class="w-100" v-if="secondLogoPreview">
                                            </div>

                                            <div v-if="secondLogoProgress == 'subiendo'" class="progress-bar progress-bar-striped" role="progressbar" aria-valuemin="0" aria-valuemax="100" :style="{'width': `${secondLogoProgress}%`}">
                                                {{ secondLogoProgress }}%
                                            </div>
                                            
                                            <p v-if="secondLogoProgress == 'uploading' && secondLogoProgress < 100">Uploading</p>
                                            <p v-if="secondLogoProgress == 'uploading' && secondLogoProgress == 100">Wait a few more seconds</p>
                                            <p v-if="secondLogoProgress == 'ready' && secondLogoProgress == 100">Image ready</p>
                                            
                                        </div>

                                        <div class="row row-paddingless mb-10">
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <label for="">Footer Logo (443px * 95px PNG)</label>
                                                    <input type="file" class="form-control" @change="onFooterLogoChange"  accept="image/*">
                                                </div>
                                            </div>

                                            <div class="col-12">
                                                <img :src="footerLogoPreview" class="w-100" v-if="footerLogoPreview">
                                            </div>

                                            <div v-if="footerLogoProgress == 'subiendo'" class="progress-bar progress-bar-striped" role="progressbar" aria-valuemin="0" aria-valuemax="100" :style="{'width': `${footerLogoProgress}%`}">
                                                {{ footerLogoProgress }}%
                                            </div>
                                            
                                            <p v-if="footerLogoProgress == 'uploading' && footerLogoProgress < 100">Uploading</p>
                                            <p v-if="footerLogoProgress == 'uploading' && footerLogoProgress == 100">Wait a few more seconds</p>
                                            <p v-if="footerLogoProgress == 'ready' && footerLogoProgress == 100">Image ready</p>
                                            
                                        </div>
                                        
                                    </div>
                                    <!--end::Items-->
                                </div>
                                <!--end::Body-->
                            </div>
                            <!--end::Mixed Widget 16-->
                        </div>
                        <div class="col-12">
                            <div class="col-12">
                                <p class="text-center">
                                    <button class="btn btn-primary" v-if="onLoadingImage == false && onLoadingLogo == false && onLoadingColor == false" @click="updateConfig()">Update</button>
                                    <button class="btn btn-primary spinner spinner-white spinner-right" v-if="onLoadingImage == true  || onLoadingLogo == true || onLoadingColor == true">Uploading</button>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            

            
        </div>

    </div>

</template>

<script>
    export default {
        layout:"cms/dashboard",
        middleware:"auth",
        auth:"auth",
        data(){
            return{
                textColor:"",
                primaryColor:"",
                onLoadingColor:false,
                overlay:false,

                imagePreview:"",
                file:null,
                finalPictureName:"",
                imageProgress:0,
                pictureStatus:"",
                onLoadingImage:false,

                logoPreview:"",
                logo:null,
                finalLogoName:"",
                logoProgress:0,
                logoStatus:"",
                onLoadingLogo:false,

                secondLogoPreview:"",
                secondLogo:null,
                secondFinalLogoName:"",
                secondLogoProgress:0,
                secondLogoStatus:"",
                secondOnLoadingLogo:false,

                footerLogoPreview:"",
                footerLogo:null,
                footerFinalLogoName:"",
                footerLogoProgress:0,
                footerLogoStatus:"",
                footerOnLoadingLogo:false,

                iconColor:"",
            }
        },
        methods:{

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
            onLogoChange(e){
                let picture = e.target.files[0];

                this.logoPreview = URL.createObjectURL(picture);

                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;

                if(files[0]['type'].split('/')[0] == "image"){
                    this.logo = files[0]
                }else{
                    this.$swal({
                        text:"You have to choose an image file",
                        icon:"error"
                    })
                    this.logoPreview = ""
                }
                
            },
            onSecondLogoChange(e){
                let picture = e.target.files[0];

                this.secondLogoPreview = URL.createObjectURL(picture);

                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;

                if(files[0]['type'].split('/')[0] == "image"){
                    this.secondLogo = files[0]
                }else{
                    this.$swal({
                        text:"You have to choose an image file",
                        icon:"error"
                    })
                    this.secondLogoPreview = ""
                }
                
            },
            onFooterLogoChange(e){
                let picture = e.target.files[0];

                this.footerLogoPreview = URL.createObjectURL(picture);

                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;

                if(files[0]['type'].split('/')[0] == "image"){
                    this.footerLogo = files[0]
                }else{
                    this.$swal({
                        text:"You have to choose an image file",
                        icon:"error"
                    })
                    this.footerLogoPreview = ""
                }
                
            },
            async updateImage(){

                
                
                if(this.file != null){
                    this.onLoadingImage = true

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
        

                }

            },
            async updateLogo(){
                
            
                if(this.logo != null){

                    this.onLoadingLogo = true

                    this.logoProgress = 0;
                
                    let formData = new FormData()
                    formData.append("file", this.logo)

                    var _this = this
                    this.logoStatus = "uploading";
                    
                    var config = {
                        headers: { "X-Requested-With": "XMLHttpRequest" },
                        onUploadProgress: function(progressEvent) {
                            
                            var progressPercent = Math.round((progressEvent.loaded * 100.0) / progressEvent.total);
                        
                            _this.logoProgress = progressPercent
                        
                            
                        }
                    }

                    let res = await this.$axios.post("/files/upload", formData, config)
                    this.logoStatus = "ready";
                    this.finalLogoName = res.data

                    this.onLoadingLogo = false
                    this.logo = null
                    

                }

            },
            async updateSecondLogo(){
                
            
                if(this.secondLogo != null){

                    this.secondOnLoadingLogo = true

                    this.secondLogoProgress = 0;
                
                    let formData = new FormData()
                    formData.append("file", this.secondLogo)

                    var _this = this
                    this.secondLogoStatus = "uploading";
                    
                    var config = {
                        headers: { "X-Requested-With": "XMLHttpRequest" },
                        onUploadProgress: function(progressEvent) {
                            
                            var progressPercent = Math.round((progressEvent.loaded * 100.0) / progressEvent.total);
                        
                            _this.logoProgress = progressPercent
                        
                            
                        }
                    }

                    let res = await this.$axios.post("/files/upload", formData, config)
                    this.secondLogoStatus = "ready";
                    this.secondFinalLogoName = res.data

                    this.secondOnLoadingLogo = false
                    this.secondLogo = null
                    

                }

            },
            async updateFooterLogo(){
                
            
                if(this.footerLogo != null){

                    this.footerOnLoadingLogo = true

                    this.footerLogoProgress = 0;
                
                    let formData = new FormData()
                    formData.append("file", this.footerLogo)

                    var _this = this
                    this.footerLogoStatus = "uploading";
                    
                    var config = {
                        headers: { "X-Requested-With": "XMLHttpRequest" },
                        onUploadProgress: function(progressEvent) {
                            
                            var progressPercent = Math.round((progressEvent.loaded * 100.0) / progressEvent.total);
                        
                            _this.footerProgress = progressPercent
                        
                            
                        }
                    }

                    let res = await this.$axios.post("/files/upload", formData, config)
                    this.footerLogoStatus = "ready";
                    this.footerFinalLogoName = res.data

                    this.footerOnLoadingLogo = false
                    this.footerLogo = null
                    

                }

            },
            async updateConfig(){

                await this.updateImage()
                await this.updateLogo()
                await this.updateSecondLogo()
                await this.updateFooterLogo()

                let res = await this.$axios.post("configcms/store",{
                    hero: this.finalPictureName,
                    logo: this.finalLogoName,
                    secondLogo: this.secondFinalLogoName,
                    footerLogo: this.footerFinalLogoName,
                    color: this.primaryColor,
                    textColor: this.textColor,
                    overlay: this.overlay,
                    iconColor: this.iconColor
                })

                if(res.data.success == true){
                    this.$swal({
                        text:"Configuration updated",
                        icon:"success"
                    })
                }else{

                    this.$swal({
                        text:"Configuration could not be updated",
                        icon:"error"
                    })

                }

            },
            async getConfig(){

                let config = await this.$axios.get('/configcms')
                
                this.primaryColor = config.data.color
                this.textColor = config.data.textColor
                this.imagePreview = config.data.hero ? process.env.SERVER_URL+config.data.hero : ''
                this.logoPreview = config.data.logo ? process.env.SERVER_URL+config.data.logo : ''
                this.secondLogoPreview = config.data.secondaryLogo ? process.env.SERVER_URL+config.data.secondaryLogo : ''
                this.footerLogoPreview = config.data.footerLogo ?process.env.SERVER_URL+config.data.footerLogo : ''
                this.overlay = config.data.overlay
                this.iconColor = config.data.iconColor

                console.log(this.imagePreview)
                console.log(this.logoPreview)
                console.log(this.secondLogoPreview)
                console.log(this.footerLogoPreview)
            }

        },
        created(){

            this.getConfig()

        }

    }
</script>