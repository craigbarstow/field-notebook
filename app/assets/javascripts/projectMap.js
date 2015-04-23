$(document).ready(function(){
  //iterate over each map div on project show page, filling in content
  $.each( $(".project-map"), function() {
    addProjectMap($(this).attr("id"));
  });

  function addProjectMap(mapDivID) {

    var mapID = mapDivID.replace("map-", "");

    var esriWorldTopo = L.tileLayer('http://server.arcgisonline.com/ArcGIS/re' +
      'st/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      {
       attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    });

    var map = L.map(document.getElementById(mapDivID));
    esriWorldTopo.addTo(map);
    map.invalidateSize();

    //ajax call for map info
    $.get( "maps/"+mapID, function( data ) {
      //set map zoom level
      map.setZoom(data.zoom);
      //set center of map
      map.setView([data.center_lat, data.center_lng]);
      //if points array not empty
      if (data.points.length > 0) {
        //create a marker for each point
        for (i=0; i<data.points.length; i++) {
          pointObject = data.points[i];
          var marker = L.marker([pointObject.lat,pointObject.lng]);
          marker.addTo(map);
        }
      }
    });
  }
});
