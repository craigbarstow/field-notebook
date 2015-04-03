$( document ).ready(function() {
    var mapOptions = {
      center: { lat: 42.3601, lng: -71.0589},
      zoom: 15
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    //necessary to render all map tiles properly
    $("#map-tab").click(function() {
      google.maps.event.trigger(map, 'resize');
    });
});
