import commonTools from '@tools/common-tools';

class Project {

    constructor(project) {
        this.type = 'project';
        this.id = project && project.id ? Number(project.id) : null;
        this.contactId = project ? Number(project.id) : null;
        this.member = project ? Number(project.memberId) : null;
        this.projectName = project && project.projectName ? project.projectName : '';
        this.projectStatus = project && project.projectStatus ? Number(project.projectStatus) : 0;
        this.currency = project && project.currency ? project.currency : 'EUR';
        this.discount = project && project.discount ? Number(project.discount) : 0;
        this.rate = project && project.rate ? Number(project.rate) : 0; //app.company.standardRate;
        this.hours = project && project.hours ? Number(project.hours) : 0;
        this.year = project && project.year ? Number(project.year) : new Date().getFullYear();
        this.finished = project && project.finished && project.finished ? project.finished === '1' : false;
    }


    // helpers

    toSlug(limitString, addMember) {
        // var formattedName = this.projectName.toLowerCase().replace(/\//g, '-').replace(/\s/g, '-').replace(/\./g, '-').replace(/-+/g, '-'),
        //     label = commonTools.digitize(this.contact.id) + '-' + formattedName;
        // if (addMember) {
        //     label = this.member.initials + ': ' + label;
        // }
        // if (limitString && label.length > limitString) {
        //     return label.substr(0,limitString) + '...'
        // } else {
        //     return label;
        // }
        return this.projectName;
    }

    getRegistrationRate() {
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

    countJobInQuotation(job) {
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
    }

    countTotalInQuotation() {
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

    countTotalInActivities() {
        var amount = 0;
        for (var i = 0, l = this.blocks.length; i < l; i++) {
            var block = this.blocks[i];
            for (var j = 0, jl = block.activities.length; j < jl; j++) {
                var activity = block.activities[j];
                amount += activity.time;
            }
        }
        return amount;
    }


    hasActivities() {
        for (var i = 0, l = this.blocks.length; i < l; i++) {
            var block = this.blocks[i];
            if (block.activities.length > 0) {
                return true;
            }
        }
        return false;
    };

    hasComments() {
        return this.comments.length > 0;
    }



    getBudget() {
        return this.hours * this.rate - this.discount;
    }

    getScore() {
        if (this.hours === 0) {
            return 0;
        } else {
            return (this.countTotalInActivities() / this.hours) * 100;
        }
    }

    getModusScore() {
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
    }

    isOverHours() {
        return this.getScore() > 100;
    }


    // object stuff

    toBackend() {
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
    }

}

export default Project