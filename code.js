var playerToken = 'X';
var computerToken = 'O';
var player = 0;
var turn;
var score1 =0;
var score2 =0;
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
        for (var j=0; j<3; j++){
          if(grid[i][j]=== ''){
            return false;
          }
        }
      }
      return null;
  }
  //Computer movement
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
  //Restart Grid
  function ereaseGrid() {
    for(var i=0; i<3; i++){
      for(var j=0 ; j<3; j++){
        grid[i][j]= '';
        $('.col[data-i='+i+'][data-j='+j+']').html('');
      }
    }
  }
  //Marker Points
  function marcScore(){
    if(gameIsOver()==='X'){
      score1 += 1;
      $('.score1 .points').html(score1);
    } else{
      score2 += 1;
      $('.score2 .points').html(score2);
    }
  }
  $('#secondScreen, #thirdScreen, #fourScreen, .marcador').hide();
  $('#onePlayer').click(function(){
    ereaseGrid();
    player = 1;
    $('#firstScreen').hide();
    $('#secondScreen').show();
  });
  $('#twoPlayer').click(function(){
    ereaseGrid();
    player = 2;
    $('#firstScreen').hide();
    $('#thirdScreen').show();
  });
  $('#back, #back2, .reset').click(function(){
    $('#thirdScreen, #secondScreen, #fourScreen, .marcador').hide();
    $('#firstScreen').show();
    score1 = 0;
    score2 = 0;
    $('.score1 .points').html(score1);
    $('.score2 .points').html(score2);
    $('.turnPlayerX').css('top','3px');
    $('.turnPlayerO').css('top','3px');
  });
  $('#x').click(function(){
    $('#thirdScreen, #secondScreen').hide();
    $('#fourScreen, .marcador').show();
    playerToken = "X";
    computerToken = "O";
    turn = 'x';
    $('.turnPlayerX').html('Player turn');
    $('.turnPlayerO').html('Computer turn');
    $('.turnPlayerX').css('top','-38px');
  });
  $('#o').click(function(){
    $('#thirdScreen, #secondScreen').hide();
    $('#fourScreen, .marcador').show();
    playerToken = "O";
    computerToken = "X";
    turn = 'o';
    $('.turnPlayerX').html('Player turn');
    $('.turnPlayerO').html('Computer turn');
    $('.turnPlayerX').css('top','-38px');
  });
  $('#x2').click(function(){
    $('#thirdScreen, #secondScreen').hide();
    $('#fourScreen, .marcador').show();
    turn = 'x';
    $('.turnPlayerX').css('top','-38px');
  });
  $('#o2').click(function(){
    $('#thirdScreen, #secondScreen').hide();
    $('#fourScreen, .marcador').show();
    turn = 'o';
    $('.turnPlayerO').css('top','-38px');
  });
  $('.col').click(function(){
    if(player==1){
      $(this).html(playerToken);
      var i = $(this).data('i');
      var j = $(this).data('j');
      grid[i][j] = playerToken;
      $('.turnPlayerO').css('top','-38px');
      $('.turnPlayerX').css('top','3px');
      if (gameIsOver()){
        setTimeout(alert('Game Over: '+grid[i][j]+' Is the winner'),1000);
        $('.turnPlayerX').css('top','-38px');
        $('.turnPlayerO').css('top','3px');
        marcScore();
        ereaseGrid();
      } else{
          const move = moveAi();
          grid[move.i][move.j] = computerToken;
          $('.col[data-i='+move.i+'][data-j='+move.j+']').html(computerToken);
          $('.turnPlayerX').css('top','-38px');
          $('.turnPlayerO').css('top','3px');
          if (gameIsOver()){
            alert('Uh ho, you lost...');
            marcScore();
            ereaseGrid();
          }
        }
    }
    else{
      if(turn=='x'){
        $(this).html(playerToken);
        var i = $(this).data('i');
        var j = $(this).data('j');
        grid[i][j] = playerToken;
        $('.turnPlayerX').css('top','3px');
        $('.turnPlayerO').css('top','-38px');
        turn='o';
        if (gameIsOver()){
          alert('Player '+grid[i][j]+' wins!! :D');
          marcScore();
          ereaseGrid();
        }
      }else{
        $(this).html(computerToken);
        var i = $(this).data('i');
        var j = $(this).data('j');
        grid[i][j] = computerToken;
        $('.turnPlayerX').css('top','-38px');
        $('.turnPlayerO').css('top','3px');
        turn='x';
        if (gameIsOver()){
          alert('Player '+grid[i][j]+' wins!! :D');
          marcScore();
          ereaseGrid();
        }
      }
    }
  });
});
