const request = require('request')

const forecast = (lat,lang,callback) => {
    const url = 'https://api.darksky.net/forecast/f51fdf28ad6c69d565bb3c3345d3b6a6/'+lat+','+lang+'?units=auto';
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to weather service!',undefined)
        }
        else if(body.error){
            console.log('unable to find location')
        }
        else{
            callback(undefined,
                body.daily.data[0].summary+"Today's pressure is "+body.daily.data[0].pressure+' It is currently '+body.currently.temperature+' degrees out.'+' There is '+body.currently.precipProbability+'% chance of rain'
            )
        }
    })
}

module.exports= forecast