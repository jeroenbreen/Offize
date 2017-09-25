define([
], function(
) {
    'use strict';
    function GraphicsController($scope, OfficeModel) {
        this.$scope = $scope;
        $scope.model = OfficeModel;

        $scope.model.menu = 'graphics';

        $scope.months = [1,2,3,4,5,6,7,8,9,10,11,12];

        $scope.getAmount = function(year, month) {
            var amount = 0;
            for (var i = 0, l = $scope.model.documents.length; i < l; i++) {
                var document = $scope.model.documents[i];
                if (document.doctype === 'invoice') {
                    if (document.year === year && document.month === month) {
                        var thisAmount = 0;
                        for (var j = 0, jl = document.lines.length; j < jl; j++) {
                            var line = document.lines[j];
                            if (line.type === 'count') {
                                thisAmount += parseFloat(line.rate) * parseFloat(line.hours);
                            } else if (line.type === 'amount') {
                                thisAmount += parseFloat(line.amount);
                            }

                        }
                        amount += thisAmount;
                    }
                }
            }
            return amount;
        };
    }

    GraphicsController.$inject = ['$scope', 'OfficeModel'];

    return GraphicsController;
}); 