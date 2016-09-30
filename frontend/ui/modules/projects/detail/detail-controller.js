define([
    '../../../ui-tools/common-tools',
    '../../../ui-tools/modal'
], function(
    commonTools,
    modal
) {
    "use strict";
    function DetailController($scope, dataFactory) {
        this.$scope = $scope;
        $scope.commonTools = commonTools;

        $scope.status = ['Pijplijn', 'Offerte', 'Lopend', 'Factuur', 'Betaald', 'Gearchiveerd'];

        $scope.removeProject = function() {
            var message = 'Wil je ' + $scope.model.projectName + ' echt verwijderen?',
                handleSuccess = function(data, status) {
                    var successMessage = $scope.model.projectName + ' verwijderd';
                    $scope.model.remove();
                    modal.show(successMessage, false)
                };
            modal.confirm(message, function(result){
                if (result) {
                    dataFactory.remove(commonTools.param($scope.model)).success(handleSuccess);
                }
            });
        };

        $scope.archiveProject = function() {
            $scope.model.projectStatus = 5;
        };

        $scope.reviveProject = function() {
            $scope.model.projectStatus = 0;
        };

        $scope.dearchiveProject = function() {
            $scope.model.projectStatus = 0;
        };

        $scope.copySlug = function() {
            commonTools.clipboard(commonTools.toSlug($scope.model.contact.getNumber(), $scope.model.projectName));
        };

        $scope.addDocument = function(type) {
            var d = new Date(),
                year = d.getFullYear(),
                newDocument,
                contact = $scope.office.getContactById($scope.model.contactId),
                typeNl = (type === 'invoices' ? 'Factuur' : 'Offerte');
            newDocument = {
                type : typeNl,
                year : year,
                date : {
                    year : year,
                    month : d.getMonth() + 1,
                    day : d.getDate()
                },
                client : {
                    name : contact.name,
                    contactPerson : contact.contactPerson,
                    address : contact.street,
                    zipcode : contact.zipcode + ' ' + contact.city
                },
                sender : {
                    name : $scope.office.configuration.companyName,
                    contactPerson : $scope.office.getMemberById($scope.model.memberId).name,
                    address : $scope.office.configuration.companyAddress,
                    zipcode : $scope.office.configuration.companyZipcode + ' ' + $scope.office.configuration.companyCity
                },
                currency : $scope.model.currency,
                rate : $scope.model.rate,
                title : $scope.model.projectName,
                lines : [],
                paid : false,
                nr : $scope.office.getHighestNr(type)
            };
            $scope.office.currentDocument = $scope.model.importDocument(newDocument, type);

        };

        // distribution

        $scope.subtractWeekToDistribution = function(){
            $scope.model.distributionWeeks.pop();
        };

        $scope.addWeekToDistribution = function(){
            var distribution = getDistributionWeek();
            $scope.model.addDistribution(distribution);
        };
        
        function getDistributionWeek() {
            var distributionWeek = {
                distributions: []
            };
            for (var i = 0, l = $scope.office.team.length; i < l; i++) {
                var member = $scope.office.team[i];
                distributionWeek.distributions.push({
                    hours: 0,
                    memberId: member.memberId,
                    initials: member.initials
                });
            }
            return distributionWeek;
        }

        // helpers

        $scope.addWeek = function(a,b) {
            return parseInt(a) + b;
        }


    }

    DetailController.$inject = ['$scope', 'dataFactory'];

    return DetailController;
}); 