define([
    'models/Contact',
    'ui/ui-tools/common-tools',
    'ui/ui-tools/modal',
    'jquery'
], function(
    Contact,
    commonTools,
    modal,
    $
) {
    "use strict";
    function ContactsController($scope, api, office) {
        this.$scope = $scope;
        $scope.model = office;
        $scope.model.menu = 'contacts';
        $scope.commonTools = commonTools;


        $scope.addContact = function() {
            var message;
            if ($scope.newContact.name) {
                var handleSuccess = function(data, status) {
                    var message = 'Toegevoegd: ' + $scope.newContact.name;
                    $scope.newContact.id =data.id;
                    $scope.model.contacts.push($scope.newContact);
                    $scope.model.currentContact = $scope.newContact;
                    $scope.newContact = new Contact();
                    modal.show(message, false);
                };

                api.create($.param($scope.newContact.toBackend())).success(handleSuccess);
            } else {
                message = 'Vul een naam in.';
                modal.show(message, true);
            }
        };

        $scope.filter = {
            search : ''
        };


        $scope.filterContacts = function(contacts) {
            var filtered = [],
                sorted;
            for (var i = 0, l = contacts.length; i < l; i++) {
                var contact = contacts[i];
                if (
                    ($scope.filter.search === '' || contact.name.toLocaleLowerCase().indexOf($scope.filter.search.toLocaleLowerCase()) > -1)
                ) {
                    filtered.push(contact);
                }
            }
            // TODO dit kan al op de bootstrap eenmalig met array.sort gebeuren
            sorted = filtered.sort(compare);
            if (sorted.length === 1) {
                $scope.model.currentContact = sorted[0];
            }
            return sorted;
        };

        function compare(a,b) {
            if (a.id < b.id)
                return 1;
            if (a.id > b.id)
                return -1;
            return 0;
        }

        $scope.$watch('model.currentMember', function(){
            if ($scope.model.currentMember) {
                $scope.newContact = new Contact();
            }
        })
    }

    ContactsController.$inject = ['$scope', 'api', 'office'];

    return ContactsController;
}); 