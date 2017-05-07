(function(){
	var Wall = window.Wall = function(){
		// 墙的小块
		this.imagewall = game.R.wall;

		// 自己的宽高
		this.w = 35;
		this.h = 35;
		// 自己的x，y
		this.y = parseInt(game.canvas.height * 0.08);
		// 顶部的墙的小块数量
		this.topNum = Math.floor(game.canvas.width / this.w);
		// 自己的x值
		this.x1 = 0;
		this.x2 = game.canvas.width - this.w;
		// 竖直方向上的墙的小块的数量
		this.row = 15;
		// console.log(this.row);
	}

	Wall.prototype.render = function(){
		// 黑色背景
		game.ctx.fillStyle = "#1e1e1e";
		game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
		// 墙的小块

		for(var i = 0; i < this.row; i++){
			game.ctx.drawImage(this.imagewall, this.x1, this.y + this.h * (i+1));
			game.ctx.drawImage(this.imagewall, this.x2, this.y + this.h * (i+1));	
		}
		for(var i = 0; i < this.topNum; i++){
			game.ctx.drawImage(this.imagewall, this.x1 + this.w * i, this.y);
		}
		if(game.level == 1){
			game.ctx.drawImage(this.imagewall, this.x1 + this.w * 3 , this.y + this.w * 3 - 17);
			game.ctx.drawImage(this.imagewall, this.x1 + this.w * 3 , this.y + this.w * 8 - 17);
			game.ctx.drawImage(this.imagewall, this.x1 + this.w * 11 , this.y + this.w * 3 - 17);
			game.ctx.drawImage(this.imagewall, this.x1 + this.w * 11 , this.y + this.w * 8 - 17);
		}
	}
})();