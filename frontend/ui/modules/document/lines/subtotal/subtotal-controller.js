define([], function() {
    'use strict';
    function SubtotalController($scope) {
        this.$scope = $scope;

        $scope.getSubTotal = function(index, multiplier) {
            var total = 0,
                i = index - 1;
            while (i > -1 && $scope.document.lines[i].type !== 'subtotal') {
                var line = $scope.document.lines[i];
                if (line.type === 'count') {
                    total += line.rate * line.hours;
                } else if (line.type === 'amount') {
                    total += parseFloat(line.amount);
                }
                i--;
            }
            total *= multiplier;
            total = Math.round(100 * total) / 100;
            return total;
        };
    }

    SubtotalController.$inject = ['$scope'];

    return SubtotalController;
}); 