$(document).ready(function(){
  var quillEnabled = false;

  $("#toggle-quill").click(function(){
    if (quillEnabled) {
      initializeQuill();
    } else {
      hideQuill();
    }
  });

  function initializeQuill() {
    var quill = new Quill('#editor');
    quill.addModule('toolbar', { container: '#quill-toolbar' });
  }

  function hideQuill() {
    
  }

});
