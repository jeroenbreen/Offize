import Vue from 'vue';
import Vuex from 'vuex';
import _base from "./modules/_base-module";

import settings from './modules/settings'
import statusses from './modules/statusses';
import projects from './modules/projects'
import employees from './modules/employees'
import clients from './modules/clients'
import documents from './modules/documents'

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
        settings, statusses,
        projects, employees, clients, documents
    },
    strict: true
})

