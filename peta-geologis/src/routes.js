import Index from './components/Index.vue'
import Peta from './components/Peta.vue'
import Detail from './components/Detail.vue'
import Register from './components/Register.vue'

import Admin from './components/admin/Admin.vue'
// import AdminTable from './components/admin/AdminTable.vue'
import AdminPeta from './components/admin/AdminPeta.vue'

export const routes = [
    { path: '/', component: Index },
    { path: '/peta', component: Peta },
    { path: '/peta/:id', component: Detail },
    
    { path: '/admin', component: Admin, children:[
        { path: 'peta/', component: AdminPeta },
        // { path: 'table/', component: AdminTable },
        ]},
    
    { path: '/register', component: Register },
]