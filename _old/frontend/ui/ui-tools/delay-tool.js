define([], function() {
    "use strict";
    var delay,
        _timer;

    delay = function(callback) {
        // todo provide parallel processes for different requests
        if (_timer) {
            clearTimeout(_timer);
        }
        _timer = setTimeout(function(){
            callback()
        }, 1000);
    };

    return {
        delay: delay
    };
});
