(function(){
	var Block = window.Block = function(x,y,blocktype){
		// 自己的x，y值
		this.x = x;
		this.y = y;
		// 自己的宽高
		this.h = 35;
		this.w = 35;
		this.hitetime = 0;
		switch(blocktype){
			case "g":
				this.blocktype = game.R.Block_g;
				this.dietemp = 1;
				this.score = 1;
				break;
			case "r":
				this.blocktype = game.R.Block_r;
				this.dietemp = 1;
				this.score = 3;
				break;
			case "b":
				this.blocktype = game.R.Block_b;
				this.dietemp = 2
				this.score = 7;
				break;
			case "l":
				this.blocktype = game.R.wall;
				break;
		}
		// console.log(this.x,this.y,this.blocktype);
	}
	Block.prototype.render = function(){
		// 渲染
		game.ctx.drawImage(this.blocktype, this.x, this.y);
		// game.ctx.fillText(this.hitetime, this.x + 20, this.y + 20);

		// // 检查有没有撞到小球
		// if(game.ball.R > this.x && game.ball.L < this.x + this.h){
		// 	if((game.ball.T <= this.y + this.h && game.ball.B > this.y + this.h ) ||game.ball.B >= this.y && game.ball.T < this.y ){
		// 	// console.log("2222");
	 //        		game.ball.dY = -game.ball.dY;
	 //        		this.die();
	 //     	}
		// }else 
		// if(game.ball.B > this.y && game.ball.T < this.y + this.h){
		// 	// console.log("11111");
		// 	if((game.ball.L <= this.x + this.h && game.ball.R > this.x + this.h )|| game.ball.R >= this.x && game.ball.L < this.x ){
	 //        		game.ball.dX = -game.ball.dX;
	 //        		this.die();
	 //     	}
		// }
		
		
	}
	Block.prototype.check = function(){
			if((this.y <= game.ball.y + game.ball.h) && (this.y + this.h >= game.ball.y) && (this.x <= game.ball.x + game.ball.w ) && (this.x + this.w >= game.ball.x) ){
				this.hitetime++;
				// console.log("x"+this.x,"y"+this.y,"次数"+this.hitetime, this.dietemp,"帧"+game.frem)
				if(this.hitetime == this.dietemp){
					switch(this.score){
						case 1:
							game.score+= 1;
							break;
						case 3:
							game.score+= 3;
							break;
						case 7:
							game.score+= 7;
							break;
					}
					game.score
					this.die();
					//指定消除音效，小于等于8的时候，用他们的数字，否则恒定为8。
					game.Music["e2"].load();	//如果有重合，再次加载一次
					game.Music["e2"].play();
				}

				if((Math.abs(this.y-(game.ball.y + game.ball.h)) <= 1 || (Math.abs(this.y + this.h-game.ball.y) <= 1))){
						// && (game.ball.x + game.ball.w / 2) >= this.x && (game.ball.x + game.ball.w / 2) <= this.x + this.w
					// console.log("上，下")
					return 1;
				}else if(((Math.abs(this.x-game.ball.x - game.ball.w) <= 1 ) || (Math.abs(this.x + this.w -game.ball.x) <= 1)) ){
					//(Math.abs(this.x-game.ball.x - game.ball.w) <= 2 ) || (Math.abs(this.x + this.w -game.ball.x) <= 2)
					// console.log("左，右")
					return 2;
				
			}
			game.ball.update();
			game.ball.isChanged = true;
			console.log("异常碰撞")
			
		}else{

			return false;
		}
	}
	Block.prototype.die = function(){
		for(var i = 0; i < game.blockArr.length; i++){
			if(game.blockArr[i] == this){
				game.blockArr.splice(i,1);
			}

			// 消除砖块，这个循环实际没用
			// if(game.levelArr[game.level][i][0] == this.x && game.levelArr[game.level][i][1] == this.y && game.levelArr[game.level][i][2] == this.blocktype){
			// 	game.levelArr.splice(i,1);
			// }
		}
	}
})();