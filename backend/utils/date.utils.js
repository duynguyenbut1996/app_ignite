var Moment = require('moment')

exports.DateUtil = {
	convert: (date) => Moment(date),

	format: (date) => Moment(date).format('YYYY-MM-DD HH:mm'),

	relativeTimeToday: (date) =>
		Moment(date).
			startOf('day').
			fromNow(),

	getStartOfDay: (date) =>
		Moment(date).
			hour(0).
			minute(0).
			second(0),

	getEndOfDay: (date) =>
		Moment(date).
			hour(23).
			minute(59).
			second(59),

	getCurrentTime: () => Moment()
};