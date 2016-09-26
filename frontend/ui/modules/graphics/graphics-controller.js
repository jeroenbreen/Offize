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
            for (var i = 0, l = $scope.model.invoices.length; i < l; i++) {
                var invoice = $scope.model.invoices[i];
                if (invoice.date.j === year && invoice.date.m === month) {
                    var thisAmount = 0;
                    for (var j = 0, jl = invoice.lines.length; j < jl; j++) {
                        var line = invoice.lines[j];
                        if (line.type === 'count') {
                            thisAmount += parseFloat(line.rate) * parseFloat(line.hours);
                        } else if (line.type === 'amount') {
                            thisAmount += parseFloat(line.amount);
                        }

                    }
                    amount += thisAmount;
                }
            }
            return amount;
        };
    }

    GraphicsController.$inject = ['$scope', 'OfficeModel'];

    return GraphicsController;
}); 