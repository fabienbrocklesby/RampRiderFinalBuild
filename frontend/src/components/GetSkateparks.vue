<template>
    <div>
        <h1>Newest added</h1>
        <div v-for="post in posts" :key="post.id">
            <h2>{{ post.name }}</h2>
            <p>{{ post.description }}</p>
        </div> 
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
    data() {
        return {
        posts: [],
        errors: []
        }
    },

    created() {
        axios.get(`http://localhost:5000/api/skateparks`)
        .then(response => {
            this.posts = response.data
            this.posts.reverse()
        })
        .catch(e => {
            this.errors.push(e)
        })
    }
    }
</script>