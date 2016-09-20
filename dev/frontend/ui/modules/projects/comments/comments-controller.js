define([
    '../../../ui-tools/common-tools',
    '../../../ui-tools/modal'
], function(
    commonTools,
    modal
) {
    "use strict";
    function CommentsController($scope, dataFactory) {
        this.$scope = $scope;

        $scope.newComment = emptyComment();

        $scope.addComment = function() {
            var message;
            if ($scope.newComment.comment !== '') {
                var handleSuccess = function(data, status) {
                    var message = 'Toegevoegd: ' + $scope.newComment.comment;
                    $scope.office.importComment($scope.newComment);
                    $scope.newComment = emptyComment();
                    modal.show(message, false);
                };
                $scope.newComment.date = new Date().toLocaleString();
                $scope.newComment.id = $scope.office.getCommentId();
                $scope.newComment.projectId = $scope.model.projectId;
                $scope.newComment.contactId = $scope.model.contactId;
                dataFactory.add(commonTools.param($scope.newComment)).success(handleSuccess);
            } else {
                message = 'Vul wat in.';
                modal.show(message, true);
            }
        };

        function emptyComment() {
            return {
                comment : '',
                type : 'comments'
            }
        }

    }

    CommentsController.$inject = ['$scope', 'dataFactory'];

    return CommentsController;
}); 