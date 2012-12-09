 var pongModule = (function(){
        var ctx,
        paddles,
        board,
        board_width,
	board_height,
	default_paddles = {
        left_up : false,
        left_down : false,
        right_up : false,
        right_down : false,
        left_paddle_y : 100,
        right_paddle_y : 100,
        left_paddle_x : 10,
        right_paddle_x : 680,
        width : 10, 
        height: 50,
    }
    //var board = document.getElementById("board");
   
   return {
        start:function(board_id){
            board = document.getElementById(board_id);
	    board_width = $(board).css("width").replace("px","");
	    board_height = $(board).css("height").replace("px","");
	    console.log(board_width);
            ctx = board.getContext('2d');
            init();
        }
    };
   
   function init(){
        paddles = default_paddles;
        //left paddle
        ctx.fillRect (paddles.left_paddle_x, paddles.left_paddle_y, paddles.width, paddles.height);
        //right paddle
        ctx.fillRect (paddles.right_paddle_x, paddles.right_paddle_y, paddles.width, paddles.height);
        //puck
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(340,140,10,0,Math.PI*2,true);
        ctx.fill();
        ctx.stroke();
        
        //reset button
       // context.font = '40pt Calibri';
       // context.fillStyle = 'blue';
       // context.fillText('Reset', 20, 100);
      
        $(document).keydown(onKeyDown);
        $(document).keyup(onKeyUp);
        board.addEventListener("click", handleClick, false);
   }
   
   function removePaddle(x,y){
       ctx.clearRect(x,y,paddles.width,paddles.height);
   }
   function handleClick(e){
       //detect when button is  clicked
       x = e.x
       y = e.y
       console.log("x is " + x + " y is " + y);
   }
   function draw(){
        //left paddle
        ctx.fillStyle = "black";
        // x, y, width, height
          if (paddles.left_up || paddles.left_down){
            ctx.fillRect (paddles.left_paddle_x, paddles.left_paddle_y, paddles.width, paddles.height);
          }    
          if (paddles.right_up || paddles.right_down){
            ctx.fillRect (paddles.right_paddle_x, paddles.right_paddle_y, paddles.width, paddles.height);
          }    
                           
        //save
        ctx.save();
       
   }
   
   function onKeyDown(evt) {
       //up down for right ana
       if (evt.keyCode == 38 && paddles.right_paddle_y  > 0 ){ 
          removePaddle(paddles.right_paddle_x, paddles.right_paddle_y);
          paddles.right_up = true;
          paddles.right_paddle_y -= 5;
      }
      else if (evt.keyCode == 40 && (paddles.right_paddle_y + paddles.height) <= board_height){
          removePaddle(paddles.right_paddle_x, paddles.right_paddle_y);
           paddles.right_down = true;
           paddles.right_paddle_y += 5;
       }

      // a and z
      if (evt.keyCode == 65 && paddles.left_paddle_y > 0){
          removePaddle(paddles.left_paddle_x, paddles.left_paddle_y);
           paddles.left_up = true;
           paddles.left_paddle_y -= 5
       }
      else if (evt.keyCode == 90 && (paddles.left_paddle_y + paddles.height) <= board_height){
          removePaddle(paddles.left_paddle_x, paddles.left_paddle_y);
           paddles.left_down = true;
           paddles.left_paddle_y += 5
       }
      draw();
    }

    function onKeyUp(evt) {
      if (evt.keyCode == 38) paddles.right_up = false;
      else if (evt.keyCode == 40) paddles.right_down = false;
      if (evt.keyCode == 65) paddles.left_up = false;
      else if (evt.keyCode == 90) paddles.left_down = false;
    }
})();
