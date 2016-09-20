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



    return {
        confirm : confirm,
        show : show
    };
});
