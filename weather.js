let minneapolisForecastUrl = 'https://api.weather.gov/gridpoints/MPX/116,72/forecast'
let weatherForecastTableElement = document.querySelector('#weather-forecast')

fetch(minneapolisForecastUrl) // returns a Promise
    .then(response => response.json())
    .then(weatherJson => {
        console.log(weatherJson)
        displayForecastInTable(weatherJson)
    }) 
    .catch(error => {
        console.log(error) // for developers
        alert('Sorry, something went wrong') // for users
    })

    function displayForecastInTable(weatherJson){
        let weatherForecastPeriods = weatherJson.properties.periods
        weatherForecastPeriods.forEach( forecast =>{
            let forecastPeriodName = forecast.name // "tuesday" or "friday night"
            let temperature = forecast.temperature
            let temperatureUnit = forecast.temperatureUnit
            let forecastIconUrl = forecast.icon // string of the url of the icon
            let forecastDetail = forecast.detailedForecast

            let forecastRow = document.createElement('tr')
            weatherForecastTableElement.appendChild(forecastRow)

            // create table data for period
            let forecastPeriodTableData = document.createElement('td')
            forecastPeriodTableData.innerHTML = forecastPeriodName

            // create table data for temp
            let forecastTemperatureTableData = document.createElement('td')
            forecastTemperatureTableData.innerHTML = `${temperature} ${temperatureUnit}`

            // create table data for icon
            let forecastIconTableData = document.createElement('td')
            let forecastIconImg = document.createElement('img')
            forecastIconImg.src = forecastIconUrl
            forecastIconTableData.appendChild(forecastIconImg)

            // create table data for forecast detail
            let forecastDetailTableData = document.createElement('td')
            forecastDetailTableData.innerHTML = forecastDetail

            // add the table data to the row
            forecastRow.appendChild(forecastPeriodTableData)
            forecastRow.appendChild(forecastTemperatureTableData)
            forecastRow.appendChild(forecastIconTableData)
            forecastRow.appendChild(forecastDetailTableData)
        })
    }