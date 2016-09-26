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
    var daysFromToday,
        dateToProperties;

    Date.prototype.getWeek = function () { return $.datepicker.iso8601Week(this); };

    daysFromToday = function(delta) {
        var today = new Date(),
            newDate;
        today.setHours(0, 0, 0, 0);
        newDate = today.setDate(today.getDate() + delta);
        return new Date(newDate);
    };

    dateToProperties = function(date) {
        return {
            year : date.getFullYear(),
            month : date.getMonth(),
            day : date.getDate(),
            week : date.getWeek(),
            weekDay : date.getDay() - 1 // 0 is monday for APM
        }
    };


    return {
        daysFromToday: daysFromToday,
        dateToProperties: dateToProperties
    };
});
