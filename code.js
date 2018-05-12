$(document).ready(function(){
  $('#secondScreen, #thirdScreen, #fourScreen').hide();
  $('#onePlayer').click(function(){
    $('#firstScreen').hide();
    $('#secondScreen').show();
  });
  $('#twoPlayer').click(function(){
    $('#firstScreen').hide();
    $('#thirdScreen').show();
  });
  $('#back, #back2').click(function(){
    $('#thirdScreen, #secondScreen').hide();
    $('#firstScreen').show();
  });
  $('#x, #o').click(function(){
    $('#thirdScreen, #secondScreen').hide();
    $('#fourScreen').show();
  });
});
