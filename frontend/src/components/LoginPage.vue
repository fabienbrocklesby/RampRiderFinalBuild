<template>
    <div class="loginFade">
        <div class="container mx-auto p-4 bg-white">
            <div class="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
                <h1 class="text-lg font-bold">Log In</h1>
                <form @submit.prevent="submitForm" class="flex flex-col mt-4">
                    <input
                        type="email"
                        name="email"
                        v-bind:value="formData.email"
                        @input="this.formData.email = $event.target.value"
                        class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                        placeholder="Email address"
                    />
                    <input
                        type="password"
                        name="password"
                        v-bind:value="formData.password"
                        @input="this.formData.password = $event.target.value"
                        class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                        placeholder="Password"
                    />
                    <div class="flex flex-col mt-5">
                        <p class="mt-1 ml-4 text-xs font-light text-gray-500">
                        <a class="ml-1 font-medium text-blue-400" @click="SetPage('ForgotPasswordPage')">Forgot Password?</a>
                        </p>
                    </div>
                    <button
                        type="submit"
                        class="mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
                    >
                        Log In
                    </button>
                    <div v-if="response == 'Invalid credentials' || response == 'Please fill in all fields'" class="text-red-600 pt-2 pl-1 font-light text-sm">
                        <p>{{ response }}</p>
                    </div>
                    <div v-if="response == 'User has been logged in'" class="pt-2 pl-1 font-light text-sm">
                        <p>{{ response }}</p>
                    </div>
                    <div class="flex flex-col items-center mt-5">
                        <p class="mt-1 text-xs font-light text-gray-500">
                        Haven't Registered Yet?<a class="ml-1 font-medium text-blue-400" @click="SetPage('RegisterPage')">Register Now</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                posts: [],
                errors: [],
                formData: {
                    email: '',
                    password: '',
                },
                response: '',
            };
        },
        methods: {
            SetPage(page) {
                this.$emit('SetPage', page);
            },
            async submitForm() {
                if (!this.formData.email || !this.formData.password) {
                    this.response = 'Please fill in all fields';
                } else {
                    console.log(this.formData);
                    try {
                        const response = await axios.post('http://192.168.1.19:5000/api/users/login', this.formData);
                        console.log(response);
                        this.response = response.data.message;
                        if (response.data.message === 'User has been logged in') {
                            localStorage.setItem('authToken', response.data.token);
                            this.$emit('IsLoggedIn', true);
                            this.$emit('SetPage', 'GetSkateparksPage');
                        } else {
                            console.log(this.response);
                        }
                    } catch (error) {
                        console.log(error);
                        this.response = error.response.data.message;
                    }
                }
            },
        },
    };
</script>

<style lang="scss">
    .loginFade {
        animation: fadeInAnimation ease .4s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
    }
    @keyframes fadeInAnimation {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
