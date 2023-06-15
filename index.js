//my api akey for NASA API
const nasaKey = 'TkCb2NZH6BoNFd4JYAOrm8EewMaCsEyhmfGksWhO';
// this function uses axios to call the APOD from NASA and grabs the url for the picture URL and sets the img src to the img tag
const getPictures = () =>{
    axios
    .get('https://api.nasa.gov/planetary/apod?api_key=' + nasaKey)
    .then(response =>{
        const link = response.data;
        console.log(link.url);
        document.getElementById('nasa-image').src=`${link.url}`;
    })
    .catch(error => console.error(error))
}
//this is a helper function that atkes the State from the weather API and returns it's abbreviation
const stateCode = (state) =>{
    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];
    for(let i = 0; i < states.length; i++){
        if(states[i][0] === state){
            return states[i][1];
        }
    
}

}

//this is makes the API call to the weather API and returns the data in the webpage
const getWeather =async () =>{

//gets the string value from the search box
let location = document.getElementById('search-box').value;


//builds the API request
const options = {
  method: 'GET',
  url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
  params: {
    q: location,
  },
  headers: {
    'X-RapidAPI-Key': 'fd5ccc20c7msh779816541adcddcp1496e2jsn450166834c50',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
};

//empty object to hold JSON data
let data = {};

//try-catch block to send the request to the API, parse through data, and set the data in the webpage
try {
	const response = await axios.request(options);
	data = response.data;
    document.getElementById('city-name').innerHTML = data.location.name + ', ' + stateCode(data.location.region);
    document.getElementById('current-img').src = data.current.condition.icon;
    document.getElementById('current-temp').innerHTML = Math.floor(data.current.temp_f) + '°F';
    document.getElementById('current-conditions').innerHTML = data.current.condition.text;
    document.getElementById('humidity-amount').innerHTML = Math.floor(data.current.humidity);
    document.getElementById('wind-amount').innerHTML = Math.floor(data.current.wind_mph) + 'mph';
} catch (error) {
	console.error(error);
}

}

//  const getIpAddress = () =>{
//   let data;
//   axios
//   .get('https://ipinfo.io/json?token=a92f643f30573a')
//     .then(response =>{
//       data = response.data;
//       //text.innerText = JSON.stringify(data);
//       // document.getElementById('city-state').innerText = 'City: ' + data.city + ', ' + data.region;
//       // document.getElementById('postal').innerText = 'Zip Code: ' + data.postal;
//       // document.getElementById('country').innerText = 'Country: ' + data.country;
//       // document.getElementById('ip').innerText = 'IP Address: ' + data.ip;
//       // document.getElementById('loc').innerText = 'Coordinates: ' + data.loc;
//       console.log(data);
//     }) .catch(error => console.error(error));
//  }

const getWxFromIpAddress = () => {

try{
  axios
    .get('https://ipinfo.io/json?token=a92f643f30573a')
    .then((response1) =>{
      return axios
              .get('https://api.weather.gov/points/' + response1.data.loc)
              .then((response2) =>{
                return axios
                        .get(response2.data.properties.observationStations)
                        .then((response3) =>{
                          return axios
                                  .get(response3.data.features[0].id + '/observations/latest')
                                  .then((response4) =>{
                                    document.getElementById('loc').innerText = response4.data.properties.temperature.value;
                                  })
                        })
              })
    })

  
  // const wxGrid = await axios.get('https://api.weather.gov/points/' + location.data.loc);
  // const wxStation = await axios.get(wxGrid.data.properties.observationStations);
  // const wxData = await axios.get(wxStation.data.features[0].id + '/observations/latest');

  // document.getElementById('loc').innerText = wxData.properties.temperature.value;
  //document.getElementById('loc').innerText = 'Coordinates: ' + data.loc;

}catch(err){
  console.log(err);
}
}
