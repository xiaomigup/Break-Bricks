        (function(){
	var Ball = window.Ball = function(){
		// 自己的图片
		this.image = game.R.ball;
		// 自己的宽高
		this.h = 35;
		this.w = 35;

		this.isChanged = false;
		//自己的x，y
		this.x = parseInt(game.baffle.x + (game.baffle.w - this.h) / 2);
		this.y = game.baffle.y - this.h;
		// console.log(this.x,this.y)
		// x、y的增量
		this.energy = false;
        this.dX = [1,0.75,-0.75,-1][parseInt(Math.random()*4)];
        // this.dX = 0;
        this.dY = -2;
		// this.bounce();
	}
	// 状态更新
	Ball.prototype.update = function(){
		// console.log(this.x,this.y ,this.dX,this.dY)
		if(this.energy){
			this.x += this.dX;
			this.y += this.dY;
		}else{
			this.x = game.baffle.x + (game.baffle.w - this.h) / 2;
			 this.y = game.baffle.y - this.h ;
		}
		// 碰撞检测值
		this.T = this.y; 
		this.L = this.x;
		this.R = this.x + this.h; 
		this.B = this.y + this.h;
		// 验收
		// console.log(this.x < game.wall.w  , this.x > game.ctx.width -game.wall.w, )
		if(this.y < game.wall.y + game.wall.h){
			// if(this.B > game.canvas.height * 0.8 + 30){
			// 	return;
			// }
			this.dY = - this.dY;
		}
		if(this.x < game.wall.w  || this.x + this.w > game.canvas.width - game.wall.w ){

			this.dX = - this.dX;             
		}
	}
	// 渲染
	Ball.prototype.render = function(){
		
		// console.log(this.x,this.y);
		game.ctx.drawImage(this.image, this.x, this.y);
	}
	// 小球反弹
	Ball.prototype.bounce = function(){
		if(this.B > game.canvas.height * 0.8 + 30){
			return;
		}
		this.dX = - this.dX;
		this.dY = - this.dY;		
	}
})();
