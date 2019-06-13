define([
    'ui/ui-tools/date-tool'
], function (
    dateTool
) {
    "use strict";

    function MailController($scope) {
        this.$scope = $scope;

        $scope.dateTool = dateTool;

    }

    MailController.$inject = ['$scope'];

    return MailController;
}); 