// todo replace 'contact' with 'client'

import commonTools from '@tools/common-tools';

class Client {

    constructor(client) {
        this.type = 'contact';
        this.id = client ? Number(client.id) : null;
        this.name = client ? client.name : '';
        this.clientPerson = client ? client.contactPerson : '';
        this.street = client ? client.street : '';
        this.zipcode = client ? client.zipcode : '';
        this.city = client ? client.city : '';
        this.rate = client ? Number(client.rate) : 0; //app.company.standardRate;
        this.email = client ? client.email : '';
        this.telephone = client ? client.telephone : '';
        this.web = client ? client.web : '';
        this.info = client ? client.info : '';
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
}

export default Client