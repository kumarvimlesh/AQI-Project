async function fetchdata(){
	//alert("fetch");
	const cityName=document.getElementById('cityName').value;
    const API_URL ='https://api.waqi.info/feed/'+cityName+'/?token=8fe7732294fcb34d3545aca8ca474fdd936bd9e4';
	const response = await fetch(API_URL);
	var json = await response.json();
    console.log(json);
    if(json.status=='error'){
        alert("No Data Available for This City!");
        exit(1);
    }

    var city=document.getElementById("cityname");
    city.innerHTML=json.data.city.name;
    document.getElementById("geo-location").innerHTML="Latitude : "+json.data.city.geo[0]+" Longitude : "+json.data.city.geo[1];
    document.getElementById("time").innerHTML="Last Updated : "+json.data.time.s;
    document.getElementById("aqi").innerHTML="Air Quality Index : "+json.data.aqi;
    //alert(json.data.city.name);
    document.getElementById("result").innerHTML=" ";

    var data=json.data.iaqi;

    for(var k in data){
    	//console.log(k);
    	//console.log(k+" = "+data[k].v);
    	var list = document.createElement("li");
        list.innerHTML=k+" = "+data[k].v;
        document.getElementById("result").appendChild(list);
    }
}