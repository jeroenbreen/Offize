define([
    'ui/ui-tools/common-tools',
    'ui/ui-tools/modal'
], function(
    commonTools,
    modal
) {
    'use strict';
    function DocumentsController($scope, office) {
        this.$scope = $scope;
        $scope.model = office;

        $scope.model.menu = 'documents';


        $scope.filter = {
            search : '',
            doctype: 'invoice',
            year: $scope.model.thisYear
        };

        $scope.filterDocs = function() {
            var filtered = [];
            for (var i = 0, l = $scope.model.documents.length; i < l; i++) {
                var document = $scope.model.documents[i];
                if (
                    ($scope.filter.search === '' ||
                        (document.year.toString().indexOf($scope.filter.search.toLocaleLowerCase()) > -1 ||
                     document.contact.name.toLocaleLowerCase().indexOf($scope.filter.search.toLocaleLowerCase()) > -1 ||
                     document.nr.toString().indexOf($scope.filter.search.toLocaleLowerCase()) > -1 ||
                     document.title.toLocaleLowerCase().indexOf($scope.filter.search.toLocaleLowerCase()) > -1)
                    )
                    && $scope.filter.doctype === document.doctype
                    && ($scope.filter.year === document.year || $scope.filter.year === 'Alle')
                ) {
                    filtered.push(document);
                }
            }
            return filtered;
        };



        $scope.selectDocument = function(document) {
            $scope.model.currentDocument = document;
            $scope.model.currentProject = $scope.model.getProjectById(document.projectId)
        };

    }

    DocumentsController.$inject = ['$scope', 'office'];

    return DocumentsController;
}); 