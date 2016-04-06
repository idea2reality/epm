import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Things } from '../../../api/dbs';

import './sidenav.tpl.html';

class SidenavCtrl {
  constructor($scope) {
    $scope.viewModel(this)

    this.subscribe('things')

    this.helpers({
      things() {
        return Things.find()
      }
    })
  }
}

export default angular.module('app.layout.sidenav', [])
  .component('i2rSidenav', {
    templateUrl: 'imports/ui/layouts/sidenav/sidenav.tpl.html',
    controller: ['$scope', SidenavCtrl]
  });
