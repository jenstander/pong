 var pongModule = (function(){
    var ctx,
    paddles,
    board,
    puck,
    game_started = false,
    board_width,
	board_height,
	default_paddles = {
        left_up : false, // may not be relavent
        left_down : false, // may not be relavent
        right_up : false, // may not be relavent
        right_down : false, // may not be relavent
        left_paddle_y : 0,
        right_paddle_y : 0,
        left_paddle_x : 10,
        right_paddle_x : 0,
        width : 10, 
        height: 50
    },
    default_puck = {
        x : 0,
        y : 0,
        down : true, // may not be relavent
        right : true, // may not be relavent
        x_movement : 5,
        y_movement : 5,
        radius : 10
    },
    speed = 20,
    points = 0;

   
   return {
        start:function(board_id){
            board = document.getElementById(board_id);
	       board_width = $(board).css("width").replace("px","");
	       board_height = $(board).css("height").replace("px","");
            ctx = board.getContext('2d');
            init();
        }
    };
   
   function init(){
       // clear in case there's someting on it
       ctx.clearRect(0,0,board_width,board_height);
       //paddles
        paddles = default_paddles;
        paddles.right_paddle_x = board_width - paddles.width - 10;
        paddles.right_paddle_y = paddles.left_paddle_y = board_height/2 - paddles.height/2;

        //left paddle
        drawPaddle(paddles.left_paddle_x, paddles.left_paddle_y, paddles.width, paddles.height);
        //right paddle
        drawPaddle(paddles.right_paddle_x, paddles.right_paddle_y, paddles.width, paddles.height);
        //puck
        puck = default_puck
        puck.x = board_width / 2;
        puck.y = board_height / 2;
        drawPuck(puck.x, puck.y);

      
        $(document).keydown(onKeyDown);
   }
   
   function removePaddle(x,y){
       ctx.clearRect(x,y,paddles.width,paddles.height);
   }
   function removePuck(x,y){
       ctx.clearRect(x - puck.radius, y - puck.radius, puck.radius*2, puck.radius*2);
   }

   function drawPaddle(x,y,w,h){
        ctx.fillStyle = "black";
        ctx.fillRect (x,y,w,h);        
        //save
        ctx.save(); 
   }
   function drawPuck(x,y) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(x,y,puck.radius,0,Math.PI*2,true);
        ctx.fill();
        ctx.stroke();
   }
   function movePuck() {
        game_started = true;
       var loopMovement = setInterval(function(){
           removePuck(puck.x,puck.y);
           if((puck.y + puck.radius + puck.y_movement > board_height) || (puck.y - puck.radius + puck.y_movement < 0)){
               //bounce
               puck.y_movement = puck.y_movement * -1;
           }
           if(((puck.x + puck.radius + puck.x_movement >= board_width - 10 -  paddles.width) && (puck.y + puck.y_movement >= paddles.right_paddle_y) && (puck.y + puck.y_movement <= paddles.right_paddle_y + paddles.height ))
           || ((puck.x - puck.radius + puck.x_movement <= 10 + paddles.width) && (puck.y + puck.y_movement >= paddles.left_paddle_y) && (puck.y + puck.y_movement <= paddles.left_paddle_y + paddles.height ))){
               points += 1;
               puck.x_movement = puck.x_movement * -1;
               
           }
           if((puck.x - puck.radius + puck.x_movement < 0) || (puck.x + puck.radius + puck.x_movement > board_width)){
               lose();
               clearInterval(loopMovement);
           }else{ 
               drawPuck(puck.x += puck.x_movement, puck.y += puck.y_movement);
           }
           
       }, speed);
   }
   function lose() {
       ctx.clearRect(0,0,board_width,board_height);
       ctx.fillStyle = "blue";
       ctx.font = "bold 1em sans-serif";
       ctx.fillText("Good Game!  Your total score is " + points + ". Press r to restart game.", 20, 20);
       game_started = false;
   }
   function onKeyDown(evt) {
       //up down for right ana
       if (evt.keyCode == 38 && paddles.right_paddle_y  > 0 ){ 
          removePaddle(paddles.right_paddle_x, paddles.right_paddle_y);
          paddles.right_paddle_y -= 5;
          drawPaddle(paddles.right_paddle_x, paddles.right_paddle_y, paddles.width, paddles.height);
      }
      else if (evt.keyCode == 40 && (paddles.right_paddle_y + paddles.height) <= board_height){
          removePaddle(paddles.right_paddle_x, paddles.right_paddle_y);
           paddles.right_paddle_y += 5;
          drawPaddle(paddles.right_paddle_x, paddles.right_paddle_y, paddles.width, paddles.height);
       }

      // a and z
      else if (evt.keyCode == 65 && paddles.left_paddle_y > 0){
          removePaddle(paddles.left_paddle_x, paddles.left_paddle_y);
           paddles.left_paddle_y -= 5
          drawPaddle(paddles.left_paddle_x, paddles.left_paddle_y, paddles.width, paddles.height);
       }
      else if (evt.keyCode == 90 && (paddles.left_paddle_y + paddles.height) <= board_height){
          removePaddle(paddles.left_paddle_x, paddles.left_paddle_y);
           paddles.left_paddle_y += 5
          drawPaddle(paddles.left_paddle_x, paddles.left_paddle_y, paddles.width, paddles.height);
       }
       // start game
       if(evt.keyCode == 83 && game_started === false){
           movePuck();
       }
       // restart game
       if(evt.keyCode == 82 && game_started === false){
           init();
       }
    }

})();
