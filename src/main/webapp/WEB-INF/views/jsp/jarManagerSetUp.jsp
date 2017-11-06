<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>JarManager</title>


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<spring:url value="/resources/core/js/validator.js" var="validator" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="${validator}"></script>


<style>
.modal-body div {
	padding: 10px;
}

.form-table input {
	width: 400px;
}

.form-control {
	margin-top: 10px;
    margin-bottom: 10px;
}
.blue{
    color: blue;
}
.red{
    color: red;
}
.chocolate{
    color: chocolate;
}
.div_body{
    background-color: honeydew;
}

</style>


</head>
<body>
<nav class="navbar navbar-inverse navbar-fixed-top">
	<div class="container">
		<div class="navbar-header">
			<a class="navbar-brand" href="home">JarManager</a>
		</div>
		<ul class="nav navbar-nav">
			<li><a  href="/JarManager/JarProjectVOs">管理</a></li>
			<li><a  href="/JarManager/JarManagerSetUp">設定</a></li>
		</ul>
	</div>
</nav>
<h3>設定</h3>
<div class="container div_body" >
		<div>
			<h3>心跳協議連線設定</h3>
			<div>
				<input type="text"  name="username" class="form-control" placeholder="帳號" value="${heartBeatConnectionFactoryVO.username}"/>
				<input type="password"  name="password" class="form-control" placeholder="密碼" value="${heartBeatConnectionFactoryVO.password}" />
				<input type="text"  name="host" class="form-control" placeholder="主機" value="${heartBeatConnectionFactoryVO.host}"/>
				<input type="text"  name="port" class="form-control" placeholder="埠號" value="${heartBeatConnectionFactoryVO.port}"/>
			</div>
		</div>
		<div>
			<h3>檢查佇列</h3>
			<div>
				<input type="text"  name="destinationName" class="form-control" placeholder="名稱" value="${heartBeatDestinationVO.destinationName}"/>
				<input type="text"  name="amqpExchangeName" class="form-control" placeholder="ExchangeName" value="${heartBeatDestinationVO.amqpExchangeName}"/>
				<input type="text"  name="amqpRoutingKey" class="form-control" placeholder="RoutingKey" value="${heartBeatDestinationVO.amqpRoutingKey}"/>
			</div>
		</div>
		<div>
			<h3>JarManager檢查時間設定</h3>
			<div>
				<input type="text"  name="loadingTime" class="form-control" placeholder="啟動時間 單位:(毫秒)" value="${managerVO.loadingTime}"/>
				<input type="text"  name="reCheckTime" class="form-control" placeholder="重新檢查間隔 單位:(毫秒)" value="${managerVO.reCheckTime}"/>
			</div>
		</div>
		<div>
			<button type="button" class="btn btn-lg btn-primary"	id="editSetUp">更改</button>
			<!-- <button type="button" class="btn btn-lg btn-default"	>取消</button> -->
		</div>
		
	<hr>
	<footer>
		<p>JarManager 2017</p>
	</footer>
</div>

<script type="text/javascript">
	$(function() {
		
		
		$("#editSetUp").click(function() {
			var username=$("input[name='username']").val();
			var password=$("input[name='password']").val();
			var host=$("input[name='host']").val();
			var port=$("input[name='port']").val();
			
			var destinationName=$("input[name='destinationName']").val();
			var amqpExchangeName=$("input[name='amqpExchangeName']").val();
			var amqpRoutingKey=$("input[name='amqpRoutingKey']").val();

			var loadingTime=$("input[name='loadingTime']").val();
			var reCheckTime=$("input[name='reCheckTime']").val();

			
			var heartBeatConnectionFactoryVO={};
			heartBeatConnectionFactoryVO["username"] = username;
			heartBeatConnectionFactoryVO["password"] = password;
			heartBeatConnectionFactoryVO["host"] = host;
			heartBeatConnectionFactoryVO["port"] = port;
			
			var heartBeatDestinationVO={};
			heartBeatDestinationVO["destinationName"] = destinationName;
			heartBeatDestinationVO["amqpExchangeName"] = amqpExchangeName;
			heartBeatDestinationVO["amqpRoutingKey"] = amqpRoutingKey;
			
			var managerVO={};
			managerVO["loadingTime"] = loadingTime;
			managerVO["reCheckTime"] = reCheckTime;
			
			var data = {};
			data["heartBeatConnectionFactoryVO"] = heartBeatConnectionFactoryVO;
			data["heartBeatDestinationVO"] = heartBeatDestinationVO;
			data["managerVO"] = managerVO;
			
			if(!checkData()){
				return false;
			}
		
			console.log(JSON.stringify(data));
			$.ajax({
				type : "PUT",
				url : "/JarManager/JarManagerSetUp",
				contentType : "application/json",
				success : function(msg) {
					if (msg) {
						location.reload(true);
						alert("修改成功");
					} else {
						alert("error");
					}
				},

				data : JSON.stringify(data)
			});

		});
	
	});
	
	function checkData(){
		var username=$("input[name='username']").val();
		var password=$("input[name='password']").val();
		var host=$("input[name='host']").val();
		var port=$("input[name='port']").val();
		
		var destinationName=$("input[name='destinationName']").val();
		var amqpExchangeName=$("input[name='amqpExchangeName']").val();
		var amqpRoutingKey=$("input[name='amqpRoutingKey']").val();

		var loadingTime=$("input[name='loadingTime']").val();
		var reCheckTime=$("input[name='reCheckTime']").val();
		
		if(''==$.trim(username)){
			alert("請輸入帳號");
			return false;
		}
		
		if(''==$.trim(password)){
			alert("請輸入密碼");
			return false;
		}
		
		if(''==$.trim(host)){
			alert("請輸入主機");
			return false;
		}
		
		if(''==$.trim(port)){
			alert("請輸入埠號");
			return false;
		}
		
		if(''==$.trim(destinationName)){
			alert("請輸入名稱");
			return false;
		}
		

		if(''==$.trim(amqpExchangeName)){
			alert("請輸入amqpExchangeName");
			return false;
		}
		

		if(''==$.trim(amqpRoutingKey)){
			alert("請輸入amqpRoutingKey");
			return false;
		}
		

		if(''==$.trim(loadingTime)){
			alert("請輸入啟動時間");
			return false;
		}
		

		if(''==$.trim(reCheckTime)){
			alert("請輸入重新檢查間隔");
			return false;
		}
		
		if (isNaN(loadingTime)) {
			alert("啟動時間請輸入數字");
			return false;
		}
		
		if (isNaN(reCheckTime)) {
			alert("重新檢查間隔請輸入數字");
			return false;
		}
		
		if(reCheckTime<10000){
			alert("請輸入啟動時間需大於10000毫秒");
			return false;
		}
		
		if(reCheckTime<10000){
			alert("請輸入檢查間隔需大於30000毫秒");
			return false;
		}
		
		return true;
	}
</script>

</body>
</html>