import { createSelector } from 'reselect';
import _ from 'lodash';
import moment from 'moment';

const getWallets = (state) => state.trans.transactions;

export const filterTotalByDate = createSelector(
  getWallets,
  (transactions) => {

    const dates = _.keys(_.groupBy(transactions, 'date'));

    let arrayDates = [];
    let totalByDates = [];
    let total = [];

    dates.map(date => {
      dateCollection =  _.filter(transactions, {date: moment(date).format('YYYY-MM-DD')});

      arrayDates.push(dateCollection);

    })

    arrayDates.map(date => {
      total = date.reduce((acc, item) => acc + item.amount, 0);

      totalByDates.push(total);
    });

    return {
      dates,
      arrayDates,
      totalByDates,
    }
  }
)

export const filterTotalByMonth = createSelector(
  getWallets,
  (items) => {
    return items.reduce((acc, item) => acc + item.amount, 0);
  }
)

export const filterYesterdayTransaction = createSelector(
  getWallets,
  (items) => {
    let transactionsToday = _.filter(items, {date: moment().subtract(1, 'days').format('YYYY-MM-DD')});
    return transactionsToday;
  }
)

export const filterTodayTransaction = createSelector(
  getWallets,
  filterTotalByDate,
  (items, totalToday) => {
    let transactionsToday = _.filter(items, {date: moment().format('YYYY-MM-DD')});
    console.log('filterTotalByDate', totalToday);
    console.log('transactionsToday', transactionsToday);
    return transactionsToday ;
  }
)