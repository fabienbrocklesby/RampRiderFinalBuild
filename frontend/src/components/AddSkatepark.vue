<template>
  <div>
    <input
      ref="fileInput"
      type="file"
      @input="pickFile()">

    <button @click="submitImage()">Submit</button>

    <div
      v-if="previewImage"
      class="imagePreviewWrapper"
      :style="{ 'background-image': `url(${previewImage})`, 'width': '100px','height': '100px' }">
    </div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label><br>
        <input id="name" type="text" v-model="name" required>
      </div>
      <div>
        <label for="size">Size:</label><br>
        <select name="size" v-model="size" id="size">
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
      <div>
        <label for="description">Description:</label><br>
        <input id="description" type="text" v-model="description" required>
      </div>
      <div>
        <label for="location">Location:</label><br>
        <input id="location" type="text" v-model="location" required>
      </div>

      <button type="submit">Create Skatepark</button>
    </form>
  </div>
</template>
 
<script>
import axios from 'axios';

export default {
  data() {
    return {
      previewImage: null,
      imageUrl: '',
      imageName: '',
      name: '',
      size: '',
      description: '',
      location: '',
    };
  },
  methods: {
      pickFile () {
        let input = this.$refs.fileInput
        let file = input.files
        this.imageName = input.files.item(0).name
        if (file && file[0]) {
          let reader = new FileReader
          reader.onload = e => {
            this.previewImage = e.target.result
          }
          reader.readAsDataURL(file[0])
          this.$emit('input', file[0])
        }
      },
      submitImage () {
        axios({
            method: 'post', 
            url: 'https://api.cloudinary.com/v1_1/fabienbrocklesby/image/upload',
            data:{
                file: this.previewImage,
                upload_preset: 'b9ej8dr5',
                public_id: this.imageName,
                api_key: process.env.VUE_APP_API_KEY,
            },
            }).then(response => {
                console.log(response)
                this.imageUrl = response.data.secure_url
            })
            .catch(e => {
                this.errors.push(e)
            })
        },
        submitForm () {
          axios({
            method: 'post', 
            url: 'http://localhost:5000/api/skateparks',
            headers: {
                'Authorization': `Bearer ${window.localStorage.authToken}`,
            },
            data: {
              name: this.name,
              size: this.size,
              description: this.description,
              location: this.location,
              image: this.imageUrl,
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
 
<style scoped lang="scss">
.imagePreviewWrapper {
    width: 250px;
    height: 250px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}
</style>