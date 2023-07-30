let cityName = document.querySelector(".city");
let Form = document.querySelector(".search");
let errordiv=document.querySelector('.error')

let dashboard=document.querySelector(".dashboard")
let cityContainer=document.querySelector(".city_container")
let weather_container=document.querySelector(".weather_container")


let inputcity;
Form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (Form.inputCity.value === "") {
    alert("Plz, Type city name");
    return;
  } else {
    inputcity = Form.inputCity.value;
   
   

    Weather(inputcity);
  }

  Form.inputCity.value = "";
});

async function Weather(inputcity){
    const apiId='9870db5f6b3346881ea30ece2fb4cb45'
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${inputcity}&appid=${apiId}&units=metric`
    try{

        const weatherdata=await fetch(url) 
        const weatherJson= await weatherdata.json();
     
        if(weatherJson.cod==='404'){
            errordiv.innerHTML=weatherJson.message
            errordiv.style.visibility='visible'
  
            dashboard.style.visibility='hidden'
            cityContainer.style.visibility='hidden'
            weather_container.style.top='19rem'
        }else{
            errordiv.innerHTML=""
            errordiv.style.visibility='hidden'
            cityName.innerHTML=inputcity
            displayWeather(weatherJson);
            dashboard.style.visibility='visible'
            cityContainer.style.visibility='visible'
            weather_container.style.top='12rem'
  
        }
    }catch(error){
   console.error("-->An error occurred:", error);
    }
}

function displayWeather(weatherJson){

    // display temperature
    let tempdiv=document.querySelector('.temp')
    tempdiv.innerHTML=Math.round(weatherJson.main.temp)
    // display humidity
    let humdiv=document.querySelector('.hum')
    humdiv.innerHTML=Math.round(weatherJson.main.humidity);
    // display wind speed
    let winddiv=document.querySelector('.wind')
    winddiv.innerHTML=Math.round(weatherJson.wind.speed);
    // display pressure
    let pressurediv=document.querySelector('.pressure')
    pressurediv.innerHTML=Math.round(weatherJson.main.pressure);

    // display visibility
    
    let visidiv=document.querySelector('.visibility')
visidiv.innerHTML=weatherJson.visibility
   //   display description
   let descdiv=document.querySelector('.desc')


   if(weatherJson.weather[0].description.length>8 &&weatherJson.weather[0].description.length<16 ){
    descdiv.style.fontSize = '23px';
    descdiv.style.marginTop = '27px';
    descdiv.style.marginBottom = '20px';
    
   }
    else if(weatherJson.weather[0].description.length>15){
     descdiv.style.fontSize = '23px';
     descdiv.style.marginTop = '6px';
     descdiv.style.marginBottom = '7px'
   }
   else{
    descdiv.style.fontSize = '35px';
    descdiv.style.marginTop = '11px';
    descdiv.style.marginBottom = '17px';

   }
   descdiv.innerHTML=weatherJson.weather[0].description
    

 }
 