function updateCityName() {
    cityName = document.getElementById('cityName').value;
    if (!cityName) {
        alert("Please enter a city name.");
        return;
    }
    fetchdata();
}

async function fetchdata() {
    console.log("Fetching data...");
    document.getElementById('load').style.display = 'block';
    document.getElementById('main-body').style.display = 'none';

    const API_URL = `https://api.waqi.info/feed/${cityName}/?token=8fe7732294fcb34d3545aca8ca474fdd936bd9e4`;

    try {
        const response = await fetch(API_URL);
        const json = await response.json();

        if (json.status === 'error') {
            alert("No Data Available for This City!");
            document.getElementById('load').style.display = 'none';
            document.getElementById('main-body').style.display = 'block';
            return;
        }

        const city_lat = json.data.city.geo[0];
        const city_long = json.data.city.geo[1];
        initMap(city_lat, city_long);

        const API_URL_2 = `http://api.airpollutionapi.com/1.0/aqi?lat=${city_lat}&lon=${city_long}&APPID=19bthg8s08ol9shkfqc6mppoii`;
        const response2 = await fetch(API_URL_2);
        const json2 = await response2.json();

        document.getElementById("cityname").innerHTML = json.data.city.name;
        document.getElementById("geo-location").innerHTML = `Latitude: ${city_lat} Longitude: ${city_long}`;
        document.getElementById("time").innerHTML = `Last Updated: ${json.data.time.s}`;
        document.getElementById("aqi").innerHTML = `Air Quality Index: ${json.data.aqi}`;
        document.getElementById("dominent").innerHTML = `Dominant Pollution: ${json.data.dominentpol}`;
        document.getElementById("alert").innerHTML = `ALERT: ${json2.data.alert}`;

        const poll_badge = document.getElementById("pollution-badge");
        const aqi = json.data.aqi;
        if (aqi <= 50) {
            poll_badge.innerHTML = "GOOD";
            poll_badge.className = "badge badge-success";
        } else if (aqi <= 100) {
            poll_badge.innerHTML = "MODERATE";
            poll_badge.className = "badge badge-warning";
        } else if (aqi <= 150) {
            poll_badge.innerHTML = "UNHEALTHY FOR SENSITIVE GROUPS";
            poll_badge.className = "badge badge-success";
        } else if (aqi <= 200) {
            poll_badge.innerHTML = "UNHEALTHY";
            poll_badge.className = "badge badge-danger";
        } else if (aqi <= 250) {
            poll_badge.innerHTML = "VERY UNHEALTHY";
            poll_badge.className = "badge badge-info";
        } else {
            poll_badge.innerHTML = "HAZARDOUS";
            poll_badge.className = "badge badge-danger";
        }

        const api_data2 = json2.data.aqiParams;
        const result = document.getElementById("result");
        result.innerHTML = "";
        const data_keys = [];
        const data_values = [];
        api_data2.forEach(param => {
            const list = document.createElement("li");
            list.innerHTML = `${param.name}: ${param.value}`;
            result.appendChild(list);

            if (param.aqi !== null) {
                data_keys.push(param.name);
                data_values.push(param.aqi);
            }
        });

        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: data_keys,
                datasets: [{
                    label: 'Air Quality Level',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: data_values
                }]
            },
            options: {}
        });

        document.getElementById('load').style.display = 'none';
        document.getElementById('main-body').style.display = 'block';
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById('load').style.display = 'none';
        document.getElementById('main-body').style.display = 'block';
    }
}

function initMap(latt, long) {
    const geoloc = { lat: latt, lng: long };
    const map = new google.maps.Map(document.getElementById('map'), { zoom: 12, center: geoloc });
    new google.maps.Marker({ position: geoloc, map: map });
}
