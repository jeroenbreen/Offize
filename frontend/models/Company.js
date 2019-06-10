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
        this.color1 = company.color1;
        this.color2 = company.color2;
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

    return Company;
});
