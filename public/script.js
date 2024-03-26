console.log(`jerry has come to stay`);


 const weatherInput = document.querySelector(`form`);

 weatherInput.addEventListener(`submit`,(e)=>{
   e.preventDefault()
   
   const location = weatherInput.value
   console.log(location);

   fetch(`http://localhost:3000/forcast?address=`+ location ).then((response)=>{
    response.json().then((data)=>{
     if(data.error){
        console.log(data.error)
     }else{
        console.log(data.description);
           console.log(data.temperature);
      }
    })
 })
 });