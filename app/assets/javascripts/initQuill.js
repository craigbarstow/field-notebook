$(document).ready(function(){
  //only initialize quill if quill specific div is present
  if ($( "#quill-wrapper" ).length ) {
    var quill = new Quill('#editor');
    quill.addModule('toolbar', { container: '#toolbar' });
  }
});
