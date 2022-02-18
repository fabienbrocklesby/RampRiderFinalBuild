<template>
    <div>
        <form @submit.prevent="submitForm">
            <div>
                <label for="email">Email:</label><br>
                <input id="email" type="email" v-model="email" required/>
            </div>

            <button type="submit">Send Request</button>

        </form>

        <div v-if="response">
            <p>{{ response.data.message }}</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
    data() {
        return {
            posts: [],
            errors: [],
            email: '',
            response: '',
        }
    },
    methods: {
        submitForm() {
            axios({
                method: 'post', 
                url: 'http://localhost:5000/api/users/forgot',
                data:{
                    email: this.email,
                },
            }).then(response => {
                console.log(response)
                this.response = response;
            }).catch(e => {
                this.errors.push(e)
            })
        }
    }
    }
</script>