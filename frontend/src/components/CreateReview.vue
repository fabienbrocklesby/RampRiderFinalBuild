<template>
    <div>
        <form @submit.prevent="submitForm">
            <div>
                <label for="title">Review Title:</label><br>
                <input id="title" type="text" v-model="title" required/>
            </div>
            <div>
                <label for="body">Review Body:</label><br>
                <input id="body" type="text" v-model="body" required/>
            </div>
            <div>
                <label for="rating">Skatepark Rating:</label><br>
                <input id="rating" type="text" v-model="rating" required/>
            </div>

            <button type="submit">Submit Review</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
    props: ["postData"],
    data() {
        return {
            posts: [],
            errors: [],
            title: '',
            body: '',
            rating: '',
        }
    },
    methods: {
        submitForm() {
            console.log(this.rating)
            axios({
                method: 'post', 
                url: `http://localhost:5000/api/reviews/${this.postData}`,
                headers: {
                    'Authorization': `Bearer ${window.localStorage.authToken}`,
                },
                data:{
                    title: this.title,
                    body: this.body,
                    rating: this.rating,
                },
                }).then(response => {

                console.log(response)
            })
            .catch(e => {
                this.errors.push(e)
            })
        }
    }
    }
</script>