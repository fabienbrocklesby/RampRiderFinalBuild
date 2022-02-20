<template>
    <div>
        <div class="container mx-auto p-4 bg-white">
            <div class="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
                <h1 class="text-2xl font-semibold px-4 py-3">My Profile</h1>
                <div class="flex flex-col mt-10">
                    <div class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
                        <label for="username" class="text-sm font-normal">Username:</label>
                        <h1 class="text-2xl font-light" id="username" name="username">{{ posts.name }}</h1>
                    </div>

                    <div class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
                        <label for="email" class="text-sm font-normal">Email:</label>
                        <h1 class="text-2xl font-light" id="email" name="email">{{ posts.email }}</h1>
                    </div>

                    <div class="px-4 py-3 mt-8 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
                        <button
                            type="submit"
                            @click="Logout()"
                            class=" px-4 py-3 leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-red-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-24 justify-center font-medium focus:outline-none"
                        >
                            Logout
                        </button>
                    </div>
                </div>
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
            };
        },
        methods: {
            Logout() {
                window.localStorage.removeItem('authToken');
                this.$emit('SetPage', 'LandingPage');
                this.$emit('Logout', 'Logout');
            },
        },
        async created() {
            await axios.get('/api/users/me', {
                headers: {
                    Authorization: `Bearer ${window.localStorage.authToken}`,
                },
            })
            .then((response) => {
                this.posts = response.data;
                console.log(this.posts);
            })
            .catch((e) => {
                this.errors.push(e);
            });
        },
    };
</script>
