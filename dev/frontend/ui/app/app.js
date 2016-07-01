define([
    'angular',
    './app-controller',
    './app-directive',
    '../modules/projects/projects',
    '../modules/contacts/contacts',
    '../modules/document/document',
    '../modules/documents/documents',
    '../modules/graphics/graphics',
    'ngResource'
], function(
    angular,
    Controller,
    directive,
    projectsModule,
    contactsModule,
    documentModule,
    documentsModule,
    graphicsModule,
    ngResource
) {
    "use strict";
    return angular.module('OfficeModel', ['ngResource', projectsModule.name, contactsModule.name, documentModule.name, documentsModule.name, graphicsModule.name])
    .controller('AppController', Controller)
    .directive('office', directive)
    .factory('dataFactory', ['$resource', '$http', function($resource, $http) {
        var remove = function(obj) {
            return $http({
                method : 'POST',
                url : 'backend/delete.php',
                data : obj,
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            });
        }, add = function(obj) {
            return $http({
                method : 'POST',
                url : 'backend/new.php',
                data : obj,
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            });
        }, update = function(obj) {
            return $http({
                method : 'POST',
                url : 'backend/update.php',
                data : obj,
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            });
        };

        return {
            remove : remove,
            add : add,
            update : update
        }
    }]);
});
