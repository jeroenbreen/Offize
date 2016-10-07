define([
    'angular',
    './app-controller',
    './app-directive',

    './modules/projects/projects-controller',
    'require/text!./modules/projects/projects.tpl',

    './modules/contacts/contacts-controller',
    'require/text!./modules/contacts/contacts.tpl',

    './modules/documents/documents-controller',
    'require/text!./modules/documents/documents.tpl',

    './modules/graphics/graphics-controller',
    'require/text!./modules/graphics/graphics.tpl',

    './modules/contacts/contact-detail/contact-detail',
    './modules/document/document',
    './modules/projects/detail/detail',
    './modules/projects/comments/comments',
    './modules/projects/hours/hours',
    './modules/projects/distribution/distribution',
    
    'ngStorage',
    'ngResource',
    'ngRoute'
], function(
    angular,
    Controller,
    directive,

    ProjectsController,
    projectsTemplate,

    ContactsController,
    contactsTemplate,

    DocumentsController,
    documentsTemplate,

    GraphicsController,
    graphicsTemplate,

    contactDetailModule,
    documentModule,
    detailModule,
    commentsModule,
    hoursModule,
    distributionModule,
    
    ngStorage,
    ngResource,
    ngRoute
) {
    "use strict";
    return angular.module('OfficeModel', ['ngResource', 'ngRoute', 'ngStorage', documentModule.name, contactDetailModule.name, detailModule.name, commentsModule.name, hoursModule.name, distributionModule.name])
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
            return request(obj, 'remove');
        }, 
        add = function(obj) {
            return request(obj, 'add');
        }, 
        update = function(obj) {
            return request(obj, 'update');
        };
        
        function request(obj, type) {
            return $http({
                method : 'POST',
                url : 'backend/' + type + '.php',
                data : obj,
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            });
        }

        return {
            remove : remove,
            add : add,
            update : update
        }
    }]);
});
