<template>
    <div class="login_admin " id="dev-login">

        <div class="row">
            <div class="login100-more mask col-md-6"
                style="background-image: url('../login.jpg');">


               <!---- <p>Bienvenido a Aidacaceres CMS</p>--->
            </div>
            <div class="login100-form validate-form col-md-6">


                <form @submit.prevent="login()">


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
                        <button class="login100-form-btn" type="submit">
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
        layout: 'cms/login',
        data(){
            return{
                email:"",
                password:""
            }
        }
    }
</script>