define([
    'ui/ui-tools/modal',
    'ui/ui-tools/delay-tool'
], function (
    modal,
    delayTool
) {
    "use strict";

    function SettingsController($scope, office, api) {
        this.$scope = $scope;

        $scope.office = office;

        $scope.update = function() {
            function handleSuccess(response, status) {
                modal.show(response, false);
            }

            function update() {
                api.update($.param($scope.office.company.toBackend())).success(handleSuccess);
            }

            delayTool.delay(update);
        };


        $scope.close = function() {
            office.status.settingsPopup.active = false;
        };
    }

    SettingsController.$inject = ['$scope', 'office', 'api'];

    return SettingsController;
}); 