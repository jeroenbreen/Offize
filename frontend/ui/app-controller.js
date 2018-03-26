define([], function() {
    "use strict";
    function AppController($scope, $document, $localStorage, OfficeModel, $http) {
        this.$scope = $scope;
        this.$scope.office = this.office = OfficeModel;

        var cache;

        $scope.menus = ['projects', 'agenda', 'contacts', 'documents'];

        importData();

        function importData() {
            $http.get("./backend/bootstrap.php").success(function(data) {
                console.log(data);
                $scope.office.bootstrap(data);
                $scope.$broadcast('bootstrap');
                readCache();
            });
        }

        function readCache() {
            if (!$localStorage.office) {
                $localStorage.office = {};
            }
            if ($localStorage.office.currentProject) {
                var project = $scope.office.getProjectById($localStorage.office.currentProject);
                if (project) {
                    $scope.office.currentProject = project;
                }
            }

            if ($localStorage.office.currentDocument) {
                var document = $scope.office.getDocumentById($localStorage.office.currentDocument);
                if (document) {
                    $scope.office.currentDocument = document;
                }
            }

        }

        $document.bind('keydown', function (event) {
            $scope.keyManager(event);
        });

        $scope.keyManager = function (e) {
            if (e.target.tagName !== 'INPUT') {
                if (e.keyCode === 27) {
                    $scope.$broadcast('close-popup');
                    delete $localStorage.office.currentDocument;
                }
                $scope.$apply();
            }
        };
    }

    AppController.$inject = ['$scope', '$document', '$localStorage', 'OfficeModel', '$http'];

    return AppController;
});
