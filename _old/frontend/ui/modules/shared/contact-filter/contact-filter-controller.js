define([
    'models/Contact'
], function (
    Contact
) {
    "use strict";

    function ContactFilterController($scope) {
        this.$scope = $scope;

        var filterContactAllOption = new Contact({
            id: -1,
            name: 'Alle'
        });

        $scope.contacts = [];


        $scope.$watch('model.contacts.length', function(newVal, oldVal){
            if (newVal > 0) {
                $scope.contacts = $scope.model.contacts.slice();
                $scope.contacts.unshift(filterContactAllOption);
                $scope.current = $scope.contacts[0];
            }
        })
    }

    ContactFilterController.$inject = ['$scope'];

    return ContactFilterController;
}); 