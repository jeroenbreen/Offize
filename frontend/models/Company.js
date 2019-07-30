define([
    './_BaseModel'
], function(
    Parent
){
    "use strict";
    function Company(company) {
        this.type = 'company';
        this.id = company.id;
        this.name = company.name;
        this.address = company.address;
        this.zipcode = company.zipcode;
        this.city = company.city;
        this.standardRate = Number(company.standardRate);
        this.startingYear = Number(company.startingYear);
        this.title = company.title;
        this.companyNameNice = company.companyNameNice;
        this.invoiceText = company.invoiceText;
        this.color1 = company.color1;
        this.color2 = company.color2;
        this.logoUrl = company.logoUrl;
        this.footerImageUrl = company.footerImageUrl;
        this.usesMail = company.usesMail === "1";
        this.usesGoogleDrive = company.usesGoogleDrive === "1";
        this.usesAcumulus = company.usesAcumulus === "1";
        this.coc = company.coc;
        this.vat = company.vat;
        this.injectStyle();
    }

    var _p = Company.prototype = Object.create(Parent.prototype);

    _p.injectStyle = function() {
        var style, rule;
        style = document.createElement('style');
        rule = '.office-color { background: ' + this.color1 + '!important; color: ' + this.color2 + '; }';
        style.type = 'text/css';
        style.innerHTML = rule;
        document.getElementsByTagName('head')[0].appendChild(style);
    };

    _p.toBackend = function() {
        var company = {};
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                company[key] = this[key];
            }
        }
        company.usesMail = this.usesMail ? '1' : '0';
        company.usesGoogleDrive = this.usesGoogleDrive ? '1' : '0';
        company.usesAcumulus = this.usesAcumulus ? '1' : '0';
        return company;
    };

    return Company;
});
