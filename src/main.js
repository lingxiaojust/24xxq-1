import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import pinia from './store'
import Antd from 'ant-design-vue';
import "./style.css";
import "./output.css";
import 'ant-design-vue/dist/reset.css';
const app=createApp(App)
//链式调用
app.use(router)
app.use(pinia)
app.use(Antd)
app.mount('#app')
