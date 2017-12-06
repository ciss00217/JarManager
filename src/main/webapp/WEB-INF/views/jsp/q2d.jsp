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
<link rel="stylesheet"
	href="<c:url value="/resources/core/css/bootstrap-dialog.css" />">
<link rel="stylesheet"
	href="<c:url value="/resources/core/css/buttons.bootstrap.min.css" />">
<link rel="stylesheet"
	href="<c:url value="/resources/core/css/q2d.css" />">

</head>
<body class="has-drawer">
	<script src="<c:url value="/resources/core/js/jquery-3.2.1.min.js" />"></script>
	<script src="<c:url value="/resources/core/js/bootstrap.min.js" />"></script>
	<script
		src="<c:url value="/resources/core/js/jquery.dataTables.min.js" />"></script>
	<script
		src="<c:url value="/resources/core/js/dataTables.buttons.min.js" />"></script>
	<script
		src="<c:url value="/resources/core/js/buttons.bootstrap.min.js" />"></script>
	<script
		src="<c:url value="/resources/core/js/dataTables.bootstrap.min.js" />"></script>
	<script src="<c:url value="/resources/core/js/drawer.js" />"></script>
	<script src="<c:url value="/resources/core/js/buttons.html5.min.js" />"></script>

	<script src="<c:url value="/resources/core/js/q2d.js" />"></script>
	<script src="<c:url value="/resources/core/js/bootstrap-dialog.js" />"></script>

	<script>
		var dataTables_zh_tw = '<c:url value="/resources/core/fonts/dataTables_zh-tw.txt" />';
	</script>

	<div class="panel panel-default has-inner-drawer" style="height: 100%">

		<div id="drawer" class="drawer drawer-inside dw-xs-5 fold"
			aria-labelledby="drawer">
			<div class="drawer-controls">
				<a href="#drawer" data-toggle="drawer" href="#drawer"
					aria-foldedopen="false" aria-controls="drawer"
					class="btn btn-primary btn-sm">Menu</a>
			</div>
			<div class="drawer-contents">
				<div class="drawer-heading">
					<h2 class="drawer-title">Menu</h2>
				</div>
				<ul class="drawer-nav">
					<li role="presentation" class="active"><a href="home">Home</a></li>
					<li role="presentation"><a href="q2w">Q2W</a></li>
					<li role="presentation"><a href="q2d">Q2D</a></li>
					<li role="presentation"><a href="q2sftp">Q2SFTP</a></li>
					<li role="presentation"><a href="JarProjectVOs">JarManager</a></li>
				</ul>
			</div>
		</div>
		<div class="panel-body" style="padding-left: 10%">
			<div class="container">
				<div class="row">
					<div class="well well-lg">
						<ul class="nav nav-tabs">
							<li class="active sais-tab"><a data-toggle="tab" role="tab"
								data-target="#Q2DData">Q2D</a></li>
						</ul>
						<div class="tab-content">
							<div class="input-group">
								<div id="imaginary_container">
									<div class="input-group stylish-input-group">
										<span class="input-group-addon"><i
											class="glyphicon glyphicon-file"></i></span> <input type="text"
											class="form-control" placeholder="設定檔名稱" name="fileName">
										<span class="input-group-addon">
											<button type="button" name="btn-search">
												<span class="glyphicon glyphicon-search"></span>
											</button>
										</span> <span class="input-group-addon">
											<button type="button" name="btn-delete">
												<span class="glyphicon glyphicon-trash"></span>
											</button>
										</span>
									</div>
								</div>
							</div>
							<div id="Q2DData" class="tab-pane fade in active" role="tabpanel">

								<div class="well well-lg">
									<ul class="nav nav-tabs">
										<li class="active sais-tab"><a data-toggle="tab"
											role="tab" data-target="#heartBeatClientData">心跳協議</a></li>
										<li class="azed-tab"><a data-toggle="tab" role="tab"
											data-target="#databaseConnectionFactoryData">資料庫連線</a></li>
										<li class="azed-tab"><a data-toggle="tab" role="tab"
											data-target="#tableSettingData">表格設定</a></li>
										<li class="azed-tab"><a data-toggle="tab" role="tab"
											data-target="#queueConnectionFactoryData">佇列連線</a></li>
										<li class="azed-tab"><a data-toggle="tab" role="tab"
											data-target="#queueOriginData">來源佇列</a></li>
										<li class="azed-tab"><a data-toggle="tab" role="tab"
											data-target="#queueErrorData">錯誤佇列</a></li>
									</ul>

									<div class="tab-content">
										<div id="heartBeatClientData" class="tab-pane fade in active"
											role="tabpanel">
											<form>
												<div class="input-group hidden">
													<span class="input-group-addon"><i
														class="glyphicon glyphicon-list-alt"></i></span> <input
														type="text" class="form-control" name="beatID"
														placeholder="編號">
												</div>
												<div class="input-group hidden">
													<span class="input-group-addon"><i
														class="glyphicon glyphicon-user"></i></span> <input type="text"
														class="form-control" name="fileName" placeholder="名稱">
												</div>
												<div class="input-group">
													<span class="input-group-addon"><i
														class="glyphicon glyphicon-list-alt"></i></span> <input
														type="text" class="form-control" name="jarFilePath"
														placeholder="jar檔位置">
												</div>
												<div class="input-group">
													<span class="input-group-addon"><i
														class="glyphicon glyphicon-time"></i></span> <input type="text"
														class="form-control" name="timeSeries" placeholder="時間區隔">
												</div>
											</form>
										</div>
										<div id="databaseConnectionFactoryData"
											class="tab-pane fade in" role="tabpanel">
											<div class="input-group">
												<span class="input-group-addon"><i
													class="glyphicon glyphicon-user"></i></span> <input type="text"
													class="form-control" name="dbUserName" placeholder="帳號">
											</div>
											<div class="input-group">
												<span class="input-group-addon"><i
													class="glyphicon glyphicon-lock"></i></span> <input
													type="password" class="form-control" name="dbPassword"
													placeholder="密碼">
											</div>
											<div class="input-group">
												<span class="input-group-addon"><i
													class="glyphicon glyphicon-cloud"></i></span> <input type="text"
													class="form-control" name="dbURL" placeholder="主機">
											</div>
											<div class="input-group">
												<span class="input-group-addon"><i
													class="glyphicon glyphicon-link"></i></span> <input type="text"
													class="form-control" name="jdbcDriver" placeholder="驅動">
											</div>
										</div>
										<div id="tableSettingData" class="tab-pane fade in"
											role="tabpanel">

											<div class="well well-lg">
												<ul class="nav nav-tabs">
													<li class="active sais-tab"><a data-toggle="tab"
														role="tab" data-target="#databaseInsertData">新增</a></li>
													<li class="azed-tab"><a data-toggle="tab" role="tab"
														data-target="#databaseUpdateData">修改</a></li>
													<li class="azed-tab"><a data-toggle="tab" role="tab"
														data-target="#databaseDeleteData">刪除</a></li>
												</ul>

												<div class="tab-content">
													<div id="databaseInsertData"
														class="tab-pane fade in active" role="tabpanel">
														<table id="insertTable" class="table dt-responsive ">
														</table>
													</div>
													<div id="databaseUpdateData" class="tab-pane fade in"
														role="tabpanel">
														<div class="well well-lg">
															<ul class="nav nav-tabs">
																<li class="active sais-tab"><a data-toggle="tab"
																	role="tab" data-target="#databaseUpdateRelationData">規則</a></li>
																<li class="azed-tab"><a data-toggle="tab"
																	role="tab" data-target="#databaseUpdateDetailData">內容</a></li>
															</ul>

															<div class="tab-content">
																<div id="databaseUpdateRelationData"
																	class="tab-pane fade in active" role="tabpanel">
																	<table id="updateRelationTable"
																		class="table dt-responsive ">
																	</table>
																</div>
																<div id="databaseUpdateDetailData"
																	class="tab-pane fade in" role="tabpanel">
																	<table id="updateTable" class="table dt-responsive ">
																	</table>
																</div>
															</div>
														</div>
													</div>
													<div id="databaseDeleteData" class="tab-pane fade in"
														role="tabpanel">
														<table id="deleteTable" class="table dt-responsive ">
														</table>
													</div>
												</div>
											</div>
										</div>
										<div id="queueConnectionFactoryData" class="tab-pane fade in"
											role="tabpanel">
											<div class="input-group">
												<span class="input-group-addon"><i
													class="glyphicon glyphicon-user"></i></span> <input type="text"
													class="form-control" name="username" placeholder="帳號">
											</div>
											<div class="input-group">
												<span class="input-group-addon"><i
													class="glyphicon glyphicon-lock"></i></span> <input
													type="password" class="form-control" name="password"
													placeholder="密碼">
											</div>
											<div class="input-group">
												<span class="input-group-addon"><i
													class="glyphicon glyphicon-cloud"></i></span> <input type="text"
													class="form-control" name="host" placeholder="主機">
											</div>
											<div class="input-group">
												<span class="input-group-addon"><i
													class="glyphicon glyphicon-cloud"></i></span> <input type="text"
													class="form-control" name="virtualHost" placeholder="虛擬主機">
											</div>
											<div class="input-group">
												<span class="input-group-addon"><i
													class="glyphicon glyphicon-link"></i></span> <input type="text"
													class="form-control" name="port" placeholder="埠號">
											</div>
										</div>
										<div id="queueOriginData" class="tab-pane fade in"
											role="tabpanel">
											<div class="input-group">
												<span class="input-group-addon"><i
													class="glyphicon glyphicon-user"></i></span> <input type="text"
													class="form-control" name="queueName" placeholder="名稱">
											</div>
											<div class="input-group">
												<span class="input-group-addon"><i
													class="glyphicon glyphicon-random"></i></span> <input type="text"
													class="form-control" name="exchangeName"
													placeholder="exchange name">
											</div>
											<div class="input-group">
												<span class="input-group-addon"><i
													class="glyphicon glyphicon-link"></i></span> <input
													type="password" class="form-control" name="routingKey"
													placeholder="routing key">
											</div>
										</div>
										<div id="queueErrorData" class="tab-pane fade in"
											role="tabpanel">
											<div class="input-group">
												<span class="input-group-addon"><i
													class="glyphicon glyphicon-user"></i></span> <input type="text"
													class="form-control" name="queueName" placeholder="佇列名稱">
											</div>
											<div class="input-group">
												<span class="input-group-addon"><i
													class="glyphicon glyphicon-random"></i></span> <input type="text"
													class="form-control" name="exchangeName"
													placeholder="exchange name">
											</div>
											<div class="input-group">
												<span class="input-group-addon"><i
													class="glyphicon glyphicon-link"></i></span> <input
													type="password" class="form-control" name="routingKey"
													placeholder="routing key">
											</div>
										</div>
									</div>
								</div>
								<button type="button" class="btn btn-primary" name="btn-save">創建設定檔</button>
								<button type="button" class="btn btn-primary hidden"
									name="btn-update">修改設定檔</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<button type="button" class="btn btn-primary" name="btn-import-data">開發資料</button>
		</div>
	</div>

</body>
</html>