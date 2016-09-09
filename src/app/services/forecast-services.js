export default class forecastService {

  /*@ngInject;*/
  constructor($http) {
    this.$http = $http;
  }

  getForecast(spotID) {
    const apikey = '';// YOUR API KEY
    const url = `http://magicseaweed.com/api/${apikey}/forecast/?spot_id=${spotID}&units=eu&callback=JSON_CALLBACK`;
    return this.$http.jsonp(url);
  }

}
