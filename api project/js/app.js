city = "london";
api_key = "ae611b27c9113372b836a7eec4e911b0";

const fetchCoordinates = {
    method: "GET",
    redirect: "follow"
};

fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api_key}`, fetchCoordinates)
    .then((response) => response.json()) // Assuming the API returns JSON. Use response.text() if it returns plain text.
    .then((result) => {
        const latitude = result[0].lat; // Accessing latitude inside the promise chain
        console.log(latitude); // This will log the latitude
        const lontitude = result[0].lon; // Accessing latitude inside the promise chain
        console.log(lontitude); // This will log the longitude
    })
    .catch((error) => console.error(error));

