import Vue from 'vue';
import Vuex from 'vuex';
import _base from "./modules/_base-module";

import clients from './modules/clients'
import settings from './modules/settings'

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
        clients,
        settings
    },
    strict: true
})

