define([
    'angular',
    './app-controller',
    './app-directive',

    '../modules/projects/projects',
    '../modules/projects/projects-controller',
    'require/text!../modules/projects/projects.tpl',

    '../modules/contacts/contacts',
    '../modules/contacts/contacts-controller',
    'require/text!../modules/contacts/contacts.tpl',

    '../modules/documents/documents',
    '../modules/documents/documents-controller',
    'require/text!../modules/documents/documents.tpl',

    '../modules/graphics/graphics',
    '../modules/graphics/graphics-controller',
    'require/text!../modules/graphics/graphics.tpl',

    '../modules/document/document',
    'ngStorage',
    'ngResource',
    'ngRoute'
], function(
    angular,
    Controller,
    directive,

    projectsModule,
    ProjectsController,
    projectsTemplate,

    contactsModule,
    ContactsController,
    contactsTemplate,

    documentsModule,
    DocumentsController,
    documentsTemplate,

    graphicsModule,
    GraphicsController,
    graphicsTemplate,

    documentModule,
    dataModule,
    ngStorage,
    ngResource,
    ngRoute
) {
    "use strict";
    return angular.module('OfficeModel', ['ngResource', 'ngRoute', 'ngStorage', projectsModule.name, contactsModule.name, documentsModule.name, graphicsModule.name, documentModule.name])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/', {
            template: projectsTemplate,
            controller: 'ProjectsController'
        }).when('/contacts', {
            template: contactsTemplate,
            controller: 'ContactsController'
        }).when('/documents', {
            template: documentsTemplate,
            controller: 'DocumentsController'
        }).when('/graphics', {
            template: graphicsTemplate,
            controller: 'GraphicsController'
        }).otherwise({
            redirectTo : '/'
        });

    }])
    .controller('AppController', Controller)
    .directive('office', directive)
    
    .controller('ProjectsController', ProjectsController)
    .controller('ContactsController', ContactsController)
    .controller('DocumentsController', DocumentsController)
    .controller('GraphicsController', GraphicsController)

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
