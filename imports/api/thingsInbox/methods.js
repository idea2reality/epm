import { Meteor } from 'meteor/meteor'
import { ThingsInbox, Things, Modules } from '../dbs'
import { check } from 'meteor/check'

Meteor.methods({
  setLed (thingId, moduleId, value) {
    check(value, Boolean)

    if(!Things.findOne({ _id: thingId }).isAlive)
      throw new Meteor.Error('thing-not-alive', 'Thing is not alive')

 		const msgId = ThingsInbox.insert({
			thingId: thingId,
			moduleId: moduleId,
			value: value,
			state: 'initial',
			initialDate: new Date()
		})

		setTimeout(Meteor.bindEnvironment(() => {
      if (ThingsInbox.findOne({ _id: msgId }).state === 'initial')
			   Meteor.call('cancelLed', msgId, 'timeout')
		}), 3000)

		return msgId
  },

  applyLed (msgId) {
    ThingsInbox.update({ _id: msgId }, {
      $set: {
        state: 'applied',
        appliedDate: new Date()
      }
    })

    var msg = ThingsInbox.findOne({ _id: msgId })

    Modules.update({ _id: msg.moduleId }, {
      $set: {
        value: msg.value
      }
    })

    console.log(Modules.findOne({_id:msg.moduleId}))
  },

  cancelLed (msgId, reason) {
    ThingsInbox.update({ _id: msgId }, {
      $set: {
        state: 'canceled',
        canceledDate: new Date(),
        reason: reason
      }
    })
  }
});
