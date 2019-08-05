import $ from 'jquery';

var getThisMonday,
    getNextWeek,
    getWeek,
    dateToProperties,
    toString,
    getDateByOffset,
    toBackendString,
    matches,
    biggerThen;


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

dateToProperties = function(date) {
    return {
        year : date.getFullYear(),
        month : date.getMonth(),
        day : date.getDate(),
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

biggerThen = function(date1, date2) {
    var a = new Date(date1),
        b = new Date(date2);
    a.setHours(0,0,0,0);
    b.setHours(0,0,0,0);
    return a.getTime() > b.getTime();
};


export default {
    getThisMonday: getThisMonday,
    getNextWeek: getNextWeek,
    getDateByOffset: getDateByOffset,
    dateToProperties: dateToProperties,
    toString: toString,
    toBackendString: toBackendString,
    matches: matches,
    biggerThen: biggerThen
};