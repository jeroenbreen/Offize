define([
    'ui/ui-tools/common-tools',
    'ui/ui-tools/modal'
], function(
    commonTools,
    modal
) {
    'use strict';
    function DocumentsController($scope, OfficeModel) {
        this.$scope = $scope;
        $scope.model = OfficeModel;

        $scope.model.menu = 'documents';


        $scope.filter = {
            search : '',
            doctype: 'invoice',
            year: $scope.model.thisYear
        };

        $scope.filterDocs = function() {
            var filtered = [],
                sorted;
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
            sorted = filtered.sort(compare);

            return sorted;
        };

        function compare(a,b) {
            if (combi(a) < combi(b))
                return 1;
            if (combi(a) > combi(b))
                return -1;
            return 0;
        }

        function combi(x) {
            return x.year + '' + x.nr
        }

        $scope.selectDocument = function(document) {
            $scope.model.currentDocument = document;
            $scope.model.currentProject = $scope.model.getProjectById(document.projectId)
        };

    }

    DocumentsController.$inject = ['$scope', 'OfficeModel'];

    return DocumentsController;
}); 