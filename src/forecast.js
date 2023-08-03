
const request = require ('request')

const forecast = (latitude, longitude, callback ) => {
  const url = "https://api.weatherapi.com/v1/current.json?key=7f97e74ef23b418c97a155211230503&q=" + latitude + "," + longitude
  request ({url, json: true}, (error, response) => {
      if (error) 
        callback("Error: unable to connect to the service", undefined)
      else if (response.body.error)
           callback(response.body.error.message, undefined)
      else
              callback (undefined, response.body.location.name + ' It Is ' + response.body.current.condition.text 
              + " and Temperature is " + response.body.current.temp_c)
  })
}  

module.exports = forecast;