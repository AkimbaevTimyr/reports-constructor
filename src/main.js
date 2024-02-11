import { createApp } from 'vue'
import App from '@/App.vue'
import '@/assets/tailwind.css'
import VFocus from '@/directives/VFocus';

const app = createApp(App);

app.directive('focus', VFocus)

app.mount('#app')
