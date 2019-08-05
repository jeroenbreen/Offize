import Vue from 'vue';
import store from './store';
import app from './app';
import VueRouter from 'vue-router';

import projects from '@components/pages/projects/projects';
import clients from '@components/pages/clients/clients';


// routing
Vue.use(VueRouter);
const routes = [
    { path: '/', component: projects },
    { path: '/projects', component: projects },
    { path: '/clients', component: clients },
];
const router = new VueRouter({
    routes
});

// google material for Vue
// import VueMaterial from 'vue-material'
// Vue.use(VueMaterial);

new Vue({
    el: '#app',
    store,
    router,
    components: {
        app
    },
    template: '<app/>'
});