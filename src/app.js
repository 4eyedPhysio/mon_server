const path = require(`path`)
const express = require(`express`)
const hbs = require(`hbs`);
const postman =require(`postman-request`);
const forecast = require (`./utils/forecast`);
const gCode = require(`./utils/geoCode`)


const directViewsPath = path.join(__dirname, `../views/template`)
//creating path for partials
const partialsPath = path.join(__dirname, `../views/partials`)


const app= express();

// set up static directory to serve
app.use(express.static(directViewsPath))
// setting up handle bar and views location
app.set(`views`,directViewsPath )

app.set(`view engine`, `hbs`)

//setting handlebars for partials
hbs.registerPartials(partialsPath);
// setting up node home route
app.get(``,(req,res)=>{
   res.render(`index`,{
    header: `homepage`,
    footer: `michael page`
   })
});

app.get(`/forcast`,(req,res)=>{

if(!req.query.address){
    return res.send({
        err:`please input an address`
    })
}
  gCode(req.query.address,(err,{latitude,longitude, location}={})=>{
     if(err){
        return res.send({err})
     }

     forecast(location, (err,{description,temperature}={})=>{
         if(err){
            res.send({err})
         }
         res.send({
            // forcast:description,temperature,
            // address:req.query.address
            description: description, temperature,
            address: req.query.address,
            latitude,longitude,location
    
        })
     })
  })

  
 });


 app.get(`/help`,(req,res)=>{
    res.render(`help`,{
        header:`Help page`,
        footer: `jeremy`

    })
 })

 app.get(`*`, (req,res)=>{
    res.render(`404_page`)
 })

app.listen(3000, ()=>{
    console.log("server has started running")
})