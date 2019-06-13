define([
   './_BaseModel',
   './Project',
   './Company',
   './Comment',
   './Document',
   './Member',
   './Contact',
   './lines/Line',
   './Todo',
   './Mail'
], function(
    Parent,
    Project,
    Company,
    Comment,
    Document,
    Member,
    Contact,
    Line,
    Todo,
    Mail
){
    "use strict";

    var thisYear = new Date().getFullYear();

    function App() {
        this.jobCategories = [];
        this.blocks = [];
        this.todos = [];
        this.projects = [];
        this.contacts = [];
        this.members = [];
        this.lines = [];
        this.documents = [];
        this.mails = [];
        this.company = null;
        this.configuration = null;

        // gets removed after all wiring from bootstrap is done
        this.store = {
            comments: []
        };

        this.documents = [];

        // status
        this.currentProject = null;
        this.currentContact = null;
        this.currentDocument = null;
        this.currentMember = null;
        this.report = {
            open: false
        };
        this.menu = '';
        this.popup = '';

        this.years = ['Alle'];
        //this.memberFilter = [];
        this.thisYear = thisYear;
        this.projectStatusses = ['Pijplijn', 'Offerte', 'Lopend', 'Factuur', 'Betaald', 'Archief'];

        this.status = {
            loaded: false,
            projects: {
                filter: {
                    search : '',
                    member: null,
                    contact: null,
                    year : thisYear,
                    showOnlyLiveProjects: true
                }
            },
            document: {
                currentLine: null
            },
            mailPopup: {
                active: false,
                document: null,
                mail: null
            }
        }
      }

    var _p = App.prototype = Object.create(Parent.prototype);

    _p.bootstrap = function(data) {
        this.importer(data.members, Member, this.members);
        this.importer(data.mails, Mail, this.mails);
        this.importer(data.todos, Todo, this.todos);
        this.importCompany(data.company);
        this.importer(data.comments, Comment, this.store.comments);
        this.importer(data.lines, Line, this.lines);
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
        this.currentMember = this.members[0];
        this.status.loaded = true;
    };

    _p.importCompany = function (company) {
        this.company = new Company(company);
    };

    _p.importer = function (set, Model, destination) {
        for (var i = 0, l = set.length; i < l; i++) {
            var item = set[i];
            destination.push(new Model(item))
        }
    };

    _p.setConfiguration = function() {
        var thisYear = new Date().getFullYear() + 1;
        for (var i = this.company.startingYear, l = thisYear; i < l; i++) {
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


    // getters

    _p.getItemByKeyValue = function(set, key, value) {
        for (var i = 0, l = this[set].length; i < l; i++) {
            var item = this[set][i];
            if (item[key] === value) {
                return item;
            }
        }
        return null;
    };

    _p.getItemById = function(key, id) {
        for (var i = 0, l = this[key].length; i < l; i++) {
            var item = this[key][i];
            if (item.id === id) {
                return item;
            }
        }
        return null;
    };

    _p.getProjects = function() {
        var filtered, sorted, self;
        filtered = [];
        self = this;


        function isRelevant(project) {
            return project.projectStatus < 3 || (!self.status.projects.filter.showOnlyLiveProjects && project.projectStatus === 3);
        }

        function compare(a,b) {
            if (a.projectStatus < b.projectStatus) {
                return -1;
            } else if (a.projectStatus > b.projectStatus) {
                return 1;
            } else {
                if (a.projectStatus === 2 && (a.finished || b.finished)) {
                    if (a.finished && !b.finished) {
                        return 1;
                    } else if (!a.finished && b.finished) {
                        return -1;
                    } else {
                        return 0;
                    }
                } else {

                    if (a.week > b.week) {
                        return 1;
                    } else if (a.week < b.week) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            }
        }


        for (var i = 0, l = this.projects.length; i < l; i++) {
            var project = this.projects[i];
            if (
                (this.status.projects.filter.year === 'Alle' || project.year === this.status.projects.filter.year || isRelevant(project)) &&
                (this.status.projects.filter.search === '' || project.projectName.toLocaleLowerCase().indexOf(this.status.projects.filter.search.toLocaleLowerCase()) > -1) &&
                (!this.status.projects.filter.contact || this.status.projects.filter.contact.contactId === -1 || project.contact === this.status.projects.filter.contact) &&
                (!this.status.projects.filter.member || this.status.projects.filter.member.memberId === -1 || project.member.memberId === this.status.projects.filter.member.memberId) &&
                (!this.status.projects.filter.showOnlyLiveProjects || project.projectStatus < 3)
            ) {
                filtered.push(project);
            }
        }
        sorted = filtered.sort(compare);
        if (sorted.length === 1) {
            this.currentProject = sorted[0];
        }
        return sorted;
    };

    _p.getBlockById = function(id) {
        for (var i = 0, l = this.blocks.length; i < l; i++) {
            var block = this.blocks[i];
            if (block.id === id) {
                return block;
            }
        }
        return null;
    };

    _p.getLineById = function(id) {
        for (var i = 0, l = this.lines.length; i < l; i++) {
            var line = this.lines[i];
            if (line.id === id) {
                return line;
            }
        }
        return null;
    };

    _p.getJobCategoryById = function(id) {
        for (var i = 0, l = this.jobCategories.length; i < l; i++) {
            var jobCategorty = this.jobCategories[i];
            if (jobCategorty.id === id) {
                return jobCategorty;
            }
        }
        return null;
    };

    _p.getJobById = function(id) {
        for (var i = 0, l = this.jobCategories.length; i < l; i++) {
            var jobCategory = this.jobCategories[i];
            for (var j = 0, jl = jobCategory.jobs.length; j < jl; j++) {
                var job = jobCategory.jobs[j];
                if (job.id === id) {
                    return job;
                }
            }
        }
        return null;
    };

    _p.getJobs = function() {
        var jobs = [];
        for (var i = 0, l = this.jobCategories.length; i < l; i++) {
            var jobCategory = this.jobCategories[i];
            for (var j = 0, jl = jobCategory.jobs.length; j < jl; j++) {
                var job = jobCategory.jobs[j];
                jobs.push(job);
            }
        }
        return jobs;
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

    _p.getDocumentById = function(id) {
        for (var i = 0, l = this.documents.length; i < l; i++) {
            var document = this.documents[i];
            if (document.id === id) {
                return document;
            }
        }
        return null;
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
