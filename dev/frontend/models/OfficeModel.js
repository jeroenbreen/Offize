define([
   './_BaseModel',
   './ProjectModel',
   './ContactModel',
   './HourModel',
   './CommentModel'
], function(
    Parent,
    ProjectModel,
    ContactModel,
    HourModel,
    CommentModel
){
    "use strict";
    function OfficeModel() {
        this.projects = [];
        this.contacts = [];
        this.invoices = [];
        this.tenders = [];
        this.team = [];
        this.comments = [];
        this.hours = [];
        this.currentProject = null;
        this.currentContact = null;
        this.currentDocument = null;
        this.menu = '';
        this.popup = '';
        this.configuration = null;
        this.years = ['alle'];
    }

    var _p = OfficeModel.prototype = Object.create(Parent.prototype);

    _p.import = function(bootstrap) {
        var self = this;
        importContacts(bootstrap.contacts);
        importProjects(breakToNewLine(bootstrap.projects));
        importTeam(bootstrap.team);
        importHours(bootstrap.hours);
        importComments(bootstrap.comments);
        this.setConfiguration(bootstrap.configuration);

        function importContacts(contacts) {
            for (var i = 0, l = contacts.length; i < l; i++) {
                self.importContact(contacts[i]);
            }
        }

        function importProjects(projects) {
            for (var i = 0, l = projects.length; i < l; i++) {
                self.importProject(projects[i]);
            }
        }

        function importHours(hours) {
            for (var i = 0, l = hours.length; i < l; i++) {
                self.importHour(hours[i]);
            }
        }

        function importTeam(team) {
            for (var i = 0, l = team.length; i < l; i++) {
                self.importMember(team[i]);
            }
        }

        function importComments(comments) {
            for (var i = 0, l = comments.length; i < l; i++) {
                self.importComment(comments[i]);
            }
        }

        function breakToNewLine(data){
            for (var i = 0, l = data.length; i < l; i++) {
                data[i].comments = data[i].comments.replace(/<br>/g, '\n');
            }
            return data;
        }
    };

    _p.importProject = function(project) {
        var newProject = new ProjectModel(this, project);
        this.projects.push(newProject);
        this.currentProject = newProject;
    };

    _p.importContact = function(contact) {
        var newContact = new ContactModel(this, contact);
        this.contacts.push(newContact);
        this.currentContact = newContact;
    };

    _p.importHour = function(hour) {
        var project = this.getProjectById(hour.projectId);
        if (project) {
            var newHour = new HourModel(project, hour);
            project.workedHours.push(newHour);
        }
        this.hours.push(newHour);
    };

    _p.importMember = function(member) {
        this.team.push(member);
    };

    _p.importComment = function(comment) {
        var project = this.getProjectById(comment.projectId),
            newComment = new CommentModel(project, comment);
        if (project) {
            project.comments.push(newComment);
        }
        this.comments.push(newComment);
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

    _p.getContactById = function(contactId) {
        for (var i = 0, l = this.contacts.length; i < l; i++) {
            var contact = this.contacts[i];
            if (contact.contactId === contactId) {
                return contact;
            }
        }
        return null;
    };

    _p.getMemberById = function(memberId) {
        for (var i = 0, l = this.team.length; i < l; i++) {
            var member = this.team[i];
            if (member.memberId === memberId) {
                return member;
            }
        }
        return null;
    };

    _p.getHighestNr = function(type) {
        var highest = 0;
        for (var i = 0, l = this[type].length; i < l; i++){
            var nr = parseInt(this[type][i].nr);
            if (nr > highest) {
                highest = nr;
            }
        }
        return this._digitize(highest + 1);
    };

    _p.getContactId = function() {
        var highest = 0;
        for (var i = 0, l = this.contacts.length; i < l; i++){
            var id = this.contacts[i].contactId;
            if (id > highest) {
                highest = id;
            }
        }
        return highest + 1;
    };

    _p.getProjectId = function() {
        var highest = 0;
        for (var i = 0, l = this.projects.length; i < l; i++){
            var id = this.projects[i].projectId;
            if (id > highest) {
                highest = id;
            }
        }
        return highest + 1;
    };

    _p.getCommentId = function() {
        var highest = 0;
        for (var i = 0, l = this.comments.length; i < l; i++){
            var id = this.comments[i].id;
            if (id > highest) {
                highest = id;
            }
        }
        return highest + 1;
    };

    _p.getHourId = function() {
        var highest = 0;
        for (var i = 0, l = this.hours.length; i < l; i++){
            var id = this.hours[i].id;
            if (id > highest) {
                highest = id;
            }
        }
        return highest + 1;
    };

    _p._digitize = function(x) {
        if (x < 100) {
            if (x < 10) {
                return '00' + x;
            } else {
                return '0' + x;
            }
        } else {
            return '' + x;
        }
    };

    return OfficeModel;
});
