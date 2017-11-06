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

    function fileNameDataValidator() {
        var isValid = false;

        function checkVal(obj) {
            var mes = '';
            $.each(obj, function(index, input) {
                    if ($(input).val() == '') {
                        $mes = $('<div/>').append(
                            $('<p/>', {
                                'text': '● ' + input.placeholder + ' 尚未填寫'
                            }));
                        mes += $mes.html();
                    }
            });
            return mes;
        }

        var $heartBeatClient_fileName_input = $heartBeatClient.find('input[name=fileName]');

        function existGetMes(obj, title) {
            var vaild_mes = '';
            var $obj = '';

            vaild_mes = checkVal(obj);

            if (vaild_mes != '') {
                var $obj =
                    $('<div/>', {
                        'class': 'alert alert-danger'
                    }).append(
                        $('<strong/>', {
                            'text': title,
                            "css": {
                                'font-size': '22px'
                            }
                        }),
                        vaild_mes
                    );
            }
            return $obj;
        }

        var $content =
            $('<div/>', {
                'css': {
                    'height': '250px',
                    'overflow': 'auto'
                }
            });

        var title_array = {};
        title_array['$heartBeatClient_fileName_input'] = '註冊檔';

        var element_array = {};
        element_array['$heartBeatClient_fileName_input'] = $heartBeatClient_fileName_input;

        $.each(title_array, function(element_key, title) {

            if (existGetMes(element_array[element_key], title) != '') {
                console.log('進入');
                var $obj = existGetMes(element_array[element_key], title);
                $content.append($obj);
            }
        });
        
        console.log('$content.html():'+$content.html() != '');
        
        $content.html() != '' ?
            BootstrapDialog.show({
                title: '警告訊息',
                message: function(dialog) {
                    return $content;
                },
                buttons: [{
                    label: '確認',
                    action: function(dialog) {
                        dialog.close();
                    }
                }]
            }) : isValid = true;
            
        return isValid;
    }
    
    function dataValidator() {
        var isValid = false;

        function checkVal(obj) {
            var mes = '';
            $.each(obj, function(index, input) {
                if (!$(input).closest('div').hasClass("hidden")) {
                    if ($(input).val() == '') {
                        $mes = $('<div/>').append(
                            $('<p/>', {
                                'text': '● ' + input.placeholder + ' 尚未填寫'
                            }));
                        mes += $mes.html();
                    }
                }
            });
            return mes;
        }

        var $heartBeatClient_inputs = $('input', $heartBeatClient);
        var $connectionFactory_inputs = $('input', $connectionFactory);
        var $queueOrigin_inputs = $('input', $queueOrigin);
        var $queueDestination_inputs = $('input', $queueDestination);
        var $webService_inputs = $('input', $webService);

        function existGetMes(obj, title) {
            var vaild_mes = '';
            var $obj = '';

            vaild_mes = checkVal(obj);

            if (vaild_mes != '') {
                var $obj =
                    $('<div/>', {
                        'class': 'alert alert-danger'
                    }).append(
                        $('<strong/>', {
                            'text': title,
                            "css": {
                                'font-size': '18px'
                            }
                        }),
                        vaild_mes
                    );
            }
            return $obj;
        }

        var $content =
            $('<div/>', {
                'css': {
                    'height': '250px',
                    'overflow': 'auto'
                }
            });

        var title_array = {};
        title_array['$heartBeatClient_inputs'] = '心跳協議';
        title_array['$connectionFactory_inputs'] = '資料庫連線';
        title_array['$queueOrigin_inputs'] = '來源佇列';
        title_array['$queueDestination_inputs'] = '目的佇列';
        title_array['$webService_inputs'] = 'Web Service';

        var element_array = {};
        element_array['$heartBeatClient_inputs'] = $heartBeatClient_inputs;
        element_array['$connectionFactory_inputs'] = $connectionFactory_inputs;
        element_array['$queueOrigin_inputs'] = $queueOrigin_inputs;
        element_array['$queueDestination_inputs'] = $queueDestination_inputs;
        element_array['$webService_inputs'] = $webService_inputs;

        $.each(title_array, function(element_key, title) {

            if (existGetMes(element_array[element_key], title) != '') {
                var $obj = existGetMes(element_array[element_key], title);
                $content.append($obj);
            }
        });
        
        $content.html() != '' ?
            BootstrapDialog.show({
                title: '警告訊息',
                message: function(dialog) {
                    return $content;
                },
                buttons: [{
                    label: '確認',
                    action: function(dialog) {
                        dialog.close();
                    }
                }]
            }) : isValid = true;
            
        return isValid;
    }
    
    $('#imaginary_container button[name=btn-delete]').click(function(event) {

        BootstrapDialog.show({
            title: '刪除',
            message: function(dialog) {

                var $content =
                    $('<div/>', {
                        'id': 'configDeleteDialog'
                    }).append(
                        buildInput('名稱', '要刪除的設定檔名稱', 'fileName')
                    );

                return $content;
            },
            buttons: [{
                label: '確認',
                action: function(dialog) {
                    var $button = this;
                    var fileName = $('#configDeleteDialog input[name=fileName]').val();

                    $.ajax({
                        type: "DELETE",
                        datatype: "json",
                        contentType: "application/json; charset=utf-8",
                        url: "./q2w/delete/" + fileName,
                        success: function(data) {
                            $button.enable();
                            $button.stopSpin();
                            dialog.setClosable(true);
                            dialog.setMessage(data);

                            $button.closest('div').remove();
                            setTimeout(function() {
                                dialog.close();
                            }, 2000);
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

                                $button.enable();
                                $button.stopSpin();
                                dialog.setClosable(true);
                                dialog.setMessage('匯入作業完成');

                                $button.closest('div').remove();
                                setTimeout(function() {
                                    dialog.close();
                                }, 2000);
                            }
                        }, {
                            label: '取消',
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
            }, {
                'margin-bottom': '10px'
            });
        },
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
                $button = $('<button/>', {
                    'type': 'button',
                    'class': 'btn btn-primary',
                    'text': '修改',
                    'name': 'dt-btn-update'
                });

                var options =
                    $('<div/>', {
                        'class': 'btn-group'
                    }).append($button);

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
            }
        }, {
            text: '刪除',
            className: 'btn btn-primary',
            action: function(e, dt, node, config) {

                var $checkedboxs = $('#xmlConverterTable input[name=checkbox-group-select]:checked');

                if ($checkedboxs.length == 0) {
                    BootstrapDialog.show({
                        title: '提示訊息',
                        message: '請至少選擇一筆資料',
                        buttons: [{
                            label: '確認',
                            action: function(dialog) {
                                dialog.close();
                            }
                        }]
                    });
                    return false;
                }
                BootstrapDialog.show({
                    title: '提示訊息',
                    message: '是否確認刪除資料，總共' + $checkedboxs.length + '筆',
                    buttons: [{
                        label: '確認',
                        action: function(dialog) {
                            $checkedboxs.each(function() {
                                $xmlConverterTable
                                    .row($(this).parents('tr'))
                                    .remove()
                                    .draw();
                            });
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

    $("#xmlConverterTable").on("click", 'button[name=dt-btn-update]', function() {
        $button.closest('div').remove();
        var row = this.closest("tr");
        var data = $xmlConverterTable.row(row).data();

        console.log(data);

        var $source = buildInput('來源', '來源欄位', 'source');
        var $destination = buildInput('目標', '目標欄位', 'destination');
        var $isAttribute = buildInput('屬性', '是否為屬性', 'isAttribute');
        var $description = buildInput('描述', '描述', 'description');

        $('input', $source).val(data.source);
        $('input', $destination).val(data.destination);
        $('input', $isAttribute).val(data.isAttribute);
        $('input', $description).val(data.description);

        var $content =
            $('<div/>').append(
                $source,
                $destination,
                $isAttribute,
                $description
            );

        BootstrapDialog.show({
            title: '修改',
            message: function(dialog) {
                return $content;
            },
            buttons: [{
                label: '確認',
                action: function(dialog) {

                    data.source = $('input', $source).val();
                    data.destination = $('input', $destination).val();
                    data.isAttribute = $('input', $isAttribute).val();
                    data.description = $('input', $description).val();

                    $xmlConverterTable.row(row)
                        .data(data)
                        .draw()
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

    $("button[name=btn-update]").click(function(event) {

        BootstrapDialog.show({
            title: '確認是否修改',
            buttons: [{
                label: '確認',
                action: function(dialog) {
                	
                    if( !fileNameDataValidator() ) return false;
                    
                    if( !dataValidator() ) return false;
                    
                    var fileName = $heartBeatClient.find('input[name=fileName]').val();
                    var $button = this;
                    $button.disable();
                    $button.spin();
                    dialog.setClosable(false);
                    dialog.setMessage('進行中');

                    var vo = {},
                        q2w = {},
                        val = {};

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

                            $button.closest('div').remove();
                            setTimeout(function() {
                                dialog.close();
                            }, 2000);
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

        var $div;
        
        BootstrapDialog.show({
            title: '確認是否送出',
            message: function(dialog) {
            	$div = buildInput('名稱', '設定檔名稱', 'fileName');
                $('input[name=fileName]', $div).val( $heartBeatClient.find('input[name=fileName]').val() );
                
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
                    $heartBeatClient.find('input[name=fileName]').val( $('input[name=fileName]', $div).val() );
                	
                    if( !fileNameDataValidator() ) return false;
                    
                    if( !dataValidator() ) return false;
                    
                    var fileName = $('#btnSaveDialog input[name=fileName]').val();
                    var $button = this;
                    $button.disable();
                    $button.spin();
                    dialog.setClosable(false);
                    dialog.setMessage('進行中');

                    var vo = {},
                        q2w = {},
                        val = {};

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

                        var fieldVal = {};
                        fieldVal['source'] = data.source;
                        fieldVal['destination'] = data.destination;
                        fieldVal['description'] = data.description;
                        fieldVal['isAttribute'] = data.isAttribute;

                        xmlConverter.push(fieldVal);
                    });
                    vo['xmlConverter'] = xmlConverter;

                    console.log('insert');
                    console.log(JSON.stringify(vo));
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
                            $button.closest('div').remove();
                            setTimeout(function() {
                                dialog.close();
                            }, 2000);
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