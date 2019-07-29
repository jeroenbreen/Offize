define([
    'angular',
    './app-controller',
    './app-directive',

    './modules/projects/projects',
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
    './modules/popups/mail-popup/mail-popup',
    './modules/popups/settings/settings',
    './modules/popups/members/members',
    './modules/projects/detail/detail',

    'ngStorage',
    'ngResource',
    'ngRoute',
    'sortable',
    './../../assets/fonts/fontawesome-5.2.0/js/all.min'
], function(
    angular,
    Controller,
    directive,

    projectsModule,
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
    mailPopupModule,
    settingsModule,
    membersModule,
    detailModule,

    ngStorage,
    ngResource,
    ngRoute,
    sortable,
    fontawesome
) {
    "use strict";
    return angular.module('office', [
        'ngResource',
        'ngRoute',
        'ngStorage',
        'ui.sortable',
        projectsModule.name,
        documentModule.name,
        mailPopupModule.name,
        settingsModule.name,
        membersModule.name,
        contactDetailModule.name,
        detailModule.name
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

    .factory('api', ['$resource', '$http', function($resource, $http) {
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
