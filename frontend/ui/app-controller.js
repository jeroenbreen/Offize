define([], function() {
    "use strict";
    function AppController($scope, $document, OfficeModel, $http) {
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

        $document.bind('keydown', function (event) {
            $scope.keyManager(event);
        });

        $scope.keyManager = function (e) {
            if (e.target.tagName !== 'INPUT') {
                if (e.keyCode === 27) {
                    $scope.$broadcast('close-popup');
                }
                $scope.$apply();
            }
        };
    }

    AppController.$inject = ['$scope', '$document', 'OfficeModel', '$http'];

    return AppController;
});
