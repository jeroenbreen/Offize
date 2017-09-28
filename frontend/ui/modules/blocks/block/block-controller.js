define([
    'models/time-registration/Clock',
    'ui/ui-tools/modal',
    'jquery'
], function (
    Clock,
    modal,
    $
) {
    "use strict";

    function BlockController($scope, dataFactory) {
        this.$scope = $scope;

        $scope.addClock = function() {
            var clock, successCallback;

            successCallback = function(response, status) {
                clock.id = response.id;
                $scope.block.clocks.push(clock);
                modal.show(response.message, false);
            };

            clock = new Clock();
            clock.blockId = $scope.block.id;
            dataFactory.create($.param(clock.toBackend())).success(successCallback);
        };

    }

    BlockController.$inject = ['$scope', 'dataFactory'];

    return BlockController;
}); 