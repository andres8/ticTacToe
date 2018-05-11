$(document).ready(function(){
  $('#secondScreen, #thirdScreen').hide();
  $('#onePlayer').click(function(){
    $('#firstScreen').hide();
    $('#secondScreen').show();
  });
  $('#twoPlayer').click(function(){
    $('#firstScreen').hide();
    $('#thirdScreen').show();
  });
  $('#back, #back2').click(function(){
    $('#thirdScreen').hide();
    $('#secondScreen').hide();
    $('#firstScreen').show();
  });
});
