import angular from 'angular';
import ngMaterial from 'angular-material';

import forecastCtrl from './controllers/forecast-controller.js';
import forecastService from './services/forecast-services.js';

angular.module('mswApp', [ ngMaterial ])
  .controller('forecastCtrl', forecastCtrl)
  .service('forecastService', forecastService)
  .config(($mdThemingProvider, $mdIconProvider) => {
    'ngInject';
    $mdThemingProvider.theme('default')
      .primaryPalette('grey', {
        'default': '500',
        'hue-1': '100',
        'hue-2': '300',
        'hue-3': 'A100'
      })
      .accentPalette('blue-grey');

    $mdIconProvider
      .iconSet('toggle', './icons/svg-sprite-toggle.svg', 24)
      .iconSet('navigation', './icons/svg-sprite-navigation.svg', 24);
  });
