const template = {
    paper: {
        width: 1220,
        height: null,
        padding: 60,
        fontSize: 24
    },
    logo: {
        height: 200
    },
    info: {
        top: 10
    },
    addresses: {
        top: 388,
        padding: 20
    },
    title: {
        top: 612,
        padding: 20,
        height: 90
    },
    lines: {
        top: 700,
        padding: 20
    },
    total: {
        top: 1115,
        padding: 20
    },
    footer: {
        top: 1260,
        invoiceText: {
            padding: 20,
            fontSize: 18
        },
        image: {
            width: 210,
            marginTop: 10
        }
    },
    legal :{
        top: 1590,
        fontSize: 18
    }
};

template.paper.height = Math.round(template.paper.width / 21 * 29.7);

export default template;