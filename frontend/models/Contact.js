define([
   './_BaseModel'
], function(
    Parent
){
    "use strict";
    function Contact(contact) {
        this.type = 'contacts';
        this.contactId = Number(contact.contactId);
        this.name = contact.name;
        this.contactPerson = contact.contactPerson;
        this.street = contact.street;
        this.zipcode = contact.zipcode;
        this.city = contact.city;
        this.rate = Number(contact.rate);
        this.email = contact.email;
        this.telephone = contact.telephone;
        this.web = contact.web;
        this.info = contact.info;
    }

    var _p = Contact.prototype = Object.create(Parent.prototype);


    // TODO move to controller
    _p.remove = function() {
        var index = this._getIndex();
        if (index > -1) {
            app.contacts.splice(index, 1);
            app.currentContact = null;
        }
    };

    _p._getIndex = function() {
        for (var i = 0, l = app.contacts.length; i < l; i++) {
            if (app.contacts[i] === this) {
                return i;
            }
        }
    };

    _p.getFullName = function() {
        return this.getNumber() + '-' + this.name;
    };

    // TODO move to a number tool
    _p.getNumber = function() {
        var id = this.contactId;
        if (id < 10) {
            id = '00' + id;
        } else if (id < 100) {
            id = '0' + id;
        }
        return id;
    };

    return Contact;
});
