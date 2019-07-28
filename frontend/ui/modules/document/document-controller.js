define([
    'ui/ui-tools/modal',
    'ui/ui-tools/delay-tool',
    'jquery'
], function(
    modal,
    delayTool,
    $
) {
    'use strict';
    function DocumentController($scope, $localStorage, $document, api, office) {
        this.$scope = $scope;
        $scope.office = office;

        function handleSuccess(response, status) {
            modal.show(response, false);
        }

        $scope.updateDocument = function() {
            function update() {
                api.update($.param($scope.document.toBackend())).success(handleSuccess);
            }

            delayTool.delay(update);
        };

        $scope.$on('update-document', function(event, document){
            api.update($.param(document.toBackend())).success(handleSuccess);
        });



        // lines

        $scope.selectLine = function(line) {
            office.status.document.currentLine  = line;
        };



        // events
        $scope.closeDocument = function() {
            $scope.office.currentDocument = null;
            delete $localStorage.office.currentDocument;
        };


        // document functions

        if ($scope.document.hideTotal === null) {
            $scope.document.hideTotal = false;
        }


        $scope.monthelize = function(m) {
            return $scope.months[m - 1];
        };



        $scope.getTotal = function(multiplier) {
            var total = 0;
            for (var i = 0; i < $scope.document.lines.length; i++) {
                var line = $scope.document.lines[i];
                if (line.lineType === 'count') {
                    total += line.rate * line.hours;
                } else if (line.lineType === 'amount') {
                    total += parseFloat(line.amount);
                }
            }
            total *= multiplier;
            total = Math.round(100 * total) / 100;
            return total;
        };

        //

        $scope.sortableOptions = {
            handle : '.handle',
            helper : 'clone',
            distance: 5,
            placeholder: "sortable-placeholder",
            appendTo: "body",
            start: function(e, ui){
                ui.placeholder.height(ui.item.height());
            }
        };

        $scope.$on('close-popup', function(){
            $scope.closeDocument();
        });
    }

    DocumentController.$inject = ['$scope', '$localStorage', '$document', 'api', 'office'];

    return DocumentController;
}); 