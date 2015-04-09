$(document).ready(function(){
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
      '<span class="button small">Save and Close Editor</span>' +
    '</span>' +
    '</div>' +
      '<div id="editor"></div>' +
    '</div>' +
  '</div>';

  $("#add-txt-btn").click(function(evt){
    //fix for double call issue
    evt.stopImmediatePropagation();

    $("#project-content").append(quillHTML);
    initQuill("#editor");
  });

  function initQuill(elementID) {
    var editor = new Quill(elementID,
      { modules : { "toolbar" : { container : "#toolbar" }}}
    );
  }
});
