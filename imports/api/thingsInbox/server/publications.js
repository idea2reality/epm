import { ThingsInbox, Things } from '../../dbs'

Meteor.publish('thingsInbox', function(msgId) {
	return ThingsInbox.find({ _id: msgId });
});

Meteor.publish('myInbox', function(thingId) {

	updateThingAliveState(thingId, true);

  this.onStop(() => updateThingAliveState(thingId, false));

	return ThingsInbox.find({ thingId: thingId, state: 'initial' })
})

function updateThingAliveState(thingId, isAlive) {
		Things.update(
			{
				_id: thingId
			},
			{
				$set: {
					isAlive: isAlive
				}
			}
		)
}
