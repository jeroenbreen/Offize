import _base from './_base-module';
import Company from '@classes/Company';

const Model = Object;

const state = {
    current: null
};

const getters = {
};

const actions = {
    update(context, item){
        return _base.actions.update(context, item);
    }
};

const mutations = {
    init(state, company) {
        state.current = new Company(company);
    },
    updateProperty(state, payload) {
        state.current[payload.key] = payload.value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}