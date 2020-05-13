import asyncComponent from '../components/asyncComponent'

const Upload = asyncComponent(() => import('../views/upload'))

const routerList = [
  {
    path: '/upload',
    name: 'Upload',
    exact: true,
    component: Upload
  }
]
export default routerList