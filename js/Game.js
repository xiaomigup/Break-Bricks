(function(){
	var Game = window.Game = function(params){
		//得到画布
		this.canvas = document.querySelector(params.canvasid);
		//上下文
		this.ctx = this.canvas.getContext("2d");
		//资源文件地址
		this.Rjsonurl = params.Resource;
		//帧编号
		this.fno = 0;

		this.flag  = true;
		//设置画布的宽度和高度
		this.init();
		//读取资源
		// this.levelurl = params.level;
		this.blockArr = [];
		var self = this;
		//读取资源是一个异步函数，所以我们不知道什么时候执行完毕。但是其他的事情必须等到他完毕之后再执行，必须用回调函数。
		this.loadAllResource(function(){
			//我们封装的回调函数，这里表示全部资源读取完毕
			self.start();
		});
		this.level = 3;
		this.levelArr = [];
	}
	//初始化，设置画布的宽度和高度
	Game.prototype.init = function(){
		//读取视口的宽度和高度，
		// var windowW = document.documentElement.clientWidth;
		// var windowH = document.documentElement.clientHeight;
		// //验收
		// if(windowW > 414){
		// 	windowW = 414;
		// }else if(windowW < 320){
		// 	windowW = 320;
		// }
		// //736
		// if(windowH > 736){
		// 	windowH = 736;
		// }else if(windowH < 500){
		// 	windowH = 500;
		// }
		//让canvas匹配视口
		this.canvas.width = 525;
		this.canvas.height = 720;
	}

	//读取资源
	Game.prototype.loadAllResource = function(callback){
		//准备一个R对象
		this.R = {};
		this.L= {};
		var self = this;	//备份
		//计数器
		var alreadyDoneNumber = 0;
		//发出请求，请求JSON文件。
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				var Robj = JSON.parse(xhr.responseText);
				// 遍历砖块矩阵数组
				// console.log(Robj.level);
				for(var i = 0; i < Robj.level.length;i++){
					self.L[Robj.level[i].name] = Robj.level[i].arr;

					// self.levelArr = [self.L.level0,self.L.level1,self.L.level2];
					self.levelArr.push(self.L[Robj.level[i].name]);
				}
				//遍历数组
				for (var i = 0; i < Robj.images.length; i++) {
					//创建一个同名的key
					self.R[Robj.images[i].name] = new Image();
					//请求
					self.R[Robj.images[i].name].src = Robj.images[i].url;
					//监听
					self.R[Robj.images[i].name].onload = function(){
						alreadyDoneNumber++;
						//清屏
						self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
						//提示文字
						var txt = "正在加载资源" + alreadyDoneNumber + "/" + Robj.images.length + " 请稍后";
						//放置居中的位置，屏幕的黄金分割点
						self.ctx.textAlign = "center";
						self.ctx.font = "20px 微软雅黑";
						self.ctx.fillStyle = "#fff";
						self.ctx.fillText(txt, self.canvas.width / 2 ,self.canvas.height * (1 - 0.618));
						//判断是否已经全部加载完毕
						if(alreadyDoneNumber == Robj.images.length){
							callback();
						}
					}
				};
			}
		}
		xhr.open("get",this.Rjsonurl,true);
		xhr.send(null);
	}

	Game.prototype.start = function(){
		// 实例化场景管理器
		this.sm = new SceneManager();
		// 备份this
		var self = this;
		
		// 定时器
		this.timer = setInterval(function(){
			// 清屏
			self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
			// 帧编号
			self.frem++;

			//检查当前帧编号是不是回调函数中的帧编号
				if(game.callbacks.hasOwnProperty(game.frem)){
						//执行回调函数
						game.callbacks[game.frem]();
						//当这个事件做完之后，删除这个事件
						delete game.callbacks[game.frem];
				}
			// 墙渲染
			self.wall.render();
			
			// 棍子渲染
			self.baffle.render();
			//撞到板子反向
			// self.ball.isChanged = false;
			

			if(self.ball.energy){
				xunhuan : for(let i = 0 ; i < game.blockArr.length ; i++){
					// console.log(game.ball.isChanged)
					
						switch(game.blockArr[i].check()){
							case 1 : 
								self.ball.dY = -self.ball.dY;
								console.log("改变了dY",self.frem);
								break xunhuan;
								break;
							case 2:
								self.ball.dX = -self.ball.dX;
								console.log("改变了dX",self.frem);
								break xunhuan;
								break;
							}
					}
			
		}

		// 小球的更新和渲染
			self.ball.update();

			// 砖块渲染
			for(var i = 0; i < self.blockArr.length; i++){
				self.blockArr[i] && self.blockArr[i].render();
			}
			if(self.ball.energy){
				switch(self.baffle.check()){
				case 1 : 
					self.ball.dY = -self.ball.dY;
					
					break;
				case 2:
					self.ball.dX = -self.ball.dX;
					
					break;
			}
			}
			self.ball.render();
			self.ctx.fillStyle = "#sfff";
			self.ctx.fillText("帧编号:"+self.frem, 50, 20);
			self.ctx.drawImage(self.R.bg,0,self.canvas.height- 46)
		}, 3);

	}
	
	Game.prototype.bindEvent = function(){
		var self = this;
		
		// document.onkeydown = function(event){
		// 	event.preventDefault();
		// 	switch(event.keyCode){
		// 		case 37:
		// 			game.baffle.isLeft = true;
		// 			break
		// 		case 39:
		// 			game.baffle.isRight = true;
		// 			break;
		// 	}
		// }

		// document.onkeyup= function(event){
		// 	event.preventDefault();
		// 	switch(event.keyCode){
		// 		case 37:
		// 			game.baffle.isLeft = false;
		// 			break
		// 		case 39:
		// 			game.baffle.isRight = false;
		// 			break;
		// 	}
		// }
		this.canvas.onmousemove = function(event){

			self.baffle.move(event.clientX);
		}
		this.canvas.onclick = function(){

			if(self.flag){
				// console.log(1);
				// 小球往上弹
				self.ball.energy = true;

				// self.ballX = self.ball.x;
				// console.log(self.ballX);
				self.flag = false;
			}else{
				return;
			}

			return false;

		};
	}
			
})();