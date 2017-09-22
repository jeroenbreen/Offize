define([
   './_BaseModel',
   './OldDocument'
], function(
    Parent,
    OldDocument
){
    "use strict";
    function Project(project) {
        this.type = 'project';

        this.contact = project ? app.getContactById(Number(project.contactId)) : null;
        this.member = project ? app.getMemberById(Number(project.memberId)) : null;

        this.projectId = project ? Number(project.projectId) : null;
        this.projectName = project ? project.projectName : '';
        this.projectStatus = project ? Number(project.projectStatus) : 0;
        this.currency = project ? project.currency : 'EUR';
        this.discount = project ? Number(project.discount) : 0;
        this.rate = project ? Number(project.rate) : Number(app.configuration.standardRate);
        this.hours = project ? Number(project.hours) : 0;
        this.year = project ? Number(project.year) : new Date().getFullYear();
        this.finished = project && project.finished ? (project.finished === "true" ? true : false) : false;

        this.blocks = [];
        this.quotations = [];
        this.invoices = [];
        this.comments = [];
        if (project) {
            this.importChildren();
        }
    }

    var _p = Project.prototype = Object.create(Parent.prototype);

    // import

    _p.importChildren = function() {
        this.importDocuments();
        this.importComments();
    };

    _p.importDocuments = function() {
        for (var i = 0, l = app.documents.length; i < l; i++) {
            var document = app.documents[i];
            if (document.projectId === this.projectId) {
                if (document.doctype === 'invoice') {
                    this.invoices.push(document);
                } else {
                    this.quotations.push(document);
                }
            }
        }
    };

    _p.importComments = function() {
        for (var i = 0, l = app.store.comments.length; i < l; i++) {
            var comment = app.store.comments[i];
            if (comment.projectId === this.projectId) {
                this.comments.push(comment);
            }
        }
    };




    // status

    _p.hasComments = function() {
        return this.comments.length > 0;
    };

    _p.getHours = function() {
        var hours = 0;
        for (var i = 0, l = this.blocks.length; i < l; i++) {
            hours += this.blocks[i].hours;
        }
        return hours.toFixed(1);
    };

    _p.getBudget = function(autocalc) {
        if (autocalc) {
            return this.hours * this.rate - this.discount;
        } else {
            return this.fixedTotal;
        }
    };

    _p.getScore = function() {
        if (this.hours === 0) {
            return 0;
        } else {
            return (this.getHours() / this.hours) * 100;
        }
    };

    _p.getModusScore = function() {
        var score = this.getScore();
        if (score > 100) {
            if (score >= 200) {
                return 100
            } else {
                return score % 100;
            }
        } else {
            return score;
        }
    };

    _p.isOverHours = function() {
        return this.getScore() > 100;
    };


    // object stuff

    _p.toBackend = function() {
        var project = {};
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                switch (key) {
                    case 'contact':
                        project.contactId = this.contact.contactId;
                        break;
                    case 'member':
                        project.memberId = this.member.memberId;
                        break;
                    case 'quotations':
                    case 'invoices':
                    case 'comments':
                    case 'blocks':
                        // skip
                        break;
                    case 'finished':
                        project.finished = this.finished ? 1 : 0;
                        break;
                    default:
                        project[key] = this[key];
                        break;
                }
            }
        }

        return project;
    };

    return Project;
});
