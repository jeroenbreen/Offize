define([
    './_BaseModel'
], function(
    Parent
){
    "use strict";
    function Company(company) {
        this.name = company.name;
        this.address = company.address;
        this.zipcode = company.zipcode;
        this.city = company.city;
        this.standardRate = Number(company.standardRate);
        this.startingYear = Number(company.startingYear);
        this.title = company.title;
        this.companyNameNice = company.companyNameNice;
        this.invoiceText = company.invoiceText;
        this.color = company.color;
        this.injectStyle();
    }

    var _p = Company.prototype = Object.create(Parent.prototype);

    _p.injectStyle = function() {
        var sheet = window.document.styleSheets[0];
        sheet.insertRule('.office-color { background: ' + this.color + '!important; }', sheet.cssRules.length);
    };

    return Company;
});
