
const nasaKey = 'TkCb2NZH6BoNFd4JYAOrm8EewMaCsEyhmfGksWhO';

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
const getWeather =async () =>{
const location = document.getElementById('search-box').value;

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

let data = {};

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