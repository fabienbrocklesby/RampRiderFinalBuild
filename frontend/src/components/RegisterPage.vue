<template>
    <div>
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
                        type="password"
                        name="password"
                        v-bind:value="formData.password"
                        @input="this.formData.password = $event.target.value"
                        class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                        placeholder="Password"
                    />
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
            };
        },
        methods: {
            SetPage(page) {
                this.$emit('SetPage', page);
            },
            submitForm() {
                axios.post('/api/users', this.formData)
                    .then((response) => {
                        console.log(response);
                        this.response = 'User created successfully';
                        this.SetPage('LoginPage');
                    })
                    .catch((error) => {
                        this.response = 'User Credentials are invalid or already in use';
                        console.log(error);
                    });
                    if (!this.response) {
                        this.response = 'User Credentials are invalid or already in use';
                    }
            },
        },
    };
</script>
