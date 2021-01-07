import asyncComponent from '../components/asyncComponent'

const KkbHome = asyncComponent(() => import('../views/kkb/home'))
const FromIndex = asyncComponent(() => import('../views/kkb/form'))
const ReduxPage = asyncComponent(() => import('../views/kkb/redux/reduxPage'))
const App = asyncComponent(() => import('./kkbRouters'))

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
  },
  {
    path: '/reduxPage',
    name: 'ReduxPage',
    exact: true,
    component: ReduxPage
  },
  {
    path: '/app',
    name: 'App',
    exact: true,
    component: App
  }
]
export default routerList