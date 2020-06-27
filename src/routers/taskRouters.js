import asyncComponent from '../components/asyncComponent'

const Task = asyncComponent(() => import('../views/task'))

const routerList = [
    {
        path: '/task',
        name: 'Task',
        exact: true,
        component: Task
    }
]
export default routerList