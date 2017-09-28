define([
    'models/lines/Line',
    'ui/ui-tools/modal',
    'jquery'
], function(
    Line,
    modal,
    $
) {
    'use strict';
    function DocumentController($scope, $document, $http, dataFactory) {
        this.$scope = $scope;

        $scope.months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];



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

        // menu functions

        $document.bind('keydown', function (event) {
            $scope.keyManager(event);
        });

        $scope.keyManager = function (e) {
            if (e.target.tagName !== 'INPUT') {
                if (e.keyCode === 27) {
                    $scope.closeDocument();
                }
                $scope.$apply();
            }
        };



        // events

        $scope.closeDocument = function() {
            $scope.office.currentDocument = null;
        };

        $scope.removeDocument = function() {
            var name, message, successCallback, confirmCallback;

            name = $scope.document.getPrefix() + ' ' + $scope.document.toSlug();
            message = 'Wil je ' + name + ' echt verwijderen?';
            successCallback = function(data, status) {
                var successMessage = name + ' verwijderd';
                modal.show(successMessage, false);
                removeFromOffice();
                removeFromProject();
                $scope.closeDocument();
            };

            function removeFromOffice() {
                var index = $scope.office.documents.indexOf($scope.document);
                $scope.office.documents.splice(index, 1);
            }

            function removeFromProject() {
                var index = $scope.project[$scope.document.doctype + 's'].indexOf($scope.document);
                $scope.project[$scope.document.doctype + 's'].splice(index, 1);
            }

            confirmCallback = function() {
                $scope.$apply();
                dataFactory.delete($.param($scope.document.toBackend())).success(successCallback);
            };


            modal.confirm(message, function(result){
                if (result) {
                    confirmCallback();
                }
            });
        };

        $scope.printFile = function() {
            var url,
                printData = $scope.document.toPrint();
            console.log(printData);
            if ($scope.document.english) {
                //url = 'frontend/to-pdf/print_en.php';
            } else {
                url = 'print/print-adapter.php';
            }

            $http.post(url, {
                'data' : printData
            }).success(function(data, status, headers, config) {
                window.open(window.config.printLocation + data);
            }).error(function(data, status, headers, config) { });
        };



        $scope.lockFile = function () {
            $scope.document.locked = !$scope.document.locked;
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
    }

    DocumentController.$inject = ['$scope', '$document', '$http', 'dataFactory'];

    return DocumentController;
}); 