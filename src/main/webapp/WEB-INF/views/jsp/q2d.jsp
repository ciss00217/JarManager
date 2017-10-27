<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
<head>
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="css/bootstrap-drawer.css">
</head>
<body class="has-drawer">
	<!-- add this class to your body for proper sizing -->
	<script src="js/jquery-3.2.1.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/drawer.js"></script>
	
	<div class="panel panel-default has-inner-drawer" style="height:100%">
		<div id="drawerExample2" class="drawer drawer-inside dw-xs-5 fold"
			aria-labelledby="drawerExample2">
			<div class="drawer-controls">
				<a href="#drawerExample2" data-toggle="drawer"
					href="#drawerExample2" aria-foldedopen="false"
					aria-controls="drawerExample2" class="btn btn-primary btn-sm">Menu</a>
			</div>
			<div class="drawer-contents">
				<div class="drawer-heading">
					<h2 class="drawer-title">Menu</h2>
				</div>
				<ul class="drawer-nav">
					<li role="presentation" class="active"><a href="Home.jsp">Home</a></li>
					<li role="presentation"><a href="Q2W.jsp">Q2W</a></li>
					<li role="presentation"><a href="Q2D.jsp">Q2D</a></li>
					<li role="presentation"><a href="XmlConverter.jsp">XmlConverter</a></li>
				</ul>
			</div>
		</div>
		<div class="panel-body" style="padding-left: 10%">
			<p>Q2D</p>
		</div>
	</div>
</body>
</html>