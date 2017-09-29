define([
    'jquery',
    'jqueryUi',
    'angularUiBootstrap'
], function(
    $,
    jqueryUi,
    angularUiBootstrap
) {
    "use strict";
    var getThisMonday,
        getNextWeek,
        getWeek,
        dateToProperties,
        toString,
        getDateByOffset,
        toBackendString,
        matches;

    Date.prototype.getWeek = function () { return $.datepicker.iso8601Week(this); };

    getThisMonday = function() {
        var newDate = new Date(),
            day = newDate.getDay(),
            diff = newDate.getDate() - day + (day == 0 ? -6 : 1);
        return new Date(newDate.setDate(diff));
    };

    getDateByOffset = function(date, delta) {
        var newDate = new Date(date.setHours(0, 0, 0, 0));
        return new Date(newDate.setDate(newDate.getDate() + delta));
    };

    getNextWeek = function(date) {
        var newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 7);
        return new Date(newDate);
    };

    getWeek = function(date) {
        var week = [];
        for (var i = 0; i < 5; i++) {
            var day = getDateByOffset(date, i);
            week.push(day);
        }
        return week;
    };

    dateToProperties = function(date) {
        return {
            year : date.getFullYear(),
            month : date.getMonth(),
            day : date.getDate(),
            week : date.getWeek(),
            weekDay : date.getDay() - 1 // 0 is monday
        }
    };

    toString = function(date) {
        var days = ['Ma', 'Di', 'Wo', 'Do', 'Vr'],
            newDate = dateToProperties(new Date(date));
        return days[newDate.weekDay] + '. ' + newDate.day + '/' + (newDate.month + 1) + '/' + newDate.year;
    };

    toBackendString = function(date) {
        if (!date || date === null || date === '') {
            return '';
        } else {
            var year = date.getFullYear(),
                month = leadingZero(date.getMonth() + 1),
                day = leadingZero(date.getDate());
            return year + '-' + month + '-' + day;
        }

        function leadingZero(a) {
            if (a < 10) {
                return '0' + a;
            } else {
                return a;
            }
        }
    };

    matches = function(date1, date2) {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    };


    return {
        getThisMonday: getThisMonday,
        getNextWeek: getNextWeek,
        getWeek: getWeek,
        getDateByOffset: getDateByOffset,
        dateToProperties: dateToProperties,
        toString: toString,
        toBackendString: toBackendString,
        matches: matches
    };
});
