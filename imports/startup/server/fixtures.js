import { Meteor } from 'meteor/meteor'
import { Things } from '../../api/things/things.js'
import { Modules } from '../../api/modules/modules.js'

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
    if (Things.find().count() === 0) {
        const thingId = 'inomax'

        const thing = {
            _id: thingId,
            name: 'inoMAX',
            avatar: 'svg-11',
            isAlive: false,
            protoc: {
                pre: 0x05,
                post: 0x04
            }
        }

        const modules = []

        for (let i = 0; i < 10; i++) {
            let module = {
                _id: 'm' + i,
                name: '충전기 ' + i,
                type: 'charger',
                value: false,
                thingId: thingId,
                protocId: [0, i]
            }

            modules.push(module)
        }

        modules.push({
            _id: 'm10',
            name: '소독',
            type: 'sterilizer',
            value: false,
            thingId: thingId,
            protocId: [1, 0]
        })

        modules.push({
            _id: 'm11',
            name: '팬 1',
            type: 'fan',
            value: false,
            thingId: thingId,
            protocId: [2, 0]
        })

        modules.push({
            _id: 'm12',
            name: '팬 2',
            type: 'fan',
            value: false,
            thingId: thingId,
            protocId: [2, 1]
        })

        // modules.push({
        // 	_id: 'm12',
        // 	name: 'Reset'
        // 	value: false,
        // 	thingId: thingId
        // })

        // Insert thing
        Things.insert(thing)
            // Insert modules
        for (let module of modules)
            Modules.insert(module)
    }
})
