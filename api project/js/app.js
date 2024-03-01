document.getElementById("submitBtn").addEventListener("click", function() {
    const city_from_btn = document.getElementById("input-city").value;

    city = city_from_btn;
    api_key = "";
    mode = "html";
    units = "metric";
    lang = "en";


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


            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${lontitude}&appid=${api_key}&mode=${mode}&units=${units}&lang=${lang}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const city_name = document.createElement('h1');
                city_name.innerHTML = city;
                document.body.appendChild(city_name);
                const div = document.createElement('div');
                div.innerHTML = result;
                document.body.appendChild(div);
            })
            .catch((error) => console.error(error));


        })
        .catch((error) => console.error(error));

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
});