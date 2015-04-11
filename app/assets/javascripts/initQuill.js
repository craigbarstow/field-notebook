$(document).ready(function(){
  var editor;
  var quillHTML = '<div id="toolbar" class="small-12 columns">' +
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
    '</div>' +
    '<span id="save-quill" class="button small">Save and Close Editor</span>' +
  '</div>';

  $("#add-txt-btn").click(function(evt){
    //fix for double call issue
    evt.stopImmediatePropagation();

    $("#project-content").append(quillHTML);
    initQuill("#editor");

    $("#save-quill").click(function() {
        alert("it works");
        //get quill editor contents
        textHTML = editor.getHTML();
        //clear content of div to remove editor
        $("#project-content").empty();
        $("#project-content").html(textHTML);
    });
  });

  // $("#save-quill").click(function() {
  //   /*
  //   alert("it works");
  //   //fix for double call issue
  //   evt.stopImmediatePropagation()
  //   //get quill editor contents
  //   textHTML = editor.getHTML();
  //   //clear content of div to remove editor
  //   $("#project-content").html("");
  //   $("#project-content").html(textHTML);
  //   */
  // });

  function initQuill(elementID) {
    editor = new Quill(elementID,
      { modules : { "toolbar" : { container : "#toolbar" }}}
    );
  }
});
