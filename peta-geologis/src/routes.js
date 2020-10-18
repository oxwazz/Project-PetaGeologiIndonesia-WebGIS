import Index from './components/Index.vue'
import Peta from './components/Peta.vue'
import Detail from './components/Detail.vue'
import Admin from './components/admin/Admin.vue'

export const routes = [
    { path: '/', component: Index },
    { path: '/peta', component: Peta },
    { path: '/peta/:id', component: Detail },

    { path: '/admin', component: Admin },
]