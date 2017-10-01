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
        console.log(this);
    }

    var _p = Company.prototype = Object.create(Parent.prototype);

    return Company;
});
