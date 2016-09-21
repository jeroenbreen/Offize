define([
    '../../ui-tools/common-tools',
    '../../ui-tools/modal'
], function(
    commonTools,
    modal
) {
    "use strict";
    function ContactsController($scope, dataFactory, OfficeModel) {
        this.$scope = $scope;
        $scope.model = OfficeModel;
        $scope.model.menu = 'contacts';
        $scope.commonTools = commonTools;
        
        var timer;


        $scope.$watch('model.currentContact', function(newVal, oldVal) {
            if (oldVal && newVal && oldVal.contactId === newVal.contactId && oldVal !== newVal) {
                clearTimeout(timer);
                timer = setTimeout(function(){
                    update(newVal);
                }, 1000);
            }
        }, true);

        function update(obj) {
            var handleSuccess = function(data, status) {
                var message = 'Save: ' + obj.name;
                modal.show(message, false);
            };
            dataFactory.update(commonTools.param(obj)).success(handleSuccess);
        }

        $scope.newContact = emptyContact();

        function emptyContact() {
            return {
                type : 'contacts',
                contactId : null,
                name : '',
                contactPerson : '',
                street : '',
                zipcode : '',
                city : '',
                email : '',
                telephone : '',
                web : '',
                info : '',
                rate : 70
            }
        }

        $scope.addContact = function() {
            var message;
            if ($scope.newContact.name) {
                var handleSuccess = function(data, status) {
                    var message = 'Toegevoegd: ' + $scope.newContact.name;
                    $scope.model.importContact($scope.newContact);
                    $scope.newContact = emptyContact();
                    modal.show(message, false);
                };
                $scope.newContact.contactId = $scope.model.getContactId();
                dataFactory.add(commonTools.param($scope.newContact)).success(handleSuccess);
            } else {
                message = 'Vul een naam in.';
                modal.show(message, true);
            }
        };

        $scope.limitString = function(string) {
            var max = 20;
            if (string.length > max) {
                return string.substr(0, max - 3) + '[...]';
            } else {
                return string;
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
            sorted = filtered.sort(compare);
            if (sorted.length === 1) {
                $scope.model.currentContact = sorted[0];
            }
            return sorted;
        };

        function compare(a,b) {
            if (a.contactId < b.contactId)
                return 1;
            if (a.contactId > b.contactId)
                return -1;
            return 0;
        }
    }

    ContactsController.$inject = ['$scope', 'dataFactory', 'OfficeModel'];

    return ContactsController;
}); 