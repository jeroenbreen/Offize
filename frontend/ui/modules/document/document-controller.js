define([
    'models/lines/Line',
    'ui/ui-tools/modal',
    'ui/ui-tools/delay-tool',
    'jquery'
], function(
    Line,
    modal,
    delayTool,
    $
) {
    'use strict';
    function DocumentController($scope, $localStorage, $document, dataFactory, office) {
        this.$scope = $scope;
        $scope.office = office;

        $scope.updateDocument = function() {
            function update() {
                var handleSuccess = function(response, status) {
                    modal.show(response, false);
                };
                dataFactory.update($.param($scope.document.toBackend())).success(handleSuccess);
            }

            delayTool.delay(update);
        };



        // lines

        $scope.currentLine = null;

        $scope.selectLine = function(line) {
            $scope.currentLine = line;
        };

        $scope.addLine = function(lineType) {
            var data, line, successCallback;
            data = {
                lineType: lineType,
                documentId: $scope.document.id,
                amount: 0,
                text: '',
                hours: '',
                arrayOrder: $scope.document.lines.length,
                rate: $scope.document.rate
            };
            line = new Line(data);


            successCallback = function(response, status) {
                line.id = response.id;
                $scope.document.lines.push(line);
                $scope.currentLine = line;
                modal.show(response.message, false);
            };

            dataFactory.create($.param(line.toBackend())).success(successCallback);
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

    DocumentController.$inject = ['$scope', '$localStorage', '$document', 'dataFactory', 'office'];

    return DocumentController;
}); 