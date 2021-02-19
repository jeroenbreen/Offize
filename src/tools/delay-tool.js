let delay,
    _timer;

delay = function(callback) {
    // todo provide parallel processes for different requests
    if (_timer) {
        clearTimeout(_timer);
    }
    _timer = setTimeout(() => {
        callback()
    }, 1000);
};

export default {
    delay: delay
};