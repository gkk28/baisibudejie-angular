
m1.controller('logReg',["$scope","$http",function($scope,$http){
	
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
							console.log(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]))
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
									console.log(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]))
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
							window.location.href = "index.html?username=" + username;
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
		console.log(password)
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
						window.location.href = "index.html?username=" + username;
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
		alert(1)
		document.querySelector("#log-wrapper").style.display = "none";
	}
	//注册页面
	$scope.regClose = function(){
		document.querySelector("#reg-wrapper").style.display = "none"
	}
	
}])