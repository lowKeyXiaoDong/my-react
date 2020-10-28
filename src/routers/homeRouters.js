import asyncComponent from '../components/asyncComponent'

// const Home = asyncComponent(() => import('../views/home'))
const HxdReact = asyncComponent(() => import('../views/hxdReact'))

const routerList = [
    {
        path: '/home',
        name: 'Home',
        exact: true,
        component: HxdReact
    }
]
export default routerList