$( document ).ready(function() {
  var editMode = false
  disableEditContent();

  $("#edit-view-mode-btn").click(function(evt) {
    //fix for double call issue
    evt.stopImmediatePropagation();
    if (editMode) {
      disableEditContent();
      editMode = false;
    } else {
      enableEditContent();
      editMode = true;
    }
  });

  function enableEditContent() {
    //show all edit control bars
    $(".edit-controls").show();
    $("#add-content-bar").show();
    $("#edit-view-mode-btn").text("View Mode");
  }

  function disableEditContent() {
    //hide all edit control bars
    $(".edit-controls").hide();
    $("#add-content-bar").hide();
    $("#edit-view-mode-btn").text("Edit Mode");
  }
});
