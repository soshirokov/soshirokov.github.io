import DateDiff from 'date-diff';

export default (dateFrom, dateTo) => {
    if (dateFrom < dateTo) {
        [dateFrom, dateTo] = [dateTo, dateFrom];
    }

    const diff = new DateDiff(new Date(dateFrom), new Date(dateTo));

    return {
        years: Math.floor(diff.years()),
        months: Math.floor(diff.months()),
        days: Math.floor(diff.days())
    };
}