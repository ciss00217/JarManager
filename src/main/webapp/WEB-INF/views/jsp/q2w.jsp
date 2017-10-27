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
	<script>
		var dataTables_zh_tw = '<c:url value="/resources/core/fonts/dataTables_zh-tw.txt" />';
	</script>
	<script src="<c:url value="/resources/core/js/q2w.js" />"></script>

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
					<li role="presentation"><a href="q2w.jsp">Q2W</a></li>
					<li role="presentation"><a href="q2d.jsp">Q2D</a></li>
					<li role="presentation"><a href="XmlConverter.jsp">XmlConverter</a></li>
				</ul>
			</div>
		</div>
		<div class="panel-body" style="padding-left: 10%">
			<div class="container">
				<div class="row">
						<div class="well well-lg">
							<ul class="nav nav-tabs">
								<li class="active sais-tab"><a data-toggle="tab" role="tab"
									data-target="#Q2WData">Q2W</a></li>
								<li class="azed-tab"><a data-toggle="tab" role="tab"
									data-target="#xmlConverterData">XmlConverter</a></li>
							</ul>

							<div class="tab-content">
								<div id="Q2WData" class="tab-pane fade in active"
									role="tabpanel">

									<div class="well well-lg">
										<ul class="nav nav-tabs">
											<li class="active sais-tab"><a data-toggle="tab"
												role="tab" data-target="#heartBeatClientData">心跳協議</a></li>
											<li class="azed-tab"><a data-toggle="tab" role="tab"
												data-target="#connectionFactoryData">資料庫連線</a></li>
											<li class="azed-tab"><a data-toggle="tab" role="tab"
												data-target="#queueOriginData">來源佇列</a></li>
											<li class="azed-tab"><a data-toggle="tab" role="tab"
												data-target="#queueDestinationData">目的佇列</a></li>
											<li class="azed-tab"><a data-toggle="tab" role="tab"
												data-target="#webServiceData">Web Service</a></li>
										</ul>

										<div class="tab-content">
											<div id="heartBeatClientData" class="tab-pane fade in active"
												role="tabpanel">
												<form>
													<div class="input-group">
														<span class="input-group-addon"><i
															class="glyphicon glyphicon-list-alt"></i></span> <input type="text" class="form-control"
															name="beatID" placeholder="編號" value="Q2W">
													</div>
													<div class="input-group">
														<span class="input-group-addon"><i
															class="glyphicon glyphicon-user"></i></span> <input type="text" class="form-control"
															name="fileName" placeholder="名稱" value="Q2W">
													</div>
													<div class="input-group">
														<span class="input-group-addon"><i
															class="glyphicon glyphicon-time"></i></span> <input type="text" class="form-control"
															name="timeSeries" placeholder="時間區隔" value="60000">
													</div>
												</form>
											</div>
											<div id="connectionFactoryData" class="tab-pane fade in"
												role="tabpanel">
												<form>
													<div class="input-group">
														<span class="input-group-addon"><i
															class="glyphicon glyphicon-user"></i></span> <input type="text" class="form-control"
															name="username" placeholder="帳號" value="admin">
													</div>
													<div class="input-group">
														<span class="input-group-addon"><i
															class="glyphicon glyphicon-lock"></i></span> <input type="password" class="form-control"
															name="password" placeholder="密碼" value="password">
													</div>
													<div class="input-group">
														<span class="input-group-addon"><i
															class="glyphicon glyphicon-cloud"></i></span> <input type="text" class="form-control" name="host"
															placeholder="主機" value="192.168.112.199">
													</div>
													<div class="input-group">
														<span class="input-group-addon"><i
															class="glyphicon glyphicon-link"></i></span> <input type="text" class="form-control" name="port"
															placeholder="埠號" value="5672">
													</div>
												</form>
											</div>
											<div id="queueOriginData" class="tab-pane fade in"
												role="tabpanel">
												<form>
													<div class="input-group">
														<span class="input-group-addon"><i
															class="glyphicon glyphicon-user"></i></span> <input type="text" class="form-control"
															name="queueName" placeholder="名稱" value="exchange">
													</div>
													<div class="input-group">
														<span class="input-group-addon"><i
															class="glyphicon glyphicon-random"></i></span> <input type="text" class="form-control"
															name="exchangeName" placeholder="exchange name" value="ian">
													</div>
													<div class="input-group">
														<span class="input-group-addon"><i
															class="glyphicon glyphicon-link"></i></span> <input type="password" class="form-control"
															name="routingKey" placeholder="routing key" value="ian">
													</div>
												</form>
											</div>
											<div id="queueDestinationData" class="tab-pane fade in"
												role="tabpanel">
												<form>
													<div class="input-group">
														<span class="input-group-addon"><i
															class="glyphicon glyphicon-user"></i></span> <input type="text" class="form-control"
															name="queueName" placeholder="名稱" value="exchange">
													</div>
													<div class="input-group">
														<span class="input-group-addon"><i
															class="glyphicon glyphicon-random"></i></span> <input type="text" class="form-control"
															name="exchangeName" placeholder="exchange name" value="ian2">
													</div>
													<div class="input-group">
														<span class="input-group-addon"><i
															class="glyphicon glyphicon-link"></i></span> <input type="password" class="form-control"
															name="routingKey" placeholder="routing key" value="ian2">
													</div>
												</form>
											</div>
											<div id="webServiceData" class="tab-pane fade in"
												role="tabpanel">
												<form>
													<div class="input-group">
														<span class="input-group-addon"><i
															class="glyphicon glyphicon-cloud"></i></span> <input type="text" class="form-control" name="url"
															placeholder="網址" value="http://192.168.112.164:8088/sfdelivery/">
													</div>
													<div class="input-group">
														<span class="input-group-addon"><i
															class="glyphicon glyphicon-picture"></i></span> <input type="text" class="form-control" name="type"
															placeholder="類型" value="get">
													</div>
													<div class="input-group">
														<span class="input-group-addon"><i
															class="glyphicon glyphicon-text-height"></i></span> <input type="password" class="form-control"
															name="format" placeholder="格式" value="xml">
													</div>
												</form>
											</div>
											<button type="button" class="btn btn-primary" id ="btn-save">確認送出</button>
										</div>
									</div>
								</div>
								<div id="xmlConverterData" class="tab-pane fade in"
									role="tabpanel">
									<table id="xmlConverterTable" class="table dt-responsive"
										cellspacing="0" width="100%">
										
									</table>
								</div>
							</div>
						</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>