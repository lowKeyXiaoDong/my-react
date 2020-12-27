import asyncComponent from '../components/asyncComponent'

const KkbHome = asyncComponent(() => import('../views/kkb/home'))

const routerList = [
  {
    path: '/kkbHome',
    name: 'KkbHome',
    exact: true,
    component: KkbHome
  }
]
export default routerList