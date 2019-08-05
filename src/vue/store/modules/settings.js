import _base from "./_base-module";

const state = {
    bootstrapped: false
};



const getters = {};

const actions = {};

const mutations = {
    updateProperty(state, payload) {
        return _base.mutations.updateProperty(state, payload);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}