<template>
    <div style="margin-top: 50px">
        <form @submit.prevent="submitForm">
            <div>
                <label for="code">Reset Code:</label><br>
                <input id="code" type="text" v-model="code" required/>
            </div>

            <div>
                <label for="password">Password</label><br>
                <input id="password" type="password" v-model="password" required/>
            </div>


            <button type="submit">Reset Password</button>

        </form>

        <div v-if="response">
            <p>{{ response.data.message }}</p>
        </div>

        <div v-if="errors">
            <p>{{ errors }}</p>
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
            code: '',
            password: '',
            response: '',
        }
    },
    methods: {
        submitForm() {
            axios({
                method: 'post', 
                url: 'http://localhost:5000/api/users/update',
                data:{
                    password: this.password,
                    resetToken: this.code,
                },
            }).then(response => {
                console.log(response)
                this.response = response;
            }).catch(e => {
                this.errors = e;
                this.errors.push(e)
            })
        }
    }
    }
</script>