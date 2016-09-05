import angular from 'angular';

import forecastCtrl from './controllers/forecast-controller.js';
import forecastService from './services/forecast-services.js';

angular.module('mswApp', [])
  .controller('forecastCtrl', forecastCtrl)
  .service('forecastService', forecastService);
