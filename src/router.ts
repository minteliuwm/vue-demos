import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/home/index.vue';
import Editor from './pages/editor/index.vue';
import Demo2 from './pages/demo2/index.vue';

Vue.use(Router);

const HomeRouter = [{
  path: '',
  redirect: 'editor'
}, {
  path: 'editor',
  name: 'Editor',
  component: Editor
}, {
  path: 'demo2',
  name: 'Demo2',
  component: Demo2
}];

const router = new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home,
    children: HomeRouter
  }]
});

export default router;
