$(document).ready(function(){
  //get project ID from url for use with ajax
  var parser = document.createElement('a');
  parser.href = window.location.href;
  var projectID = parser.pathname.replace('/projects/','');

  var editor;
  var quillHTML = '<div id="editor-wrapper" class="small-12 columns">' +
  '<div id="toolbar" class="small-12 columns">' +
    '<span class="ql-format-group">' +
      '<select title="Size" class="ql-size small-2 columns">' +
        '<option value="12px" selected>Small</option>' +
        '<option value="14px">Normal</option>' +
        '<option value="18px">Large</option>' +
        '<option value="32px">Huge</option>' +
      '</select>' +
      '<span class="ql-bold button small">Bold</span>' +
      '<span class="ql-italic button small">Italic</span>' +
      '<span class="ql-underline button small">Underline</span>' +
      '<span class="ql-list button small">List</span>' +
      '<span class="ql-bullet button small">Bullet</span>' +
    '</span>' +
  '</div>' +
    '<div id="editor" class="small-12 columns"></div>' +
    '<span id="save-quill" class="button small">Save and Close Editor</span>' +
  '</div>';

  $("#add-txt-btn").click(function(evt){
    //fix for double call issue
    evt.stopImmediatePropagation();

    $("#project-content").append(quillHTML);
    initQuill("#editor");

    $("#save-quill").click(function() {
      //get quill editor contents
      textHTML = editor.getHTML();

      //FIXME Get ID if exists, else, pass nil here
      var textAreaID = String(1);
      var postPath = projectID+"/textareas/"+textAreaID;

      //logic to determine which type of controller action should be used
      if (true) {
        postPath += "/create";
      }

      //append project id to query string
      postPath += "?proj="+projectID;

      $.post(postPath, {content: textHTML}, function(data){
        console.log(data);
        if (data["success"] == true) {
          //clear content of quill div to remove editor
          $("#editor-wrapper").remove();
          //FIXME destroy editor object here somehow
          //display message in div //FIXME, dont use alert here
          //FIXME mirror erb style in creating dropdown here
          $("#project-content").append("<div id='quill-text'>"+textHTML+"</div>");
          alert(data["message"]);
        } else {
          alert(data["message"]);
        }
      });
    });
  });

  function initQuill(elementID) {
    editor = new Quill(elementID,
      { modules : { "toolbar" : { container : "#toolbar" }}}
    );
  }
});
