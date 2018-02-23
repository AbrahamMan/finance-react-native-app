import { createSelector } from 'reselect';
import _ from 'lodash';
import moment from 'moment';

const getWallets = (state) => state.trans;

export const filterTotalByDate = createSelector(
  getWallets,
  (items) => {
    let totalToday = _.filter(items, {date: moment().format('YYYY-MM-DD')});
    return totalToday.reduce((acc, item) => acc + item.amount, 0);
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
    console.log('transactionsToday',transactionsToday);
    return transactionsToday;
  }
)

export const filterTodayTransaction = createSelector(
  getWallets,
  (items) => {
    let transactionsToday = _.filter(items, {date: moment().format('YYYY-MM-DD')});
    console.log('transactionsToday',transactionsToday);
    return transactionsToday;
  }
)