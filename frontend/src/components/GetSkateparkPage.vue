<template>
    <div>
        <button
            @click="SetPage('GetSkateparksPage')"
            class="mt-4 px-2 ml-2 w-15 leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-gray-900 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center justify-center items-center font-medium focus:outline-none"
        >Back</button>
        <div class="container mx-auto p-4 bg-white">
            <div class="w-full md:w-1/2 lg:w-2/3 mx-auto my-12">
                <h1 class="text-2xl font-semibold px-4 py-3">{{ post.category }}</h1>
                <div class="flex">
                    <span class="inline-flex items-center px-4 ml-4 justify-center px-2 h-5 mr-2 text-xs font-bold leading-none text-red-100 bg-blue-500 rounded-full">{{ post.location }}</span>
                    <span class="inline-flex items-center px-4 justify-center px-2 h-5 mr-2 text-xs font-bold leading-none text-red-100 bg-blue-500 rounded-full">{{ post.size }}</span>
                </div>
                <div class="flex flex-col mt-2">
                    <div class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
                        <img :src="post.image" alt="skatepark" class="w-auto h-auto rounded-md">
                    </div>
                    <div class="px-4 mt-2 flex text-xl text-yellow-600">
                        <i class="bi bi-star-fill"></i>
                        <h1 v-if="likes === 1" class="ml-2">{{ likes }} Like</h1>
                        <h1 v-if="likes != 1" class="ml-2">{{ likes }} Likes</h1>
                        <a v-if="liked == false" @click="likeSkatepark()" class="flex">
                            <i class="bi bi-star ml-4"></i>
                            <h1 class="ml-2">Like This {{ post.category }}</h1>
                        </a>
                        <div v-if="liked == true" class="flex">
                            <i class="bi bi-star-fill ml-4"></i>
                            <h1 class="ml-2">You like This {{ post.category }}</h1>
                        </div>
                    </div>
                    <div class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
                        <label for="username" class="text-sm font-semibold text-blue-600">{{ post.category }} Name:</label>
                        <h1 class="text-2xl font-light" id="username" name="username">{{ post.name }}</h1>
                    </div>

                    <div class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
                        <label for="email" class="text-sm font-semibold text-blue-600">{{ post.category }} Description:</label>
                        <h1 class="text-2xl font-light" id="email" name="email">{{ post.description }}</h1>
                    </div>

                    <div class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
                        <label for="email" class="text-sm font-semibold text-blue-600">Address / Directions:</label>
                        <h1 class="text-2xl font-light" id="email" name="email">{{ post.directions }}</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['id'],
    data() {
        return {
            post: [],
            errors: [],
            likes: '',
            liked: false,
        };
    },
    methods: {
        SetPage(page) {
            this.$emit('SetPage', page);
        },
        async likeSkatepark() {
            console.log('like');
            await axios({
                method: 'post',
                url: `http://192.168.1.19:5000/api/skateparks/like/${this.post._id}`,
                headers: {
                    Authorization: `Bearer ${window.localStorage.authToken}`,
                },
            }).then((response) => {
                this.liked = true;
                console.log(response);
                this.likes++;
            }).catch((error) => {
                this.errors.push(error);
                console.log(error);
            });
        },
    },
    async created() {
        await axios.get(`http://192.168.1.19:5000/api/skateparks/single/${this.id}`)
        .then((response) => {
            this.post = response.data.info;
            this.likes = response.data.likes;
        })
        .catch((error) => {
            this.errors.push(error);
        });
        await axios({
            method: 'get',
            url: `http://192.168.1.19:5000/api/skateparks/checklike/${this.post._id}`,
            headers: {
                Authorization: `Bearer ${window.localStorage.authToken}`,
            },
            })
            .then((response) => {
                this.liked = response.data.liked;
            })
            .catch((error) => {
                this.errors.push(error);
            });
    },
};
</script>
