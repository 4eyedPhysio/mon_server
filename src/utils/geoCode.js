const postman= require(`postman-request`);

const gCode = ( address, callback)=>{
    const url=`https://geocode.maps.co/search?q=`+ encodeURIComponent(address)+`&api_key=65e04f8c6340b307857322guwb2bc7a`
    postman({url:url, json:true}, (err, {body}={})=>{
      if(err){
        callback(`unable to access geolocation`, undefined);
      }else if(body.length < 1){
        callback(`unable to find address, try another!!!!`, undefined)
      }else{
        callback(undefined,{
            latitude:body[0].lat,
            longitude: body[0].lon,
            location:body[0].display_name
        })
      }
    }) 
}

// gCode("new zealand",(err,data)=>{
//     console.log(`err:`, err);
//     console.log(`data: `, data);
// })


module.exports= gCode;