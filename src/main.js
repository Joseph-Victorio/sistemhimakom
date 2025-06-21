import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'


import { OhVueIcon, addIcons } from 'oh-vue-icons'

import { GiMoneyStack, GiPayMoney, GiReceiveMoney, HiPencilAlt, MdDeleteforever, MdKeyboardbackspaceSharp } from 'oh-vue-icons/icons'

addIcons(GiMoneyStack, GiPayMoney, GiReceiveMoney, HiPencilAlt, MdDeleteforever, MdKeyboardbackspaceSharp);

const app = createApp(App)
app.component('v-icon', OhVueIcon)

app.use(router)
app.use(Vue3Toastify)

app.mount('#app')
