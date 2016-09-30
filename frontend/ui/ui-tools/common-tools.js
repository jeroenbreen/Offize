define([
    'jquery'
], function(
    $
) {
    "use strict";
    var param,
        toSlug,
        digitize,
        limitString,
        clipboard;

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

    toSlug = function(nr, string) {
        var name = string.toLowerCase().replace(/\s/g, '-').replace(/\./g, '-');
        return nr + '-' + name;
    };

    limitString = function(string, l) {
        if (string.length > l) {
            return string.substr(0,l) + '...'
        } else {
            return string;
        }
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


    return {
        digitize : digitize,
        param: param,
        toSlug: toSlug,
        limitString: limitString,
        clipboard: clipboard
    };
});
