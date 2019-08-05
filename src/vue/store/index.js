import Vue from 'vue';
import Vuex from 'vuex';
import _base from "./modules/_base-module";

import settings from './modules/settings'
import statusses from './modules/statusses';
import company from './modules/company'
import projects from './modules/projects'
import employees from './modules/employees'
import clients from './modules/clients'
import documents from './modules/documents'
import comments from './modules/comments'

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
        settings, statusses, company,
        projects, employees, clients, documents, comments
    },
    strict: true
})

