var playerToken;
var computerToken;
$(document).ready(function(){
  var grid = [
    ['','',''],
    ['','',''],
    ['','','']
  ];
  //check if the game is over
  function gameIsOver(){
      // check horizontal
      for (var i=0; i<3; i++){
        if(grid[i][0] !== '' &&
        grid[i][0] === grid[i][1] &&
        grid[i][1] === grid[i][2]){
        return grid[i][0];
        }
      }
      // check vertical
      for (var j=0; j<3; j++){
        if(grid[0][j] !== '' &&
        grid[0][j] === grid[1][j] &&
        grid[1][j] === grid[2][j]){
        return grid[0][j];
        }
      }
      // check diagonal
      if(grid[0][0] !== '' &&
        grid[0][0] === grid[1][1] &&
        grid[1][1] === grid[2][2]){
        return grid[0][0];
      }
      // check diagonal
      if(grid[2][0] !== '' &&
        grid[2][0] === grid[1][1] &&
        grid[1][1] === grid[0][2]){
        return grid[2][0];
      }
      for(var i=0; i<3; i++){
        for (var j; j<3; j++){
          if(grid[i][j]=== ''){
            return false;
          }
        }
      }
      return null;
  }
  var l = {};
  function moveAi(){
    for(var i=0; i<3; i++){
      for(var j=0 ; j<3; j++){
        if(grid[i][j]== ''){
          return {i:i,
                  j:j}
        }
      }
    }
  }
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
  $('#x').click(function(){
    $('#thirdScreen, #secondScreen').hide();
    $('#fourScreen').show();
    playerToken = "X";
    computerToken = "O";
  });
  $('#o').click(function(){
    $('#thirdScreen, #secondScreen').hide();
    $('#fourScreen').show();
    playerToken = "O";
    computerToken = "X";
  });
  $('.col').click(function(){
    $(this).html(playerToken);
    var i = $(this).data('i');
    var j = $(this).data('j');
    grid[i][j] = playerToken;
    console.log(grid[i][j]);
    if (gameIsOver()){
      alert('Game Over: '+grid[i][j]+' Is the winner');
    } else{
      const move = moveAi();
      console.log(move.i);
      grid[move.i][move.j] = computerToken;
      $('.col[data-i='+move.i+'][data-j='+move.j+']').html(computerToken);
      if (gameIsOver()){
        alert('Game Over: '+grid[move.i][move.j]+' Is the winner');
      }
    }

  });
});
