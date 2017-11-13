var m1 = angular.module('myApp',['ngRoute']);

//分页路由
m1.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/video',{
		templateUrl: 'views/video.html',
		controller:'Uvideo'
	})
	.when('/img',{
		templateUrl: 'views/img.html',
		controller:'Uimg'
	})
	.when('/textt',{
		templateUrl: 'views/text.html',
		controller:'Utextt'
	})
	.when('/voice',{
		templateUrl: 'views/voice.html',
		controller:'Uvoice'
	})
	.when('/login',{
		templateUrl: 'views/login.html',
		controller:'Ulogin'
	})
	.when('/registion',{
		templateUrl: 'views/registion.html',
		controller:'Uregistion'
	})
	.otherwise({
		redirectTo: '/video'
//		otherwise:初始是和哈希值错误情况下的默认处理
//		redirectTo:默认的哈希和模板
	})
	
}])

//首页右边数据总控制器
m1.controller('idx-cotR',["$scope","$http","$sce",function($scope,$http,$sce){
		
	$scope.VideoLove1 = [];
	$scope.VideoLove2 = [];
	//热门视频1
	$http({
		method: "GET",
		url: "http://route.showapi.com/255-1?showapi_appid=47127&showapi_sign=c72688da52a24db48a5db6c2428855d4&type=41&title=&page=1&"
	}).then(function successCallBack (response) {
		var dataArr = response.data.showapi_res_body.pagebean.contentlist;
//		console.log(dataArr)
		for (var i=0;i<dataArr.length;i++) {
				if (dataArr[i].love >= 155  && $scope.VideoLove1.length<8) {
				$scope.VideoLove1.push( dataArr[i] );
			}
		}
	})
	//热门视频2
	$http({
		method: "GET",
		url: "http://route.showapi.com/255-1?showapi_appid=47127&showapi_sign=c72688da52a24db48a5db6c2428855d4&type=41&title=&page=2&"
	}).then(function successCallBack (response) {
		var dataArr = response.data.showapi_res_body.pagebean.contentlist;
		for (var i=0;i<dataArr.length;i++) {
				if (dataArr[i].love >= 155  && $scope.VideoLove2.length<8) {
				$scope.VideoLove2.push( dataArr[i] );
			}
		}
	})
		
	$http({
		method: "GET",
		url: "http://route.showapi.com/255-1?showapi_appid=47127&showapi_sign=c72688da52a24db48a5db6c2428855d4&type=41&title=59db93a86e361e6950ff66c3&page=&"
	}).then(function successCallBack (response) {
//		console.log(response);
	})
	
	//将地址转换白名单
	$scope.videoUrl = function(url){return $sce.trustAsResourceUrl(url); }

	
}])
//视频页面控制器
m1.controller('Uvideo',["$scope","$http","$sce",function ($scope,$http,$sce) {
	$http({
		method: "GET",
		url: "http://route.showapi.com/255-1?showapi_appid=47127&showapi_sign=c72688da52a24db48a5db6c2428855d4&type=41&title=&page=&"
	}).then(function successCallBack (response) {	
		$scope.dataArr = response.data.showapi_res_body.pagebean.contentlist;
	})
	$scope.fxNum = parseInt(Math.random()*100);
	//将地址转换白名单
	$scope.videoUrl = function(url){return $sce.trustAsResourceUrl(url); }
	//视频播放事件
	$scope.videoPlay = function (event) {
		$(event.target).hide()
		$("video").trigger('pause');
		$(event.target).siblings().trigger('play'); 
		$(event.target).siblings().attr("controls","controls");
	}
}])
//图片页面控制器
m1.controller('Uimg',["$scope","$http",function ($scope,$http) {
	$http({
		method: "GET",
		url: "http://route.showapi.com/255-1?showapi_appid=47127&showapi_sign=c72688da52a24db48a5db6c2428855d4&type=10&title=&page=&"
	}).then(function successCallBack (response) {	
		$scope.dataArr = response.data.showapi_res_body.pagebean.contentlist;
//		console.log($scope.dataArr);
	})
	$scope.fxNum = parseInt(Math.random()*100);
}])
//文字页面控制器
m1.controller('Utextt',["$scope","$http",function ($scope,$http) {
	$http({
		method: "GET",
		url: "http://route.showapi.com/255-1?showapi_appid=47127&showapi_sign=c72688da52a24db48a5db6c2428855d4&type=29&title=&page=&"
	}).then(function successCallBack (response) {	
		$scope.dataArr = response.data.showapi_res_body.pagebean.contentlist;
//		console.log($scope.dataArr);
	})
	$scope.fxNum = parseInt(Math.random()*100);
}])
//语音页面控制器
m1.controller('Uvoice',["$scope","$http","$sce",function ($scope,$http,$sce) {
	$http({
		method: "GET",
		url: "http://route.showapi.com/255-1?showapi_appid=47127&showapi_sign=c72688da52a24db48a5db6c2428855d4&type=31&title=&page=&"
	}).then(function successCallBack (response) {	
		$scope.dataArr = response.data.showapi_res_body.pagebean.contentlist;
//		console.log($scope.dataArr);
	})
	$scope.fxNum = parseInt(Math.random()*100);
	//将地址转换白名单
	$scope.videoUrl = function(url){return $sce.trustAsResourceUrl(url); }
	//视频播放事件
	$scope.videoPlay = function (event) {
		$(event.target).hide()
		$("audio").trigger('pause');
		$(event.target).siblings().trigger('play'); 
		$(event.target).siblings().attr("controls","controls");
	}
}])


	//导航选中状态
	$(".idx-nav-ul li").click(function () {
		var navLi = $(".idx-nav-ul li");
		for (var i=0;i<navLi.length;i++) {
			navLi[i].style.backgroundColor="";
		}
		this.style.backgroundColor="#a0032d";
	})
	


