
const key = 'TkCb2NZH6BoNFd4JYAOrm8EewMaCsEyhmfGksWhO';

const getPictures = () =>{
    axios
    .get('https://api.nasa.gov/planetary/apod?api_key=' + key)
    .then(response =>{
        const link = response.data;
        console.log(link.url);
        document.getElementById('nasa-image').src=`${link.url}`;
    })
    .catch(error => console.error(error))
}

const getWeather =() =>{
    
}