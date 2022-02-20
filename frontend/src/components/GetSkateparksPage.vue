<template>
    <center>
        <div class="text-left max-w-4xl mt-10 flex">
            <p class="text-lg pl-1">Filter By</p>
            <select class="text-lg">
                <option value="">Newest Added</option>
                <option value="">Oldest Added</option>
            </select>
        </div>
        <div>
            <div  v-for="post in posts" :key="post.id" class="shadow text-left bg-white mt-14 ROUNDED max-w-4xl">
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
        };
    },

    created() {
        axios.get('http://localhost:5000/api/skateparks')
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
