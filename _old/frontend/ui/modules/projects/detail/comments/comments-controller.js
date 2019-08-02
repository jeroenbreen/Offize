define([
    'models/Comment',
    'ui/ui-tools/common-tools',
    'ui/ui-tools/modal'
], function(
    Comment,
    commonTools,
    modal
) {
    "use strict";
    function CommentsController($scope, api, $document) {
        this.$scope = $scope;

        $scope.newComment = new Comment();

        $scope.addComment = function() {
            var message;
            if ($scope.newComment.comment !== '') {
                var handleSuccess = function(response, status) {
                    $scope.newComment.date = 'just now...';
                    $scope.newComment.id = response.id;
                    $scope.project.comments.push($scope.newComment);
                    $scope.newComment = new Comment();
                    modal.show(response, false);
                };
                //$scope.newComment.date = new Date().toLocaleString();
                $scope.newComment.projectId = $scope.project.projectId;
                $scope.newComment.id = $scope.project.contact.id;
                api.create($.param($scope.newComment.toBackend())).success(handleSuccess);
            } else {
                message = 'Vul wat in.';
                modal.show(message, true);
            }
        };

        // editing

        $document.bind('keydown', function (event) {
            $scope.keyManager(event);
        });

        $scope.keyManager = function (e) {
            if (e.target.tagName !== "INPUT") {
                if (!$scope.office.currentDocument && e.keyCode === 27) {
                    $scope.editing = null;
                }
                $scope.$apply();
            }
        };


        
        $scope.editing = null;
        var timer = null;

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
                    var index = $scope.project.comments.indexOf(comment);
                    $scope.project.comments.splice(index, 1);
                    modal.show(response, false)
                };
            modal.confirm(message, function(result){
                if (result) {
                    api.delete($.param(comment.toBackend())).success(handleSuccess);
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
                api.update($.param(comment.toBackend())).success(handleSuccess);
            }, 1000);
        };
    }

    CommentsController.$inject = ['$scope', 'api', '$document'];

    return CommentsController;
}); 