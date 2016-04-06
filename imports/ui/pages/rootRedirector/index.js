import angular from 'angular'
import angularMeteor from 'angular-meteor'
import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import { Things } from '../../../api/things/things.js'

import './rootRedirector.tpl.html'

export class RootRedirectorCtrl {
	constructor($scope, $state) {
		$scope.viewModel(this);
    
		this.subscribe('things', null, () => {
			$state.go('thingDetail', {
				thingId: Things.findOne()._id
			})
		})
	}
}
