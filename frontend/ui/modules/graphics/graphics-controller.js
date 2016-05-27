define([
], function(
) {
    'use strict';
    function GraphicsController($scope) {
        this.$scope = $scope;

        $scope.months = [1,2,3,4,5,6,7,8,9,10,11,12];

        $scope.getAmount = function(year, month) {
            var amount = 0;
            for (var i = 0, l = $scope.model.invoices.length; i < l; i++) {
                var invoice = $scope.model.invoices[i];
                if (invoice.datum.j === year && invoice.datum.m === month) {
                    var thisAmount = 0;
                    for (var j = 0, jl = invoice.posten.length; j < jl; j++) {
                        var post = invoice.posten[j];
                        if (post.type === 'uren') {
                            thisAmount += parseFloat(post.tarief) * parseFloat(post.uren);
                        } else if (post.type === 'bedrag') {
                            thisAmount += parseFloat(post.bedrag);
                        }

                    }
                    amount += thisAmount;
                }
            }
            return amount;
        };
    }

    GraphicsController.$inject = ['$scope'];

    return GraphicsController;
}); 