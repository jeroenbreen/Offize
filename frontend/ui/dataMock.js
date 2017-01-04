define([], function() {
    "use strict";

    var dataMock = {
        "timestamp": 1451049977,
        "projects": [
        {
            "projectId": 15,
            "projectName": "Demo Project",
            "projectStatus": 4,
            "contactId": 12,
            "memberId": 2,
            "hours": 23,
            "rate": 75,
            "discount": 0,
            "fixedTotal": 0,
            "currency": "EUR",
            "tenders": [{
                "doctype": "tenders",
                "sender": {
                    "name": "Innouveau",
                    "contactPerson": "Jeroen Breen",
                    "address": "Prins Hendrikstraat 13D",
                    "zipcode": "3071 LG Rotterdam"
                },
                "client": {
                    "name": "Demo Klant",
                    "contactPerson": "Dhr Demo",
                    "address": "Demonstraat 235",
                    "zipcode": "1111 XX Rotterdam"
                },
                "year": 2017,
                "nr": "001",
                "date": {
                    "day": 1,
                    "month": 1,
                    "year": 2017
                },
                "title": "Demo Project",
                "paid": false,
                "lines": [],
                "locked": false
            }],
            "invoices": [],
            "year": 2015,
            "week": 0,
            "distributionWeeks": [],
            "finished": false,
            "comments": ""
        }],
        "contacts": [{
            "contactId": 32,
            "name": "Moment Design",
            "contactPerson": "Gerben Starink",
            "street": "",
            "zipcode": "",
            "city": "",
            "email": "",
            "rate": "70",
            "telephone": "",
            "web": "",
            "info": ""
        }],
        "team": [{
            "memberId": 1,
            "initials": "JB",
            "name": "Jeroen Breen"
        }, {
            "memberId": 2,
            "initials": "AD",
            "name": "Arjen Duinhouwer"
        }],

        "hours": [],

        "configuration": {
            "addTenders": 2,
            "addInvoices": 1,
            "startingYear": 2014,
            "showTotals": true,
            "autoCalc": true,
            "title": "Innouveau Office",
            "welcome": "Office",
            "companyName": "Innouveau",
            "companyAddress": "Prins Hendrikstraat 13D",
            "companyZipcode": "3071 LG",
            "companyCity": "Rotterdam",
            "standardRate": 75
        },

        "comments": []
    };


    return {
        dataMock: dataMock
    };
});
