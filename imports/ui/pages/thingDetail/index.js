import angular from 'angular'
import angularMeteor from 'angular-meteor'
import { Meteor } from 'meteor/meteor'

import { Things, Modules, ThingsInbox } from '../../../api/dbs'

import './thingDetail.tpl.html'

let scope

export class ThingDetailCtrl {
	constructor($scope, $stateParams, $mdToast) {
		scope = $scope
		this.$scope = $scope
		this.$stateParams = $stateParams
		this.$mdToast = $mdToast

		$scope.viewModel(this)

		const thingId = $stateParams.thingId

		this.subscribe('things')
		this.subscribe('modules', () => [this.getReactively('thing._id')])

		this.helpers({
			thing() {
				return Things.findOne({ _id: thingId })
			},
			modules() {
        return Modules.find({ thingId: thingId })
      }
		})
	}

	setLed(module) {
		Meteor.call('setLed', this.thing._id, module._id, module.value, (err, msgId) => {
			if(err) {
				console.error(err)
				module.value = !module.value
				this.showToast(this.thing.name + ' is not connected!')
				return
			}

			const sub = this.subscribe('thingsInbox', () => [msgId])

			ThingsInbox.find({ _id: msgId })
				.observe({
					changed(newDoc, oldDoc) {
						console.log('changed', newDoc)
						if(newDoc.state !== 'applied')
							module.value = !newDoc.value
						scope.$apply()
						sub.stop()
					}
				})
		})
	}

	showToast(msg) {
		this.$mdToast.show(
			this.$mdToast.simple()
				.textContent(msg)
				.position('top right')
				.hideDelay(2000)
		)
	}
}

ThingDetailCtrl.$inject = ['$scope', '$stateParams', '$mdToast']
