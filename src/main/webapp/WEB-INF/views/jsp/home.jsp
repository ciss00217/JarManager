<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE>
<html>
<head>

<link rel="stylesheet"
	href="<c:url value="/resources/core/css/bootstrap.min.css" />">
<link rel="stylesheet"
	href="<c:url value="/resources/core/css/bootstrap-drawer.css" />">
<link rel="stylesheet"
	href="<c:url value="/resources/core/css/dataTables.bootstrap.min.css" />">

</head>
<body class="has-drawer">
	<script src="<c:url value="/resources/core/js/jquery-3.2.1.min.js" />"></script>
	<script src="<c:url value="/resources/core/js/bootstrap.min.js" />"></script>
	<script src="<c:url value="/resources/core/js/drawer.js" />"></script>
	<script src="<c:url value="/resources/core/js/jquery.dataTables.min.js" />"></script>
	<script src="<c:url value="/resources/core/js/dataTables.bootstrap.min.js" />"></script>

	<div class="panel panel-default has-inner-drawer" style="height: 100%">
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
					<li role="presentation" class="active"><a href="home">Home</a></li>
					<li role="presentation"><a href="q2w">Q2W</a></li>
					<li role="presentation"><a href="q2d">Q2D</a></li>
					<li role="presentation"><a href="ftp2q">FTP2Q</a></li>
					<li role="presentation"><a href="q2sftp">Q2SFTP</a></li>
					<li role="presentation"><a href="JarProjectVOs">JarManager</a></li>
				</ul>
			</div>
		</div>
		<div class="panel-body" style="padding-left: 10%"></div>
	</div>
</body>
</html>