<template>
    <div>
        <div class="container mx-auto p-4 bg-white">
            <div class="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
                <h1 class="text-lg font-bold">Email Has Been Sent!</h1>
                <div class="pt-2 pl-1 text-gray-500 text-sm">
                    <p>Check your inbox (or junk), there should be a verification code there!</p>
                </div>
                <form @submit.prevent="submitForm" class="flex flex-col mt-4">
                    <input
                        type="text"
                        name="resetToken"
                        v-bind:value="formData.resetToken"
                        @input="this.formData.resetToken = $event.target.value"
                        class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                        placeholder="Reset Token"
                    />
                    <input
                        type="password"
                        name="password"
                        v-bind:value="formData.password"
                        @input="this.formData.password = $event.target.value"
                        class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                        placeholder="New Password"
                    />
                    <button
                        type="submit"
                        class="mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
                    >
                        Reset Password
                    </button>
                    <div v-if="response == 'Invalid Token' || response == 'Please fill in all fields'" class="text-red-600 pt-2 pl-1 font-light text-sm">
                        <p>{{ response }}</p>
                    </div>
                    <div v-if="response == 'Password Has Been Succesfully Updated'" class="pt-2 pl-1 font-light text-sm">
                        <p>{{ response }}</p>
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
                    resetToken: '',
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
                if (!this.formData.resetToken || !this.formData.password) {
                    this.response = 'Please fill in all fields';
                } else {
                    try {
                        const response = await axios.post('http://192.168.1.19:5000/api/users/update', this.formData);
                        if (response.data.message === 'Password has been updated') {
                            this.response = 'Password Has Been Succesfully Updated';
                            this.$emit('SetPage', 'LoginPage');
                        } else {
                            this.response = 'Invalid Token';
                        }
                    } catch (error) {
                        console.log(error);
                        this.response = 'Invalid Token';
                        console.log(this.response);
                    }
                }
            },
        },
    };
</script>
