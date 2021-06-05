import {
  ElMenuItem
} from 'element-plus'
import {
  createRouter,
  createWebHistory
} from 'vue-router'
import tools from '../utils/js/tools'

import Home from '../views/Home'
const Register = () => import('../components/Register')
const Login = () => import('../components/Login')

const User = () => import('../views/User')
const UserMenu = () => import('../components/User/Menu.vue')
const UserOrder = () => import('../components/User/Order.vue')

const Admin = () => import('../views/Admin')
const CustomerOrder = () => import('../components/Admin/CustomerOrder.vue')
const MenuManagement = () => import('../components/Admin/MenuManagement.vue')


const routes = [{
    path: '/',
    name: 'Home',
    meta: {
      title: '首页'
    },
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: '注册'
    },
    component: Register
  },
  {
    path: '/user',
    name: 'User',
    meta: {
      title: '菜单'
    },
    component: User,
    children: [{
        path: '',
        redirect: '/user/menu'
      },
      {
        path: '/user/menu',
        component: UserMenu
      },
      {
        path: '/user/order',
        component: UserOrder
      },
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      title: 'admin'
    },
    component: Admin,
    children: [{
        path: '',
        redirect: '/admin/customer-order'
      },
      {
        path: '/admin/customer-order',
        component: CustomerOrder
      },
      {
        path: '/admin/menu-management',
        component: MenuManagement
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(function (to, from, next) {
  if (to.name !== 'Login' && to.name !== 'Register' && to.name !== 'Home') {
    const email = tools.getCookie('orderLoginEmail')
    const password = tools.getCookie('orderLoginPassword')
    const loginType = tools.getCookie('orderLoginType')
    if (email && password && loginType) {
      document.title = to.matched[0].meta.title
      next()
    } else {
      next({
        name: 'Login'
      })
    }
  } else {
    document.title = to.matched[0].meta.title
    next()
  }

})

export default router