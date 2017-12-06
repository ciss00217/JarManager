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
    var $queueError = $('#queueErrorData');
    var $webService = $('#webServiceData');
    var $Q2W = $('#Q2WData');

    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        $.fn.dataTable.tables({
            visible: true,
            api: true
        }).columns.adjust();
    });

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

        if (fileName.length == 0) {
            BootstrapDialog.show({
                title: '警告訊息',
                message: function(dialog) {
                    return "請填寫要搜尋的設定檔名稱";
                },
                buttons: [{
                    label: '確認',
                    action: function(dialog) {
                        dialog.close();
                    }
                }]
            });
            return false;
        }

        $.ajax({
            type: "GET",
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            url: "./q2w/search/" + fileName,
            success: function(data) {

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

                        $.isEmptyObject(data) ? [{
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
                                var queueError = data.config.queueError;
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
                                $connectionFactory.find('input[name=virtualHost]').val(connectionFactory.virtualHost);

                                $queueOrigin.find('input[name=queueName]').val(queueOrigin.queueName);
                                $queueOrigin.find('input[name=exchangeName]').val(queueOrigin.exchangeName);
                                $queueOrigin.find('input[name=routingKey]').val(queueOrigin.routingKey);

                                $queueDestination.find('input[name=queueName]').val(queueDestination.queueName);
                                $queueDestination.find('input[name=exchangeName]').val(queueDestination.exchangeName);
                                $queueDestination.find('input[name=routingKey]').val(queueDestination.routingKey);

                                $queueError.find('input[name=queueName]').val(queueError.queueName);
                                $queueError.find('input[name=exchangeName]').val(queueError.exchangeName);
                                $queueError.find('input[name=routingKey]').val(queueError.routingKey);
                                
                                $webService.find('input[name=url]').val(webService.url);
                                $webService.find('input[name=type]').val(webService.type);
                                $webService.find('input[name=format]').val(webService.format);
                                $webService.find('input[name=apiMethod]').val(webService.apiMethod);
                                $webService.find('input[name=apiVersion]').val(webService.apiVersion);
                                $webService.find('input[name=apiGroup]').val(webService.apiGroup);
                                $webService.find('input[name=apiAction]').val(webService.apiAction);
                                $webService.find('input[name=apiKey]').val(webService.apiKey);
                                $webService.find('input[name=sharedSecret]').val(webService.sharedSecret);

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
                dialog.setClosable(true);
                dialog.setMessage('失敗');
            }
        });
    });
    $("button[name=btn-import-data]").click(function(event) {

        $heartBeatClient.find('input[name=beatID]').val('test');
        $heartBeatClient.find('input[name=fileName]').val('test');
        $heartBeatClient.find('input[name=timeSeries]').val('60000');
        $heartBeatClient.find('input[name=jarFilePath]').val('D:\\jarFilePath\\Q2W.jar');

        $connectionFactory.find('input[name=username]').val('admin');
        $connectionFactory.find('input[name=password]').val('password');
        $connectionFactory.find('input[name=host]').val('192.168.112.199');
        $connectionFactory.find('input[name=port]').val('5672');
        $connectionFactory.find('input[name=virtualHost]').val('/');

        $queueOrigin.find('input[name=queueName]').val('ian');
        $queueOrigin.find('input[name=exchangeName]').val('exchange');
        $queueOrigin.find('input[name=routingKey]').val('ian');

        $queueDestination.find('input[name=queueName]').val('ian2');
        $queueDestination.find('input[name=exchangeName]').val('exchange');
        $queueDestination.find('input[name=routingKey]').val('ian2');

        $queueError.find('input[name=queueName]').val('kevin');
        $queueError.find('input[name=exchangeName]').val('exchange');
        $queueError.find('input[name=routingKey]').val('kevin');
        
        $webService.find('input[name=url]').val('https://tw.ews.mall.yahooapis.com');
        $webService.find('input[name=type]').val('get');
        $webService.find('input[name=format]').val('xml');
        $webService.find('input[name=apiMethod]').val('stauth');
        $webService.find('input[name=apiVersion]').val('v1');
        $webService.find('input[name=apiGroup]').val('MallCategory');
        $webService.find('input[name=apiAction]').val('Get');
        $webService.find('input[name=apiKey]').val('8b337636394c4a9d24292ca20fe06b66');
        $webService.find('input[name=sharedSecret]').val('O07WYrbfP1CgdtWRFzuuFELE_QmZ6nGp7QC_yjeIGnM-');

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

                var $dialog;

                BootstrapDialog.show({
                    title: '新增',
                    message: function(dialog) {

                        $dialog =
                            $('<div/>').append(
                                buildInput('來源', '來源欄位', 'source'),
                                buildInput('目標', '目標欄位', 'destination'),
                                buildInput('屬性', '是否為屬性', 'isAttribute'),
                                buildInput('描述', '描述', 'description')
                            );

                        return $dialog;
                    },
                    buttons: [{
                        label: '確認',
                        action: function(dialog) {

                            var $source = $dialog.find('input[name=source]');
                            var $destination = $dialog.find('input[name=destination]');
                            var $isAttribute = $dialog.find('input[name=isAttribute]');
                            var $description = $dialog.find('input[name=description]');

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

                    if (!fieldDataValidator($heartBeatClient, '設定檔', 'fileName')) return false;

                    if (!dataValidator()) return false;

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
                    val['virtualHost'] = $connectionFactory.find('input[name=virtualHost]').val();
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

                    //Queue Error
                    val['queueName'] = $queueError.find('input[name=queueName]').val();
                    val['exchangeName'] = $queueError.find('input[name=exchangeName]').val();
                    val['routingKey'] = $queueError.find('input[name=routingKey]').val();
                    q2w['queueError'] = val;
                    val = {};
                    
                    //Web Service
                    val['url'] = $webService.find('input[name=url]').val();
                    val['type'] = $webService.find('input[name=type]').val();
                    val['format'] = $webService.find('input[name=format]').val();
                    val['apiMethod'] = $webService.find('input[name=apiMethod]').val();
                    val['apiVersion'] = $webService.find('input[name=apiVersion]').val();
                    val['apiGroup'] = $webService.find('input[name=apiGroup]').val();
                    val['apiAction'] = $webService.find('input[name=apiAction]').val();
                    val['apiKey'] = $webService.find('input[name=apiKey]').val();
                    val['sharedSecret'] = $webService.find('input[name=sharedSecret]').val();

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
                    $heartBeatClient.find('input[name=fileName]').val($('input[name=fileName]', $div).val());

                    if (!fieldDataValidator($div, '設定檔', 'fileName')) return false;

                    if (!dataValidator()) return false;

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
                    val['virtualHost'] = $connectionFactory.find('input[name=virtualHost]').val();
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

                    //Queue Error
                    val['queueName'] = $queueError.find('input[name=queueName]').val();
                    val['exchangeName'] = $queueError.find('input[name=exchangeName]').val();
                    val['routingKey'] = $queueError.find('input[name=routingKey]').val();
                    q2w['queueError'] = val;
                    val = {};
                    
                    //Web Service
                    val['url'] = $webService.find('input[name=url]').val();
                    val['type'] = $webService.find('input[name=type]').val();
                    val['format'] = $webService.find('input[name=format]').val();
                    val['apiMethod'] = $webService.find('input[name=apiMethod]').val();
                    val['apiVersion'] = $webService.find('input[name=apiVersion]').val();
                    val['apiGroup'] = $webService.find('input[name=apiGroup]').val();
                    val['apiAction'] = $webService.find('input[name=apiAction]').val();
                    val['apiKey'] = $webService.find('input[name=apiKey]').val();
                    val['sharedSecret'] = $webService.find('input[name=sharedSecret]').val();

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

/**
 * 單欄位檢查
 * @param $obj 包含要檢查欄位的物件
 * @param title 欄位提示文字
 * @param input_name input名稱屬性
 */
function fieldDataValidator($obj, title, input_name) {
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

    var $obj_input = $obj.find(('input[name=' + input_name + ']'));

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
    title_array['$obj_input'] = title;

    var element_array = {};
    element_array['$obj_input'] = $obj_input;

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

    var $heartBeatClient_inputs = $('#heartBeatClientData input');
    var $connectionFactory_inputs = $('#connectionFactoryData input');
    var $queueOrigin_inputs = $('#queueOriginData input');
    var $queueDestination_inputs = $('#queueDestinationData input');
    var $queueError_inputs = $('#queueErrorData input');
    var $webService_inputs = $('#webServiceData input');

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
    title_array['$queueError_inputs'] = '錯誤佇列';
    title_array['$webService_inputs'] = 'Web Service';

    var element_array = {};
    element_array['$heartBeatClient_inputs'] = $heartBeatClient_inputs;
    element_array['$connectionFactory_inputs'] = $connectionFactory_inputs;
    element_array['$queueOrigin_inputs'] = $queueOrigin_inputs;
    element_array['$queueDestination_inputs'] = $queueDestination_inputs;
    element_array['$queueError_inputs'] = $queueError_inputs;
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