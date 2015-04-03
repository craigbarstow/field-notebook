// http://leaflet-extras.github.io/leaflet-providers/preview/
$(document).ready(function() {
    // /* IF LEAFLET */
    var map = L.map('map-canvas').setView([42.3601, -71.0589], 13);

    //add map quest open aerial to map
    L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}',
      {
      	type: 'sat',
      	ext: 'jpg',
      	attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
      	subdomains: '1234'
      }).addTo(map);
    //L.tileLayer(MapQuestAerial).addTo(map);
    
    //add esri world topo
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      {
	     attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
      }).addTo(map);
});
