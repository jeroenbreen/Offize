define([
   './_BaseModel',
   './Project',
   './Company',
   './Comment',
   './Document',
   './Member',
   './Contact',
   './lines/Line',
   './time-registration/Job-Category',
   './time-registration/Job'
], function(
    Parent,
    Project,
    Company,
    Comment,
    Document,
    Member,
    Contact,
    Line,
    JobCategory,
    Job
){
    "use strict";
    function App() {
        this.jobCategories = [];
        this.projects = [];
        this.contacts = [];
        this.members = [];
        this.company = null;
        this.configuration = null;

        // gets removed after all wiring from bootstrap is done
        this.store = {
            documents: [],
            lines: [],
            comments: []
        };

        this.documents = [];

        // status
        this.currentProject = null;
        this.currentContact = null;
        this.currentDocument = null;
        this.menu = '';
        this.popup = '';

        this.years = ['Alle'];
        this.memberFilter = [];
        this.thisYear = new Date().getFullYear();
      }

    var _p = App.prototype = Object.create(Parent.prototype);

    _p.bootstrap = function(data) {
        this.importCompany(data.configuration);
        this.importer(data.jobCategories, JobCategory, this.jobCategories);
        this.importJobs(data.jobs);
        this.importer(data.members, Member, this.members);
        this.importer(data.comments, Comment, this.store.comments);
        this.importer(data.lines, Line, this.store.lines);
        this.importer(data.contacts, Contact, this.contacts);
        this.importer(data.documents, Document, this.documents);
        this.importer(data.projects, Project, this.projects);
        this.setConfiguration(data.configuration);
        // after connecting all lines with the documents
        // and all documents and comments with projects
        // we can erase the temp store
        delete this.store;
        //
        this.currentContact = this.contacts[this.contacts.length - 1];
        this.currentProject = this.projects[this.projects.length - 1];
    };

    _p.importCompany = function (configuration) {
        var company = {
            name: configuration.companyName,
            address: configuration.companyAddress,
            city: configuration.companyCity,
            zipcode: configuration.companyZipcode,
            standardRate: configuration.standardRate,
            startingYear: configuration.startingYear,
            title: configuration.title,
            welcome: configuration.welcome
        };
        this.company = new Company(company);
    };

    _p.importJobs = function(jobs) {
        for (var i = 0, l = jobs.length; i < l; i++) {
            var job = new Job(jobs[i]),
                jobCategory = this.getJobCategoryById(jobs[i].jobCategoryId);
            if (jobCategory) {
                jobCategory.jobs.push(job);
            }
        }
    };

    _p.importer = function (set, Model, destination) {
        for (var i = 0, l = set.length; i < l; i++) {
            var item = set[i];
            destination.push(new Model(item))
        }
    };

    _p.setConfiguration = function(configuration) {
        var thisYear = new Date().getFullYear() + 1;
        this.configuration = configuration;
        for (var i = configuration.startingYear, l = thisYear; i < l; i++) {
            this.years.push(i);
        }
    };

    _p.getProjectById = function(projectId) {
        for (var i = 0, l = this.projects.length; i < l; i++) {
            var project = this.projects[i];
            if (project.projectId === projectId) {
                return project;
            }
        }
        return null;
    };
    //
    // _p.getContactById = function(contactId) {
    //     for (var i = 0, l = this.contacts.length; i < l; i++) {
    //         var contact = this.contacts[i];
    //         if (contact.contactId === contactId) {
    //             return contact;
    //         }
    //     }
    //     return null;
    // };
    //
    // _p.getMemberById = function(memberId) {
    //     for (var i = 0, l = this.team.length; i < l; i++) {
    //         var member = this.team[i];
    //         if (member.memberId === memberId) {
    //             return member;
    //         }
    //     }
    //     return null;
    // };
    //
    _p.getHighestNr = function(doctype) {
        var highest = 0;
        for (var i = 0, l = this.documents.length; i < l; i++){
            var document = this.documents[i];
            if (document.doctype === doctype) {
                var nr = document.nr;
                if (nr > highest) {
                    highest = nr;
                }
            }

        }
        return highest + 1;
    };
    //

    //

    // };
    //

    //
    // _p.getHourId = function() {
    //     var highest = 0;
    //     for (var i = 0, l = this.hours.length; i < l; i++){
    //         var id = this.hours[i].id;
    //         if (id > highest) {
    //             highest = id;
    //         }
    //     }
    //     return highest + 1;
    // };
    //
    // _p._digitize = function(x) {
    //     if (x < 100) {
    //         if (x < 10) {
    //             return '00' + x;
    //         } else {
    //             return '0' + x;
    //         }
    //     } else {
    //         return '' + x;
    //     }
    // };

    // getters

    _p.getJobCategoryById = function(id) {
        for (var i = 0, l = this.jobCategories.length; i < l; i++) {
            var jobCategorty = this.jobCategories[i];
            if (jobCategorty.id === id) {
                return jobCategorty;
            }
        }
        return null;
    };

    _p.getContactById = function(id) {
        for (var i = 0, l = this.contacts.length; i < l; i++) {
            var contact = this.contacts[i];
            if (contact.contactId === id) {
                return contact;
            }
        }
        return null;
    };

    _p.getMemberById = function(id) {
        for (var i = 0, l = this.members.length; i < l; i++) {
            var member = this.members[i];
            if (member.memberId === id) {
                return member;
            }
        }
        return null;
    };

    _p.getDocumentNumber = function(doctype) {
        var max = 0;
        for (var i = 0, l = this.documents.length; i < l; i++) {
            var document = this.documents[i];
            if (document.doctype === doctype) {
                if (document.nr > max) {
                    max = document.nr;
                }
            }
        }
        return max + 1;
    };

    // refactoring tools
    //
    _p.documentsToCSV = function() {
        var csv = '';
        for (var i = 0, l = this.documents.length; i < l; i++) {
            var document = this.documents[i];
            csv += document.toCSV();
        }
        console.log(csv);
    };
    //
    // _p.linesToCSV = function() {
    //     var csv = '';
    //     for (var i = 0, l = this.store.documents.length; i < l; i++) {
    //         var document = this.store.documents[i];
    //         csv += document.linesToCSV();
    //     }
    //     console.log(csv);
    // };
    //
    // _p.findDocumentId = function(d) {
    //     //console.log(d);
    //     for (var i = 0, l = this.store.documents.length; i < l; i++) {
    //         var document = this.store.documents[i];
    //         if (document.year == d.year && document.nr == d.nr) {
    //             return document.id;
    //         }
    //
    //     }
    //     return -1;
    // };

    return App;
});
