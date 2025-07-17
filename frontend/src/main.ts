import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'

import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
