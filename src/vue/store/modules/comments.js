import _base from './_base-module';
import Comment from '@classes/Comment';

const Model = Comment;

const state = {
    all: [],
    current: null,
    search: ''
};

const getters = {
    ..._base.getters,
    getCommentsByProjectId: (state) => (projectId) => {
        return state.all.filter((comment) => {
            return comment.projectId === projectId;
        }).sort((a,b) => {
            let a0, b0;
            a0 = a.date.getTime();
            b0 = b.date.getTime();
            return (a0 > b0) ? 1 : ((b0 > a0) ? -1 : 0)
        });
    }
};

const actions = {
    create(context, item){
        return _base.actions.create(context, item);
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