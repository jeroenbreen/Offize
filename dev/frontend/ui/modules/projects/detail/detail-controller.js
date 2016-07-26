define([
    '../../../ui-tools/common-tools'
], function(
    commonTools
) {
    "use strict";
    function DetailController($scope, dataFactory) {
        this.$scope = $scope;

        $scope.status = ['Pijplijn', 'Offerte', 'Lopend', 'Factuur', 'Betaald', 'Dood'];

        $scope.limitString = function(string) {
            var l = 20;
            if (string.length > l) {
                return string.substr(0,l) + '...'
            } else {
                return string;
            }
        };

        $scope.removeProject = function() {
            var message = 'Wil je ' + $scope.model.projectName + ' echt verwijderen?',
                handleSuccess = function(data, status) {
                    var successMessage = $scope.model.projectName + ' verwijderd';
                    $scope.model.remove();
                    commonTools.show(successMessage, false)
                };
            commonTools.confirm(message, function(result){
                if (result) {
                    dataFactory.remove(commonTools.param($scope.model)).success(handleSuccess);
                }
            });
        };

        $scope.addDocument = function(type) {
            var d = new Date(),
                year = d.getFullYear(),
                newDocument,
                contact = $scope.office.getContactById($scope.model.contactId),
                typeNl = (type === 'invoices' ? 'Factuur' : 'Offerte');
            newDocument = {
                type : typeNl,
                jaar : year,
                datum : {
                    j : year,
                    m : d.getMonth() + 1,
                    d : d.getDate()
                },
                klant : {
                    naam : contact.name,
                    contact : contact.contactPerson,
                    adres : contact.street,
                    postcode : contact.zipcode + ' ' + contact.city
                },
                bedrijf : {
                    naam : $scope.office.configuration.companyName,
                    contact : $scope.office.getMemberById($scope.model.memberId).name,
                    adres : $scope.office.configuration.companyAddress,
                    postcode : $scope.office.configuration.companyZipcode + ' ' + $scope.office.configuration.companyCity
                },
                currency : $scope.model.currency,
                rate : $scope.model.rate,
                omschrijving : $scope.model.projectName,
                posten : [],
                betaald : false,
                nr : $scope.office.getHighestNr(type)
            };
            $scope.office.currentDocument = $scope.model.importDocument(newDocument, type);

        };

        // distribution

        $scope.subtractWeekToDistribution = function(){
            $scope.model.distribution.pop();
        };

        $scope.addWeekToDistribution = function(){
            var week = getDistributionWeek();
            if (!$scope.model.distribution) {
                $scope.model.distribution = [];
            }
            $scope.model.distribution.push(week);
        };
        
        function getDistributionWeek() {
            var week = [];
            for (var i = 0, l = $scope.office.team.length; i < l; i++) {
                var member = $scope.office.team[i];
                week.push({
                    hours: 0,
                    memberId: member.memberId,
                    initials: member.initials,
                    projectId: $scope.model.projectId
                });
            }
            return week;
        }

        // helpers

        $scope.addWeek = function(a,b) {
            return parseInt(a) + b;
        }


    }

    DetailController.$inject = ['$scope', 'dataFactory'];

    return DetailController;
}); 