<template>
    <center>
        <div class="text-left max-w-4xl mt-14 columns-1">
            <span><a @click="changeOptions()"><button class="py-2 px-2 ml-2 rounded-lg text-black font-semibold hover:bg-gray-300">Filter By</button><i v-if="openOptions === false" class="bi bi-arrow-up text-lg"></i><i v-if="openOptions === true" class="bi bi-arrow-down text-lg"></i></a></span><br />
            <div v-if="openOptions === true" class="ml-2">
                <p class="text-lg pl-1 ml-1">Filter By:</p>
                <select
                    class="text-lg ml-1 break-after-column"
                    v-model="selected"
                    @input="FilterByAdded($event.target.value)">
                    <option>Newest Added</option>
                    <option>Oldest Added</option>
                </select><br />
                <select
                    class="text-lg w-40 ml-1 break-after-column"
                    v-bind:value="location"
                    @input="FilterByLocation($event.target.value)">
                    <option>All Regions</option>
                    <option>Northland, New Zealand</option>
                    <option>Auckland, New Zealand</option>
                    <option>Waikato, New Zealand</option>
                    <option>Bay of Plenty, New Zealand</option>
                    <option>Gisborne, New Zealand</option>
                    <option>Hawke's Bay, New Zealand</option>
                    <option>Taranaki, New Zealand</option>
                    <option>Manawatū-Whanganui, New Zealand</option>
                    <option>Wellington, New Zealand</option>
                    <option>Tasman, New Zealand</option>
                    <option>Nelson, New Zealand</option>
                    <option>Malborough, New Zealand</option>
                    <option>West Coast, New Zealand</option>
                    <option>Canterbury, New Zealand</option>
                    <option>Otago, New Zealand</option>
                    <option>Southland, New Zealand</option>
                </select><br />
                <select
                    class="text-lg ml-1 break-after-column"
                    v-bind:value="category"
                    @input="FilterByCategory($event.target.value)">
                    <option>All Categories</option>
                    <option>Skatepark</option>
                    <option value="Spot">Street Spot</option>
                </select><br />
            </div>
            <button
                v-if="IsLoggedIn === true"
                @click="SetPage('AddSkateparkPage')"
                class="py-2 px-4 mx-2 mt-5 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600">
                Add Skatepark / Spot
            </button>
        </div>
        <div class="mt-10">
            <div v-for="post in posts" :key="post.id" class="shadow text-left bg-white mb-14 ROUNDED max-w-4xl">
                <img
                    :src="post.image"
                    alt=""
                    class="rounded-t h-60 w-full object-cover"
                />
                <!--Card Header-->
                <header class="text-xl font-extrabold p-5 ml-4">{{ post.name }}</header>
                <div class="px-5">
                    <p class="text-gray-500 px-4">
                        {{ post.description }}
                    </p>
                </div>
                <!--Card Footer-->
                <footer class="text-left py-3 px-8 text-gray-500">
                    <button
                    @click="FindMore(post._id)"
                    class="py-2 px-4 mt-5 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600">
                    Find Out More
                    </button>
                </footer>
            </div>
        </div>
    </center>
</template>

<script>
import axios from 'axios';

export default {
    props: ['IsLoggedIn'],
    data() {
        return {
            posts: [],
            errors: [],
            selected: 'Newest Added',
            location: 'All Regions',
            category: 'All Categories',
            openOptions: false,
        };
    },

    methods: {
        SetPage(page) {
            this.isOpen = false;
            this.$emit('SetPage', page);
        },
        changeOptions() {
            this.openOptions = !this.openOptions;
        },
        FilterByAdded(selected) {
            this.selected = selected;
            this.posts.reverse();
        },
        FindMore(id) {
            if (window.localStorage.authToken) {
                this.$emit('SetPage', 'GetSkateparkPage');
                this.$emit('FindMore', id);
            } else {
                this.$emit('SetPage', 'LoginPage');
            }
        },
        FilterByCategory(category) {
            this.category = category;
            if (category === 'All Categories') {
                axios.get('http://192.168.1.19:5000/api/skateparks')
                .then((response) => {
                    console.log(response);
                    this.posts = response.data;
                    this.posts.reverse();
                })
                .catch((error) => {
                    this.errors.push(error);
                });
            } else {
                axios({
                    method: 'get',
                    url: `http://192.168.1.19:5000/api/skateparks/category/${category}`,
                })
                .then((response) => {
                    this.posts = response.data;
                    this.posts.reverse();
                })
                .catch((error) => {
                    this.errors.push(error);
                });
            }
        },
        FilterByLocation(location) {
            this.location = location;
            if (location === 'All Regions') {
                axios.get('http://192.168.1.19:5000/api/skateparks')
                .then((response) => {
                    console.log(response);
                    this.posts = response.data;
                    this.posts.reverse();
                })
                .catch((error) => {
                    this.errors.push(error);
                });
            } else {
                axios({
                    method: 'post',
                    url: 'http://192.168.1.19:5000/api/skateparks/location',
                    data: {
                        location,
                    },
                })
                .then((response) => {
                    console.log(response);
                    this.posts = response.data;
                    console.log(this.posts);
                    this.posts.reverse();
                })
                .catch((error) => {
                    this.errors.push(error);
                });
            }
        },
    },

    created() {
        axios.get('http://192.168.1.19:5000/api/skateparks')
        .then((response) => {
            console.log(response);
            this.posts = response.data;
            this.posts.reverse();
        })
        .catch((error) => {
            this.errors.push(error);
        });
    },
};
</script>
