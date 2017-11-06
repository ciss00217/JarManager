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
	margin: 10px;
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

</style>


</head>

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
<h2>管理程序</h2>
<div class="container">
	<div class="container" id="jar_table">
		<p>目前所管理的程序:</p>
		<div>
			<button type="button" class="btn btn-xs btn-success" data-toggle="modal" data-target="#dialogModal" id="insertJarOpen"  data-backdrop="static" data-keyboard="false">
				<i class="fa fa-check"></i> 新增
			</button>
		</div>
		<table class="table table-striped">
			<thead>
				<tr>
					<th>檔案編號</th>
					<th>檔案名稱</th>
					<th>狀態</th>
					<th>間隔發送</th>
					<th>說明</th>
					<th>控制</th>
				</tr>
			</thead>

			<tbody>
				<c:forEach var="listValue" items="${jarProjectVOList}">
				
					<tr>
						<td class="listValueBeatID">${listValue.beatID}</td>
						<td>${listValue.fileName}
						
						</td>
						
						<td>
						${listValue.notFindCount}
						<c:choose>
								<c:when test="${(listValue.needRun=='false') || (jarManagerIsRun=='false')}"> 
									<span >關閉中</span>
								</c:when>
								<c:when test="${listValue.firstSuccessRun=='false' }"> 
									<span class="chocolate">啟動中</span>
								</c:when>
								<c:when test="${listValue.notFindCount eq 0}">
									<span class="blue">執行中</span>
								</c:when>
								<c:when test="${listValue.notFindCount eq 1}">
									<span class="blue">執行中</span>
								</c:when>
								<c:when test="${listValue.notFindCount eq 2}">
									<span class="blue">執行中</span>
								</c:when>
								<c:when test="${listValue.notFindCount eq 3}">
									<span class="blue">執行中</span>
								</c:when>
								<c:when test="${listValue.notFindCount eq 4}">
									<span class="red">異常</span>
								</c:when>
						
								<c:otherwise>
									<span class="red">準備重啟</span>
								</c:otherwise>
							</c:choose></td>
						<td>${(listValue.timeSeries)/1000}秒</td>
						<td>${listValue.description}</td>
						<td>
							<button type="button" class="btn btn-xs btn-info edit" value="${listValue.beatID}">
								<i class="fa fa-pencil"></i>
							</button>

							<button type="button" class="btn btn-xs btn-danger deleteJar" value="${listValue.beatID}">
								<i class="fa fa-trash-o"></i>
							</button>
						</td>
				</c:forEach>
		</table>
	</div>
	<hr>
	<footer>
		<p>JarManager 2017</p>
	</footer>
</div>



<div id="dialog-confirm" title="刪除資料" style="display: none;">
	<p>是否確認刪除該筆資料</p>
</div>

<div id="message" align="center">
	<div id="text"></div>
</div>

<!-- Modal -->
<div class="modal fade" id="dialogModal" role="dialog">
	<div class="modal-dialog">

		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				 <button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">管理程序</h4>
			</div>
			<div class="modal-body">
				<form data-toggle="validator" role="form">
					<div>
						<span>檔案編號：</span> <span><input type="text" id="dialog_beatID" name="dialog_beatID" class="form-control"  /></span>
					</div>
					<div>
						<span>檔案名稱：</span> <span><input type="text" id="dialog_fileName" name="dialog_fileName" class="form-control"  /></span>
					</div>
					<div>
						<span>檔案路徑：</span> <span><input type="text" id="dialog_jarFilePath" name="dialog_jarFilePath" class="form-control"  /></span>
					</div>
					<div>
						<span>檔案說明：</span> <span><input type="text" id="dialog_description" name="dialog_description" class="form-control"  /></span>
					</div>
					<div>
						<span>間隔發送(單位:秒)：</span> <span><input type="text" id="dialog_timeSeries" name="dialog_timeSeries" class="form-control"  /></span>
					</div>
					<div>

						<span>檔案xml路徑：</span>
						<button type="button" class="btn btn-xs" id="add_xml">
							<i class="fa fa-check"></i> 新增
						</button>
						<span> <!--  <input type="text" id="dialog_filePathXMLList" name="dialog_filePathXML" class="form-control" /></span>--> <span id="xml"></span>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" id="send_jar">確定</button>
				<button type="button" class="btn btn-default btn_close" data-dismiss="modal">取消</button>
			</div>
		</div>

	</div>
