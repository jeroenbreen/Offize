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
    function ContactsController($scope, dataFactory, OfficeModel) {
        this.$scope = $scope;
        $scope.model = OfficeModel;
        $scope.model.menu = 'contacts';
        $scope.commonTools = commonTools;
        
        var timer;


        $scope.$watch('model.currentContact', function(newVal, oldVal) {
            if (oldVal && newVal && oldVal.contactId === newVal.contactId && oldVal !== newVal) {
                if (newVal.id) {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        update(newVal);
                    }, 1000);
                }
            }
        }, true);

        function update(obj) {
            var handleSuccess = function(data, status) {
                var message = 'Save: ' + obj.name;
                modal.show(message, false);
            };
            dataFactory.update(commonTools.param(obj)).success(handleSuccess);
        }


        $scope.addContact = function() {
            var message;
            if ($scope.newContact.name) {
                var handleSuccess = function(data, status) {
                    var message = 'Toegevoegd: ' + $scope.newContact.name;
                    $scope.newContact.contactId =data.id;
                    $scope.model.contacts.push($scope.newContact);
                    $scope.model.currentContact = $scope.newContact;
                    $scope.newContact = new Contact();
                    modal.show(message, false);
                };

                dataFactory.create($.param($scope.newContact.toBackend())).success(handleSuccess);
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

        $scope.$on('bootstrap', function(){
            $scope.newContact = new Contact();
            $scope.model.currentContact = $scope.newContact;
        })
    }

    ContactsController.$inject = ['$scope', 'dataFactory', 'OfficeModel'];

    return ContactsController;
}); 