var map = L.map('map').setView([-37.87, 175.475], 14);
    mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

//Heat--------------------------------------------------------------
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
    minZoom: 12
}).addTo(map);

/*var heat = L.heatLayer(addressPoints,{
    radius: 20,
    blur: 15, 
    maxZoom: 17,
}).addTo(map);*/


// Bubble----------------------------------------------------------

var markers = L.markerClusterGroup({
    maxClusterRadius: 120,
    iconCreateFunction: function(cluster) {
      var childCount = cluster.getChildCount();
      var c = ' marker-cluster-';
      var x, y;
      if (childCount < 10) {
        c += 'small';
        x = 30, y = 30;
      } else if (childCount < 100) {
        c += 'medium';
        x = 60, y = 60;
      } else {
        c += 'large';
        x = 90, y = 90;
      }
    return new L.DivIcon({ html: '<div class="child-count"><span>'+childCount+'</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(x, y) });
    },
    //Disable all of the defaults:
    spiderfyOnMaxZoom: false, showCoverageOnHover: false, zoomToBoundsOnClick: true
    
    //singleMarkerMode: true //TO SHOW 1 AS MIN
});


function populateData() {
    for (var i = 0; i < addressPoints.length; i++) {
        var a = addressPoints[i];
        var title = a[2];
        var marker = L.marker(L.latLng(a[0], a[1]), { title: title });
        marker.bindPopup(title);
        markers.addLayer(marker);
    }
    return false;
};

populateData();
map.addLayer(markers);