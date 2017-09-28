define([], function() {
    "use strict";
    function AppController($scope, OfficeModel, $http) {
        this.$scope = $scope;
        this.$scope.office = this.office = OfficeModel;

        $scope.menus = ['projects', 'blocks', 'contacts', 'documents', 'graphics'];

        importData();

        function importData() {
            $http.get("./backend/bootstrap.php").success(function(data) {
                console.log(data);
                $scope.office.bootstrap(data);
                $scope.$broadcast('bootstrap');
            });
        }
    }

    AppController.$inject = ['$scope', 'OfficeModel', '$http'];

    return AppController;
});
