<template>
    <div>
        <form @submit.prevent="submitForm">
            <div>
                <label for="email">Email:</label><br>
                <input id="email" type="email" v-model="email" required/>
            </div>
            <div>
                <label for="password">Password</label><br>
                <input id="password" type="password" v-model="password" required/>
            </div>

            <button type="submit">Login</button>
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
            email: '',
            password: '',
        }
    },
    methods: {
        submitForm() {
            axios({
                method: 'post', 
                url: 'http://localhost:5000/api/users/login',
                data:{
                    email: this.email,
                    password: this.password,
                },
            }).then(response => {
                localStorage.setItem("authToken", response.data.token);
            }).catch(e => {
                this.errors.push(e)
            })
        }
    }
    }
</script>