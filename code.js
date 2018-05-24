var playerToken = 'X';
var computerToken = 'O';
var jugador = 0;
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
  function gameIsOver(gridv){
      // check horizontal
      for (var i=0; i<3; i++){
        if(gridv[i][0] !== '' &&
        gridv[i][0] === gridv[i][1] &&
        gridv[i][1] === gridv[i][2]){
        return gridv[i][0];
        }
      }
      // check vertical
      for (var j=0; j<3; j++){
        if(gridv[0][j] !== '' &&
        gridv[0][j] === gridv[1][j] &&
        gridv[1][j] === gridv[2][j]){
        return gridv[0][j];
        }
      }
      // check diagonal
      if(gridv[0][0] !== '' &&
        gridv[0][0] === gridv[1][1] &&
        gridv[1][1] === gridv[2][2]){
        return gridv[0][0];
      }
      // check diagonal
      if(gridv[2][0] !== '' &&
        gridv[2][0] === gridv[1][1] &&
        gridv[1][1] === gridv[0][2]){
        return gridv[2][0];
      }
      for(var i=0; i<3; i++){
        for (var j=0; j<3; j++){
          if(gridv[i][j]=== ''){
            return false;
          }
        }
      }
      return null;
  }
  function minmax(newGrid, depth, player){
    const gameState = gameIsOver(newGrid);
    if(gameState === false){
      const values = [];
      for(var i=0; i<3; i++){
        for (var j=0; j<3; j++){
          const gridCopy = _.cloneDeep(newGrid);
          //const gridCopy = JSON.parse(JSON.stringify(newGrid));
          if(gridCopy[i][j]!== '') continue;
          gridCopy[i][j] = player;
          const value = minmax(gridCopy, depth + 1, (player === playerToken) ? computerToken : playerToken);
          values.push({
            cost: value,
            cell:{
              i: i,
              j: j
            }
          });
        }
      }
      if(player === computerToken){
        const max = _.maxBy(values, (v) =>{
        return v.cost;
        });
        //function max (n){values.reduce(function(a, b) { return a.n >= b.n ? a : b }, {});}
        if (depth===0){
          //console.log(max.cell);
        return max.cell;
        // return max(values[0].cell);
        } else {
        return max.cost;
        //return max(values[0].cost);
        }
      } else {
        const min = _.minBy(values, (v) =>{
        return v.cost;
        });
       //function min(n){values.reduce(function(a, b) { return a.n <= b.n ? a : b }, {});}
        if (depth===0){
         return min.cell;
        //return min(values[0].cell);
        } else {
          return min.cost;
        //return min(values[0].cost);
        }
      }
    } else if (gameState === null){
      return 0;
    } else if (gameState === playerToken){
      return depth - 10;
    } else if (gameState === computerToken){
      return 10 - depth;
    }
  }
  //Computer movement
  function moveAi(){
    return minmax(grid, 0, computerToken);
    //for(var i=0; i<3; i++){
      //for(var j=0 ; j<3; j++){
        //if(grid[i][j]== ''){
          //return {i:i,
            //      j:j}
        //}
      //}
    //}
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
    if(gameIsOver(grid)==='X'){
      score1 += 1;
      $('.score1 .points').html(score1);
    } else{
      score2 += 1;
      $('.score2 .points').html(score2);
    }
  }
  //show game result
  function showResult(){
    var gameState = gameIsOver(grid);
    if(gameState && jugador==1 && turn==1){
      $('.textResult').html("You Won!! :D")
      $('.result').fadeIn(400).delay(800).fadeOut(400);
    }else if(gameState && jugador==1 && turn==2){
      $('.textResult').html("Uh ho, you lost...")
      $('.result').fadeIn(400).delay(800).fadeOut(400);
    }else if(gameState && jugador==2 && turn=='o'){
      $('.textResult').html("Player X wins!! :D...")
      $('.result').fadeIn(400).delay(800).fadeOut(400);
    }
    else if(gameState && jugador==2 && turn=='x'){
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
    jugador = 1;
    $('#firstScreen').fadeOut(400);
    $('#secondScreen').delay(400).fadeIn(500);
  });
  $('#twoPlayer').click(function(){
    ereaseGrid();
    jugador = 2;
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
      if(jugador==1){
        $(this).html(playerToken);
        var i = $(this).data('i');
        var j = $(this).data('j');
        grid[i][j] = playerToken;
        $('.turnPlayerO').animate({'top':'-38px'},400);
        $('.turnPlayerX').animate({'top':'3px'},400);
        turn = 1;
        showResult();
        if (gameIsOver(grid)){
          $('.turnPlayerX').animate({'top':'-38px'},400);
          $('.turnPlayerO').animate({'top':'3px'},400);
          marcScore();
          setTimeout(ereaseGrid,500);
          console.log(grid);
        } else{
            const move = moveAi();
            setTimeout(function(){$('.col[data-i='+move.i+'][data-j='+move.j+']').html(computerToken)},200);
            $('.turnPlayerX').animate({'top':'-38px'},400);
            $('.turnPlayerO').animate({'top':'3px'},400);
            grid[move.i][move.j] = computerToken;
            turn =2;
            setTimeout(function(){
              showResult();
              if (gameIsOver(grid)){
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
            if(gameIsOver(grid)){
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
            if(gameIsOver(grid)){
            marcScore();
            ereaseGrid();
            }
          },500);
        }
      }
    }
  });
});
