const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  apikey = "";

  fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&city=berlin`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
        var obj = JSON.parse(result); // Parse once outside the loop

        // Access the event details
        var eventName = obj._embedded.events[0].name;
        var eventUrl = obj._embedded.events[0].url;
        var eventDate = obj._embedded.events[0].dates.start.localDate;
        var eventTime = obj._embedded.events[0].dates.start.localTime;
        var currency = obj._embedded.events[0].priceRanges[0].currency;
        var priceMin = obj._embedded.events[0].priceRanges[0].min;
        var priceMax = obj._embedded.events[0].priceRanges[0].max;
        var venueAddress = obj._embedded.events[0]._embedded.venues[0].address.line1;
        var cityName = obj._embedded.events[0]._embedded.venues[0].city.name;

        // Create a new div to hold the event details
        var eventDiv = document.createElement("div");

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
    })
    .catch((error) => console.error(error));