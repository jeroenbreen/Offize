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
        this.standardRate = company.standardRate;
        this.startingYear = company.startingYear;
        this.title = company.title;
        this.welcome = company.welcome;
    }

    var _p = Company.prototype = Object.create(Parent.prototype);

    return Company;
});
