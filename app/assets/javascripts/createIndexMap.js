// http://leaflet-extras.github.io/leaflet-providers/preview/
$(document).ready(function() {
  //only execute if there is a div to put map in
  if( document.getElementById('map-canvas') != null) {
    var esriWorldTopo = L.tileLayer('http://server.arcgisonline.com/ArcGIS/re' +
      'st/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      {
       attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    });

    var mapQuestAerial = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}',
    {
    	type: 'sat',
    	ext: 'jpg',
    	attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
    	subdomains: '1234'
    });

    //set map default view to entire USA
    var map = L.map('map-canvas', {
      center: [40.749960, -97.209603],
      zoom: 4
    });

    L.control.layers({
        'Topo Map': esriWorldTopo.addTo(map),
        'Satellite': mapQuestAerial
    }).addTo(map);

    //get projects data from database
    $.get( "projects/map?mapid=index", function( data ) {
      var coordsArray = [];
      for (i=0; i<data.length; i++) {
        var coordinatesArray =  data[i].coordinates.split(",");
        coordsArray.push(coordinatesArray);
        var marker = L.marker([coordinatesArray[0],coordinatesArray[1]]);
        marker.addTo(map);
        //build up popup content html string
        var popupHTML = "<h5>" + data[i].title + "</h5>";
        popupHTML += "<p>" + data[i].date + "</p>";
        popupHTML += "<a href='" + data[i].path +"'><p>View Project</p></a>";
        marker.bindPopup(popupHTML);
      }
      if (coordsArray.length > 0) {
        //set map view to include all projects
        map.fitBounds(coordsArray);
        //FIXME: zoom level not set properly
        map.setZoom(12);
      }
    });


    //fix to load all map tiles on index page
    $("#map-tab").click(function() {
      map.invalidateSize();
    });
  }
});
