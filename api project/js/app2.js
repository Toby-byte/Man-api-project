document.getElementById("submitBtn").addEventListener("click", function() {
    const city_from_btn = document.getElementById("input-city").value;

    city = city_from_btn;
    api_key_from_openweather = "api key here";
    access_token = "api key here";
    mode = "html";
    units = "metric";
    lang = "en";


    const fetchCoordinates = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api_key_from_openweather}`, fetchCoordinates)
        .then((response) => response.json()) // Assuming the API returns JSON. Use response.text() if it returns plain text.
        .then((result) => {
            const latitude = result[0].lat; // Accessing latitude inside the promise chain
            console.log(latitude); // This will log the latitude
            const lontitude = result[0].lon; // Accessing latitude inside the promise chain
            console.log(lontitude); // This will log the longitude
            
            // Create a new image element
            let image = document.createElement("img");

            // Set the source, width, and height of the image
            image.src = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${lontitude},${latitude},9,0/300x200?access_token=${access_token}`;

            // Append the image to the body of the document
            document.body.appendChild(image);

        })
        .catch((error) => console.error(error));

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
});