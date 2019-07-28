define([
    'ui/ui-tools/modal',
    'ui/ui-tools/delay-tool'
], function (
    modal,
    delayTool
) {
    "use strict";

    function SettingsController($scope, office, api, $timeout) {
        this.$scope = $scope;

        $scope.office = office;

        $scope.$watch('office.company', function(newValue, oldValue){
            function handleSuccess(response, status) {
                $timeout(function(){
                    modal.show(response, false);
                })

            }

            function update() {
                api.update($.param($scope.office.company.toBackend())).success(handleSuccess);
            }

            if (newValue && oldValue) {
                delayTool.delay(update);
            }
        }, true);


        $scope.close = function() {
            office.status.settingsPopup.active = false;
        }

    }

    SettingsController.$inject = ['$scope', 'office', 'api', '$timeout'];

    return SettingsController;
}); 