import { check } from 'meteor/check';

import { API } from '../../../../../app/api';
import { findAllChannelsWithNumberOfMessages } from '../lib/channels';
import { transformDatesForAPI } from './helpers/date';

API.v1.addRoute('engagement-dashboard/channels/list', { authRequired: true }, {
	get() {
		const { start, end } = this.requestParams();
		const { offset, count } = this.getPaginationItems();

		check(start, String);
		check(end, String);

		const data = Promise.await(findAllChannelsWithNumberOfMessages({
			...transformDatesForAPI(start, end),
			options: { offset, count },
		}));
		return API.v1.success(data);
	},
});
