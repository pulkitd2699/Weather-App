const path = require('path')
const express = require('express')
const hbs = require('hbs')   //for parital templating
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//for heroku deployment it provides with its own ports that change with time
const port = process.env.PORT || 3000

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

//app.com
//app.com/help
//app.com/about

//setting up handlebars
app.set('view engine', 'hbs') //Express.js view engine for handlebars.js

//if "views" directory exist in subdir of root
const viewPath = path.join(__dirname, '../templates/views')
app.set('views', viewPath)

//partial templating
const partialPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialPath)

//customize the server
const publicDirPath = path.join(__dirname, '../public')
app.use(express.static(publicDirPath)) //static takes the path to the server we want to serve up

//app.get call to access dynamic hbs file (route handler)
//render is used to render a view (handlebar)
app.get('', (req, res) => {
    res.render('index',{
        title: 'Home Page',
        name: 'Pulkit Dhingra'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pulkit Dhingra'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Section',
        message: 'This is a helpful text message',
        name: 'Pulkit Dhingra'
    })
})

app.get('/products', (req, res) => {
    //to make a query string
    // (query string is content after ? in url)
    //our url : localhost:3000/products?search=games&rating=5
    
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query)  //{search: 'games', rating: '5'}
    console.log(req.query.search)  //games
    res.send({
        products: [] 
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    } 

    geocode(req.query.address, (error, data = {}) => {
        if(error){
            return res.send({
                error
            })
        }

        forecast(data.longitude, data.latitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                }) 
            }
            
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Pulkit Dhingra',
        error404: 'Help article not found'
    })
})

//needs to come last (bcz express matches sequentially)
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pulkit Dhingra',
        error404: 'Page Not Found'

    })
})

// app.get('/weather', (req, res) => {
//     res.send('Weather page')
// })

//app.get(route, func(request, response))
// app.get('/help', (req, res) => {
//     // res.send('Help page')
//     res.send({
//         name : 'Pulkit',
//         age : 20
//     })
// }) 

// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// })

//run the server
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})