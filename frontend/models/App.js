define([
   './_BaseModel',
   './Project',
   './Comment',
   './Document',
   './Member',
   './Contact',
   './lines/Line'
], function(
    Parent,
    Project,
    Comment,
    Document,
    Member,
    Contact,
    Line
){
    "use strict";
    function App() {
        this.projects = [];
        this.contacts = [];
        this.members = [];
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
      }

    var _p = App.prototype = Object.create(Parent.prototype);

    _p.bootstrap = function(data) {
        this.importer(data.members, Member, this.members);
        this.importer(data.comments, Comment, this.store.comments);
        this.importer(data.lines, Line, this.store.lines);
        this.importer(data.documents, Document, this.store.documents);
        this.importer(data.contacts, Contact, this.contacts);
        this.importer(data.projects, Project, this.projects);
        this.setConfiguration(data.configuration);
        // after connecting all lines with the documents
        // and all documents and comments with projects
        // we can erase the temp store
        delete this.store;
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

    // _p.getProjectById = function(projectId) {
    //     for (var i = 0, l = this.projects.length; i < l; i++) {
    //         var project = this.projects[i];
    //         if (project.projectId === projectId) {
    //             return project;
    //         }
    //     }
    //     return null;
    // };
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
    // _p.getHighestNr = function(type) {
    //     var highest = 0;
    //     for (var i = 0, l = this[type].length; i < l; i++){
    //         var nr = parseInt(this[type][i].nr);
    //         if (nr > highest) {
    //             highest = nr;
    //         }
    //     }
    //     return this._digitize(highest + 1);
    // };
    //
    // _p.getContactId = function() {
    //     var highest = 0;
    //     for (var i = 0, l = this.contacts.length; i < l; i++){
    //         var id = this.contacts[i].contactId;
    //         if (id > highest) {
    //             highest = id;
    //         }
    //     }
    //     return highest + 1;
    // };
    //
    // _p.getProjectId = function() {
    //     var highest = 0;
    //     for (var i = 0, l = this.projects.length; i < l; i++){
    //         var id = this.projects[i].projectId;
    //         if (id > highest) {
    //             highest = id;
    //         }
    //     }
    //     return highest + 1;
    // };
    //
    // _p.getCommentId = function() {
    //     var highest = 0;
    //     for (var i = 0, l = this.comments.length; i < l; i++){
    //         var id = this.comments[i].id;
    //         if (id > highest) {
    //             highest = id;
    //         }
    //     }
    //     return highest + 1;
    // };
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

    // refactoring tools
    //
    // _p.documentsToCSV = function() {
    //     var csv = '';
    //     for (var i = 0, l = this.store.documents.length; i < l; i++) {
    //         var document = this.store.documents[i];
    //         csv += document.toCSV();
    //     }
    //     console.log(csv);
    // };
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
