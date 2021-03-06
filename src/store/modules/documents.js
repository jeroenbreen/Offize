import _base from './_base-module';
import Document from '@/store/classes/Document';

const Model = Document;

const state = {
    all: [],
    current: null,
    searchString: '',
    searchType: 'invoice',
    searchYear: new Date().getFullYear()
};

const getters = {
    ..._base.getters,
    getDocumentsForProjectOfType: (state) => (payload) => {
        return state.all.filter((document) => {
            return document.doctype === payload.doctype && document.projectId === payload.projectId;
        })
    },
    getFiltered(state) {
        return state.all.filter((item) => {
            return (state.searchString === '' || item.title.toLowerCase().indexOf(state.searchString.toLocaleLowerCase()) > -1) &&
                (item.doctype ===  state.searchType) &&
                (state.searchYear === 'Alle' || item.year ===  state.searchYear);
        }).sort((a,b) => {
            if (a.year > b.year) {
                return -1;
            } else {
                if (b.year > a.year) {
                    return 1;
                } else {
                    if (a.nr > b.nr) {
                        return -1;
                    } else {
                        if (a.nr < b.nr) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }
            }
        });
    },
    getNr: (state) => (doctype) => {
        let max = 0;
        for (let document of state.all) {
            if (document.doctype === doctype) {
                if (document.nr > max) {
                    max = document.nr;
                }
            }
        }
        return max + 1;
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