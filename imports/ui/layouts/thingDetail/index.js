import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../../../api/tasks/tasks.js';

import './thingDetail.tpl.html';

class ThingDetailCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.subscribe('tasks');

    this.hideCompleted = false;

    this.helpers({
      tasks() {
        const selector = {};

        // If hide completed is checked, filter tasks
        if (this.getReactively('hideCompleted')) {
          selector.checked = {
            $ne: true
          };
        }

        // Show newest tasks at the top
        return Tasks.find(selector, {
          sort: {
            createdAt: -1
          }
        });
      },
      incompleteCount() {
        return Tasks.find({
          checked: {
            $ne: true
          }
        }).count();
      },
      currentUser() {
        return Meteor.user();
      }
    })
  }

  addTask(newTask) {
    // Insert a task into the collection
    Meteor.call('tasks.insert', newTask);

    // Clear form
    this.newTask = '';
  }
}

export default angular.module('app.layout.thingDetail', [])
  .component('i2rThingDetail', {
    templateUrl: 'imports/ui/layouts/thingDetail/thingDetail.tpl.html',
    controller: ['$scope', ThingDetailCtrl]
  });
