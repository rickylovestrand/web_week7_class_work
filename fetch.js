let url = 'https://api.wheretheiss.at/v1/satellites/25544'

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let timeIssLocationFetched = document.querySelector('#time')

let update = 10000
let maxFailedAttempts = 3

let issMarker
let issIcon = L.icon({
    iconUrl: 'issIcon.png',
    iconSize: [50, 50], 
    iconAnchor: [25, 25]
})

let map = L.map('iss-map').setView([0, 0], 1)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

iss(maxFailedAttempts) // call function one time to start
// setInterval(iss, update)  // 10 seconds
function iss(attempts){
    if (attempts <= 0){
        alert('Attempted to contact server, failed after three attempts')
        return
    }
    fetch(url).then( (res) => {
        return res.json() // process response into JSON
    }).then( (issData)=>{
        console.log(issData)  // TODO - display data on web page
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long

        // create marker if it doesn't exist
        // move marker if it does exist

        if (!issMarker) {
            // create marker
            issMarker = L.marker([lat, long], {icon: issIcon}).addTo(map)
        } else {
            issMarker.setLatLng([lat, long])
        }

        let now = Date()
        timeIssLocationFetched.innerHTML = `This data was fetched at ${now}`
    }).catch( (err) => {
        attempts = attempts - 1
        console.log('ERROR!', err)
    }).finally(()=>{
        setTimeout(iss, update, attempts)
    })
}
