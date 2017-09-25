define([
   './_BaseModel'
], function(
    Parent
){
    "use strict";
    function Contact(contact) {
        this.type = 'contact';
        this.contactId = contact ? Number(contact.contactId) : null;
        this.name = contact ? contact.name : '';
        this.contactPerson = contact ? contact.contactPerson : '';
        this.street = contact ? contact.street : '';
        this.zipcode = contact ? contact.zipcode : '';
        this.city = contact ? contact.city : '';
        this.rate = contact ? Number(contact.rate) : app.company.standardRate;
        this.email = contact ? contact.email : '';
        this.telephone = contact ? contact.telephone : '';
        this.web = contact ? contact.web : '';
        this.info = contact ? contact.info : '';
    }

    var _p = Contact.prototype = Object.create(Parent.prototype);

    return Contact;
});
