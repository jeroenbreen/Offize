define([
    'jquery'
], function(
    $
) {
    "use strict";
    var show,
        confirm,
        param,
        _timer,
        digitize,
        _divShow,
        _divHide;

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

    show = function(message, error) {
        var modal = $('.modal');
        if (error) {
            modal.css({
                background: 'red',
                color: '#fff'
            });
        } else {
            modal.css({
                background: '#eee',
                color: '#333'
            });
        }
        _divShow(modal, modal, message);
        clearTimeout(_timer);
        _timer = setTimeout(function(){
            _divHide(modal);
        }, 2500);
    };

    _divShow = function(div, devTxt, message) {
        devTxt.html(message);
        div.css('top', 0);
    };

    _divHide = function(div) {
        div.css('top', '-38px')
    };

    confirm = function(message, callback) {
        var confirm = $('.confirm'),
            confirmText = $('.confirm-text');
        _divShow(confirm, confirmText, message);
        $('.confirmed').click(function() {
            _divHide(confirm);
            $('confirmed').unbind();
            callback(true);
        });
        $('.denied').click(function() {
            _divHide(confirm);
            $('denied').unbind();
            callback(false);
        });
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
        confirm : confirm,
        show : show,
        digitize : digitize,
        param: param
    };
});