//这里开始是登录注册
m1.controller('login',["$scope","$http",function($scope,$http){
	
	$scope.regRegisterName = {
		regRegisterVal: 'default',
		regRegisterList:[
		{name : "default",tips : "" },
		{name : "required",tips : "用户名不能为空！" },
		{name : "pattern",tips : "请输入3-16位数字、字母、下划线组成的用户名" },
		{name : "ok",tips : "" }
		],
		change: function(err){
			for(var attr in err){
				if(err[attr] == true){
					this.regRegisterVal = attr;
					return;
				}
			}
			
			this.regRegisterVal = 'ok';
			
			
		}
	};
	
	$scope.regRegisterText = {
		regRegisterVal: 'default',
		regRegisterList:[
		{name : "default",tips : "" },
		{name : "required",tips : "手机号不能为空！" },
		{name : "pattern",tips : "请输入正确的手机号码" },
		{name : "ok",tips : "" }
		],
		change: function(err){
			for(var attr in err){
				if(err[attr] == true){
					this.regRegisterVal = attr;
					return;
				}
			}
			
			this.regRegisterVal = 'ok';
			
			
		}
	};
	
	$scope.regRegisterpsw = {
		regRegisterVal: 'default',
		regRegisterList:[
		{name : "default",tips : "" },
		{name : "required",tips : "密码不能为空！" },
		{name : "pattern",tips : "密码仅支持6-16位数字、字母和符号" },
		{name : "ok",tips : "" }
		],
		change: function(err){
			for(var attr in err){
				if(err[attr] == true){
					this.regRegisterVal = attr;
					return;
				}
			}
			
			this.regRegisterVal = 'ok';
		}
	};
	
	//登录
	$scope.loginToIndex = function(){
		
		var username = document.querySelector(".log-login-con-username").value;
		var password = document.querySelector(".log-login-con-password").value;
		
		var loginError = document.querySelector(".loginUsername");
		$http({
			method: 'POST',
			url: 'http://h6.duchengjiu.top/shop/api_user.php',
			data: {
				'status': 'check',
				'username': username,
				'password': password
			},
			headers: {"Content-Type":"application/x-www-form-urlencoded"},
					transformRequest: function(obj){
						var str = [];
						for(var s in obj){
//							console.log(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]))
							str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s])); 
						}
						return str.join("&");
					}
		}).then(function successCallBack(response){
			var loginError = document.querySelector(".loginUsername");
			//检查用户名是否存在，如果已经存在调用login的api
			if(response.data.code === 2001 || username == ''){
				loginError.innerHTML = "";
				$http({
					method: 'POST',
					url: 'http://h6.duchengjiu.top/shop/api_user.php',
					data: {
						'status': 'login',
						'username': username,
						'password': password
					},
					headers: {"Content-Type":"application/x-www-form-urlencoded"},
							transformRequest: function(obj){
								var str = [];
								for(var s in obj){
//									console.log(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]))
									str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s])); 
								}
								return str.join("&");
							}
				}).then(function successCallBack(data){
					//检查密码是否输入正确
					if(data.data.code != 0){
						alert('密码输入错误，请重新输入！');
					}else{
						if($scope.regRegisterName.regRegisterVal != "ok"){
							alert("用户名错误，请输入正确的用户名")
						}else if($scope.regRegisterpsw.regRegisterVal != "ok"){
							alert("密码输入错误，请输入正确的密码")
						}else if($scope.regRegisterName.regRegisterVal == "ok" && $scope.regRegisterpsw.regRegisterVal == "ok" && response.data.code === 2001 && data.data.code === 0){
							//跳转
							$scope.dataUsername = data.data.data.username
							document.querySelector("#loginBtn").style.display = "none";
							document.querySelector("#registerBtn").style.display = "none";
							document.querySelector("#userName").style.display = "block";
							document.querySelector("#tuichuBtn").style.display = "block";
							document.querySelector("#log-wrapper").style.display = "none";

						}
					}
				})
			}else{
				loginError.innerHTML = '用户名不存在，请重新输入';
			}
		})
	}

	
