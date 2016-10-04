define([
    '../../../ui-tools/common-tools',
    '../../../ui-tools/modal'
], function(
    commonTools,
    modal
) {
    "use strict";
    function CommentsController($scope, dataFactory, $document) {
        this.$scope = $scope;

        // esc key

        // esc key

        $document.bind('keydown', function (event) {
            $scope.keyManager(event);
        });

        $scope.keyManager = function (e) {
            if (e.target.tagName !== "INPUT") {
                if ($scope.model.popup !== 0 && e.keyCode === 27) {
                    $scope.editing = null;
                }
                $scope.$apply();
            }
        };

        $scope.newComment = emptyComment();
        
        $scope.editing = null;
        var timer = null;

        $scope.addComment = function() {
            var message;
            if ($scope.newComment.comment !== '') {
                var handleSuccess = function(response, status) {
                    $scope.office.importComment($scope.newComment);
                    $scope.newComment = emptyComment();
                    modal.show(response, false);
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
                handleSuccess = function(response, status) {
                    comment.remove();
                    modal.show(response, false)
                };
            modal.confirm(message, function(result){
                if (result) {
                    dataFactory.remove(commonTools.param(comment)).success(handleSuccess);
                }
            });
        };

        $scope.updateComment = function(comment) {
            var handleSuccess;
            clearTimeout(timer);
            timer = setTimeout(function(){
                handleSuccess = function(response, status) {
                    modal.show(response, false);
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

    CommentsController.$inject = ['$scope', 'dataFactory', '$document'];

    return CommentsController;
}); 