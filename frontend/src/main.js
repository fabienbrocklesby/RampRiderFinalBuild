import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import dotenv from 'dotenv'

dotenv.config()

createApp(App).mount('#app')
