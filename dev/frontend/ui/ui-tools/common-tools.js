define([
    'jquery'
], function(
    $
) {
    "use strict";
    var param,
        digitize;

    param = function(obj) {
        var parameterised = {},
            ignoreProperties = [];
        ignoreProperties.push('parent');
        ignoreProperties.push('$$hashKey');
        for (var property in obj) {
            if ($.type(obj[property]) !== 'function' && ignoreProperties.indexOf(property) === -1) {
                if($.type(obj[property]) === 'array') {
                    parameterised[property] = JSON.stringify(obj[property]);
                } else {
                    parameterised[property] = obj[property];
                }
            }
        }
        return $.param(parameterised);
    };

    digitize = function(x) {
        if (x < 100) {
            if (x < 10) {
                return '00' + x;
            } else {
                return '0' + x;
            }
        } else {
            return x;
        }
    };



    return {
        digitize : digitize,
        param: param
    };
});
