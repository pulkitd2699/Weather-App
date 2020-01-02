const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/6319d6eb1ca3ca240610d3fc0e572777/' + latitude + ',' + longitude + '?units=si&lang=en'

    request({url, json : true}, (error, {body}) => {
        if(error){
            callback('unable to connect to weather service', undefined)
        }
        else if(body.error){
            callback('unable to find correct location', undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary + 
                 ' It is currently ' + body.currently.temperature + ' degrees celcius out. ' + 
                 'High: ' + body.daily.data[0].temperatureHigh + '. ' +
                 'Low: ' + body.daily.data[0].temperatureLow + '. ' +
                 'There is a ' + body.currently.precipProbability + '% chance of rain')
        }
    })
}

module.exports = forecast