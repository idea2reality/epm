import { Modules } from '../modules.js'

Meteor.publish('modules', function(thingId) {
	return Modules.find({ thingId: thingId });
});
