define([
   './_BaseModel',
   './DocumentModel',
   './DistributionWeekModel'
], function(
    Parent,
    DocumentModel,
    DistributionWeekModel
){
    "use strict";
    function ProjectModel(parent, project) {
        Object.defineProperty(this, 'parent', { value: parent, enumerable: false, writable: true, configurable: true });
        Object.defineProperty(this, 'comments', { value: [], enumerable: false, writable: true, configurable: true });
        Object.defineProperty(this, 'workedHours', { value: [], enumerable: false, writable: true, configurable: true });
        Object.defineProperty(this, 'contact', { value: null, enumerable: false, writable: true, configurable: true });
        this.type = 'projects';
        this.contactId = project.contactId;
        this.contact = this.getContact();
        this.memberId = project.memberId;
        this.projectId = project.projectId;
        this.projectName = project.projectName;
        this.projectStatus = project.projectStatus;
        this.currency = project.currency;
        this.discount = project.discount;
        this.fixedTotal = project.fixedTotal;
        this.rate = project.rate;
        this.hours = project.hours;
        this.year = project.year;
        this.week = project.week;
        this.hours = project.hours;
        this.finished = project.finished;
        this.distributionWeeks = [];
        this.tenders = [];
        this.invoices = [];
        this.importDistributionWeeks(project.distributionWeeks);
        this.importDocuments(project, 'invoices');
        this.importDocuments(project, 'tenders');
    }

    var _p = ProjectModel.prototype = Object.create(Parent.prototype);

    _p.addDistribution = function(distribution) {
        this.distributionWeeks.push(new DistributionWeekModel(this, distribution));
    };

    _p.getContact = function() {
        for (var i = 0, l = this.parent.contacts.length; i < l; i++) {
            var contact = this.parent.contacts[i];
            if (contact.contactId === this.contactId) {
                return contact;
            }
        }
        return null;
    };

    _p.importDistributionWeeks = function(distributionWeeks) {
        for (var i = 0, l = distributionWeeks.length; i < l; i++) {
            this.distributionWeeks.push(new DistributionWeekModel(this, distributionWeeks[i]))
        }
    };

    _p.importDocuments = function(project, type) {
        for (var i = 0, l = project[type].length; i < l; i++) {
            this.importDocument(project[type][i], type)
        }
    };

    _p.importDocument = function(document, type) {
        var newDocument = new DocumentModel(this, document, type);
        this[type].push(newDocument);
        this.parent[type].push(newDocument);
        return newDocument;
    };

    _p.remove = function() {
        var index = this._getIndex();
        if (index > -1) {
            this.parent.projects.splice(index, 1);
            this.parent.currentProject = null;
        }
    };

    _p._getIndex = function() {
        for (var i = 0, l = this.parent.projects.length; i < l; i++) {
            if (this.parent.projects[i] === this) {
                return i;
            }
        }
    };

    _p.getSlug = function() {
        var name = this.projectName.toLowerCase().replace(/\s/g, '-');
        return this.contact.getNumber() + '-' + name;
    };

    _p.hasComments = function() {
        if (this.comments.length > 0) {
            return true;
        } else {
            return false;
        }
    };

    _p.getHours = function() {
        var hours = 0;
        for (var i = 0, l = this.workedHours.length; i < l; i++) {
            hours += this.workedHours[i].time / 60;
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
        if (this.getScore() > 100) {
            return true;
        } else {
            return false;
        }
    };

    _p.exportSettings = function() {
        return {
            ignoreProperties: ['parent'],
            children: ['tenders', 'invoices', 'comments', 'workedHours', 'distributionWeeks']
        }
    };

    return ProjectModel;
});
