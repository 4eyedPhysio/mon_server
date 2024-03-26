const postman= require(`postman-request`);

const forecast= (location, callback)=>{
  const url=`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`+encodeURIComponent(location)+`?unitGroup=us&key=8N7G859TMQAEV8QDRDYNUTXKR`

  //since the url variable name is the same as the url , so we destructure by removing one url

  postman({url, json:true},(err,{body}={})=>{
    const description = body.description;
  const temperature = body.currentConditions.temp;
  if(err){
    callback(`couldn't access weather API`, undefined)
  }else if(body.length ===0){
    callback(` invalid location, try another`, undefined)
  }else{
    callback(undefined, {
        description,
        temperature
    })
  }
  })
}



module.exports= forecast;