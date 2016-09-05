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
    this.currentSpot = this.spots[2];
    this.forecastService = forecastService;
    this.fetchForecast(this.spots[2].id);

  }

  fetchForecast(id) {
    return this.forecastService.getForecast(id)
      .then(forecast => {
        console.log(forecast.data);
        this.forecast = forecast.data[0];

        this.swell = forecast.data[0].swell;
      })
      .catch(err => {
        console.error(err.message);
      });
  }

}
