$( document ).ready(function() {
  if ($("#new-map-wrapper").length) {
    //initialize map here
    var esriWorldTopo = L.tileLayer('http://server.arcgisonline.com/ArcGIS/re' +
      'st/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      {
       attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    });
    var mapDiv = document.getElementById("new-map-canvas");

    var map = L.map(mapDiv, {
      center: [40.749960, -97.209603],
      zoom: 4
    });

    esriWorldTopo.addTo(map);
    map.invalidateSize();

    var chosenMarkers = [];

    map.on('click', function(e) {
      var lat = e.latlng.lat;
      var lng = e.latlng.lng;
      var marker = L.marker(e.latlng);
      chosenMarkers.push([lat,lng]);
      marker.addTo(map);
      //build up popup content html string
      var popupHTML = "<div class='button radius delete-pnt-btn'>Delete</div>";
      marker.bindPopup(popupHTML);

      //add event handler to delete points if they've been clicked
      marker.on("click", function() {
        map.removeLayer(marker);

        markerLocation = [marker.getLatLng().lat, marker.getLatLng().lng];
        //ugly way of checking for presence of array in array
        var hash = {};
        for(var i=0; i<chosenMarkers.length; i+=1) {
            hash[chosenMarkers[i]] = i;
        }
        if(hash.hasOwnProperty(markerLocation)) {
            //if point is found, delete item at that location in array
            chosenMarkers.splice(hash[markerLocation],1);
        }
      });
    });

    $("#new_map").submit(function(e) {
      //intercept and stop form submission event
      e.preventDefault();
      //get action from rails form
      var postPath = $("#new_map").attr("action");
      var center = map.getCenter()
      $.post(postPath, {"data": { "title": $("#map_title").val(),
        "caption": $("#map_caption").val(), "center_lat": center.lat,
        "center_lng": center.lng, "zoom": map.getZoom(),
        "point_array": chosenMarkers
        }
      });
    });

  }
});
