define([], function() {
    'use strict';
    function DocumentController($scope, $document, $http) {
        this.$scope = $scope;

        // menu functions

        $document.bind('keydown', function (event) {
            $scope.keyManager(event);
        });

        $scope.keyManager = function (e) {
            if (e.target.tagName !== 'INPUT') {
                if (e.keyCode === 27) {
                    $scope.closeDocument();
                }
                $scope.$apply();
            }
        };

        $scope.closeDocument = function() {
            $scope.office.currentDocument = null;
        };


        $scope.removeFile = function() {
            if (confirm($scope.model.type + ' ' + $scope.model.jaar + '-' + $scope.model.nr + ' verwijderen. Sure?')) {
                $scope.model.remove();
                $scope.closeDocument();
            }
        };

        $scope.printFile = function() {
            var url;
            if ($scope.model.english) {
                url = 'frontend/to-pdf/print_en.php';
            } else {
                url = 'frontend/to-pdf/print.php';
            }
            $http.post(url, {
                'data' : $scope.model.getClean()
            }).success(function(data, status, headers, config) {
                //console.log(data);
                window.open(data);
            }).error(function(data, status, headers, config) {
            });
        };



        $scope.lockFile = function () {
            $scope.model.lock = !$scope.model.lock;
        };

        // document functions

        if ($scope.model.hideTotal === null) {
            $scope.model.hideTotal = false;
        }


        $scope.monthelize = function(m) {
            var months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
            return months[m - 1];
        };

        $scope.months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];


        $scope.getTotal = function(multiplier) {
            var total = 0;
            for (var i = 0; i < $scope.model.posten.length; i++) {
                var post = $scope.model.posten[i];
                if (post.type === 'uren') {
                    total += post.tarief * post.uren;
                } else if (post.type === 'bedrag') {
                    total += parseInt(post.bedrag);
                }
            }
            total *= multiplier;
            total = Math.round(100 * total) / 100;
            return total;
        };

        $scope.getSubTotal = function(index, multiplier) {
            var total = 0;
            for (var i = index; i > -1; i--) {
                var post = $scope.model.posten[i];
                if (post.type === 'uren') {
                    total += post.tarief * post.uren;
                } else if (post.type === 'bedrag') {
                    total += parseInt(post.bedrag);
                }
            }
            total *= multiplier;
            total = Math.round(100 * total) / 100;
            return total;
        };

        $scope.removePost = function(post) {
            $scope.model.posten.splice($scope.model.posten.indexOf(post), 1);
        };

        //

        $scope.sortableOptions = {
            handle : '.handle',
            helper : 'clone',
            distance: 5,
            placeholder: "sortable-placeholder",
            appendTo: "body",
            start: function(e, ui){
                ui.placeholder.height(ui.item.height());
            }
        };
    }

    DocumentController.$inject = ['$scope', '$document', '$http'];

    return DocumentController;
}); 