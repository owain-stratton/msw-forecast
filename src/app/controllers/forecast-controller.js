export default class forecastCtrl {

  /*@ngInject;*/
  constructor(forecastService) {
    forecastService.getForecast().then(forecast => {
      console.log(forecast.data);
      this.forecast = forecast.data[0];
    });

  }
}
