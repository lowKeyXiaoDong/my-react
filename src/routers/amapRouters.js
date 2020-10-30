import asyncComponent from '../components/asyncComponent'

const AmapPage = asyncComponent(() => import('../views/amap'))

const routerList = [
  {
    path: '/amap',
    name: 'Amap',
    exact: true,
    component: AmapPage,
  },
]
export default routerList
