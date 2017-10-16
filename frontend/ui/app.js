define([
    'angular',
    './app-controller',
    './app-directive',

    './modules/projects/projects-controller',
    'require/text!./modules/projects/projects.tpl',

    './modules/blocks/blocks-controller',
    'require/text!./modules/blocks/blocks.tpl',

    './modules/contacts/contacts-controller',
    'require/text!./modules/contacts/contacts.tpl',

    './modules/documents/documents-controller',
    'require/text!./modules/documents/documents.tpl',

    './modules/graphics/graphics-controller',
    'require/text!./modules/graphics/graphics.tpl',

    './modules/contacts/contact-detail/contact-detail',
    './modules/document/document',
    './modules/projects/detail/detail',
    './modules/projects/shared/member-filter/member-filter',
    './modules/blocks/day/day',
    './modules/blocks/block-detail/block-detail',
    './modules/report/report',

    'ngStorage',
    'ngResource',
    'ngRoute',
    'sortable'
], function(
    angular,
    Controller,
    directive,

    ProjectsController,
    projectsTemplate,

    BlocksController,
    blocksTemplate,

    ContactsController,
    contactsTemplate,

    DocumentsController,
    documentsTemplate,

    GraphicsController,
    graphicsTemplate,

    contactDetailModule,
    documentModule,
    detailModule,
    memberFilterModule,
    dayModule,
    blockDetailModule,
    reportModule,
    
    ngStorage,
    ngResource,
    ngRoute,
    sortable
) {
    "use strict";
    return angular.module('OfficeModel', [
        'ngResource',
        'ngRoute',
        'ngStorage',
        'ui.sortable',
        documentModule.name,
        contactDetailModule.name,
        detailModule.name,
        memberFilterModule.name,
        dayModule.name,
        blockDetailModule.name,
        reportModule.name
    ])
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
        }).when('/agenda', {
            template: blocksTemplate,
            controller: 'BlocksController'
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
    .controller('BlocksController', BlocksController)

    .factory('dataFactory', ['$resource', '$http', function($resource, $http) {
        var remove = function(obj) {
            return request(obj, 'delete');
        }, 
        create = function(obj) {
            return request(obj, 'create');
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
            create : create,
            update : update,
            delete : remove
        }
    }]);
});
