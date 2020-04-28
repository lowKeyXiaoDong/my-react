import asyncComponent from '../components/asyncComponent'

const Home = asyncComponent(() => import('../views/home'))

const routerList = [
    {
        path: '/home',
        name: 'Home',
        exact: true,
        component: Home
    }
]
export default routerList