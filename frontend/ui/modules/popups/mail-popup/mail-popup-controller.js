define([], function () {
    "use strict";

    function MailPopupController($scope, office, $sce, $http) {
        this.$scope = $scope;

        $scope.document = office.currentDocument;

        $scope.mailFooter = function() {
            return $sce.trustAsHtml($scope.document.member.mailFooter);
        };

        $scope.mail = {
            sender: $scope.document.member.email,
            receiver: $scope.document.contact.email,
            subject: $scope.document.getPrefix() + ' voor de werkzaamheden m.b.t. ' + $scope.document.title,
            content: 'Beste ' + $scope.document.contactName + ',\n\nBijgeleverd de ' + $scope.document.getPrefix().toLowerCase() + ' voor de werkzaamheden  m.b.t. ' + $scope.document.title + '.\n\n'
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
                    console.log(data);
                    //$scope.close();
                }).error(function(data, status, headers, config) {
                    console.log(data);
                });


            }).error(function(data, status, headers, config) { });
        };

        $scope.close = function() {
            office.status.mailPopup.active = false;
        }
    }

    MailPopupController.$inject = ['$scope', 'office', '$sce', '$http'];

    return MailPopupController;
}); 