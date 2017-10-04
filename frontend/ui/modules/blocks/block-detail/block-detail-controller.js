define([
    'models/time-registration/Activity',
    'ui/ui-tools/modal',
    'ui/ui-tools/date-tool',
    'jquery'
], function (
    Activity,
    modal,
    dateTool,
    $
) {
    "use strict";

    function BlockDetailController($scope, $document, dataFactory) {
        this.$scope = $scope;
        $scope.dateTool = dateTool;


        $scope.createActivity = function() {
            var activity, successCallback;

            successCallback = function(response, status) {
                activity.id = response.id;
                $scope.block.activities.push(activity);
                modal.show(response.message, false);
            };

            activity = new Activity();
            activity.blockId = $scope.block.id;
            dataFactory.create($.param(activity.toBackend())).success(successCallback);
        };

        $scope.deleteActivity = function(activity) {
            var message = 'Zeker weten?',
                handleSuccess = function(response, status) {
                    var index = $scope.block.activities.indexOf(activity);
                    $scope.block.activities.splice(activity, 1);
                    modal.show(response, false);
                };
            modal.confirm(message, function(result){
                if (result) {
                    dataFactory.delete($.param(activity.toBackend())).success(handleSuccess);
                }
            });
        };

        $scope.deleteBlock = function() {
            var message = 'Zeker weten?',
                handleSuccess = function(response, status) {
                    $scope.$emit('delete-block', $scope.block);
                    modal.show(response, false);
                };
            modal.confirm(message, function(result){
                if (result) {
                    dataFactory.delete($.param($scope.block.toBackend())).success(handleSuccess);
                }
            });
        };

        $scope.closeDetail = function() {
            $scope.$emit('open-block', null);
        };

        $scope.updateBlock = function() {
            $scope.$emit('update-block', $scope.block);
        };

        $scope.$on('close-popup', function(){
            $scope.closeDetail();
        });
    }

    BlockDetailController.$inject = ['$scope', '$document', 'dataFactory'];

    return BlockDetailController;
}); 