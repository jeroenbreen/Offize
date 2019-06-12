define([
    'jquery'
], function(
    $
) {
    "use strict";
    var show,
        confirm,
        _timer,
        _divShow,
        _divHide;
    

    show = function(message, error) {
        var modal = $('.modal');
        if (error) {
            modal.addClass('error')
        } else {
            modal.removeClass('error')
        }
        _divShow(modal, modal, message);
        clearTimeout(_timer);
        _timer = setTimeout(function(){
            _divHide(modal);
        }, 2500);
    };

    _divShow = function(div, devTxt, message) {
        devTxt.html(message);
        div.addClass('active')
    };

    _divHide = function(div) {
        div.removeClass('active')
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



    return {
        confirm : confirm,
        show : show
    };
});
