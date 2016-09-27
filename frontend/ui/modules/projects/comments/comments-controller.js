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
        
        $scope.editing = null;
        var timer = null;

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

        $scope.keydown = function(event) {
            if (event.keyCode === 13) {
                $scope.closeComment();
            }
        };

        $scope.openComment = function(comment, index) {
            $scope.editing = comment;
        };

        $scope.closeComment = function() {
            $scope.editing = null;
        };

        $scope.removeComment = function(comment) {
            var message = 'Wil je deze comment echt verwijderen?',
                handleSuccess = function(data, status) {
                    var successMessage = 'Comment verwijderd';
                    comment.remove();
                    modal.show(successMessage, false)
                };
            modal.confirm(message, function(result){
                if (result) {
                    dataFactory.remove(commonTools.param(comment)).success(handleSuccess);
                }
            });
        };

        $scope.updateComment = function(comment) {
            console.log("!");
            var handleSuccess;
            clearTimeout(timer);
            timer = setTimeout(function(){
                handleSuccess = function(data, status) {
                    var message = 'Save: comment';
                    modal.show(message, false);
                };
                dataFactory.update(commonTools.param(comment)).success(handleSuccess);
            }, 1000);
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