import './assets/main.css'

import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import Portal from 'portal-vue'

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.provide('$frontendUrl', import.meta.env.VITE_FE_URL)

app.use(router)
app.use(store)
app.use(Portal)
app.use(Antd)

app.mount('#app')
