var cities=['Delhi','Noida','Narela','Kanpur','Kolkata','Ahmedabad','Bengaluru','Mumbai','Pune'];
var cities_aqi=[];
var dataset=[];
for(k in cities){
   fetchdata(cities[k]);
}

console.log(dataset);


async function drawchart() {
   
    //alert("reach drawchart");
    var chart = new CanvasJS.Chart("chartContainer", {
	theme: "light2",
	animationEnabled: true, // change to true		
	title:{
		text: "AQI Comparison Chart"
	},
	data: [
	{
		// Change type to "bar", "area", "spline", "pie",etc.
		type: "column",
		dataPoints: dataset
	}
	]
    });
    chart.render();
}


async function fetchdata(cityName){

    //alert(cityName);

     const API_URL ='https://api.waqi.info/feed/'+cityName+'/?token=8fe7732294fcb34d3545aca8ca474fdd936bd9e4';
     const response = await fetch(API_URL);
     var json = await response.json();
     console.log(json);

     var tmp={};
     tmp.label=cityName;
     tmp.y=json.data.aqi;
     dataset.push(tmp);
    
     document.getElementById("time").innerHTML="Last Updated : "+json.data.time.s;     

     //////AQI
     var td1 = document.createElement("td");
     td1.innerHTML=json.data.aqi;
     document.getElementById(cityName).appendChild(td1);
     cities_aqi.push(json.data.aqi);

     /////PM10
     var td2 = document.createElement("td");
     if(typeof json.data.iaqi.pm10=="undefined")
        td2.innerHTML=" - ";
     else    
        td2.innerHTML=json.data.iaqi.pm10.v;
     document.getElementById(cityName).appendChild(td2);   
      
     /////PM2.5
     var td3 = document.createElement("td");
     if(typeof json.data.iaqi.pm25=="undefined")
        td3.innerHTML=" - ";
     else    
        td3.innerHTML=json.data.iaqi.pm25.v;
     document.getElementById(cityName).appendChild(td3);
      
     /////OZONE
     var td4 = document.createElement("td");
     if(typeof json.data.iaqi.o3=="undefined")
        td4.innerHTML=" - ";
     else    
        td4.innerHTML=json.data.iaqi.o3.v;
     document.getElementById(cityName).appendChild(td4);   
      
     /////CO
     var td5 = document.createElement("td");
     if(typeof json.data.iaqi.co=="undefined")
        td5.innerHTML=" - ";
     else    
        td5.innerHTML=json.data.iaqi.co.v;
     document.getElementById(cityName).appendChild(td5);   
      
     /////SO2
     var td6 = document.createElement("td");
     if(typeof json.data.iaqi.so2=="undefined")
        td6.innerHTML=" - ";
     else    
        td6.innerHTML=json.data.iaqi.so2.v;
     document.getElementById(cityName).appendChild(td6);   
    
     /////NO2
     var td7 = document.createElement("td");
     if(typeof json.data.iaqi.no2=="undefined")
        td7.innerHTML=" - ";
     else    
        td7.innerHTML=json.data.iaqi.no2.v;
     document.getElementById(cityName).appendChild(td7);   

     if(cityName=="Pune"){
        drawchart();
     }
     
}


 


