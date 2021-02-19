const state = {
    show: false,
    type: '',
    message: '',
    callback: null,
    buttons: {
        yes: 'yes',
        no: 'no'
    }
};

const getters = {};

const actions = {};

const mutations = {
    message(state, modalObject) {
        state.show = true;
        state.type = 'message';
        state.message = modalObject.message;
        state.callback = null;
    },
    confirm(state, modalObject) {
        state.show = true;
        state.type = 'confirm';
        state.message = modalObject.message;
        if (modalObject.callback) {
            state.callback = modalObject.callback;
        } else {
            state.callback = null;
        }
        if (modalObject.buttons && modalObject.buttons.yes) {
            state.buttons.yes = modalObject.buttons.yes;
        } else {
            state.buttons.yes = 'yes';
        }
        if (modalObject.buttons && modalObject.buttons.no) {
            state.buttons.no = modalObject.buttons.no;
        } else {
            state.buttons.no = 'no';
        }
    },
    closeModal(state) {
        state.show = false;
        state.type = '';
        state.message = '';
        state.callback = null;
        state.buttons.yes = 'yes';
        state.buttons.no = 'no';
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}