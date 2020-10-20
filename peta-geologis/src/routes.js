import Index from './components/Index.vue'
import Peta from './components/Peta.vue'
import Detail from './components/Detail.vue'

import IndexAdmin from './components/admin/IndexAdmin.vue'
import Peta2 from './components/Peta2.vue'
import Table from './components/admin/Table.vue'

export const routes = [
    { path: '/', component: Index },
    { path: '/peta', component: Peta },
    { path: '/peta/:id', component: Detail },
    { path: '/admin', component: IndexAdmin, children:[
        
        { path: 'peta2/', component: Peta2 },
        { path: 'table/', component: Table },
    ] },

]