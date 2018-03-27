import { createSelector } from 'reselect';
import _ from 'lodash';

const getCategories = (state) => state;

export const filterByType = createSelector(
  getCategories,
	(categories) => {
		const types = _.keys(_.groupBy(categories, 'type'));

		const array = [];

		types.map(type => {
			const dateCollection = _.filter(categories, { type });

			array.push(dateCollection);
		});

		return {
			types,
			array,
		};
	}
);
