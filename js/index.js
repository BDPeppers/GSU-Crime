// let request = new XMLHttpRequest();
// request.open('GET', 'data.geojson');
// request.onload = function () {
//     const crime = JSON.parse(this.response);

// }
// request.send();
var data;
var map;
var campus;
var marker;
function initMap() {
  // The location of Uluru
  campus = {lat: 33.7531, lng: -84.3853};
  
  map = new google.maps.Map(
      document.getElementById('GSU'), {zoom: 15, center: campus});
 
  marker = new google.maps.Marker({position: campus, map: map});

}
$.getJSON("data.json", function(json) {
  data = json;
  alerts(data)
});

function alerts(crimeData){
  for (var i = 0; i < crimeData.features.length; i++) {
    var coords = crimeData.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(coords[1],coords[0]);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
}