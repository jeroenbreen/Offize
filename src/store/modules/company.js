import _base from './_base-module';
import Company from '@/store/classes/Company';

const Model = Company;

const state = {
    all: []
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
        let c = new Company(company);
        state.all.push(c);
    },
    updateProperty(state, payload) {
        //state.current[payload.key] = payload.value;
    },
    update(state, item) {
        return _base.mutations.update(state, item, Model);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}