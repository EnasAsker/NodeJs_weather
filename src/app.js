const express = require('express')
const app = express()
const port = process.env.PORT || 3000

    
const path = require ("path")
const publicDirectory =  path.join(__dirname , '../public')
app.use (express.static (publicDirectory))


app.set('view engine', 'hbs');
const viewsDirectory = path.join (__dirname , "../views" )
app.set( "views" , viewsDirectory)

var hbs = require ('hbs')
const partialsPath = path.join (__dirname , "../partials")
hbs.registerPartials(partialsPath)


    app.get('/' , (req , res) => {
        res.render('index' , {
        })
    })


    app.get('/weather', (req, res)=>{
        res.render('weather', {
            message: "Wlcome to weather page"
        })
    })



    const geocode = require('./geocode')
    const forecast = require('./forecast')

    app.get('/weather2',(req,res)=>{
        if(!req.query.address){
            return res.send({
                error:'You must enter an address'
            })
        }
        geocode(req.query.address,(error,data)=>{
            if(error){
                // shorthand property error:error
                return res.send({error})
            }
            forecast(data.latitude,data.longitude,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast:forecastData,
                    location:req.query.address,
                    latitude: data.latitude,
                    longitude: data.longitude
                })
            })
        })
    })

    

    app.get('*' , (req , res)=> {
        res.send('404 Page Not Founded')
     })

    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })
