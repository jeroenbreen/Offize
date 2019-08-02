define([
   './_BaseModel',
   'ui/ui-tools/common-tools'
], function(
    Parent,
    commonTools
){
    "use strict";
    function Project(project) {
        this.type = 'project';

        this.contact = project ? app.getContactById(Number(project.id)) : null;
        this.member = project ? app.getMemberById(Number(project.memberId)) : null;

        this.projectId = project && project.projectId ? Number(project.projectId) : null;
        this.projectName = project && project.projectName ? project.projectName : '';
        this.projectStatus = project && project.projectStatus ? Number(project.projectStatus) : 0;
        this.currency = project && project.currency ? project.currency : 'EUR';
        this.discount = project && project.discount ? Number(project.discount) : 0;
        this.rate = project && project.rate ? Number(project.rate) : app.company.standardRate;
        this.hours = project && project.hours ? Number(project.hours) : 0;
        this.year = project && project.year ? Number(project.year) : new Date().getFullYear();
        this.finished = project && project.finished && project.finished ? project.finished === '1' : false;

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



    // helpers

    _p.toSlug = function(limitString, addMember) {
        var formattedName = this.projectName.toLowerCase().replace(/\//g, '-').replace(/\s/g, '-').replace(/\./g, '-').replace(/-+/g, '-'),
            label = commonTools.digitize(this.contact.id) + '-' + formattedName;
        if (addMember) {
            label = this.member.initials + ': ' + label;
        }
        if (limitString && label.length > limitString) {
            return label.substr(0,limitString) + '...'
        } else {
            return label;
        }
    };

    _p.getRegistrationRate = function() {
        var quotation = this.countTotalInQuotation(),
            activity = this.countTotalInActivities();
        if (quotation === 0) {
            if (activity === 0) {
                return 0;
            } else {
                return 100;
            }
        } else {
            return Math.round(100 * activity / quotation);
        }
    };

    _p.countJobInQuotation = function(job) {
        var amount = 0;
        for (var i = 0, l = this['quotations'].length; i < l; i++) {
            var document = this['quotations'][i];
            for (var k = 0, kl = document.lines.length; k < kl; k++) {
                var line = document.lines[k];
                if (line.job && line.job === job && line.lineType === 'count') {
                    amount += line.hours
                }
            }
        }
        return amount;
    };

    _p.countTotalInQuotation = function() {
        var amount = 0;
        for (var i = 0, l = this['quotations'].length; i < l; i++) {
            var document = this['quotations'][i];
            for (var k = 0, kl = document.lines.length; k < kl; k++) {
                var line = document.lines[k];
                if (line.lineType === 'count') {
                    amount += line.hours
                }
            }
        }
        return amount;
    };

    _p.countTotalInActivities = function() {
        var amount = 0;
        for (var i = 0, l = this.blocks.length; i < l; i++) {
            var block = this.blocks[i];
            for (var j = 0, jl = block.activities.length; j < jl; j++) {
                var activity = block.activities[j];
                amount += activity.time;
            }
        }
        return amount;
    };


    // status

    _p.hasActivities = function() {
        for (var i = 0, l = this.blocks.length; i < l; i++) {
            var block = this.blocks[i];
            if (block.activities.length > 0) {
                return true;
            }
        }
        return false;
    };

    _p.hasComments = function() {
        return this.comments.length > 0;
    };



    _p.getBudget = function() {
        return this.hours * this.rate - this.discount;
    };

    _p.getScore = function() {
        if (this.hours === 0) {
            return 0;
        } else {
            return (this.countTotalInActivities() / this.hours) * 100;
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
                        project.id = this.contact.id;
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