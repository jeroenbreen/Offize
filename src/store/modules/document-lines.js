import _base from './_base-module';
import DocumentLine from '@/store/classes/DocumentLine';

const Model = DocumentLine;

const state = {
    all: [],
    current: null
};

const getters = {
    ..._base.getters,
    getLinesForDocument: (state) => (documentId) => {
        return state.all.filter((documentLine) => {
            return documentLine.documentId === documentId;
        }).sort((a,b) => {
            return (a.arrayOrder > b.arrayOrder) ? 1 : ((b.arrayOrder > a.arrayOrder) ? -1 : 0)
        });
    }
};

const actions = {
    create(context, item){
        return _base.actions.create(context, item);
    },
    read(context, id){
        return _base.actions.read(context, id, 'documentLines');
    },
    update(context, item){
        return _base.actions.update(context, item);
    },
    delete(context, item){
        return _base.actions.delete(context, item);
    }
};

const mutations = {
    init(state, set) {
        return _base.mutations.init(state, set, Model);
    },
    setCurrent(state, item) {
        return _base.mutations.setCurrent(state, item)
    },
    unsetCurrent(state) {
        return _base.mutations.unsetCurrent(state)
    },
    create(state, item) {
        return _base.mutations.create(state, item, Model);
    },
    read(state, set) {
        return _base.mutations.read(state, set, Model);
    },
    update(state, item) {
        return _base.mutations.update(state, item, Model);
    },
    delete(state, item) {
        return _base.mutations.delete(state, item);
    },
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