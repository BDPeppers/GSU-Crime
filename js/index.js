
var data;//crime data
var map;//base map
var campus = {lat: 33.7531, lng: -84.3853};//centering the map on the GSU campus
var Info = [];//marker resetter


window.onload = function(){
  initMap();
}

function initMap() {
  map = new google.maps.Map(
      document.getElementById('GSU'), {zoom: 15, center: campus});
  $.getJSON("data.json", function(json) {
    data = json;
    alerts(data);
  });
}

function alerts(crimeData){//add cime alerts to the map
  for (var i = 0; i < crimeData.features.length; i++) {
    var coords = crimeData.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(coords[1],coords[0]);

    var crime_info = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    // '<h1 id="firstHeading" class="firstHeading" style="text-align:center";>Crime Alert</h1>'+
    '<div id="bodyContent">'+ 
    '<h2>Crime Type: ' + data.features[i].properties.Crime + '</h2>' + 
    '<h2>Time: ' + data.features[i].properties.Time + '</h2>' + '<h2>Date: ' + data.features[i].properties.Date + '</h2>' + 
    '<h2>Incident Description: </h2> '+ data.features[i].properties.IncidentDescription +
    '<h2>Suspect Description</h2> '+ data.features[i].properties.Suspects +
    '</div>'+
    '</div>';

    const marker = new google.maps.Marker({//marker 
      position: latLng,
      map: map
    });
    const popup = new google.maps.InfoWindow({//popup box
      content: crime_info
    });

    marker.addListener('click', function(){//display popup on code
      nextPopUp();
      popup.open(map, marker);
      Info[0] = popup;
    });
    
    function nextPopUp(){
      if(Info.length > 0){
        //detaches the info-window from the marker
        Info[0].set("marker", null);
        //closes it
        Info[0].close();
        //blank array
        Info.length = 0;
      }
    }

  }
}


//GSU theme Map Styling