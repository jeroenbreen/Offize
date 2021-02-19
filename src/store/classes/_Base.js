class _Base {
    constructor(obj) {
        this.id = obj && obj.id ? Number(obj.id) : null;
    }

    toBackend() {
        return {...this};
    }
}

export default _Base;