define([
    'models/lines/Line',
    'ui/ui-tools/modal'
], function (
    Line,
    modal
) {
    "use strict";

    function LineToolsController($scope, dataFactory, office) {
        this.$scope = $scope;

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
                office.status.document.currentLine = line;
                modal.show(response.message, false);
            };

            dataFactory.create($.param(line.toBackend())).success(successCallback);
        };

    }

    LineToolsController.$inject = ['$scope', 'dataFactory', 'office'];

    return LineToolsController;
}); 