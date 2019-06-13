define([
    'ui/ui-tools/modal',
    'jquery'
], function (
    modal,
    $
) {
    "use strict";

    function MailPopupController($scope, $rootScope, office, $sce, $http, dataFactory) {
        this.$scope = $scope;

        $scope.document = office.currentDocument;

        $scope.mail = office.status.mailPopup.mail;

        $scope.trustAsHtml = function(content) {
            return $sce.trustAsHtml(content);
        };

        $scope.isUnsent = function() {
            // (we have to use Number(id) in Mail because of bad backend
            // that makes 0 out of a null
            return $scope.mail.id === null || $scope.mail.id === 0;
        };

        $scope.formatContent = function(content) {
            return content.replace(/\n/g, "<br />");

        };


        $scope.send = function() {
            $http.post('print/print-adapter.php', {
                'data' : $scope.document.toPrint()
            }).success(function(file, status, headers, config) {

                $http.post('mail/document.php', {
                    'data' : {
                        attachment: window.config.printLocation + file,
                        attachmentName: $scope.document.getPDFname(),
                        sender: $scope.mail.sender,
                        receiver: $scope.mail.receiver,
                        subject: $scope.mail.subject,
                        content: $scope.mail.content,
                        footer: $scope.document.member.mailFooter
                    }
                }).success(function(data, status, headers, config) {
                    addMail();
                }).error(function(data, status, headers, config) {
                    console.log(data);
                });


            }).error(function(data, status, headers, config) { });
        };

        function addMail() {
            var successCallback = function(response, status) {
                $scope.mail.id = response.id;
                office.mails.push($scope.mail);
                $scope.document.mails.push(response.id);
                updateDocument();
                modal.show(response.message, false);
                $scope.close();
            };

            dataFactory.create($.param($scope.mail.toBackend())).success(successCallback);
        }

        function updateDocument() {
            $rootScope.$broadcast('update-document', $scope.document);
        }

        $scope.close = function() {
            office.status.mailPopup.active = false;
        }
    }

    MailPopupController.$inject = ['$scope', '$rootScope', 'office', '$sce', '$http', 'dataFactory'];

    return MailPopupController;
}); 