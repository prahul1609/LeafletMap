var map = L.map('map').setView([23.87, 78.475], 5);
    mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

//Heat--------------------------------------------------------------
/*L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 20,
    minZoom: 4
}).addTo(map);*/

/*var heat = L.heatLayer(addressPoints,{
    radius: 20,
    blur: 15, 
    maxZoom: 17,
}).addTo(map);*/
var mapboxAccessToken = 'pk.eyJ1IjoicHJhaHVsMTYwOSIsImEiOiJjaXNiYmVuMm8wMG9iMnlwbmR1MWNucXc3In0.G82J9LQnSh7VcFuqsjNFQw';
/*L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light',
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 20,
    minZoom: 4
}).addTo(map);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.streets',
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 20,
    minZoom: 4
}).addTo(map);
*/
L.tileLayer('https://api.mapbox.com/styles/v1/prahul1609/cisbokisj000c2yntuzjkj8zx/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHJhaHVsMTYwOSIsImEiOiJjaXNiYmVuMm8wMG9iMnlwbmR1MWNucXc3In0.G82J9LQnSh7VcFuqsjNFQw', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 20,
    minZoom: 4
}).addTo(map);

function getColor(id) {
    return  id === 1 ? '#800026' :
            id === 2 ? '#BD0026' :
            id === 3 ? '#FFFF00' :
            id === 4 ? '#008000' :
            id === 5 ? '#008080' :
            id === 6 ? '#C0C0C0' :
            id === 7 ? '#000080' :
            id === 8 ? '#800080' :
            id === 9 ? '#00FFFF' :
            id === 10 ? '#800000' :
            id === 11 ? '#00FFFF' :
            id === 12 ? '#FFA07A' :
            id === 13 ? '#98FB98' :
            id === 14 ? '#00FA9A' :
                       '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.ID_1),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
L.geoJson(citiesData, {style: style}).addTo(map);

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
        //marker.bindPopup(title);
        var popupContent = '<div class="popup_custom"><p>Hello world!<br />This is a nice popup.</p><input type="button" value="Shop Now" /></span></div>';
        marker.bindPopup(popupContent).openPopup();
        markers.addLayer(marker);
    }
    return false;
};

populateData();
map.addLayer(markers);