//	注册
	$scope.regToLogin = function(){
		var username = document.querySelector(".reg-register-con-username").value;
		var phone = document.querySelector(".reg-register-con-ph").value;
		var password = document.querySelector(".reg-register-con-password").value;
//		console.log(password)
		$http({
			method: 'POST',
			url: 'http://h6.duchengjiu.top/shop/api_user.php',
			data: {
				'status': 'check',
				'username': username,
				'password': password
			},
			headers: {"content-type":"application/x-www-form-urlencoded"},
					transformRequest: function(obj){
						var str = [];
						for(var s in obj){
							console.log(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]))
							str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s])); 
						}
						return str.join("&");
					}
		}).then(function successCallBack (response){
			
			var regError = document.querySelector(".regUsername");
			
			if(response.data.code === 2001){
				regError.innerHTML = "用户名已存在，请重新输入用户名！";
			}else if(response.data.code === 0){
				$http({
					method: 'POST',
					url: 'http://h6.duchengjiu.top/shop/api_user.php',
					data: {
						'status': 'register',
						'username': username,
						'password': password
					},
					headers: {"Content-Type":"application/x-www-form-urlencoded"},
							transformRequest: function(obj){
								var str = [];
								for(var s in obj){
									console.log(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]))
									str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s])); 
								}
								return str.join("&");
							}
				}).then(function successCallBack(data){
					regError.innerHTML = "";
					if($scope.regRegisterName.regRegisterVal != "ok"){
						alert("用户名错误，请输入正确的用户名！");
					}else if($scope.regRegisterText.regRegisterVal != "ok"){
						alert("手机号码输入错SSSS误，请输入正确的手机号码！");
					}else if($scope.regRegisterpsw.regRegisterVal != "ok"){
						alert("密码输入错误，请输入正确的名密码！");
					}else if($scope.regRegisterName.regRegisterVal == "ok" && $scope.regRegisterText.regRegisterVal == "ok" && $scope.regRegisterpsw.regRegisterVal == "ok" && response.data.code === 0){
						document.querySelector("#reg-wrapper").style.display = "none";
						document.querySelector("#log-wrapper").style.display = "block";
					}
				})
				
			}else{
				regError.innerHTML = "用户名错误，请输入正确的用户名！"
			}
		})
	}
	
	
	//关闭页面
	
	//登录页面
	$scope.logRegClose = function(){
		document.querySelector("#log-wrapper").style.display = "none";
	}
	$scope.logRegYes = function(){

		document.querySelector("#log-wrapper").style.display = "block";
		document.querySelector("#reg-wrapper").style.display = "none"
	}
	//注册页面
	$scope.regClose = function(){
		document.querySelector("#reg-wrapper").style.display = "none"
	}
	$scope.regYes = function(){
		document.querySelector("#reg-wrapper").style.display = "block"
		document.querySelector("#log-wrapper").style.display = "none";
	}
	$scope.SignOut = function(){
		window.localStorage.clear();//清除所有k y
		location.reload();//重新刷新
	}

	$scope.toDetails = function(data1){
		var data = data1
		
//		console.log(data)
		var profile_image = data.profile_image,
		             name = data.name,
		               ct = data.ct,
		             text = data.text,
		        video_uri = data.video_uri,
		             love = data.love,
		             hate = data.hate;

		window.location.href="details.html?profile_image="+profile_image+"=name="+encodeURI(name)+"=ct="+ct+"=text="+encodeURI(text)+"=video_url="+video_uri+"=love="+love+"=hate="+hate;

	}
	
	
	
}])


	
	
	
//47127
//c72688da52a24db48a5db6c2428855d4