$( document ).ready(function() {
  //set event handlers for relevant elements
  resetEventHandlers();
  //get project ID from url for use with ajax calls
  var parser = document.createElement('a');
  parser.href = window.location.href;
  var projectID = parser.pathname.replace('/projects/','');

  var editor;
  var quillHTML = '<div id="editor-wrapper" class="small-12 columns">' +
  '<div id="toolbar" class="small-12 columns">' +
    '<span class="ql-format-group">' +
      '<select title="Size" class="ql-size small-2 columns">' +
        '<option value="16px" selected>Small</option>' +
        '<option value="23px">Normal</option>' +
        '<option value="32px">Large</option>' +
        '<option value="50px">Huge</option>' +
      '</select>' +
      '<span class="ql-bold button small btn-right">Bold</span>' +
      '<span class="ql-italic button small btn-right">Italic</span>' +
      '<span class="ql-underline button small btn-right">Underline</span>' +
      '<span class="ql-list button small btn-right">List</span>' +
      '<span class="ql-bullet button small btn-right">Bullet</span>' +
    '</span>' +
  '</div>' +
    '<div id="editor" class="small-12 columns"></div>' +
    '<span id="save-quill" class="button small btn-right">Save and Close Editor</span>' +
    '<span id="cancel-quill" class="button small btn-right">Cancel</span>' +
  '</div>';

  $("#add-txt-btn").click(function(evt){
    //fix for double call issue
    evt.stopImmediatePropagation();
    initQuill(null);
  });

  function initQuill(divID) {
    if (divID) {
      $(divID.replace("area","wrapper")).before(quillHTML);
    }
    else {
      $("#project-content").append(quillHTML);
    }

    var actionString = "create";

    if (divID) {
      var textAreaID = divID.replace("#text-area-","");
      actionString = "/"+ textAreaID +"/update";
      //hide div containing content to be edited
      $("#text-wrapper-"+textAreaID).hide();
    }
    //initialize editor on editor div
    editor = new Quill("#editor",
      { modules : { "toolbar" : { container : "#toolbar" }}}
    );

    if (divID) {
      //set contents of editor if text area already exists
      editor.setHTML($(divID).html());
    }

    //scroll to newly created editor
    $('html, body').animate({
      scrollTop: $("#editor-wrapper").offset().top - 10},
      300);

    $("#cancel-quill").click(function() {
      // alert("cancel");
      var textAreaID = divID.replace("#text-area-","");
      $("#text-wrapper-"+textAreaID).hide();
    });

    $("#save-quill").click(function() {
      //get quill editor contents
      textHTML = editor.getHTML();

      var postPath = projectID+"/textareas/"+actionString;
      //append project id to query string
      postPath += "?proj="+projectID;

      $.post(postPath, {content: textHTML}, function(data){
        if (data["success"] == true) {
          //clear content of quill div to remove editor
          $("#editor-wrapper").remove();
          var contentID = "text-area-" + data["id"];
          var textAreaHTML = '<div class="text-area small-12 columns" id="text-wrapper-'+data["id"]+'">' +
              '<div class="small-12 columns" id="'+contentID+'">'+
                textHTML +
              '</div>' +
              '<div class="edit-controls small-12 columns">' +
                '<div class="button tiny edit-text-area-button" area-id="'+contentID+'">' +
                  'Edit Text' +
                '</div>' +
                '<div class="button tiny delete-text-area-button" area-id="'+contentID+'">' +
                  'Delete Text Area' +
                '</div>' +
              '</div>' +
            '</div>';

          if (divID) {
            //replace old text in hidden div with new text
            $(divID).html(textHTML);
            //stop hiding div
            $("#text-wrapper-"+textAreaID).show();
          } else {
            $("#project-content").append(textAreaHTML);
            resetEventHandlers();
          }
          // alert(data["message"]);
        } else {
          // alert(data["message"]);
        }
      });
    });
  };

  function resetEventHandlers() {
    $(".edit-text-area-button").click(function (evt) {
      //fix for double call issue
      evt.stopImmediatePropagation();
      var areaID = $(this).attr("area-id");
      initQuill("#"+areaID);
    });

    $(".delete-text-area-button").click(function (evt) {
      //fix for double call issue
      evt.stopImmediatePropagation();
      var htmlID = $(this).attr("area-id")
      var textAreaID = htmlID.replace("text-area-","");
      var postPath = projectID+"/textareas/"+textAreaID+"/destroy?proj="+projectID;
      $.post(postPath, function(data) {
        if (data["success"] == true) {
          //destroy div
          $("#text-wrapper-"+textAreaID).remove();
          // alert("Text Area Successfully Deleted.");
        } else {
          // alert("Failed to Delete Text Area.");
        }
      });
    });
  }
});


















//
