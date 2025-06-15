import { createRouter, createWebHistory } from 'vue-router'


import AddKas from '@/views/bendahara/AddKas.vue'
import UserCrudView from '@/views/Ketua/UserCrudView.vue'
import LoginAdmin from '@/views/auth/LoginAdmin.vue'
import UserEdit from '@/components/Ketua/UserEdit.vue'
import DashboardView from '@/views/bendahara/DashboardView.vue'
import KeuanganEdit from '@/components/Bendahara/KeuanganEdit.vue'
import SekretarisCrudView from '@/views/Sekretaris/SekretarisCrudView.vue'
import SekretarisEdit from '@/components/Sekretaris/SekretarisEdit.vue'
import SekretarisDashboard from '@/views/Sekretaris/SekretarisDashboard.vue'
import AsetCrudView from '@/views/Aset_It/AsetCrudView.vue'
import AsetDashboard from '@/views/Aset_It/AsetDashboard.vue'
import AsetEdit from '@/components/Aset_It/AsetEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name: 'login',
      component: LoginAdmin
    },
 
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  
    {
      path:'/ketua/user',
      name: 'ketuaAddUser',
      component: UserCrudView
    },
    
    {
      path:'/user-edit/:id',
      name: 'ketuaEditUser',
      component: UserEdit
    },
//        BENDAHARA
    {
      path:'/bendahara/keuangan',
      component:AddKas
    },
    {
      path:'/bendahara/dashboard',
      component:DashboardView
    },
    {
      path:'/keuangan-edit/:id',
      component:KeuanganEdit
    },
    // SEKRE
    {
      path:'/sekretaris/arsip',
      component:SekretarisCrudView
    },
    {
      path:'/sekretaris/dashboard',
      component:SekretarisDashboard
    },
    {
      path:'/sekretaris-edit/:id',
      component:SekretarisEdit
    },
    // ASET IT
    {
      path:'/sekretaris/arsip',
      component:SekretarisCrudView
    },
    {
      path:'/sekretaris/dashboard',
      component:SekretarisDashboard
    },
    {
      path:'/sekretaris-edit/:id',
      component:SekretarisEdit
    },
    // ASET IT
    {
      path:'/aset-it/inventori',
      component:AsetCrudView
    },
    {
      path:'/aset-it/dashboard',
      component:AsetDashboard
    },
    {
      path:'/aset-it-edit/:id',
      component:AsetEdit
    },
  ],
})

export default router
