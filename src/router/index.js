import { createRouter, createWebHistory } from 'vue-router';
import TaskList from '../components/TaskList.vue'
import TaskDetail from '../components/Details.vue'
import Auth from '../components/Auth.vue'

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/TaskList',
    name: 'TaskList',
    component: TaskList
  },
  {
    path: '/tasks/:id',
      name: 'Info',
      component: TaskDetail,
      props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;