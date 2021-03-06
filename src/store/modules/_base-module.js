import $ from "jquery";

const getters = {
    getAll(state) {
        return state.all;
    },
    getItemById: (state) => (id) => {
        return state.all.find(item => item.id === id);
    },
    getItemByProperty: (state) => (property, value) => {
        return state.all.find(item => item[property] === value);
    },
    getFiltered: (state) => (keys) => {
        return state.all.filter((item) => {
            let hit = false;
            for (let key of keys) {
                if (item[key].toLowerCase().indexOf(state.searchString.toLowerCase()) > -1) {
                    hit = true;
                }
            }
            return hit;
        }).reverse()
    }
};

const actions = {
    create(context, item) {
        return new Promise((resolve, reject) => {
            $.post(window.config.api + 'create.php', $.param(item), (response) => {
                item.id = response.id;
                context.commit('create', item);
                resolve(response);
            });
        })
    },
    read(context, id, type) {
        return new Promise((resolve, reject) => {
            $.post(window.config.api + 'read.php', $.param({id: id, type: type}), (response) => {
                context.commit('read', response);
                resolve(response);
            });
        })
    },
    update(context, item) {
        return new Promise((resolve, reject) => {
            $.post(window.config.api + 'update.php', $.param(item), (response) => {
                context.commit('update', item);
                resolve();
            });
        })
    },
    delete(context, item) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: window.config.api + 'delete.php',
                data: item,
                success: (data) =>{
                    context.commit('delete', item);
                    resolve();
                },
            });
        })
    }
};

const mutations = {
    init(state, set, Model) {
        state.all = [];
        for (let item of set) {
            state.all.push(new Model(item));
        }
    },
    setCurrent(state, item) {
        state.current = item;
    },
    unsetCurrent(state) {
        state.current = null;
    },
    create(state, item, Model) {
        state.all.push(new Model(item));
    },
    read(state, set, Model) {
        function doesExist(item) {
            for (let theItem of state.all) {
                if (Number(item.id) === theItem.id) {
                    return true;
                }
            }
            return false;
        }

        for (let item of set) {
            if (!doesExist(item)) {
                state.all.push(new Model(item));
            }
        }
    },
    update(state, item, Model) {
        let newState = [];
        for (let thisItem of state.all) {
            if (thisItem.id === item.id) {
                // the cloning is needed otherwise we could be editing directly the state
                newState.push(new Model({...item}));
            } else {
                newState.push(thisItem);
            }
        }
        state.all = newState;
    },
    delete(state, item) {
        state.all = state.all.filter(function(thisItem) {
            return thisItem.id !== item.id;
        });
    },
    updateProperty(state, payload) {
        state[payload.key] = payload.value;
    }
};

export default {
    getters,
    actions,
    mutations
}
