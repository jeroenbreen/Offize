define([], function () {
    "use strict";

    function MailsController($scope, office) {
        this.$scope = $scope;

        $scope.getMails = function() {
            var mails = [];
            for (var i = 0, l = $scope.document.mails.length; i < l; i++) {
                var mail_id, mail;
                mail_id = $scope.document.mails[i];
                mail = app.getItemById('mails', mail_id);
                if (mail) {
                    mails.push(mail);
                }
            }
            return mails;
        };

        $scope.openMail = function(mail) {
            office.status.mailPopup.active = true;
            office.status.mailPopup.mail = mail;
        };

    }

    MailsController.$inject = ['$scope', 'office'];

    return MailsController;
}); 