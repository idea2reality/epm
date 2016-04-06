import angular from 'angular'
import comp from './components'
import layout from './layouts'

export default angular.module('app.ui', [
	comp.name,
	layout.name
])
