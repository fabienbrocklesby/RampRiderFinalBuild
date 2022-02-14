<template>
    <div>
        <form @submit.prevent="submitForm">
            <div>
                <label for="name">Name:</label><br>
                <input id="name" type="text" v-model="name" required/>
            </div>
            <div>
                <label for="email">Email:</label><br>
                <input id="email" type="email" v-model="email" required/>
            </div>
            <div>
                <label for="password">Password</label><br>
                <input id="password" type="password" v-model="password" required/>
            </div>

            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
    data() {
        return {
            posts: [],
            errors: [],
            name: '',
            email: '',
            password: '',
        }
    },
    methods: {
        submitForm() {
            axios({
                method: 'post', 
                url: 'http://localhost:5000/api/users',
                data:{
                    name: this.name,
                    email: this.email,
                    password: this.password,
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