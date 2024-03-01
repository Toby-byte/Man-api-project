document.getElementById("submitBtn").addEventListener("click", function() {
    const city_from_btn = document.getElementById("input-city").value;

    city = city_from_btn;
    apikey_ticketmaster = "wVwazwBOG1AajAqn4Qz1Uijea675atgS";
    
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey_ticketmaster}&city=${city_from_btn}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {

          var obj = JSON.parse(result); // Parse once outside the loop

          // Object to keep track of event titles we've seen
          var seenTitles = {};
          
          // Ensure there are events in the response
          if (obj._embedded && obj._embedded.events.length > 0) {
              // Filter the events to only include those with unique titles
              var uniqueEvents = obj._embedded.events.filter(event => {
                  if (seenTitles[event.name]) {
                      // If we've seen this title, exclude the event
                      return false;
                  } else {
                      // Mark this title as seen and include the event
                      seenTitles[event.name] = true;
                      return true;
                  }
              });
          
              // Process each unique event
              uniqueEvents.forEach((obj_path, index) => {
                  console.log(obj_path.name);
                  console.log(obj_path.url);
          
                  const event_name = document.createElement('h2');
                  event_name.innerHTML = obj_path.name;
                  document.body.appendChild(event_name);
                  
                  if (obj_path.url) { // Check if URL exists
                      const event_url = document.createElement('p');
                      event_url.innerHTML = obj_path.url;
                      document.body.appendChild(event_url);
                  }
          
                  // Assuming each event has at least one image and correcting the image index
                  if (obj_path.images && obj_path.images.length > 0) {
                      // Create a new image element for the first image as an example
                      let image = document.createElement("img");
          
                      // Set the source of the image
                      image.src = obj_path.images[0].url; // Correct path to the first image's URL
          
                      // Append the image to the body of the document
                      document.body.appendChild(image);
                  }
              });
          } else {
              console.log("No events found.");
          }    
        })
        .catch((error) => console.error(error));
});