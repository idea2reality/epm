import { Things } from '../things.js'

Meteor.publish('things', function() {
	return Things.find({});
});
