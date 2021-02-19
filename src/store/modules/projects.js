import _base from './_base-module';
import Project from '@/store/classes/Project';

const Model = Project;

const state = {
    all: [],
    current: null,
    currentLight: null,
    searchString: '',
    searchEmployee: -1,
    searchClient: -1,
    searchYear: new Date().getFullYear(),
    searchLiveProjects: true
};

const getters = {
    ..._base.getters,
    getFiltered(state) {
        return state.all.filter((item) => {
            return (state.searchString === '' || item.projectName.toLowerCase().indexOf(state.searchString.toLocaleLowerCase()) > -1) &&
                (state.searchEmployee === -1 || item.employeeId ===  state.searchEmployee) &&
                (state.searchClient === -1 || item.clientId ===  state.searchClient) &&
                (state.searchYear === 'Alle' || item.year ===  state.searchYear) &&
                (state.searchLiveProjects === false || item.projectStatus < 4);
        })
    },
    ordered(state, getters) {
        return getters.getFiltered.sort((a,b) => {
            if (a.projectStatus > b.projectStatus) {
                return 1;
            } else {
                if (b.projectStatus > a.projectStatus) {
                    return -1;
                } else {
                    if (a.finished && !b.finished) {
                        return 1;
                    } else {
                        if (!a.finished && b.finished) {
                            return -1;
                        } else {
                            return 0;
                        }
                    }
                }
            }
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
    setCurrentLight(state, item) {
        return state.currentLight = item;
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