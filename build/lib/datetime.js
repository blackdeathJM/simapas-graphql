"use strict";
Object.defineProperty(exports, "__esModule", {value: true});

class Datetime
{
    static formatWithTwoDigits(value)
    {
        if(+value < 10)
        {
            return `0${value}`;
        }
        return String(value);
    }

    addDays(days, date, customDate = '')
    {
        let date_ = new Date(date);
        if(customDate !== '')
        {
            date_ = new Date(customDate);
        }
        date_.setDate(date_.getDate() + days);
        return date;
    }

    getCurrentDateTime(dateSeparateSymbol = '-')
    {
        const dateTime = new Date();
        let dateDay = Datetime.formatWithTwoDigits(String(dateTime.getDate()));
        let month = Datetime.formatWithTwoDigits(String(dateTime.getMonth() + 1));
        let hour = Datetime.formatWithTwoDigits(String(dateTime.getHours()));
        let minutes = Datetime.formatWithTwoDigits(String(dateTime.getMinutes()));
        let seconds = Datetime.formatWithTwoDigits(String(dateTime.getSeconds()));
        return `${dateTime.getFullYear()}${dateSeparateSymbol}${month}${dateSeparateSymbol}${dateDay} ${hour}:${minutes}:${seconds}`;
    }
}

exports.Datetime = Datetime;
