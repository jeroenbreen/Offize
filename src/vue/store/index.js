import Vue from 'vue';
import Vuex from 'vuex';
import _base from "./modules/_base-module";

import settings from './modules/settings'
import projects from './modules/projects'
import clients from './modules/clients'

Vue.use(Vuex);

const getters = {

};

const state = {

};

const actions = {

};

const mutations = {

};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        projects, clients,
        settings
    },
    strict: true
})

