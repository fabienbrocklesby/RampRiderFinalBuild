<template>
    <center>
        <div class="mt-10 fade">
            <div v-for="post in posts" :key="post.id" style="cursor: pointer;" @click="this.$emit('FindMore', post._id)" class="shadow text-left bg-white mb-14 ROUNDED max-w-4xl">
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
                    @click="this.$emit('FindMore', post._id)"
                    class="py-2 px-4 mt-5 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600">
                    Find Out More
                    </button>
                </footer>
            </div>
        </div>
    </center>
</template>

<script>

export default {
    props: ['posts'],
    data() {
        return {
            errors: [],
        };
    },
};
</script>

<style>
    .fade {
        animation: fadeInAnimation ease 1s;
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
