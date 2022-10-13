const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000


// Define Path for Express Configuration.
const publicDirectoryPath = path.join(__dirname,'../public') 
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine' , 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static Directory to serve
app.use(express.static(publicDirectoryPath))
// app.get('',(request,response)=> {
//     response.send('<h1>Hello Express!</h1>')
//    }) // Root page will only be used when Express and Path will be unable to find any HTML page.
 
app.get('',(req,res) => {
   res.render('index',{
      title: 'Weather App',
      name : 'Prathmesh'  
   }) 
 })

 app.get('/help', (request,response)=>{
    response.render('help',{
      helptext:'If you want any help you can contact.',
      title: 'Help',
      name: 'Prathmesh'
    })   
 })

 app.get('/about',(request,response)=>{
    response.render('about',{
      title:'About me',
      name: 'Prathmesh' 
    })  
 })

 app.get('/weather-page',(request,response)=>{
   if(!request.query.address){
      return response.send({
         error: 'You must provide an Address'
      })
   }

   else{
      geocode(request.query.address, (error,{latitude,longitude,placeName}={}) => {
          if(error){
              return response.send({error})
          }
      forecast(latitude,longitude, (error,{weatherDescriptions,temperature,feelslike,precipPercentage,humidity,windspeed} = {}) =>{
          if(!error){
              response.send({
               Weather_Forecast: weatherDescriptions,
               Temperature: temperature,
               Location: placeName,
               Feelslike: feelslike,
               Precipationchances : precipPercentage,
               Humidity : humidity,
               // visibility: visibility,
               Windspeed : windspeed
              })
          }
          else{
            return response.send({error})
          }    
         })
      })
  }
 })  

//  app.get('/products',(request,response) =>{
//    if(!request.query.search){
//      return response.send({
//          error: 'You must provide a search term'  
//       })
//    }
//    console.log(request.query)   
//    response.send({
//       products: [],
//    })
//  })

 app.get('/help/*', (request,response)=>{
   response.render('404',{
      title: '404',
      errormessage: 'Help article not found.',   
      name: 'Prathmesh'
   }) 
})

 app.get('*',(request,response)=>{
   response.render('404',{
      title: '404',
      errormessage: 'Page not found',
      name: 'Prathmesh'
   })
 })
 
 app.listen(port,() => {
    console.log('Server is up on port '+ port)
 })