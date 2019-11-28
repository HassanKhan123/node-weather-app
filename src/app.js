const path = require('path');
const express = require('express');
const hbs = require('hbs')

const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express();
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Hassan Khan'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Hassan Khan'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'This is help page',
        name:'Hassan Khan'
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geoCode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            console.log(req.query.address)
            res.send({
                location,
                forecast:forecastData,
                address:req.query.address
            })
           
          })
    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404Handler',{
        title:'404',
        message:'Help article not found',
        name:'Hassan Khan'
    })
})
app.get('*',(req,res)=>{
    res.render('404Handler',{
        title:'404',
        message:'Page not found',
        name:'Hassan Khan'
    })
})

app.listen(port,()=>{
    console.log('Server is started')
})