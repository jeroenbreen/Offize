requirejs.config({
    baseUrl: 'frontend/'
  , paths: {
        'require/domReady': 'bower_components/requirejs-domready/domReady',
        'require/text': 'bower_components/requirejs-text/text',
        'angular': 'bower_components/angular/angular',
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'jqueryUi': 'bower_components/jquery-ui/jquery-ui.min',
        'angularUiBootstrap': 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap.min',
        'slider': 'bower_components/angular-ui-slider/src/slider',
        'sortable': 'bower_components/angular-ui-sortable/sortable.min',
        'ngResource' : 'bower_components/angular-resource/angular-resource.min'
    },
    shim: {
        bootstrap : {
            deps :['jquery']
        },
        angularUiBootstrap : {
            deps : ['angular']
        },
        angular : {
            deps : ['jquery'],
            exports: 'angular'
        },
        jqueryUi : {
            deps : ['jquery']
        },
        slider : {
            deps : ['jqueryUi' ,'angular']
        },
        sortable: {
            deps: ['jqueryUi', 'angular']
        },
        ngResource: {
            deps: ['angular']
        }
    }
});

