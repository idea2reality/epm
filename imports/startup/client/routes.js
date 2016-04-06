import {
	ThingDetailCtrl,
	RootRedirectorCtrl
} from  '../../ui/pages'

export default [
	'$urlRouterProvider',
	'$stateProvider',
	'$locationProvider',
	function($urlRouterProvider, $stateProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

		// $stateProvider
		// 	.state('home', {
		// 		url: '/home',
		// 		templateUrl: 'client/view/home.view.html'
		// 	})
		// 	.state('edisonDetail', {
		// 		url: '/edison/:edisonId',
		// 		templateUrl: 'client/view/edison-detail.view.html',
		// 		controllerAs: 'vm',
		// 		controller: 'EdisonDetailController'
		// 	})
		//
		//

		$stateProvider
			.state('root', {
				url: '/',
				templateUrl: 'imports/ui/pages/rootRedirector/rootRedirector.tpl.html',
				controller: RootRedirectorCtrl,
				controllerAs: '$ctrl'
			})
			.state('thingDetail', {
				url: '/thing/:thingId',
				templateUrl: 'imports/ui/pages/thingDetail/thingDetail.tpl.html',
				controller: ThingDetailCtrl,
				controllerAs: '$ctrl'
			})

		$urlRouterProvider.otherwise('/');
	}
];
