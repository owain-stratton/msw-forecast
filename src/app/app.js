import angular from 'angular';
import ngMaterial from 'angular-material';

import forecastCtrl from './controllers/forecast-controller.js';
import forecastService from './services/forecast-services.js';

angular.module('mswApp', [ ngMaterial ])
  .controller('forecastCtrl', forecastCtrl)
  .service('forecastService', forecastService)
  .config(function($mdThemingProvider) {
    'ngInject';
    $mdThemingProvider.theme('default')
      .primaryPalette('grey')
      .accentPalette('blue-grey')
      .dark();
  });
