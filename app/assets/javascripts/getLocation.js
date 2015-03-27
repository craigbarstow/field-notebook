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
