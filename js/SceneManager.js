(function(){
	var SceneManager = window.SceneManager = function(){
		//1表示欢迎屏幕，2表示游戏内容，3表示GameOver
		this.sceneNumber = 1;

		this.changeLine = false;

		//场景管理器负责实例化东西
		// 墙
		game.wall = new Wall();
		//小丸子
		game.baffle = new Baffle();
		// 小球
		game.ball = new Ball();
		
		// 帧编号
		game.frem = 0;

		//logo的y值
		this.logoY = -200;
		//button_play的y值
		this.play_btnX = game.canvas.width / 2 - 153;
		this.play_btnY = game.canvas.height;
		// 
		this.levelImgX = game.canvas.width / 2 - 175;
		this.linewidth = 6;

		this.overImgX = game.canvas.width / 2 - 202;
		this.overImgY = -277;

		this.winImgX = game.canvas.width / 2 - 126;
		this.winImgY = -199;

		//添加监听
		this.bindEvent();
	}
	SceneManager.prototype.update = function(){

		
		// console.log(this.sceneNumber,game.frem)
		switch(this.sceneNumber){
			case 1 :
				// 让logo移动
				this.logoY += 2;
				if(this.logoY > 120){
					this.logoY = 120;
				}
				// 让按钮移动
				this.play_btnY -= 4;
				if (this.play_btnY < 360) {
					this.play_btnY = 360;
				};
				if(game.frem % 30 == 0 ){
					if(!this.changeLine){
					this.linewidth -= 2;
					if(this.linewidth == 2){
						this.changeLine = !this.changeLine;
					};
					}else{
					this.linewidth += 2;
					if(this.linewidth == 6){
						this.changeLine = !this.changeLine;
					};
					}
				}
				//如果到头了，反过来
				if(this.linewidth < 2 ){
					this.linewidth = 6 ;
				}
				break;
			case 2 :
				// 让关卡图片移动

				this.levelImgY += 3;
				if(this.levelImgY > 200){
					this.levelImgY = 200;
				}
				
				
				break;
			case 3 :
				if(game.ball.energy){
					xunhuan : for(var i = 0 ; i < game.blockArr.length ; i++){
						// console.log(game.ball.isChanged)
							
							switch(game.blockArr[i].check()){
								case 1 : 
										game.ball.dY = -game.ball.dY;
										// console.log("改变了dY",game.frem);
										break xunhuan;
										break;
								case 2:
									game.ball.dX = -game.ball.dX;
									// console.log("改变了dX",game.frem);
									break xunhuan;
									break;
							}
					}
					
				}
				//小球是否死亡
				if(game.ball.y + game.ball.h > game.baffle.y + game.baffle.h + 100){
					this.isballLost = true;
				}
				if(!this.isballLost){
					// 小球的更新和渲染
					game.ball.update();
					
				}else{
					this.sceneNumber = 4;
					this.enter(4)
					
					this.isballLost = false;
				}

				//白屏要慢慢缓缓的变回来
				// this.maskOpacity -= 0.1;
				// if(this.maskOpacity < 0){
				// 	this.maskOpacity = 0;
				// }
			
				break;
			case 4 : 
				// 让按钮移动
				this.overImgY -= 4;
				if (this.overImgY < 160) {
					this.overImgY = 160;
				};
				
				
				break;
			case 5 : 
				// 让按钮移动
				this.winImgY += 4;

				if (this.winImgY > 230) {
					this.winImgY = 230;
				};
				console.log(this.winImgY);
				
				
				break;
		}
	}

	SceneManager.prototype.render = function(){	
		var self  = this;	
		//根据当前是第几个场景，来决定做什么
		switch(this.sceneNumber){
			case 1 :
				 //黑色背景
				game.ctx.fillRect(0, 0, game.ctx.width, game.ctx.height);
				//画logo
				game.ctx.drawImage(game.R["logo"],game.canvas.width/10,this.logoY,425,166);
				//画按钮
				game.ctx.drawImage(game.R["play_btn"],this.play_btnX,this.play_btnY);
				game.ctx.strokeStyle ="yellow";
				game.ctx.lineWidth = this.linewidth;
				game.ctx.strokeRect(this.play_btnX,this.play_btnY,291,76);
				break;
			case 2 : 
				// 当前关卡图
				// console.log(game.levelImg);
				game.ctx.drawImage(game.levelImg,game.canvas.width / 2 - 175,this.levelImgY);
				
				break;

			case 3: 
				// 渲染墻
				game.wall.render();
				//渲染挡板
				game.baffle.render();
				// 砖块渲染
				if(game.blockArr.length - game.wallArr[game.level] > 0 ){

					for(var i = 0; i < game.blockArr.length; i++){
						game.blockArr[i] && game.blockArr[i].render();
					}
				}else{
					game.level++;

					// console.log("关卡：",game.level,game.frem,this.sceneNumber);
					if(game.level > 4){
						console.log("关卡：",game.level,"场景：",this.sceneNumber);
						this.sceneNumber = 5;
						this.enter(5)
						
						game.level = 0;
					}else{
						this.sceneNumber = 2;
						this.enter(2);
				//渲染大白屏
					}
					
				// game.ctx.fillStyle = "rgba(255,255,255," + this.maskOpacity + ")";
				// game.ctx.fillRect(0,0,game.canvas.width , game.canvas.height);

				}
				if(game.ball.energy){
					switch(game.baffle.check()){
					case 1 : 
						game.ball.dY = -game.ball.dY;
						break;
					case 2:
						game.ball.dX = -game.ball.dX;
						break;
					}
				}
				game.ball.render();
				
 				break;
			case 4: 
				
				// 渲染墻
				game.wall.render();
				//渲染挡板
				game.baffle.render();
				// 砖块渲染

				for(var i = 0; i < game.blockArr.length; i++){
					game.blockArr[i] && game.blockArr[i].render();
				}
				
				//渲染大白屏
				// game.ctx.fillStyle = "rgba(255,255,255," + this.maskOpacity + ")";
				// game.ctx.fillRect(0,0,game.canvas.width , game.canvas.height);

			
				game.ctx.drawImage(game.R.gameover,this.overImgX,this.overImgY);
				game.ball.render();
				break;
			case 5: 
				// 渲染墻
				game.wall.render();
				//渲染挡板
				game.baffle.render();
				//渲染大白屏
				// game.ctx.fillStyle = "rgba(255,255,255," + this.maskOpacity + ")";
				// game.ctx.fillRect(0,0,game.canvas.width , game.canvas.height);

				game.ball.render();
				game.ctx.drawImage(game.R.welldone,this.winImgX,this.winImgY);
				break;
		}
	}

	//进入某个场景要做的事情
	SceneManager.prototype.enter = function(number){
		var self = this;
		this.sceneNumber = number;
		switch(this.sceneNumber){
			case 1 : 
				//进入1号场景这一瞬间要做的事情
				this.logoY = -48;
				this.play_btnY = game.canvas.height;
				game.ctx.lineWidth = 6;
				// game.ball = new Ball();
				game.score = 0;
				break;
			case 2:
				game.ball = new Ball();
				game.levelImg = game.R["level_" +game.level];
				game.registCallback(400,function(){
						self.enter(3);
						self.sceneNumber = 3;
				});
				// console.log(number);
				this.levelImgY = -350;
				break;
			case 3 : 
				// 砖块\
				 game.blockArr = [];
				for(var i = 0; i < game.levelArr[game.level].length;i++ ){
					var x = game.levelArr[game.level][i][0];
					var y = game.levelArr[game.level][i][1];
					var block_type = game.levelArr[game.level][i][2];

					game.blockArr.push(new Block(x,y,block_type));
					
				}
				game.flag = true;
				game.ball.energy = false;
				game.ball.dY = -2;
				break;
			case 4 :
				this.overImgY = -277;
				game.registCallback(300,function(){
						self.enter(1);
						self.sceneNumber = 1;
						game.level = 0;
				});
				game.level = 0;
				break;
			case 5 :
				game.level = 0;
				this.winImgY = -199;
				game.registCallback(900,function(){
						self.enter(1);
						self.sceneNumber = 1;
						game.level = 0;
				});
				break;
		}
	}

	//添加监听
	SceneManager.prototype.bindEvent = function(){
		var self = this;
		game.canvas.onclick = function(event){
			clickHandler(event.clientX , event.clientY);
		};
		game.canvas.onmousemove = function(event){

			game.baffle.move(event.clientX);
		}

		function clickHandler(mousex,mousey){
			//点击的时候判断当前是第几个场景
			switch(self.sceneNumber){
				case 1 : 
					// console.log(mousex,mousey)
 					//进入1号场景这一瞬间要做的事情
					if(mousex > self.play_btnX && mousex < self.play_btnX + 291 && mousey > self.play_btnY && mousey < self.play_btnY + 76){
						//说明用户点击到了按钮上

						self.enter(2);	//去2号场景
						this.sceneNumber = 2;
					}
					break;
				case 2 : 
					
					break;
				case 3 : 
					if(game.flag){
						// console.log(1);
						// 小球往上弹
						game.ball.energy = true;

						// self.ballX = self.ball.x;
						// console.log(self.ballX);
						game.flag = false;
					}else{
						return;
					}
					return false;
					break;
			}
		}
	}
})();