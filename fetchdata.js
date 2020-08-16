function updateCityName(){
    cityName=document.getElementById('cityName').value;
    fetchdata();
    alert(city_lat);
}


async function fetchdata(){

    document.getElementById('load').style.display='block';
    document.getElementById('main-body').style.display='none';

    const API_URL ='https://api.waqi.info/feed/'+cityName+'/?token=8fe7732294fcb34d3545aca8ca474fdd936bd9e4';
	const response = await fetch(API_URL);
	var json = await response.json();
        console.log(json);
        console.log("1st end");

 
    if(json.status=='error'){
        alert("No Data Available for This City!");
        document.getElementById('load').style.display='none';
        document.getElementById('main-body').style.display='block';
        exit(1);
    }

    var city_lat=json.data.city.geo[0];
    var city_long=json.data.city.geo[1];

    ///////google map function call
    initMap(city_lat,city_long);

    const API_URL_2 ='http://api.airpollutionapi.com/1.0/aqi?lat='+city_lat+'&lon='+city_long+'&APPID=19bthg8s08ol9shkfqc6mppoii';
    const response2 = await fetch(API_URL_2);
	var json2 = await response2.json();
       console.log(json2);
       console.log("2nd end");
       console.log(json2.data.aqiParams[0].name+" = "+json2.data.aqiParams[0].value);


    var city=document.getElementById("cityname");
    city.innerHTML=json.data.city.name;
    document.getElementById("geo-location").innerHTML="Latitude : "+json.data.city.geo[0]+" Longitude : "+json.data.city.geo[1];
    document.getElementById("time").innerHTML="Last Updated : "+json.data.time.s;
    document.getElementById("aqi").innerHTML="Air Quality Index : "+json.data.aqi;
    document.getElementById("dominent").innerHTML="Dominent Polution : "+json.data.dominentpol;
    document.getElementById("alert").innerHTML="ALERT : "+json2.data.alert;
    
var poll_badge=document.getElementById("pollution-badge");
if(json.data.aqi>=0 && json.data.aqi<=50){
    poll_badge.innerHTML="GOOD";
    poll_badge.className="badge badge-success";
}
if(json.data.aqi>=51 && json.data.aqi<=100){
    poll_badge.innerHTML="MODERATE";
    poll_badge.className="badge badge-warning";
}
if(json.data.aqi>=101 && json.data.aqi<=150){
    poll_badge.innerHTML="UNHEALTHY FOR SENSITIVE GROUPS";
    poll_badge.className="badge badge-success";
}
if(json.data.aqi>=151 && json.data.aqi<=200){
    poll_badge.innerHTML="UNHEALTHY";
    poll_badge.className="badge badge-danger";
}
if(json.data.aqi>=201 && json.data.aqi<=250){
    poll_badge.innerHTML="VERY UNHEALTHY";
    poll_badge.className="badge badge-info";
}
if(json.data.aqi>=250){
    poll_badge.innerHTML="HAZARDOUS";
    poll_badge.className="badge badge-danger";
}
    //alert(json.data.city.name);
    document.getElementById("result").innerHTML=" ";

    var api_data=json.data.iaqi;
    
    var data_keys=[];
    var data_values=[];
    var api_data2=json2.data.aqiParams;
    for(var k in api_data2){
    	var list = document.createElement("li");
        list.innerHTML=api_data2[k].name+"      "+api_data2[k].value;
        document.getElementById("result").appendChild(list);
        if(api_data2[k].aqi!=null){
           data_keys.push(api_data2[k].name);
           data_values.push(api_data2[k].aqi);
        }
    }
    var templist=document.createElement("li");
    templist.innerHTML="Temperature : "+json2.data.temp;
    document.getElementById("result").appendChild(templist);

    document.getElementById('load').style.display='none';
    document.getElementById('main-body').style.display='block';

    console.log(data_keys);
    console.log(data_values);
    

    //graph
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'horizontalBar',

    // The data for our dataset
    data: {
        labels:data_keys,
        datasets: [{
            label: 'Air Quality Level',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: data_values
        }]
    },

    // Configuration options go here
    options: {}
    });

   
}

////map function
function initMap(latt,long) {
    var geoloc={lat: latt, lng: long};
    var map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: geoloc});
    var marker = new google.maps.Marker({position: geoloc, map: map});
}


