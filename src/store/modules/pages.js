import _base from './_base-module';

const Model = Object;

const state = {
    all: [],
    current: null
};

const getters = {};

const actions = {};

const mutations = {
    init(state, set) {
        return _base.mutations.init(state, set, Model);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}