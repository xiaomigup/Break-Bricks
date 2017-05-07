(function(){
	var Baffle = window.Baffle = function(){
		// 自己的图片
		this.image = game.R.baffle;
		// 自己的宽高
		this.w = 103;
		this.h = 30;
		// 自己的x，y
		this.x = game.canvas.width / 2;
		this.y = parseInt(game.canvas.height * 0.8);
		//
		this.isLeft = false;
		this.isRight = false;
	}
	Baffle.prototype.move = function(movex){
		// 确定挡板的坐标值
		this.x = movex - this.w / 2;
		// 验收
		if(this.x < game.wall.w){

			this.x = game.wall.w;
		// console.log(this.x);
		}else if(this.x > game.wall.x2 - this.w){
			this.x = game.wall.x2 - this.w;
		}

	}
	
	Baffle.prototype.render = function(){
		
		game.ctx.drawImage(this.image, this.x, this.y);
		
		
	}


	//检查是否撞到小球。如果是上下，返回1，左右， 返回2， 不是返回false
	Baffle.prototype.check = function  () {
		// console.log((this.y <= game.ball.y + game.ball.h) , (this.y + this.h >= game.ball.y) , (this.x <= game.ball.x + game.ball.w ) ,(this.x + this.w >= game.ball.x))
		
		if((this.y <= game.ball.y + game.ball.h) && (this.y + this.h >= game.ball.y) && (this.x <= game.ball.x + game.ball.w ) && (this.x + this.w >= game.ball.x) ){
		// 	console.log("ball",game.ball.x,game.ball.y);
		// console.log("baffle",game.baffle.x,game.baffle.y);
		// console.log("12")
			if((Math.abs(this.y-game.ball.y - game.ball.h)) <=0){
				return 1;
			}else if((Math.abs(this.x-game.ball.x - game.ball.w)<=2 ) || (Math.abs(this.x + this.w -game.ball.x)<=2)){
				// console.log("2")
				return 2;
				
			}
		}else{
			game.ball.die == true;;
			return false;
		}
	}

})();