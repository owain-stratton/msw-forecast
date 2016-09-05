export default class forecastCtrl {

  /*@ngInject;*/
  constructor(forecastService) {

    this.spots = [
      {
        name: 'Noosa, Australia',
        id: '544'
      },
      {
        name: 'Rincon, United States',
        id: '272'
      },
      {
        name: 'Biarritz, France',
        id: '62'
      }
    ];

    this.forecastService = forecastService;

  }

  fetchForecast(id) {
    console.log(id);
    return this.forecastService.getForecast(id)
      .then(forecast => {
        console.log(forecast.data);
        this.forecast = forecast.data[0];
      })
      .catch(err => {
        console.error(err.message);
      });
  }

}
