define([], function() {
    "use strict";
    function AppController($scope, OfficeModel, $http) {
        this.$scope = $scope;
        this.$scope.office = this.office = OfficeModel;

        $scope.menus = ['projects', 'contacts', 'documents', 'graphics'];

        importData();

        function importData() {
            $http.get("./backend/bootstrap.php").success(function(data) {
                console.log(JSON.stringify(data));
                console.log(data);
                importContacts(data.contacts);
                importProjects(breakToNewLine(data.projects));
                importTeam(data.team);
                importHours(data.hours);
                importComments(data.comments);
                createMemberFilter();
                $scope.office.setConfiguration(data.configuration);
            });
        }

        function importProjects(projects) {
            for (var i = 0, l = projects.length; i < l; i++) {
                $scope.office.importProject(projects[i]);
            }
        }

        function importContacts(contacts) {
            for (var i = 0, l = contacts.length; i < l; i++) {
                $scope.office.importContact(contacts[i]);
            }
        }

        function importHours(hours) {
            for (var i = 0, l = hours.length; i < l; i++) {
                $scope.office.importHour(hours[i]);
            }
        }

        function importTeam(team) {
            for (var i = 0, l = team.length; i < l; i++) {
                $scope.office.importMember(team[i]);
            }
        }

        function importComments(comments) {
            for (var i = 0, l = comments.length; i < l; i++) {
                $scope.office.importComment(comments[i]);
            }
        }

        function breakToNewLine(data){
            for (var i = 0, l = data.length; i < l; i++) {
                data[i].comments = data[i].comments.replace(/<br>/g, '\n');
            }
            return data;
        }

        function createMemberFilter() {
            var members = [],
                allOption = {
                    memberId: -1,
                    initials: 'Alle'
                };
            members.push(allOption);
            for (var i = 0, l = $scope.office.team.length; i < l; i++) {
                var member = {
                    memberId: $scope.office.team[i].memberId,
                    initials: $scope.office.team[i].initials
                };
                members.push(member);
            }
            $scope.office.memberFilter = members;
        }
        



    }

    AppController.$inject = ['$scope', 'OfficeModel', '$http'];

    return AppController;
});