<template>
  <div class="addFade">
    <button
        @click="SetPage('GetSkateparksPage')"
        class="mt-4 px-2 ml-2 w-15 leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-gray-900 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center justify-center items-center font-medium focus:outline-none"
    >Back</button>
    <div class="container mx-auto p-4 bg-white">
        <div class="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
            <h1 class="text-lg font-bold">Add A Skatepark / Street Spot</h1>
            <div class="bg-slate-300 w-full">
                <label for="formFile" class="form-label inline-block mb-2 text-gray-700">Select Image Of Skatepark / Street Spot</label>
                <input
                ref="fileInput"
                class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm border border-solid border-gray-300"
                id="formFile"
                type="file"
                @input="pickFile()">

                <div class="mt-4 justify-start">
                    <img :src="previewImage" class="w-3/4 rounded-lg" />
                    <h1 class="text-green-500 mt-1" v-if="uploadMessage === 'Image Selected'">{{ uploadMessage }}</h1>
                    <h1 class="text-red-600 mt-1" v-if="uploadMessage === 'Please select an image'">{{ uploadMessage }}</h1>
                    <div v-if="submitted === false">
                        <button @click="submitImage()" class="mt-4 px-4 py-3 leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-1/2 justify-center items-center font-medium focus:outline-none">Select Image</button>
                    </div>
                </div>
            </div>

            <form @submit.prevent="submitForm" class="mt-5">
                <div>
                    <input id="name" type="text" v-model="name" placeholder="Skatepark / Spot Name" class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" required>
                </div>
                <div>
                    <input id="description" type="text" placeholder="Description" v-model="description" class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" required>
                </div>
                <div>
                    <input id="directions" type="text" v-model="directions" placeholder="Address Or Area Description" class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" required>
                </div>
                <div>
                    <select name="category" v-model="category" class="select mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" id="size">
                        <option>Select a category</option>
                        <option value="Skatepark">Skatepark</option>
                        <option value="Spot">Street Spot</option>
                    </select>
                </div>
                <div>
                    <select name="size" v-model="size" class="select mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" id="size">
                        <option>Select a size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </div>
                <div>
                    <select
                        id="location"
                        class="select mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                        v-model="location">
                        <option>Select a region</option>
                        <option>Northland, New Zealand</option>
                        <option>Auckland, New Zealand</option>
                        <option>Waikato, New Zealand</option>
                        <option>Bay of Plenty, New Zealand</option>
                        <option>Gisborne, New Zealand</option>
                        <option>Hawke's Bay, New Zealand</option>
                        <option>Taranaki, New Zealand</option>
                        <option>Manawatū-Whanganui, New Zealand</option>
                        <option>Wellington, New Zealand</option>
                        <option>Tasman, New Zealand</option>
                        <option>Nelson, New Zealand</option>
                        <option>Malborough, New Zealand</option>
                        <option>West Coast, New Zealand</option>
                        <option>Canterbury, New Zealand</option>
                        <option>Otago, New Zealand</option>
                        <option>Southland, New Zealand</option>
                    </select>
                </div>

                <button type="submit" class="mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none">Create Skatepark</button>
                <h1 class="text-red-600 mt-1" v-if="postMessage === 'Please enter valid data' || postMessage === 'Please fill in all fields'">{{ postMessage }}</h1>
            </form>
        </div>
    </div>
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
        size: 'Select a size',
        description: '',
        location: 'Select a region',
        directions: '',
        category: 'Select a category',
        uploadMessage: '',
        submitted: false,
        postMessage: '',
    };
  },
  methods: {
        SetPage(page) {
            this.$emit('SetPage', page);
        },
        pickFile() {
            this.submitted = false;
            this.uploadMessage = '';
            const input = this.$refs.fileInput;
            const file = input.files;
            this.imageName = input.files.item(0).name;
            if (file && file[0]) {
            const reader = new FileReader;
            reader.onload = (e) => {
                this.previewImage = e.target.result;
            };
            reader.readAsDataURL(file[0]);
            this.$emit('input', file[0]);
            }
        },
        submitImage() {
            if (this.imageName === '') {
                this.uploadMessage = 'Please select an image';
            } else {
                this.submitted = true;
                this.uploadMessage = 'Image Selected';
                axios({
                    method: 'post',
                    url: 'https://api.cloudinary.com/v1_1/fabienbrocklesby/image/upload',
                    data: {
                        file: this.previewImage,
                        upload_preset: 'b9ej8dr5',
                        public_id: this.imageName,
                        api_key: process.env.VUE_APP_API_KEY,
                    },
                    }).then((response) => {
                        this.imageUrl = response.data.secure_url;
                    })
                .catch((e) => {
                    this.errors.push(e);
                });
            }
        },
        submitForm() {
            if (this.imageUrl !== '' && this.name !== '' && this.size !== 'Select a size' && this.description !== '' && this.location !== 'Select a region' && this.directions !== '' && this.category !== 'Select a category') {
                axios({
                    method: 'post',
                    url: '/api/skateparks',
                    headers: {
                        Authorization: `Bearer ${window.localStorage.authToken}`,
                    },
                    data: {
                        name: this.name,
                        size: this.size,
                        description: this.description,
                        location: this.location,
                        image: this.imageUrl,
                        directions: this.directions,
                        category: this.category,
                    },
                    }).then((response) => {
                        this.$emit('SetPage', 'GetSkateparksPage');
                        this.postMessage = 'Skatepark created successfully';
                    })
                .catch((e) => {
                    this.errors.push(e);
                    this.postMessage = 'Please enter valid data';
                });
            } else {
                this.postMessage = 'Please fill in all fields';
            }
        },
    },
};
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

    .addFade {
            animation: fadeInAnimation ease .6s;
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

    .select{
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        padding: 0.75rem;
    }
</style>
