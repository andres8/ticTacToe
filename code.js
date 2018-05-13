var playerToken = "X";
var computerToken = "Y";
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
        if(grid[i][0] !== ' ' &&
        grid[i][0] === grid[i][1] &&
        grid[i][1] === grid[i][2]){
        return grid[i][0];
        }
      }
      // check vertical
      for (var j=0; j<3; j++){
        if(grid[j][0] !== ' ' &&
        grid[j][0] === grid[j][1] &&
        grid[j][1] === grid[j][2]){
        return grid[j][0];
        }
      }
      // check diagonal
      if(grid[0][0] !== ' ' &&
        grid[0][0] === grid[1][1] &&
        grid[1][1] === grid[2][2]){
        return grid[0][0];
      }
      // check diagonal
      if(grid[2][0] !== ' ' &&
        grid[2][0] === grid[1][1] &&
        grid[1][1] === grid[0][2]){
        return grid[2][0];
      }
      for(var i; i<3; i++){
        for (var j; j<3; j++){
          if(grid[i][j]=== ' '){
            return false;
          }
        }
      }
      return null;
  }
  function moveAi(){
    for(var i=0; i<3; i++){
      for (var j=0 ; j<3; j++){
        if(grid[i][j]=== ' '){
          return {
            i: i,
            j: j
          };
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
  $('#x, #o').click(function(){
    $('#thirdScreen, #secondScreen').hide();
    $('#fourScreen').show();
  });
  $('.col').click(function(){
    $(this).html(playerToken);
    var i = $(this).data('i');
    var j = $(this).data('j');
    grid[i][j] = playerToken;
    console.log(grid);
    if (gameIsOver()){
      alert('Game Over: ')
    } else{
      const move = moveAi();
      grid[move.i][move.j] = computerToken;
      $(this).html(computerToken);
    }
  });
});
