$(document).ready(function(){
  //only initialize quill if quill specific div is present
  if ($( "#quill-wrapper" ).length ) {
    //start with quill div hidden
    $("#quill-wrapper").hide();

    var quillEnabled = false;
    var quill;

    //config stuff
    quill = new Quill('#editor');
    quill.addModule('toolbar', { container: '#quill-toolbar' });

    $("#toggle-quill").click(function(){
      if (!quillEnabled) {
        quillEnabled = true;
        showQuill();
      } else {
        quillEnabled = false;
        hideQuill();
      }
    });

    function showQuill() {
      $("#project-content-wrapper").hide();
      $("#quill-wrapper").show();
      $("#toggle-quill").text("View Mode");
    }

    function hideQuill() {
      $("#quill-wrapper").hide();
      $("#project-content-wrapper").html(quill.getHTML()).show();
      $("#toggle-quill").text("Edit Mode");
    }
  }
});
