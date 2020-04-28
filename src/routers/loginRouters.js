import asyncComponent from '../components/asyncComponent'

const Login = asyncComponent(() => import('../views/login'))

const routerList = [
    {
        path: '/login',
        name: 'Login',
        exact: true,
        component: Login
    }
]
export default routerList