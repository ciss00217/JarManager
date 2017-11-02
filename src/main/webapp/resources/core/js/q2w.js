$(document).ready(function() {
    BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_DEFAULT] = 'Information';
    BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_INFO] = 'Information';
    BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_PRIMARY] = 'Information';
    BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_SUCCESS] = 'Success';
    BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_WARNING] = 'Warning';
    BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_DANGER] = 'Danger';
    BootstrapDialog.DEFAULT_TEXTS['OK'] = 'OK';
    BootstrapDialog.DEFAULT_TEXTS['CANCEL'] = 'Cancel';
    BootstrapDialog.DEFAULT_TEXTS['CONFIRM'] = 'Confirmation';

    var $heartBeatClient = $('#heartBeatClientData');
    var $connectionFactory = $('#connectionFactoryData');
    var $queueOrigin = $('#queueOriginData');
    var $queueDestination = $('#queueDestinationData');
    var $webService = $('#webServiceData');
    var $Q2W = $('#Q2WData');

    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        $.fn.dataTable.tables({
            visible: true,
            api: true
        }).columns.adjust();
    });
    $('#imaginary_container button[name=btn-search]').click(function(event) {

        var fileName = $('#imaginary_container input[name=fileName]').val();
        
        $.ajax({
            type: "GET",
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            url: "./q2w/search/" + fileName,
            success: function(data) {
                console.log(data);
                console.log(data == null);
                console.log(jQuery.isEmptyObject(data));

                BootstrapDialog.show({
                    title: '查詢結果',
                    message: function(dialog) {

                        var $content;
                        $content = jQuery.isEmptyObject(data) ? $('<div/>').append($("<p />", {
                                text: "查無資料"
                            }))

                            :
                            $('<div/>').append(
                                $('<p/>', {
                                    'text': '已查詢到設定檔，是否匯入資料'
                                })
                            );
                        return $content;
                    },
                    buttons:

                        jQuery.isEmptyObject(data) ? [{
                            label: '取消',
                            action: function(dialog) {
                                dialog.close();
                            }
                        }] : [{
                            label: '確認',
                            id: 'search-dialog-confirm-btn',
                            action: function(dialog) {
                                $heartBeatClient.find('input[name=fileName]').val(fileName);
                                var $button = this;
                                $button.disable();
                                $button.spin();
                                dialog.setClosable(false);
                                dialog.setMessage('進行中');

                                var heartBeatClient = data.config.heartBeatClient;
                                var connectionFactory = data.config.connectionFactory;
                                var queueOrigin = data.config.queueOrigin;
                                var queueDestination = data.config.queueDestination;
                                var webService = data.config.webService;
                                var xmlConverter = data.xmlConverter;

                                $heartBeatClient.find('input[name=beatID]').val(heartBeatClient.beatID);
                                $heartBeatClient.find('input[name=fileName]').val(heartBeatClient.fileName);
                                $heartBeatClient.find('input[name=timeSeries]').val(heartBeatClient.timeSeries);
                                $heartBeatClient.find('input[name=jarFilePath]').val(heartBeatClient.jarFilePath);

                                $connectionFactory.find('input[name=username]').val(connectionFactory.username);
                                $connectionFactory.find('input[name=password]').val(connectionFactory.password);
                                $connectionFactory.find('input[name=host]').val(connectionFactory.host);
                                $connectionFactory.find('input[name=port]').val(connectionFactory.port);

                                $queueOrigin.find('input[name=queueName]').val(queueOrigin.queueName);
                                $queueOrigin.find('input[name=exchangeName]').val(queueOrigin.exchangeName);
                                $queueOrigin.find('input[name=routingKey]').val(queueOrigin.routingKey);

                                $queueDestination.find('input[name=queueName]').val(queueDestination.queueName);
                                $queueDestination.find('input[name=exchangeName]').val(queueDestination.exchangeName);
                                $queueDestination.find('input[name=routingKey]').val(queueDestination.routingKey);

                                $webService.find('input[name=url]').val(webService.url);
                                $webService.find('input[name=type]').val(webService.type);
                                $webService.find('input[name=format]').val(webService.format);

                                $xmlConverterTable.clear().draw();
                                $.each(data.xmlConverter, function(index, item) {
                                    $xmlConverterTable.rows.add([item]).draw();
                                });
                                var $table = $("#xmlConverterTable");
                                var $chkbox_all = $('input[type="checkbox"]', $table);
                                var $chkbox_checked = $('input[type="checkbox"]:checked', $table);

                                if ($chkbox_checked.length === 0) {
                                    console.log('$chkbox_checked.length: ' + $chkbox_checked.length);
                                    $chkbox_all.each(function() {
                                        $(this).prop("checked", true);
                                        $(this).addClass("toggleon");
                                    });
                                }

                                $("button[name=btn-update]").removeClass("hidden");
//                                $("button[name=btn-save]").text('修改設定檔')
                                
                                $button.enable();
                                $button.stopSpin();
                                dialog.setClosable(true);
                                dialog.setMessage('匯入作業完成');
                                
                                $('#search-dialog-confirm-btn').click(function(event) {
                                    dialog.close();
                                });
                                $('#search-dialog-cancel-btn').remove();
                            }
                        }, {
                            label: '取消',
                            id: 'search-dialog-cancel-btn',
                            action: function(dialog) {
                                dialog.close();
                            }
                        }]

                });
            },
            error: function(e) {
                $button.enable();
                $button.stopSpin();
                dialog.setClosable(true);
                dialog.setMessage('失敗');
            }
        });
    });
    $("button[name=btn-import-data]").click(function(event) {

        $heartBeatClient.find('input[name=beatID]').val('test');
        $heartBeatClient.find('input[name=fileName]').val('test');
        $heartBeatClient.find('input[name=timeSeries]').val('60000');
        $heartBeatClient.find('input[name=jarFilePath]').val('D:\jarFilePath\Q2W.jar');

        $connectionFactory.find('input[name=username]').val('admin');
        $connectionFactory.find('input[name=password]').val('password');
        $connectionFactory.find('input[name=host]').val('192.168.112.199');
        $connectionFactory.find('input[name=port]').val('5672');

        $queueOrigin.find('input[name=queueName]').val('exchange');
        $queueOrigin.find('input[name=exchangeName]').val('ian');
        $queueOrigin.find('input[name=routingKey]').val('ian');

        $queueDestination.find('input[name=queueName]').val('exchange');
        $queueDestination.find('input[name=exchangeName]').val('ian2');
        $queueDestination.find('input[name=routingKey]').val('ian2');

        $webService.find('input[name=url]').val('http://192.168.112.164:8088/sfdelivery/');
        $webService.find('input[name=type]').val('get');
        $webService.find('input[name=format]').val('xml');
        
        $xmlConverterTable.clear().draw();
        
        $xmlConverterTable.rows.add([{
            "source": 'ProductId',
            "destination": 'c_product_id',
            "isAttribute": 'false',
            "description": '自訂商品名稱'
        }, {
            "source": 'ProductName',
            "destination": 'product_name',
            "isAttribute": 'false',
            "description": '無'
        }, {
            "source": 'CostPrice',
            "destination": 'cost',
            "isAttribute": 'false',
            "description": '無'
        }]).draw();

        $('input[name=checkbox-group-select]', $xmlConverterTable.table().node())[0].checked = true;
        $('input[name=checkbox-group-select]', $xmlConverterTable.table().node())[2].checked = true;
    });

    function buildInput($span_text, $input_placeholder, $input_name) {

        var $div =
            $('<div/>', {
                'class': 'input-group'
            }).append($('<span/>', {
                'class': 'input-group-addon',
                'text': $span_text
            }), $('<input/>', {
                'class': 'form-control',
                'type': 'text',
                'placeholder': $input_placeholder,
                'name': $input_name
            }));

        return $div;
    }

    $("#xmlConverterData button[name=btn-create]").click(function(event) {
        BootstrapDialog.show({
            title: '新增',
            message: function(dialog) {

                var $content =
                    $('<div/>', {
                        'id': 'xmlConverterDataDialog'
                    }).append(
                        buildInput('來源', '來源欄位', 'source'),
                        buildInput('目標', '目標欄位', 'destination'),
                        buildInput('屬性', '是否為屬性', 'isAttribute'),
                        buildInput('描述', '描述', 'description')
                    );

                return $content;
            },
            buttons: [{
                label: '確認',
                action: function(dialog) {

                    var $dialog = $('#xmlConverterDataDialog');
                    var $source = $('#xmlConverterDataDialog').find('input[name=source]');
                    var $destination = $('#xmlConverterDataDialog').find('input[name=destination]');
                    var $isAttribute = $('#xmlConverterDataDialog').find('input[name=isAttribute]');
                    var $description = $('#xmlConverterDataDialog').find('input[name=description]');

                    $xmlConverterTable.row.add({
                        "source": $source.val(),
                        "destination": $destination.val(),
                        "isAttribute": $isAttribute.val(),
                        "description": $description.val()
                    }).draw();

                    dialog.close();
                }
            }, {
                label: '取消',
                action: function(dialog) {
                    dialog.close();
                }
            }]
        });
    });

    $xmlConverterTable = $("#xmlConverterTable").DataTable({
        dom: "Blr<t>ip",
        scrollY: "50th",
        lengthChange: false,
        scrollCollapse: true,
        pageLength: 5,
        destroy: true,
        language: {
            "url": dataTables_zh_tw,
            "emptyTable": "目前並無資料",
        },
        initComplete: function(settings, json) {
            $('div .dt-buttons').css({
                'float': 'right'
                //                'margin-left': '10px'
            });
            //            $('div .dt-buttons a').css('margin-left', '10px');
        },
        //		ajax : {
        //			url : "stockMod.do",
        //			dataSrc : "",
        //			type : "POST",
        //			data : parameter
        //		},
        columns: [{
                "title": "勾選",
                "data": null,
                "defaultContent": ""
            },

            {
                "title": "來源欄位",
                "data": "source",
                "defaultContent": ""
            }, {
                "title": "目標欄位",
                "data": "destination",
                "defaultContent": ""
            }, {
                "title": "是否為屬性",
                "data": "isAttribute",
                "defaultContent": ""
            }, {
                "title": "描述",
                "data": "description",
                "defaultContent": ""
            }, {
                "title": "功能",
                "data": null,
                "defaultContent": ""
            }
        ],
        columnDefs: [{
            targets: 0,
            searchable: false,
            orderable: false,
            render: function(data, type, row) {
                var stockmod_id = row.stockmod_id;

                var input = document.createElement("INPUT");
                input.type = 'checkbox';
                input.name = 'checkbox-group-select';

                var span = document.createElement("SPAN");
                span.className = 'form-label';

                var label = document.createElement("LABEL");
                label.name = 'checkbox-group-select';
                label.style.marginLeft = '40%';
                label.appendChild(span);

                var options = $("<div/>").append(input, label);

                return options.html();
            }
        }, {
            //功能
            targets: -1,
            searchable: false,
            orderable: false,
            render: function(data, type, row) {

                //            	var options =
                //                    $('<div/>', {
                //                        'class': 'btn-group'
                //                    });
                //            	
                //            	
                //            	var $button = $('<button/>', {
                //                    'type': 'button',
                //                    'class': 'btn btn-primary dropdown-toggle',
                //                    'data-toggle': 'dropdown',
                //                    'name': 'btn-function',
                //                    'text': '功能'
                //                }).append($('<span/>', {
                //                    'class': 'caret',
                //                    'role': 'menu'
                //                }));
                //            	
                //
                //            	var $ul = $('<ul/>', {
                //                    'class': 'dropdown-menu',
                //                    'role': 'menu'
                //                }).append($('<li/>').append($('<a/>', {
                //                    'href': '#',
                //                    'text': '刪除'
                //                })),$('<li/>').append($('<a/>', {
                //                    'href': '#',
                //                    'text': '新增'
                //                })));
                //            	
                //            	options.append($button,$ul);
                //                
                //                return options.html();
                var options =
                    $('<div/>', {
                        'class': 'btn-group'
                    }).append($('<button/>', {
                        'type': 'button',
                        'class': 'btn btn-primary',
                        'text': '功能'
                    }));

                return options.html();
            }
        }],
        buttons: [{
            text: '全選',
            className: 'btn btn-primary',
            action: function(e, dt, node, config) {

                var $table = $("#xmlConverterTable");
                var $chkbox_all = $('input[type="checkbox"]', $table);
                var $chkbox_checked = $('input[type="checkbox"]:checked', $table);

                if ($chkbox_checked.length === 0) {
                    console.log('$chkbox_checked.length: ' + $chkbox_checked.length);
                    //         		  $chkbox_all.checked = true;
                    $chkbox_all.each(function() {
                        $(this).prop("checked", true);
                        $(this).addClass("toggleon");
                    });
                    // If all of the checkboxes are checked
                } else if ($chkbox_checked.length === $chkbox_all.length) {
                    //          		  $chkbox_all.checked = false;
                    $chkbox_all.each(function() {
                        $(this).prop("checked", false);
                        $(this).removeClass("toggleon");
                    })
                    // If some of the checkboxes are checked
                } else {
                    $chkbox_all.each(function() {
                        $(this).prop("checked", true);
                        $(this).addClass("toggleon");
                    });
                }
                //                selectCount++;
                //                console.log('selectCount: ' + selectCount);
                //                var $dtMaster = $('#stockmod-master-table');
                //                var $checkboxs = $dtMaster.find('input[name=checkbox-group-select]');
                //
                //                console.log('selectCount % 2 : ' + selectCount % 2);
                //
                //
                //                selectCount % 2 != 1 ?
                //                    $checkboxs.each(function() {
                //                        $(this).prop("checked", false);
                //                        $(this).removeClass("toggleon");
                //                    }) :
                //                    $checkboxs.each(function() {
                //                        $(this).prop("checked", true);
                //                        $(this).addClass("toggleon");
                //                    });
            }
        }, {
            text: '刪除',
            className: 'btn btn-primary',
            action: function(e, dt, node, config) {
                var $dtMaster = $('#stockmod-master-table');
                var delArr = '';

                var $checkboxs = $dtMaster.find('input[name=checkbox-group-select]:checked');

                console.log($checkboxs);

                if ($checkboxs.length == 0) {
                    alert('請至少選擇一筆資料');
                    return false;
                }

                var dialogId = "dialog-data-process";
                var formId = "dialog-form-data-process";
                var btnTxt_1 = "批次刪除";
                var btnTxt_2 = "取消";
                var oWidth = 'auto';
                var url = 'stockMod.do';

                $checkboxs.each(function() {
                    delArr += this.id + ',';
                });

                delArr = delArr.slice(0, -1);

                console.log("delArr:" + delArr);

                initDeleteDialog();
                drawDialog
                    (dialogId, url, oWidth, formId, btnTxt_1, btnTxt_2)
                    .data("stockmodId", delArr)
                    .dialog("option", "title", "刪除" + $checkboxs.length + "筆資料")
                    .dialog("open");
            }
        }, {
            text: '新增',
            className: 'btn btn-primary',
            action: function(e, dt, node, config) {
                BootstrapDialog.show({
                    title: '新增',
                    message: function(dialog) {

                        var $content =
                            $('<div/>', {
                                'id': 'xmlConverterDataDialog'
                            }).append(
                                buildInput('來源', '來源欄位', 'source'),
                                buildInput('目標', '目標欄位', 'destination'),
                                buildInput('屬性', '是否為屬性', 'isAttribute'),
                                buildInput('描述', '描述', 'description')
                            );

                        return $content;
                    },
                    buttons: [{
                        label: '確認',
                        action: function(dialog) {

                            var $dialog = $('#xmlConverterDataDialog');
                            var $source = $('#xmlConverterDataDialog').find('input[name=source]');
                            var $destination = $('#xmlConverterDataDialog').find('input[name=destination]');
                            var $isAttribute = $('#xmlConverterDataDialog').find('input[name=isAttribute]');
                            var $description = $('#xmlConverterDataDialog').find('input[name=description]');

                            $xmlConverterTable.row.add({
                                "source": $source.val(),
                                "destination": $destination.val(),
                                "isAttribute": $isAttribute.val(),
                                "description": $description.val()
                            }).draw();

                            dialog.close();
                        }
                    }, {
                        label: '取消',
                        action: function(dialog) {
                            dialog.close();
                        }
                    }]
                });
            }
        }]
    });

    $("button[name=btn-update]").click(function(event) {
        //    	var data = $xmlConverterTable.rows().data();

        BootstrapDialog.show({
            title: '確認是否修改',
            message: function(dialog) {

//                var $div = buildInput('名稱', '設定檔名稱', 'fileName');
//                $('input[name=fileName]', $div).val($heartBeatClient.find('input[name=fileName]').val());
//
//                var $content =
//                    $('<div/>', {
//                        'id': 'btnSaveDialog'
//                    }).append(
//                        $div
//                    );
//
//                return $content;
            },
            buttons: [{
                label: '確認',
                action: function(dialog) {
                    var fileName = $heartBeatClient.find('input[name=fileName]').val();
                    var $button = this;
                    $button.disable();
                    $button.spin();
                    dialog.setClosable(false);
                    dialog.setMessage('進行中');

                    var vo = {},
                        q2w = {},
                        val = {};

                    //                    vo['fileName'] = $Q2W.find('input[name=fileName]').val();

                    //Heart BeatClient
                    //val['beatID'] = $heartBeatClient.find('input[name=beatID]').val(fileName).val();
                    //val['fileName'] = $heartBeatClient.find('input[name=fileName]').val(fileName).val();
                    val['beatID'] = fileName;
                    val['fileName'] = fileName;
                    val['timeSeries'] = $heartBeatClient.find('input[name=timeSeries]').val();
                    val['jarFilePath'] = $heartBeatClient.find('input[name=jarFilePath]').val();
                    q2w['heartBeatClient'] = val;
                    $heartBeatClient.find('input[name=beatID]').val('');
                    $heartBeatClient.find('input[name=fileName]').val('');
                    val = {};

                    //Connection Factory
                    val['username'] = $connectionFactory.find('input[name=username]').val();
                    val['password'] = $connectionFactory.find('input[name=password]').val();
                    val['host'] = $connectionFactory.find('input[name=host]').val();
                    val['port'] = $connectionFactory.find('input[name=port]').val();
                    q2w['connectionFactory'] = val;
                    val = {};

                    //Queue OriginData
                    val['queueName'] = $queueOrigin.find('input[name=queueName]').val();
                    val['exchangeName'] = $queueOrigin.find('input[name=exchangeName]').val();
                    val['routingKey'] = $queueOrigin.find('input[name=routingKey]').val();
                    q2w['queueOrigin'] = val;
                    val = {};

                    //Queue Destination
                    val['queueName'] = $queueDestination.find('input[name=queueName]').val();
                    val['exchangeName'] = $queueDestination.find('input[name=exchangeName]').val();
                    val['routingKey'] = $queueDestination.find('input[name=routingKey]').val();
                    q2w['queueDestination'] = val;
                    val = {};

                    //Web Service
                    val['url'] = $webService.find('input[name=url]').val();
                    val['type'] = $webService.find('input[name=type]').val();
                    val['format'] = $webService.find('input[name=format]').val();
                    q2w['webService'] = val;
                    val = {};
                    vo['config'] = q2w;

                    //XML Converter
                    var cells = $xmlConverterTable.cells().nodes();
                    var $checkboxs = $(cells).find('input[name=checkbox-group-select]:checked');

                    var xmlConverter = [];

                    $checkboxs.each(function(index, checkbox) {

                        var row = jQuery(checkbox).closest('tr');
                        var data = $("#xmlConverterTable").dataTable().fnGetData(row);
                        //            	        var field = {};
                        var fieldVal = {};
                        fieldVal['source'] = data.source;
                        fieldVal['destination'] = data.destination;
                        fieldVal['description'] = data.description;
                        fieldVal['isAttribute'] = data.isAttribute;
                        //                        field['fieldName'] = fieldVal;

                        xmlConverter.push(fieldVal);
                    });
                    vo['xmlConverter'] = xmlConverter;


                    console.log('update');
                    console.log(JSON.stringify(vo));
                    //                    return false;
                    $.ajax({
                        type: "PUT",
                        datatype: "json",
                        contentType: "application/json; charset=utf-8",
                        url: "./q2w",
                        data: JSON.stringify(vo),
                        success: function(data) {
                            $button.enable();
                            $button.stopSpin();
                            dialog.setClosable(true);
                            dialog.setMessage(data);
                            
                            $button.click(function(event) {
                                dialog.close();
                            });
                        },
                        error: function(e) {
                            $button.enable();
                            $button.stopSpin();
                            dialog.setClosable(true);
                            dialog.setMessage('失敗');
                        }
                    });
                }
            }, {
                label: '取消',
                action: function(dialog) {
                    dialog.close();
                }
            }]
        });
    });
    
    $("button[name=btn-save]").click(function(event) {
        //    	var data = $xmlConverterTable.rows().data();

        BootstrapDialog.show({
            title: '確認是否送出',
            message: function(dialog) {

                var $div = buildInput('名稱', '設定檔名稱', 'fileName');
                $('input[name=fileName]', $div).val($heartBeatClient.find('input[name=fileName]').val());

                var $content =
                    $('<div/>', {
                        'id': 'btnSaveDialog'
                    }).append(
                        $div
                    );

                return $content;
            },
            buttons: [{
                label: '確認',
                action: function(dialog) {
                    var fileName = $('#btnSaveDialog input[name=fileName]').val();
                    var $button = this;
                    $button.disable();
                    $button.spin();
                    dialog.setClosable(false);
                    dialog.setMessage('進行中');

                    var vo = {},
                        q2w = {},
                        val = {};

                    //                    vo['fileName'] = $Q2W.find('input[name=fileName]').val();

                    //Heart BeatClient
                    //val['beatID'] = $heartBeatClient.find('input[name=beatID]').val(fileName).val();
                    //val['fileName'] = $heartBeatClient.find('input[name=fileName]').val(fileName).val();
                    val['beatID'] = fileName;
                    val['fileName'] = fileName;
                    val['timeSeries'] = $heartBeatClient.find('input[name=timeSeries]').val();
                    val['jarFilePath'] = $heartBeatClient.find('input[name=jarFilePath]').val();
                    q2w['heartBeatClient'] = val;
                    $heartBeatClient.find('input[name=beatID]').val('');
                    $heartBeatClient.find('input[name=fileName]').val('');
                    val = {};

                    //Connection Factory
                    val['username'] = $connectionFactory.find('input[name=username]').val();
                    val['password'] = $connectionFactory.find('input[name=password]').val();
                    val['host'] = $connectionFactory.find('input[name=host]').val();
                    val['port'] = $connectionFactory.find('input[name=port]').val();
                    q2w['connectionFactory'] = val;
                    val = {};

                    //Queue OriginData
                    val['queueName'] = $queueOrigin.find('input[name=queueName]').val();
                    val['exchangeName'] = $queueOrigin.find('input[name=exchangeName]').val();
                    val['routingKey'] = $queueOrigin.find('input[name=routingKey]').val();
                    q2w['queueOrigin'] = val;
                    val = {};

                    //Queue Destination
                    val['queueName'] = $queueDestination.find('input[name=queueName]').val();
                    val['exchangeName'] = $queueDestination.find('input[name=exchangeName]').val();
                    val['routingKey'] = $queueDestination.find('input[name=routingKey]').val();
                    q2w['queueDestination'] = val;
                    val = {};

                    //Web Service
                    val['url'] = $webService.find('input[name=url]').val();
                    val['type'] = $webService.find('input[name=type]').val();
                    val['format'] = $webService.find('input[name=format]').val();
                    q2w['webService'] = val;
                    val = {};
                    vo['config'] = q2w;

                    //XML Converter
                    var cells = $xmlConverterTable.cells().nodes();
                    var $checkboxs = $(cells).find('input[name=checkbox-group-select]:checked');

                    var xmlConverter = [];

                    $checkboxs.each(function(index, checkbox) {

                        var row = jQuery(checkbox).closest('tr');
                        var data = $("#xmlConverterTable").dataTable().fnGetData(row);
                        //            	        var field = {};
                        var fieldVal = {};
                        fieldVal['source'] = data.source;
                        fieldVal['destination'] = data.destination;
                        fieldVal['description'] = data.description;
                        fieldVal['isAttribute'] = data.isAttribute;
                        //                        field['fieldName'] = fieldVal;

                        xmlConverter.push(fieldVal);
                    });
                    vo['xmlConverter'] = xmlConverter;


                    console.log(JSON.stringify(vo));
                    //                    return false;
                    $.ajax({
                        type: "POST",
                        datatype: "json",
                        contentType: "application/json; charset=utf-8",
                        url: "./q2w",
                        data: JSON.stringify(vo),
                        success: function(data) {
                            $button.enable();
                            $button.stopSpin();
                            dialog.setClosable(true);
                            dialog.setMessage(data);
                            
                            $button.click(function(event) {
                                dialog.close();
                            });
                        },
                        error: function(e) {
                            $button.enable();
                            $button.stopSpin();
                            dialog.setClosable(true);
                            dialog.setMessage('失敗');
                        }
                    });
                }
            }, {
                label: '取消',
                action: function(dialog) {
                    dialog.close();
                }
            }]
        });
    });
});