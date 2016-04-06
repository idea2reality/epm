import angular from 'angular'
import angularMeteor from 'angular-meteor'
import 'angular-material'
import 'angular-ui-router'

import ui from '../../ui'
import routes from './routes.js'
import config from './config.js'
import './accounts-config.js'

angular.module('app', [
		angularMeteor,
		ui.name,
		'accounts.ui',
		'ngMaterial',
		'ui.router'
	])
	.config(routes)
	.config(config)

function onReady() {
	angular.bootstrap(document, ['app'], {
		strictDi: true
	});
}

if (Meteor.isCordova) {
	angular.element(document).on('deviceready', onReady);
} else {
	angular.element(document).ready(onReady);
}
