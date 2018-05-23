var playerToken = 'X';
var computerToken = 'O';
var player = 0;
var turn;
var score1 =0;
var score2 =0;
$(document).ready(function(){
  $('#secondScreen, #thirdScreen, #fourScreen, .marcador, .result').hide();
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
  //show game result
  function showResult(){
    var gameState = gameIsOver();
    if(gameState && player==1 && turn==1){
      $('.textResult').html("You Won!! :D")
      $('.result').fadeIn(400).delay(800).fadeOut(400);
    }else if(gameState && player==1 && turn==2){
      $('.textResult').html("Uh ho, you lost...")
      $('.result').fadeIn(400).delay(800).fadeOut(400);
    }else if(gameState && player==2 && turn=='o'){
      $('.textResult').html("Player X wins!! :D...")
      $('.result').fadeIn(400).delay(800).fadeOut(400);
    }
    else if(gameState && player==2 && turn=='x'){
      $('.textResult').html("Player O wins!! :D...")
      $('.result').fadeIn(400).delay(800).fadeOut(400);
    }
    else if(gameState == null){
      $('.textResult').html("It was a draw..");
      $('.result').fadeIn(400).delay(800).fadeOut(400);
      ereaseGrid();
    }
  }
  $('#onePlayer').click(function(){
    ereaseGrid();
    player = 1;
    $('#firstScreen').fadeOut(400);
    $('#secondScreen').delay(400).fadeIn(500);
  });
  $('#twoPlayer').click(function(){
    ereaseGrid();
    player = 2;
    $('#firstScreen').fadeOut(400);
    $('#thirdScreen').delay(400).fadeIn(500);
  });
  $('#back, #back2, .reset').click(function(){
    $('#thirdScreen, #secondScreen, #fourScreen, .marcador').fadeOut(400);
    $('#firstScreen').delay(400).fadeIn(500);
    score1 = 0;
    score2 = 0;
    $('.score1 .points').html(score1);
    $('.score2 .points').html(score2);
    $('.turnPlayerX').css('top','3px');
    $('.turnPlayerO').css('top','3px');
  });
  $('#x').click(function(){
    $('#thirdScreen, #secondScreen').fadeOut(400);
    $('#fourScreen, .marcador').delay(400).fadeIn(500);
    playerToken = "X";
    computerToken = "O";
    $('.turnPlayerX').html('Player turn');
    $('.turnPlayerO').html('Computer turn');
    $('.turnPlayerX').animate({'top':'-38px'},400);
  });
  $('#o').click(function(){
    $('#thirdScreen, #secondScreen').fadeOut(400);
    $('#fourScreen, .marcador').delay(400).fadeIn(500);
    playerToken = "O";
    computerToken = "X";
    $('.turnPlayerX').html('Player turn');
    $('.turnPlayerO').html('Computer turn');
    $('.turnPlayerX').animate({'top':'-38px'},400);
  });
  $('#x2').click(function(){
    $('#thirdScreen, #secondScreen').fadeOut(400);
    $('#fourScreen, .marcador').delay(400).fadeIn(500);
    turn = 'x';
    $('.turnPlayerX').html('Player X turn');
    $('.turnPlayerO').html('Player O turn');
    $('.turnPlayerX').animate({'top':'-38px'},400);
  });
  $('#o2').click(function(){
    $('#thirdScreen, #secondScreen').fadeOut(400);
    $('#fourScreen, .marcador').delay(400).fadeIn(500);
    turn = 'o';
    $('.turnPlayerX').html('Player X turn');
    $('.turnPlayerO').html('Player O turn');
    $('.turnPlayerO').animate({'top':'-38px'},400);
  });
  $('.col').click(function(){
    if(grid[$(this).data('i')][$(this).data('j')]==''){
      if(player==1){
        $(this).html(playerToken);
        var i = $(this).data('i');
        var j = $(this).data('j');
        grid[i][j] = playerToken;
        $('.turnPlayerO').animate({'top':'-38px'},400);
        $('.turnPlayerX').animate({'top':'3px'},400);
        turn = 1;
        showResult();
        if (gameIsOver()){
          $('.turnPlayerX').animate({'top':'-38px'},400);
          $('.turnPlayerO').animate({'top':'3px'},400);
          marcScore();
          setTimeout(ereaseGrid,500);
          console.log(grid);
        } else{
            const move = moveAi();
            setTimeout(function(){$('.col[data-i='+move.i+'][data-j='+move.j+']').html(computerToken)
            $('.turnPlayerX').animate({'top':'-38px'},400);
            $('.turnPlayerO').animate({'top':'3px'},400);},800);
            grid[move.i][move.j] = computerToken;
            turn =2;
            setTimeout(function(){
              showResult();
              if (gameIsOver()){
              marcScore();
              ereaseGrid();
              }
            },1000);
          }
      }
      else{
        if(turn=='x'){
          $(this).html(playerToken);
          var i = $(this).data('i');
          var j = $(this).data('j');
          grid[i][j] = playerToken;
          $('.turnPlayerX').animate({'top':'3px'},400);
          $('.turnPlayerO').animate({'top':'-38px'},400);
          turn='o';
          setTimeout(function(){
            showResult();
            if(gameIsOver()){
            marcScore();
            ereaseGrid();
            }
          },500);
        }else{
          $(this).html(computerToken)
          var i = $(this).data('i');
          var j = $(this).data('j');
          grid[i][j] = computerToken;
          $('.turnPlayerX').animate({'top':'-38px'},400);
          $('.turnPlayerO').animate({'top':'3px'},400);
          turn='x';
          setTimeout(function(){
            showResult();
            if(gameIsOver()){
            marcScore();
            ereaseGrid();
            }
          },500);
        }
      }
    }
  });
});
