<template>
    <div class="fadeContent">
        <div v-if="loading === false" class="loadContentPage">
            <button
                @click="SetPage('GetSkateparksPage')"
                class="mt-4 px-2 ml-2 w-15 leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-gray-900 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center justify-center items-center font-medium focus:outline-none"
            >Back</button>
            <div class="container mx-auto p-4 bg-white">
                <div class="w-full md:w-1/2 lg:w-2/3 mx-auto my-12">
                    <h1 class="text-2xl font-semibold px-4 pt-3">{{ post.category }}</h1>
                    <h1 class="text-lg font-normal px-4 pb-3">Posted By {{ user.name }}</h1>
                    <div class="flex">
                        <span class="inline-flex items-center px-4 ml-4 justify-center px-2 h-5 mr-2 text-xs font-bold leading-none text-red-100 bg-blue-500 rounded-full">{{ post.location }}</span>
                        <span class="inline-flex items-center px-4 justify-center px-2 h-5 mr-2 text-xs font-bold leading-none text-red-100 bg-blue-500 rounded-full">{{ post.size }}</span>
                    </div>
                    <div class="flex flex-col mt-2">
                        <div class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
                            <img :src="post.image" alt="skatepark" class="fade w-auto h-auto rounded-md">
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
                    <div>
                        <h1 name="title" class="text-2xl ml-2 text-blue-600 font-semibold mt-20">Create Review</h1>
                        <form @submit.prevent="createReview">
                            <input
                            type="text"
                            name="title"
                            v-model="reviewData.title"
                            class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                            placeholder="Review Title"
                            />
                            <input
                            type="text"
                            name="body"
                            v-model="reviewData.body"
                            class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                            placeholder="Review Description / Body"
                            />
                            <select
                                class="select mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm text-gray-500"
                                name="rating"
                                v-model="reviewData.rating">
                                    <option>Select A Rating Out Of 5</option>
                                    <option value="1">1 / 5</option>
                                    <option value="2">2 / 5</option>
                                    <option value="3">3 / 5</option>
                                    <option value="4">4 / 5</option>
                                    <option value="5">5 / 5</option>
                            </select>
                            <span v-if="reviewData.rating !== 'Select A Rating Out Of 5'" class="text-yellow-600">{{ reviewData.rating }}<i class="bi bi-star-fill ml-1"></i></span>
                            <button
                                type="submit"
                                class="mt-4 px-4 py-3 leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
                            >
                                Post Review
                            </button>
                            <div v-if="response === 'Invalid data' || response === 'Please Fill Out All Fields'" class="text-red-600 pt-2 pl-1 font-light text-sm ">
                                <p>{{ response }}</p>
                            </div>
                            <div v-else class="pt-2 pl-1 font-light text-sm text-lime-500">
                                <p>{{ response }}</p>
                            </div>
                        </form>
                    </div>
                    <h1 name="title" class="text-2xl text-blue-600 font-semibold mt-20">Reviews</h1>
                    <div v-for="review in reviews" :key="review._id" class="px-4 py-3 mt-14 w-full border-l-4 border-gray-400 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
                        <div>
                            <label for="title" class="text-sm font-semibold text-blue-600">Review Title:</label>
                            <h1 name="title" class="text-2xl font-light">{{ review.title }}</h1>
                        </div>
                        <div class="mt-2">
                            <label for="body" class="text-sm font-semibold text-blue-600">Review Description:</label>
                            <h1 name="body" class=" text-xl font-light">{{ review.body }}</h1>
                        </div>
                        <div class="mt-2">
                            <span class="text-yellow-600">{{ review.rating }}<i class="bi bi-star-fill ml-1"></i></span>
                        </div>
                        <div class="flex mt-3">
                            <label for="username" class="text-sm font-bold text-blue-600">Posted By:</label>
                            <h1 name="username" class="text-sm font-light ml-2">{{ review.username }}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="loading === true">
            <button
                @click="SetPage('GetSkateparksPage')"
                class="mt-4 px-2 ml-2 w-15 leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-gray-900 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center justify-center items-center font-medium focus:outline-none"
            >Back</button>
            <div class="container mx-auto p-4 bg-white">
                <div class="w-full md:w-1/2 lg:w-2/3 mx-auto my-12">
                    <header class="text-xl font-extrabold p-3 pl-2 mt-3 ml-4 bg-gray-400 rounded-lg w-20"></header>
                    <header class="text-xl font-extrabold p-3 pl-2 mt-1 ml-4 bg-gray-400 rounded-lg w-64"></header>
                    <div class="flex mt-2">
                        <span class="inline-flex items-center px-4 ml-4 justify-center px-2 h-5 mr-2 text-xs font-bold leading-none text-gray-400 bg-gray-400 rounded-full">-----------------</span>
                        <span class="inline-flex items-center px-4 justify-center px-2 h-5 mr-2 text-xs font-bold leading-none text-gray-400 bg-gray-400 rounded-full">-----</span>
                    </div>
                    <div class="flex flex-col mt-2">
                        <div class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
                            <img src="data;," alt="" class="fade w-full bg-gray-400 h-40 rounded-md">
                        </div>
                        <div class="px-4 mt-2 flex text-xl text-yellow-600">
                            <header class="text-xl font-extrabold p-3 pl-2 mt-3 ml-4 bg-gray-400 rounded-lg w-20"></header>
                        </div>
                        <div class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
                            <header class="text-xl font-extrabold p-3 pl-2 mt-3 ml-4 bg-gray-400 rounded-lg w-20"></header>
                            <header class="text-xl font-extrabold p-3 pl-2 mt-1 ml-4 bg-gray-400 rounded-lg w-64"></header>
                        </div>
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
            reviews: [],
            likes: '',
            liked: false,
            reviewData: {
                title: '',
                body: '',
                rating: 'Select A Rating Out Of 5',
            },
            user: '',
            loading: true,
            response: '',
        };
    },
    methods: {
        SetPage(page) {
            this.$emit('SetPage', page);
        },
        async likeSkatepark() {
            await axios({
                method: 'post',
                url: `/api/skateparks/like/${this.post._id}`,
                headers: {
                    Authorization: `Bearer ${window.localStorage.authToken}`,
                },
            }).then((response) => {
                this.liked = true;
                this.likes++;
            }).catch((error) => {
                this.errors.push(error);
                console.log(error);
            });
        },
        createReview() {
            if (this.reviewData.title && this.reviewData.body && this.reviewData.rating) {
                axios({
                    method: 'post',
                    url: `/api/reviews/${this.post._id}`,
                    headers: {
                        Authorization: `Bearer ${window.localStorage.authToken}`,
                    },
                    data: {
                        title: this.reviewData.title,
                        body: this.reviewData.body,
                        rating: this.reviewData.rating,
                    },
                    }).then((response) => {
                        this.reviewData = {
                            title: '',
                            body: '',
                            rating: 'Select A Rating Out Of 5',
                        };
                        this.response = 'Review Created';
                        this.reviews.push(response.data);
                        this.reviews.reverse();
                    })
                .catch((error) => {
                    this.errors.push(error);
                    this.response = 'Invalid data';
                });
            } else {
                this.response = 'Please Fill Out All Fields';
            }
        },
    },
    async created() {
        await axios.get(`/api/skateparks/single/${this.id}`)
        .then((response) => {
            this.post = response.data.info;
            this.reviews = response.data.reviews;
            this.reviews.reverse();
            this.likes = response.data.likes;
        })
        .catch((error) => {
            this.errors.push(error);
        });
        await axios.get(`/api/users/getbyid/${this.post.user_id}`)
            .then((response) => {
                this.user = response.data;
            })
            .catch((error) => {
                this.errors.push(error);
            });
        await axios({
            method: 'get',
            url: `/api/skateparks/checklike/${this.post._id}`,
            headers: {
                Authorization: `Bearer ${window.localStorage.authToken}`,
            },
            })
            .then((response) => {
                this.liked = response.data.liked;
                this.loading = false;
            })
            .catch((error) => {
                this.errors.push(error);
            });
    },
};
</script>

<style>
    .fadeContent{
        animation: fadeInAnimation ease 1.5s;
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
    .select{
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        padding: 0.75rem;
    }
</style>