</div>



<script type="text/javascript">
	$(function() {
		
		
		
		$("#insertJarOpen").click(function() {
			$("#send_jar").val("insert");

			$("input[name='dialog_beatID']").removeAttr("disabled")

		});


		console.log($("#insertJarOpen"));
		
		$("#dialogModal .btn_close").click(function() {
			initDialog();
		});

		$('#dialogModal').on('hidden.bs.modal', function() {
			initDialog();
		});

		$("#add_xml")
				.click(
						function() {

							$("#xml")
									.append(
											'<input type="text"  name="dialog_filePathXML" class="form-control" />');
						});
		
		$("#send_jar").click(function() {

			var isCheck = checkData();
			console.log('isCheck'+isCheck);
			if (isCheck) {
				var action = $("#send_jar").val();
				if (action == "insert") {
					insertJar();
					$('#dialogModal').modal('hide');
				} else if (action == "update") {
					updateJar();
					$('#dialogModal').modal('hide');
				}
			}
		});

		$(".deleteJar").click(function() {
			deleteJar($(this).val());
		});

		$(".edit")
				.bind(
						"click",
						function(e) {
							$("#send_jar").val("update");
							$("input[name='dialog_beatID']").attr("disabled","true")

							var row = $(this).closest("tr");
							var id = row.children(".listValueBeatID").text();
							editBefId=id;
							getProByID(
									id,
									function(jarVO) {
										if (jarVO != null) {

											var dialog_fileName = $(
													"input[name='dialog_fileName']")
													.val(jarVO.fileName);
											var dialog_beatID = $(
													"input[name='dialog_beatID']")
													.val(jarVO.beatID);
											var dialog_jarFilePath = $(
													"input[name='dialog_jarFilePath']")
													.val(jarVO.jarFilePath);
											var dialog_description = $(
													"input[name='dialog_description']")
													.val(jarVO.description);
											var dialog_timeSeries = $(
													"input[name='dialog_timeSeries']")
													.val(
															(jarVO.timeSeries) / 1000);

											if (jarVO.filePathXMLList != null) {

												for (var i = 0; i < jarVO.filePathXMLList.length; i++) {
													$("#xml")
															.append(
																	'<input type="text"  name="dialog_filePathXML" class="form-control" value="' + jarVO.filePathXMLList[i] + '" />');
												}
											}
											$('#dialogModal').modal({backdrop: 'static', keyboard: false})  
											$('#dialogModal').modal('show');
										} else {
											alert("error");
										}
									});

						});

	});

	function checkData() {
		var dialog_fileName = $.trim($("input[name='dialog_fileName']").val());
		var dialog_beatID = $.trim($("input[name='dialog_beatID']").val());
		var dialog_jarFilePath = $.trim($("input[name='dialog_jarFilePath']")
				.val());
		var dialog_description = $.trim($("input[name='dialog_description']")
				.val());
		var dialog_timeSeries = $.trim($("input[name='dialog_timeSeries']")
				.val());

		if (dialog_fileName == "") {
			alert("請輸入檔案名稱");
			return false;
		}
		if (dialog_beatID == "") {
			alert("請輸入檔案編號");
			return false;
		}
		if (dialog_jarFilePath == "") {
			alert("請輸入檔案路徑");
			return false;
		}
		if (dialog_fileName == "") {
			alert("請輸入檔案名稱");
			return false;
		}

		if (dialog_timeSeries == "") {
			alert("請輸入發送間隔");
			return false;
		}

		if (isNaN(dialog_timeSeries)) {
			alert("發送間隔請輸入數字");
			return false;
		}

		if (dialog_timeSeries < 30) {
			alert("發送間隔必須大於30秒");
			return false;
		}

		var action = $("#send_jar").val();
		console.log(action);
		console.log(action == "insert");
		var isSuccess=true;
		if (action == "insert") {

		getProByID(dialog_beatID, function(jarVO) {

				if (jarVO != null && jarVO != "") {
					alert("此編號已被使用");
					isSuccess=false;
				}else{
					isSuccess=true;
				}
			});

		}
		console.log(isSuccess);
		return isSuccess;
	}

	function initDialog() {
		var all_Inputs = $("#dialogModal input[type=text]");
		all_Inputs.val("");
		$("#xml").empty();
	}

	function getProByID(Id, callback) {
		$.ajax({
			type : "GET",
			url : "/JarManager/JarProjectVO/" + Id,
			success : callback
		});

	}

	function insertJar() {
		var dialog_fileName = $.trim($("input[name='dialog_fileName']").val());
		var dialog_beatID = $.trim($("input[name='dialog_beatID']").val());
		var dialog_jarFilePath = $.trim($("input[name='dialog_jarFilePath']")
				.val());
		var dialog_description = $.trim($("input[name='dialog_description']")
				.val());
		var dialog_timeSeries = $.trim($("input[name='dialog_timeSeries']")
				.val());
		var dialog_filePathXMLList = new Array();

		$("input[name='dialog_filePathXML']").each(function() {
			var xmlPath = $.trim($(this).val());
			if (xmlPath != "") {
				dialog_filePathXMLList.push(xmlPath);
			}
		});

		var data = {}
		data["fileName"] = dialog_fileName;
		data["beatID"] = dialog_beatID;
		data["jarFilePath"] = dialog_jarFilePath;
		data["description"] = dialog_description;
		data["filePathXMLList"] = dialog_filePathXMLList;
		data["timeSeries"] = dialog_timeSeries * 1000;
		console.log(JSON.stringify(data));
		$.ajax({
			type : "POST",
			url : "/JarManager/JarProjectVO",
			contentType : "application/json",
			success : function(msg) {
				if (msg) {
					location.reload(true);
				} else {
					alert("error");
				}
			},

			data : JSON.stringify(data)
		});
	}

	function updateJar() {
		var dialog_fileName = $.trim($("input[name='dialog_fileName']").val());
		var dialog_beatID = $.trim($("input[name='dialog_beatID']").val());
		var dialog_jarFilePath = $.trim($("input[name='dialog_jarFilePath']")
				.val());
		var dialog_description = $.trim($("input[name='dialog_description']")
				.val());
		var dialog_timeSeries = $.trim($("input[name='dialog_timeSeries']")
				.val());
		var dialog_filePathXMLList = new Array();

		$("input[name='dialog_filePathXML']").each(function() {
			var xmlPath = $.trim($(this).val());
			if (xmlPath != "") {
				dialog_filePathXMLList.push(xmlPath);
			}
		});

		var data = {}
		data["fileName"] = dialog_fileName;
		data["beatID"] = dialog_beatID;
		data["jarFilePath"] = dialog_jarFilePath;
		data["description"] = dialog_description;
		data["filePathXMLList"] = dialog_filePathXMLList;
		data["timeSeries"] = dialog_timeSeries * 1000;
		console.log(JSON.stringify(data));
		$.ajax({
			type : "PUT",
			url : "/JarManager/JarProjectVO",
			contentType : "application/json",
			success : function(msg) {
				if (msg) {
					location.reload(true);
				} else {
					alert("error");
				}
			},

			data : JSON.stringify(data)
		});
	}

	function deleteJar(deleteId) {

		$.ajax({
			type : "DELETE",
			url : "/JarManager/JarProjectVO/" + deleteId,
			success : function(msg) {
				if (msg) {
					location.reload(true);
				} else {
					alert("error");
				}
			},

		});
	}
</script>


</body>
</html>