import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

interface ImportMeta {
  env: {
    GITHUB_AUTH_TOKEN: string;
    NODE_ENV: 'development' | 'production';
    PORT?: string;
    PWD: string;
  };
}

app.use(createPinia())
app.use(router)

app.mount('#app')
