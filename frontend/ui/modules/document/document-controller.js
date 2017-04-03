define([
    '../../ui-tools/modal'
], function(
    modal
) {
    'use strict';
    function DocumentController($scope, $document, $http) {
        this.$scope = $scope;

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

        $scope.closeDocument = function() {
            $scope.office.currentDocument = null;
        };

        $scope.removeFile = function() {
            var name = $scope.model.getPrefix() + ' ' + $scope.model.year + '-' + $scope.model.nr,
                message = 'Wil je ' + name + ' echt verwijderen?',
                handleSuccess = function(data, status) {
                    var successMessage = name + ' verwijderd';
                    modal.show(successMessage, false);
                    $scope.model.remove();
                    $scope.closeDocument();
                    $scope.$apply();
                };
            modal.confirm(message, function(result){
                if (result) {
                    handleSuccess();
                }
            });
        };

        $scope.printFile = function() {
            var url,
                printData = $scope.model.export();
            console.log(printData);
            if ($scope.model.english) {
                url = 'frontend/to-pdf/print_en.php';
            } else {
                url = 'print/print-adapter.php';
            }

            $http.post(url, {
                'data' : printData
            }).success(function(data, status, headers, config) {

                console.log(data);

                //window.open(data);

            }).error(function(data, status, headers, config) {
            });
        };



        $scope.lockFile = function () {
            $scope.model.locked = !$scope.model.locked;
        };

        // document functions

        if ($scope.model.hideTotal === null) {
            $scope.model.hideTotal = false;
        }


        $scope.monthelize = function(m) {
            return $scope.months[m - 1];
        };

        $scope.months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];


        $scope.getTotal = function(multiplier) {
            var total = 0;
            for (var i = 0; i < $scope.model.lines.length; i++) {
                var line = $scope.model.lines[i];
                if (line.type === 'count') {
                    total += line.rate * line.hours;
                } else if (line.type === 'amount') {
                    total += parseFloat(line.amount);
                }
            }
            total *= multiplier;
            total = Math.round(100 * total) / 100;
            return total;
        };

        $scope.removeLine = function(line) {
            $scope.model.lines.splice($scope.model.lines.indexOf(line), 1);
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

    DocumentController.$inject = ['$scope', '$document', '$http'];

    return DocumentController;
}); 