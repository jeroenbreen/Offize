import commonTools from '@/tools/common-tools';
import _Base from './_Base';

class Client extends _Base {

    constructor(client) {
        super(client);
        this.type = 'client';
        this.name = client ? client.name : '';
        this.contactPerson = client ? client.contactPerson : '';
        this.street = client ? client.street : '';
        this.zipcode = client ? client.zipcode : '';
        this.city = client ? client.city : '';
        this.rate = client ? Number(client.rate) : 0; //app.company.standardRate;
        this.email = client ? client.email : '';
        this.telephone = client ? client.telephone : '';
        this.web = client ? client.web : '';
        this.info = client ? client.info : '';
        this.vat = client ? client.vat : '';
        this.international = client && client.international ? Boolean(parseInt(client.international)) : false;
        this.eu = client && client.eu ? Boolean(parseInt(client.eu)) : false;
        this.language = client ? client.language : 'nl';
    }

    toSlug(limitString) {
        let formattedName, label;
        formattedName = this.name.toLowerCase().replace(/\//g, '-').replace(/\s/g, '-').replace(/\./g, '-').replace(/-+/g, '-');
        label = commonTools.digitize(this.id) + '-' + formattedName;

        if (this.clientId === -1) {
            return 'Alle';
        } else {
            if (limitString && label.length > limitString) {
                return label.substr(0,limitString) + '...'
            } else {
                return label;
            }
        }
    }

    toBackend() {
        let client = {};
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                client[key] = this[key];
            }
        }
        client.international = this.international ? 1 : 0;
        client.eu = this.eu ? 1 : 0;
        return client;
    }
}

export default Client