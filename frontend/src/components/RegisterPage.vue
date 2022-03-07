<template>
    <div class="registerFade">
        <div class="container mx-auto p-4 bg-white">
            <div class="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
                <h1 class="text-lg font-bold">Register</h1>
                <form @submit.prevent="submitForm" class="flex flex-col mt-4">
                    <input
                        type="text"
                        name="name"
                        v-bind:value="formData.name"
                        @input="this.formData.name = $event.target.value"
                        class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                        placeholder="username"
                    />
                    <input
                        type="email"
                        name="email"
                        v-bind:value="formData.email"
                        @input="this.formData.email = $event.target.value"
                        class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                        placeholder="Email address"
                    />
                    <input
                        id="password"
                        type="password"
                        name="password"
                        v-bind:value="formData.password"
                        @input="this.formData.password = $event.target.value"
                        class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                        placeholder="Password"
                    />
                    <label for="password" v-if="passwordReqOpen === false" class="text-gray-500 text-xs mt-2 px-1">Password Requirements: <a class="text-blue-500" @click="passwordReq">Find Out More</a></label>
                    <label for="password" v-if="passwordReqOpen === true" class="text-gray-500 text-xs mt-2 px-1">Password Must Be At Least 6 Characters Minimum, And Contain At Least 1 Capital Letter, 1 Number, and 1 Symbol <a class="text-blue-500" @click="passwordReq">See Less</a></label>
                    <button
                        type="submit"
                        class="mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
                    >
                        Register
                    </button>
                    <div v-if="response" class="text-red-600 pt-2 pl-1 font-light text-sm">
                        <p>{{ response }}</p>
                    </div>
                    <div class="flex flex-col items-center mt-5">
                        <p class="mt-1 text-xs font-light text-gray-500">
                        Registered already?<a class="ml-1 font-medium text-blue-400" @click="SetPage('LoginPage')">Sign in now</a>
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
                    name: '',
                    email: '',
                    password: '',
                },
                response: '',
                passwordReqOpen: false,
            };
        },
        methods: {
            SetPage(page) {
                this.$emit('SetPage', page);
            },
            submitForm() {
                axios.post('/api/users', this.formData)
                    .then((response) => {
                        this.response = 'User created successfully';
                        this.SetPage('LoginPage');
                    })
                    .catch((error) => {
                        this.response = 'User Credentials Are Invalid Or User Already Exists!';
                        console.log(error);
                    });
                    if (!this.response) {
                        this.response = 'Password Check Password Requirements';
                    }
            },
            passwordReq() {
                this.passwordReqOpen = !this.passwordReqOpen;
            },
        },
    };
</script>

<style lang="scss">
    .registerFade {
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
