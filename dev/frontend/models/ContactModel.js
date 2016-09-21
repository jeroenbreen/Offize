define([
   './_BaseModel',
   '../ui/ui-tools/common-tools'
], function(
    Parent,
    commonTools
){
    "use strict";
    function ContactModel(parent, contact) {
        Object.defineProperty(this, 'parent', { value: parent, enumerable: false, writable: true, configurable: true });
        this.type = 'contacts';
        this.contactId = contact.contactId;
        this.name = contact.name;
        this.contactPerson = contact.contactPerson;
        this.street = contact.street;
        this.zipcode = contact.zipcode;
        this.city = contact.city;
        this.rate = contact.rate;
        this.email = contact.email;
        this.telephone = contact.telephone;
        this.web = contact.web;
        this.info = contact.info;
        this.comments = [];
    }

    var _p = ContactModel.prototype = Object.create(Parent.prototype);

    _p.remove = function() {
        var index = this._getIndex();
        if (index > -1) {
            this.parent.contacts.splice(index, 1);
            this.parent.currentContact = null;
        }
    };

    _p._getIndex = function() {
        for (var i = 0, l = this.parent.contacts.length; i < l; i++) {
            if (this.parent.contacts[i] === this) {
                return i;
            }
        }
    };

    _p.getFullName = function() {
        return this.getNumber() + '-' + this.name;
    };

    _p.getNumber = function() {
        var id = this.contactId;
        if (id < 10) {
            id = '00' + id;
        } else if (id < 100) {
            id = '0' + id;
        }
        return id;
    };

    return ContactModel;
});
