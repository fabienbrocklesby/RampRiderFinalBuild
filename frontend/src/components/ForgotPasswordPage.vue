<template>
    <div class="forgotFade">
        <div class="container mx-auto p-4 bg-white">
            <div class="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
                <h1 class="text-lg font-bold">Trouble Logging In?</h1>
                <div class="pt-2 pl-1 text-gray-500 text-sm">
                        <p>Enter your email, and we'll send you a verification code to get you back into your account.</p>
                    </div>
                <form @submit.prevent="submitForm" class="flex flex-col mt-4">
                    <input
                        type="email"
                        name="email"
                        v-bind:value="formData.email"
                        @input="this.formData.email = $event.target.value"
                        class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                        placeholder="Email address"
                    />
                    <button
                        type="submit"
                        class="mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
                    >
                        Send Verification Code
                    </button>
                    <div v-if="response == 'Invalid Email Address' || response == 'Please fill in all fields'" class="text-red-600 pt-2 pl-1 font-light text-sm">
                        <p>{{ response }}</p>
                    </div>
                    <div v-if="response == 'Verification Code Has Been Sent To Your Email'" class="pt-2 pl-1 font-light text-sm">
                        <p>{{ response }}</p>
                    </div>
                    <div class="flex flex-col items-center mt-5">
                        <p class="mt-1 text-xs font-light text-gray-500">
                            <a class="ml-1 font-medium text-blue-400" @click="SetPage('RegisterPage')">Create New Account</a>
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
                },
                response: '',
            };
        },
        methods: {
            SetPage(page) {
                this.$emit('SetPage', page);
            },
            async submitForm() {
                if (!this.formData.email) {
                    this.response = 'Please fill in all fields';
                } else {
                    try {
                        const response = await axios.post('/api/users/forgot', this.formData);
                        if (response.data.message === 'Token has been sent to your email') {
                            this.response = 'Verification Code Has Been Sent To Your Email';
                            this.$emit('SetPage', 'UpdatePasswordPage');
                        } else {
                            this.response = 'Invalid Email Address';
                        }
                    } catch (error) {
                        console.log(error);
                        this.response = 'Invalid Email Address';
                        console.log(this.response);
                    }
                }
            },
        },
    };
</script>

<style lang="scss">
    .forgotFade {
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
