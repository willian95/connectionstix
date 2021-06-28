<template>
    <div class="login_admin " id="dev-login">

        <div class="row">
            <div class="login100-more mask col-md-6"
                style="background-image: url('../login.jpg'); margin: 0">


               <!---- <p>Bienvenido a Aidacaceres CMS</p>--->
            </div>
            <div class="login100-form validate-form col-md-6">


                <form @submit.prevent="login()" style="width: 80%">


                    <div class="wrap-input100 validate-input">
                        <input class="input100" type="text" v-model="email" required>
                        <span class="focus-input100"></span>
                        <span class="label-input100">Email</span>
                    </div>


                    <div class="wrap-input100 validate-input">
                        <input class="input100" type="password" v-model="password" required>
                        <span class="focus-input100"></span>
                        <span class="label-input100">Password</span>
                    </div>

                    <div class="container-login100-form-btn">
                        <button class="login100-form-btn text-white" type="submit">
                            Log In
                        </button>
                    </div>

                    <!--<p class="text-center mt-3">¿Olvidaste tu contraseña?</p>-->
                
                </form>

            </div>


        </div>

    </div>
</template>

<script>
    export default {

        middleware: 'auth',
        auth:"guest",
        layout: 'cms/login',
        data(){
            return{
                email:"",
                password:""
            }
        },
        methods:{

            async login(){

                try{

                    await this.$auth.loginWith('local', {
                        data:{
                            email:this.email,
                            password:this.password
                        }
                    })
                    
                }catch(err){
                    console.log("error", err)
                    if(err.response.data.error){
                        
                        this.$swal({
                            icon: 'error',
                            text: err.response.data.error,
                        })
                    }
                    if(err.response.data.errors){

                        this.$swal({
                            icon: 'error',
                            text: "Some fields entry are wrong",
                            toast: true,
                            position: 'top-end',
                        })

                        //this.errors = err.response.data.errors
                    }

                }

            }

        }
    }
</script>