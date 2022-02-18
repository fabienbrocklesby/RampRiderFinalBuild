<template>
    <div>
        <form @submit.prevent="find">
            <input type="text" v-model="search" placeholder="Search for a skatepark">
            <button type="submit">Search</button>
        </form>
    </div>
    <div>
        <h2>{{ posts.length }} results found</h2>
        <div v-if="posts != ''">
            <div v-if="user">
                <h3>{{ user.name }}</h3>
            </div>
            <div v-for="post in posts" :key="post.id">
                <h1>{{ post.name }}</h1>
                <p>{{ post.description }}</p>
                <p>{{ post.location }}</p>
                <p v-if="post.size">{{ post.size }} Skatepark</p>
                <img :src="post.image" />
            </div> 
            <div v-if="likes > 0">
                <h3>{{ likes }} like(s)</h3>
            </div>
            <div v-if="!likes">
                <h3>No likes yet!</h3>
            </div>
            <div v-if="liked == false">
                <button @click="likeSkatepark">Like Skatepark</button>
                <div v-if="likeMessage">
                    <p>{{ likeMessage }}</p>
                </div>
            </div>
            <div v-if="posts.reviews.length > 0" style="padding-top: 50px">
                <h1>Reviews: </h1>
                <div v-for="review in posts.reviews" :key="review.id">
                    <h2>{{ review.title }}</h2>
                    <p>{{ review.body }}</p>
                    <p>{{ review.rating }} / 5 Star Rating</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    emits: ["postId"],
    data() {
        return {
            posts: [],
            errors: [],
            search: '',
            user: '',
            likes: '',
            likeMessage: '',
            liked: '',
            reviews: [],
        }
    },
    
    methods: {
        async find() {
            await axios.get(`http://localhost:5000/api/skateparks/single/${this.search}`)
            .then(response => {
                this.posts = response.data
                this.$emit('postId', response.data.info._id)
                this.likes = response.data.likes
                this.reviews = response.data.reviews
            })
            .catch(e => {
                this.errors.push(e)
            })
            await axios.get(`http://localhost:5000/api/users/getbyid/${this.posts.info.user_id}`)
            .then(response => {
                this.user = response.data
            })
            .catch(e => {
                this.errors.push(e)
            })
            await axios({
                method: 'get',
                url: `http://localhost:5000/api/skateparks/checklike/${this.posts.info._id}`,
                headers: {
                    'Authorization': `Bearer ${window.localStorage.authToken}`,
                },
            })
            .then(response => {
                this.liked = response.data.liked
            })
            .catch(e => {
                this.errors.push(e)
            })
        },
        async likeSkatepark() {
            if (window.localStorage.authToken != null) {
                await axios({
                    method: 'post', 
                    url: `http://localhost:5000/api/skateparks/like/${this.posts.info._id}`,
                    headers: {
                        'Authorization': `Bearer ${window.localStorage.authToken}`,
                    },
                }).then(response => {
                    this.likeMessage = response.data.message
                }).catch(e => {
                    this.errors.push(e)
                    this.likeMessage = 'You have already liked this skatepark!'
                })
            }
        }
    }
}
</script>