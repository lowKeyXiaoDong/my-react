import asyncComponent from '../components/asyncComponent'

const Login = asyncComponent(() => import('../views/login/index.jsx'))

const routerList = [
  {
    path: '/login',
    name: 'Login',
    exact: true,
    component: Login
  }
]
export default routerList