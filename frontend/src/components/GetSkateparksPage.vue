<template>
    <center>

        <div class="text-left max-w-4xl mt-10">
            <p class="text-lg pl-1 ml-1">Filter By:</p>
            <select
                class="text-lg ml-1"
                v-model="selected"
                @input="FilterByAdded($event.target.value)">
                <option>Newest Added</option>
                <option>Oldest Added</option>
            </select>
            <select
                class="text-lg w-40 ml-4"
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
            </select>
        </div>
        <div>
            <div v-for="post in posts" :key="post.id" class="shadow text-left bg-white mt-14 ROUNDED max-w-4xl">
                <img
                    :src="post.image"
                    alt=""
                    class="rounded-t h-60 w-full object-cover"
                />
                <!--Card Header-->
                <header class="text-xl font-extrabold p-4 ml-4">{{ post.name }}</header>
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
    data() {
        return {
            posts: [],
            errors: [],
            selected: 'Newest Added',
            location: 'All Regions',
        };
    },

    methods: {
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
