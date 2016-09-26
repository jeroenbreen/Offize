define([
    '../../ui-tools/common-tools',
    '../../ui-tools/modal'
], function(
    commonTools,
    modal
) {
    'use strict';
    function DocumentsController($scope, dataFactory, OfficeModel) {
        this.$scope = $scope;
        $scope.model = OfficeModel;
        var timer;

        $scope.model.menu = 'documents';

        $scope.$watch('model.currentProject', function(newVal, oldVal) {
            if (oldVal && newVal && oldVal.projectId === newVal.projectId && oldVal !== newVal) {
                clearTimeout(timer);
                timer = setTimeout(function(){
                    update(newVal);
                }, 1000);
            }
        }, true);

        function update(obj) {
            var handleSuccess = function(data, status) {
                var message = 'Save: ' + obj.projectName;
                modal.show(message, false);
            };
            dataFactory.update(commonTools.param(obj)).success(handleSuccess);
        }

        $scope.filter = {
            search : {
                invoices : '',
                tenders : ''
            }
        };

        $scope.filterDocs = function(docs, type) {
            var filtered = [],
                sorted;
            for (var i = 0, l = docs.length; i < l; i++) {
                var doc = docs[i];
                if (
                    ($scope.filter.search[type] === '' ||
                     doc.jaar.toString().indexOf($scope.filter.search[type].toLocaleLowerCase()) > -1 ||
                     doc.klant.naam.toLocaleLowerCase().indexOf($scope.filter.search[type].toLocaleLowerCase()) > -1 ||
                     doc.nr.indexOf($scope.filter.search[type].toLocaleLowerCase()) > -1 ||
                     doc.omschrijving.toLocaleLowerCase().indexOf($scope.filter.search[type].toLocaleLowerCase()) > -1
                   )
                ) {
                    filtered.push(doc);
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
            return x.jaar + '' + x.nr
        }

    }

    DocumentsController.$inject = ['$scope', 'dataFactory', 'OfficeModel'];

    return DocumentsController;
}); 