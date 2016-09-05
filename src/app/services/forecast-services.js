export default class forecastService {

  /*@ngInject;*/
  constructor($http) {
    this.$http = $http;
  }

  getForecast() {
    return this.$http.jsonp('http://magicseaweed.com/api/LPp8WbZceQ3ER64f90P1Au52I5IFo807/forecast/?spot_id=10&units=eu&callback=JSON_CALLBACK');
  }

}
