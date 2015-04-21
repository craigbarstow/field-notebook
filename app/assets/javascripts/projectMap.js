$(document).ready(function(){
  $("#add-map-btn").click(function(evt) {
    alert("it works");

    var mapID = "map-"+String(1);
    $("#project-content").append('<div class="show-map small-10 column" '+
      'id="'+mapID+'"></div>');
    addProjectMap(mapID);

    // initQuill("#editor");

    //stop double fire issue
    evt.stopImmediatePropagation();
  });

  function addProjectMap(elementID) {
    var esriWorldTopo = L.tileLayer('http://server.arcgisonline.com/ArcGIS/re' +
      'st/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      {
       attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    });

    var map = L.map(elementID, {
      center: [40.749960, -97.209603],
      zoom: 4
    });

    esriWorldTopo.addTo(map);
    map.invalidateSize();
  }
});
