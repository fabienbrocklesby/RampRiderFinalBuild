<template>
    <div>
        <p>{{ posts }} </p>
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
        axios.get(`http://localhost:5000/api/users/me`, {
            headers: {
                'Authorization': `Bearer ${window.localStorage.authToken}`
            }
        })
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