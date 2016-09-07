export default class forecastCtrl {

  /*@ngInject;*/
  constructor(forecastService) {

    this.spots = [
      {
        name: 'Batu Kara, West Java',
        id: '2965'
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

    // this.currentSpot = this.spots[0];

    this.spotsArray = [...this.spots.entries()];
    this.currentSpot = this.spotsArray[0];

    this.forecastService = forecastService;
    this.fetchForecast(this.spots[0].id);
  }

  nextForecast() {
    let i = this.getIndex(this.currentSpot, 1);
    this.currentSpot = this.spotsArray[i];
    this.fetchForecast(this.currentSpot[1].id);
  }

  prevForecast() {
    let i = this.getIndex(this.currentSpot, -1);
    this.currentSpot = this.spotsArray[i];
    this.fetchForecast(this.currentSpot[1].id);
  }

  getIndex(currentIndex, shift) {
    let len = this.spotsArray.length;
    return (((currentIndex[0] + shift) + len) % len);
  }

  getTime(newDate) {
    let hour = (() => {
      let currentHour = newDate.getHours();
      return ('0' + currentHour).slice(-2);
    })();

    let minutes = (() => {
      let currentMinute = newDate.getMinutes();
      return ('0' + currentMinute).slice(-2);
    })();

    return `${hour}:${minutes} hrs`;
  }

  getDate(newDate) {
    // const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    let day = newDate.getDay();
    let month = months[ newDate.getMonth() ];
    let year = newDate.getFullYear();

    return `${day} ${month} ${year}`;
  }

  fetchForecast(id) {
    return this.forecastService.getForecast(id)
      .then(forecast => {
        this.forecast = forecast.data[0];

        let newDate = new Date(this.forecast.localTimestamp*1000);

        this.time = this.getTime(newDate);
        this.date = this.getDate(newDate);
        this.swell = this.forecast.swell;
      })
      .catch(err => {
        console.error(err.message);
      });
  }

}
