import asyncComponent from '../components/asyncComponent'

const KkbHome = asyncComponent(() => import('../views/kkb/home'))
const FromIndex = asyncComponent(() => import('../views/kkb/form'))

const routerList = [
  {
    path: '/kkbHome',
    name: 'KkbHome',
    exact: true,
    component: KkbHome
  },
  {
    path: '/fromIndex',
    name: 'FromIndex',
    exact: true,
    component: FromIndex
  }
]
export default routerList