define([
   './_BaseModel',
   './OldDocument'
], function(
    Parent,
    OldDocument
){
    "use strict";
    function Project(project) {
        this.type = 'projects';

        this.contact = app.getContactById(Number(project.contactId));
        this.member = app.getMemberById(Number(project.memberId));

        this.projectId = Number(project.projectId);
        this.projectName = project.projectName;
        this.projectStatus = Number(project.projectStatus);
        this.currency = project.currency;
        this.discount = Number(project.discount);
        this.rate = Number(project.rate);
        this.hours = Number(project.hours);
        this.year = Number(project.year);
        this.hours = Number(project.hours);
        this.finished = project && project.finished ? (project.finished === "true" ? true : false) : false;

        this.quotations = [];
        this.invoices = [];
        this.comments = [];
        this.importChildren();
        console.log(this);
    }

    var _p = Project.prototype = Object.create(Parent.prototype);

    // import

    _p.importChildren = function() {
        this.importDocuments();
        this.importComments();
    };

    _p.importDocuments = function() {
        for (var i = 0, l = app.store.documents.length; i < l; i++) {
            var document = app.store.documents[i];
            if (document.projectId === this.projectId) {
                // temp TODO remove this line
                document.rate = this.rate;
                if (document.type === 'invoice') {
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



    // events TODO move this to controller

    _p.remove = function() {
        var index = this._getIndex();
        if (index > -1) {
            app.projects.splice(index, 1);
            app.currentProject = null;
        }
    };

    _p._getIndex = function() {
        for (var i = 0, l = app.projects.length; i < l; i++) {
            if (app.projects[i] === this) {
                return i;
            }
        }
    };


    // status

    _p.hasComments = function() {
        return this.comments.length > 0;
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
        return this.getScore() > 100;
    };

    _p.exportSettings = function() {
        return {
            ignoreProperties: ['parent'],
            children: ['tenders', 'invoices', 'comments', 'workedHours', 'distributionWeeks']
        }
    };

    return Project;
});
