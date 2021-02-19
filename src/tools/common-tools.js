import $ from 'jquery';

let param,
    clipboard,
    currencyFormat,
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

clipboard = function(value) {
    var success = true,
        range = document.createRange(),
        selection,
        tmpElem = $('<div>');
    tmpElem.css({
        position: "absolute",
        left: "-1000px",
        top: "-1000px"
    });

    // Add the input value to the temp element.
    tmpElem.text(value);
    $("body").append(tmpElem);
    // Select temp element.
    range.selectNodeContents(tmpElem.get(0));
    selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    try {
        success = document.execCommand('copy', false, null);
    } catch (e) {
        console.log(e);
        success = false;
    }
    if (success) {
        tmpElem.remove();
    }
};

currencyFormat = function(value) {
    while (/(\d+)(\d{3})/.test(value.toString())){
        value = value.toString().replace(/(\d+)(\d{3})/, '$1'+'.'+'$2');
    }
    return value;
};

digitize = function (x) {
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


export default {
    param: param,
    clipboard: clipboard,
    currencyFormat: currencyFormat,
    digitize: digitize
};