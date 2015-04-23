function getLocation(tagId) {
  if (navigator.geolocation) {
    $(tagId).val("Retrieving Coordinates....");
    navigator.geolocation.getCurrentPosition(function(position) {
      var coordString = String(position.coords.latitude) + "," + String(position.coords.longitude);
      $(tagId).val(coordString);
    });
  } else {
    $(tagId).val("Geolocation is not supported.");
  }
}

$( document ).ready(function() {
  var coordsMap;
  if( document.getElementById('choose-coords-map') != null) {

    var esriWorldTopo = L.tileLayer('http://server.arcgisonline.com/ArcGIS/re' +
      'st/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      {
       attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    });

    mapDiv = document.getElementById('choose-coords-map');
    var coordsMap = L.map(mapDiv, {
      center: [40.749960, -97.209603],
      zoom: 4
    });
    esriWorldTopo.addTo(coordsMap);
    coordsMap.invalidateSize();

    coordsMap.on('click', function(e) {
      $("#project_coordinates").val(e.latlng.lat + "," + e.latlng.lng);
      $("#choose-coords-map-wrapper").hide();
      $("#new-project-wrapper").show();
    });
  }

  $( "#show-coords-map-btn" ).click(function() {
    coordsMap.invalidateSize();
    $("#new-project-wrapper").hide();
    $("#choose-coords-map-wrapper").show();

    $("#cancel-coord-btn").click(function() {
      coordsMap.invalidateSize();
      $("#choose-coords-map-wrapper").hide();
      $("#new-project-wrapper").show();
    })
  })
});
