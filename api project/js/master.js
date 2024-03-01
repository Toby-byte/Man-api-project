document.getElementById("submitBtn").addEventListener("click", function() {
    const city_from_btn = document.getElementById("input-city").value;

    city = city_from_btn;
    api_key_from_openweather = "";
    access_token = "";
    apikey_ticketmaster = "";
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

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${lontitude}&appid=${api_key_from_openweather}&mode=${mode}&units=${units}&lang=${lang}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const div = document.createElement('div');
                div.innerHTML = result;
                document.getElementById('map').appendChild(div);
            })
            .catch((error) => console.error(error));
            
            // Create a new image element
            let image = document.createElement("img");

            // Set the source, width, and height of the image
            image.src = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${lontitude},${latitude},9,0/300x200?access_token=${access_token}`;

            // Append the image to the body of the document
            document.getElementById('map').appendChild(image);

        })
        .catch((error) => console.error(error));

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey_ticketmaster}&city=${city_from_btn}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {

          const obj = JSON.parse(result); // Parse once outside the loop
          
          for (let i = 0; i < 5; i++) {
            // Access the event details
            let eventName = obj._embedded.events[i].name;
            let eventUrl = obj._embedded.events[i].url;
            let eventDate = obj._embedded.events[i].dates.start.localDate;
            let eventTime = obj._embedded.events[i].dates.start.localTime;
            let currency = obj._embedded.events[0].priceRanges[0].currency;
            let priceMin = obj._embedded.events[0].priceRanges[0].min;
            let priceMax = obj._embedded.events[0].priceRanges[0].max;
            let venueAddress = obj._embedded.events[i]._embedded.venues[0].address.line1;
            let cityName = obj._embedded.events[i]._embedded.venues[0].city.name;

            // Create a new div to hold the event details
            const eventDiv = document.createElement("div");

            // Create and append the content to the div
            eventDiv.innerHTML = `
            <h2>${eventName}</h2>
            <p>URL: <a href="${eventUrl}">${eventUrl}</a></p>
            <p>Date: ${eventDate} at ${eventTime}</p>
            <p>Price: ${currency} ${priceMin} - ${priceMax}</p>
            <p>Venue: ${venueAddress}, ${cityName}</p>
            `;

            // Append the new div to the container
            document.getElementById("container").appendChild(eventDiv);

          }
        })
        .catch((error) => console.error(error));
});