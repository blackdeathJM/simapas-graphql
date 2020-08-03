export class Datetime {

    private static formatWithTwoDigits(value: number | string) {
        if (+value < 10) {
            return `0${value}`;
        }
        return String(value);
    }

    addDays(days: number, date: string, customDate: string = '',) {
        let date_ = new Date(date);
        if (customDate !== '') {
            date_ = new Date(customDate);
        }
        date_.setDate(date_.getDate() + days);
        return date;
    }

    getCurrentDateTime(dateSeparateSymbol: string = '-') {
        const dateTime = new Date();
        let dateDay: string = Datetime.formatWithTwoDigits(String(dateTime.getDate()));
        let month: string = Datetime.formatWithTwoDigits(String(dateTime.getMonth() + 1));

        let hour: string = Datetime.formatWithTwoDigits(String(dateTime.getHours()));
        let minutes: string = Datetime.formatWithTwoDigits(String(dateTime.getMinutes()));
        let seconds: string = Datetime.formatWithTwoDigits(String(dateTime.getSeconds()));

        return `${dateTime.getFullYear()}${dateSeparateSymbol}${month}${dateSeparateSymbol}${dateDay} ${hour}:${minutes}:${seconds}`;
    }
}
