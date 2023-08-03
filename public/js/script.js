let form = document.getElementById('form1')
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    weatherFunction()
    form.reset()
})

const errorFeild = document.getElementById('error');
const locationFeild = document.getElementById('location');
const longitudeFeild = document.getElementById('longitude');
const latitudeFeild = document.getElementById('latitude');
const forecastFeild = document.getElementById('forecast');

let weatherFunction = async() =>{
   try{
    const address = document.getElementById('address').value
    const res = await fetch('http://localhost:3000/weather2?address='+address)
    const data = await res.json()
    console.log(data)

    if(data.error){
        errorFeild.innerText = data.error
        locationFeild.innerText = ""
        longitudeFeild.innerText =""
        latitudeFeild.innerText =""
        forecastFeild.innerText =""
    }
    else{
        locationFeild.innerText = "Location: " + data.location
        setTimeout(()=>{
            longitudeFeild.innerText = "Longitude: " + data.longitude
        },500)

        setTimeout(()=>{
            latitudeFeild.innerText = "Latitude: " + data.latitude
        },100)

        setTimeout(()=>{
            forecastFeild.innerText = "Forecast: " + data.forecast
        },1500)
        
        errorFeild.innerText = ""
    }
   }
   catch(e){console.log(e)}
}
