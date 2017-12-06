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
    var $connectionFactoryData = $('#connectionFactoryData');
    var $ftpConnectionFactoryData = $('#ftpConnectionFactoryData');
    var $orderDestination = $('#orderDestination');
    var $invDestination = $('#invDestination');
    var $orderErrorDestination = $('#orderErrorDestination');
    var $invErrorDestination = $('#invErrorDestination');
    var $handleVO = $('#handleVO');
    var $jarFilePathTag = $('#jarFilePathTag');
    var $heartBeatDestination = $('#heartBeatDestination');


    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        $.fn.dataTable.tables({
            visible: true,
            api: true
        }).columns.adjust();
    });

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



    $("button[name=btn-import-data]").click(function(event) {

        $heartBeatClient.find('input[name=beatID]').val('test');
        $heartBeatClient.find('input[name=fileName]').val('test');
        $heartBeatClient.find('input[name=timeSeries]').val('1800000');

        $heartBeatClient.find('input[name=username]').val('admin');
        $heartBeatClient.find('input[name=password]').val('password');
        $heartBeatClient.find('input[name=host]').val('192.168.112.199');
        $heartBeatClient.find('input[name=port]').val('5672');
        $heartBeatClient.find('input[name=virtualHost]').val('/');

        $heartBeatDestination.find('input[name=queueName]').val('jmsHeart');
        $heartBeatDestination.find('input[name=exchangeName]').val('jms.durable.queues');
        $heartBeatDestination.find('input[name=routingKey]').val('jmsHeart');

        $connectionFactoryData.find('input[name=username]').val('admin');
        $connectionFactoryData.find('input[name=password]').val('password');
        $connectionFactoryData.find('input[name=virtualHost]').val('/');
        $connectionFactoryData.find('input[name=host]').val('192.168.112.199');
        $connectionFactoryData.find('input[name=port]').val('5672');

        $ftpConnectionFactoryData.find('input[name=username]').val('admin123');
        $ftpConnectionFactoryData.find('input[name=password]').val('mysqlmove');
        $ftpConnectionFactoryData.find('input[name=host]').val('192.168.112.164');
        $ftpConnectionFactoryData.find('input[name=port]').val('22');
        $ftpConnectionFactoryData.find('input[name=fileDirectory]').val('/home/mysqlmove/kevin_order_test');

        $orderDestination.find('input[name=queueName]').val('order');
        $orderDestination.find('input[name=exchangeName]').val('jms.durable.queues');
        $orderDestination.find('input[name=routingKey]').val('order');

        $invDestination.find('input[name=queueName]').val('inv');
        $invDestination.find('input[name=exchangeName]').val('jms.durable.queues');
        $invDestination.find('input[name=routingKey]').val('inv');

        $invErrorDestination.find('input[name=queueName]').val('invError');
        $invErrorDestination.find('input[name=exchangeName]').val('jms.durable.queues');
        $invErrorDestination.find('input[name=routingKey]').val('invError');

        $orderErrorDestination.find('input[name=queueName]').val('orderError');
        $orderErrorDestination.find('input[name=exchangeName]').val('jms.durable.queues');
        $orderErrorDestination.find('input[name=routingKey]').val('orderError');

        $handleVO.find('input[name=lastOrder]').val('12656355-O-20110430-201927-20110430-210002');
        $handleVO.find('input[name=lastInv]').val('12656355-InvStatus-A-20110430-210004');
        $handleVO.find('input[name=uniformNumbers]').val('12656355');
        $jarFilePathTag.find('input[name=jarFilePath]').val('D:\\FTP2Q.jar');

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

                    var isNotValidator = false;
                    var message='';
                    $(".required").each(function(index) {
                        if ('' == $(this).val().trim()) {
                        	message = message + $(this).attr("placeholder") + ' 未填寫 <br/>'
                            isNotValidator = true;
                        }
                    });

                    if (isNotValidator) {
                    	  BootstrapDialog.show({
                              title: '錯誤',
                              message: function(dialog) {
                                  return message;
                              }
                          });
                        return;
                    }

                    $invDestination.find('input[name=queueName]').val('inv');
                    $invDestination.find('input[name=exchangeName]').val('jms.durable.queues');
                    $invDestination.find('input[name=routingKey]').val('inv');

                    var fileName = $('#btnSaveDialog input[name=fileName]').val();

                    var $button = this;
                    $button.disable();
                    $button.spin();
                    dialog.setClosable(false);
                    dialog.setMessage('進行中');

                    var ftp2QMode = {},
                        ftp2QConfig = {},
                        heartBeatClientXMLVO = {};

                    var heartBeatConnectionFactory = {},
                        heartBeatDestination = {},
                        heartBeatClientVO = {};

                    var heartBeatConnectionFactoryVO = {},
                        ftpConnectionFactoryVO = {},
                        orderDestination = {},
                        invDestination = {},
                        orderErrorDestination = {},
                        invErrorDestination = {},
                        handleVO = {};

                    heartBeatClientVO['beatID'] = fileName;
                    heartBeatClientVO['fileName'] = fileName;
                    heartBeatClientVO['timeSeries'] = $heartBeatClient.find('input[name=timeSeries]').val();

                    heartBeatConnectionFactory['username'] = $heartBeatClient.find('input[name=username]').val();
                    heartBeatConnectionFactory['password'] = $heartBeatClient.find('input[name=password]').val();
                    heartBeatConnectionFactory['host'] = $heartBeatClient.find('input[name=host]').val();
                    heartBeatConnectionFactory['port'] = $heartBeatClient.find('input[name=port]').val();
                    heartBeatConnectionFactory['virtualHost'] = $heartBeatClient.find('input[name=virtualHost]').val();

                    heartBeatDestination['destinationName'] = $heartBeatDestination.find('input[name=queueName]').val();
                    heartBeatDestination['amqp'] = 'true';
                    heartBeatDestination['amqpQueueName'] = $heartBeatDestination.find('input[name=queueName]').val();
                    heartBeatDestination['amqpExchangeName'] = $heartBeatDestination.find('input[name=exchangeName]').val();
                    heartBeatDestination['amqpRoutingKey'] = $heartBeatDestination.find('input[name=routingKey]').val();

                    heartBeatClientXMLVO['heartBeatConnectionFactoryVO'] = heartBeatConnectionFactory;
                    heartBeatClientXMLVO['destination'] = heartBeatDestination;
                    heartBeatClientXMLVO['heartBeatClientVO'] = heartBeatClientVO;

                    heartBeatConnectionFactoryVO['username'] = $connectionFactoryData.find('input[name=username]').val();
                    heartBeatConnectionFactoryVO['password'] = $connectionFactoryData.find('input[name=password]').val();
                    heartBeatConnectionFactoryVO['virtualHost'] = $connectionFactoryData.find('input[name=virtualHost]').val();
                    heartBeatConnectionFactoryVO['host'] = $connectionFactoryData.find('input[name=host]').val();
                    heartBeatConnectionFactoryVO['port'] = $connectionFactoryData.find('input[name=port]').val();

                    ftpConnectionFactoryVO['username'] = $ftpConnectionFactoryData.find('input[name=username]').val();
                    ftpConnectionFactoryVO['password'] = $ftpConnectionFactoryData.find('input[name=password]').val();
                    ftpConnectionFactoryVO['host'] = $ftpConnectionFactoryData.find('input[name=host]').val();
                    ftpConnectionFactoryVO['port'] = $ftpConnectionFactoryData.find('input[name=port]').val();
                    ftpConnectionFactoryVO['fileDirectory'] = $ftpConnectionFactoryData.find('input[name=fileDirectory]').val();

                    orderDestination['destinationName'] = $orderDestination.find('input[name=queueName]').val();
                    orderDestination['amqp'] = 'true';
                    orderDestination['amqpQueueName'] = $orderDestination.find('input[name=queueName]').val();
                    orderDestination['amqpExchangeName'] = $orderDestination.find('input[name=exchangeName]').val();
                    orderDestination['amqpRoutingKey'] = $orderDestination.find('input[name=routingKey]').val();

                    invDestination['destinationName'] = $invDestination.find('input[name=queueName]').val();
                    invDestination['amqp'] = 'true';
                    invDestination['amqpQueueName'] = $invDestination.find('input[name=queueName]').val();
                    invDestination['amqpExchangeName'] = $invDestination.find('input[name=exchangeName]').val();
                    invDestination['amqpRoutingKey'] = $invDestination.find('input[name=routingKey]').val();

                    invErrorDestination['destinationName'] = $invErrorDestination.find('input[name=queueName]').val();
                    invErrorDestination['amqp'] = 'true';
                    invErrorDestination['amqpQueueName'] = $invErrorDestination.find('input[name=queueName]').val();
                    invErrorDestination['amqpExchangeName'] = $invErrorDestination.find('input[name=exchangeName]').val();
                    invErrorDestination['amqpRoutingKey'] = $invErrorDestination.find('input[name=routingKey]').val();

                    orderErrorDestination['destinationName'] = $orderErrorDestination.find('input[name=queueName]').val();
                    orderErrorDestination['amqp'] = 'true';
                    orderErrorDestination['amqpQueueName'] = $orderErrorDestination.find('input[name=queueName]').val();
                    orderErrorDestination['amqpExchangeName'] = $orderErrorDestination.find('input[name=exchangeName]').val();
                    orderErrorDestination['amqpRoutingKey'] = $orderErrorDestination.find('input[name=routingKey]').val();

                    handleVO['lastOrder'] = $handleVO.find('input[name=lastOrder]').val();
                    handleVO['lastInv'] = $handleVO.find('input[name=lastInv]').val();
                    handleVO['uniformNumbers'] = $handleVO.find('input[name=uniformNumbers]').val();

                    ftp2QConfig['heartBeatConnectionFactoryVO'] = heartBeatConnectionFactoryVO;
                    ftp2QConfig['ftpConnectionFactoryVO'] = ftpConnectionFactoryVO;
                    ftp2QConfig['orderDestination'] = orderDestination;
                    ftp2QConfig['invDestination'] = invDestination;
                    ftp2QConfig['orderErrorDestination'] = orderErrorDestination;
                    ftp2QConfig['invErrorDestination'] = invErrorDestination;
                    ftp2QConfig['heartBeatClientVO'] = heartBeatClientVO;
                    ftp2QConfig['handleVO'] = handleVO;

                    ftp2QMode['ftp2QConfig'] = ftp2QConfig;
                    ftp2QMode['heartBeatClientXMLVO'] = heartBeatClientXMLVO;
                    ftp2QMode['jarFilePath'] = $jarFilePathTag.find('input[name=jarFilePath]').val();


                    $.ajax({
                        type: "POST",
                        datatype: "json",
                        contentType: "application/json; charset=utf-8",
                        url: "./ftp2q",
                        data: JSON.stringify(ftp2QMode),
                        beforeSend: function(data) {
                            console.log("ttt:" + JSON.stringify(ftp2QMode));
                        },
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


    $("button[name=btn-update]").click(function(event) {

        var $div;

        BootstrapDialog.show({
            title: '確認是否修改',
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

                    var isNotValidator = false;
                    var message='';
                    $(".required").each(function(index) {
                        if ('' == $(this).val().trim()) {
                        	message = message + $(this).attr("placeholder") + ' 未填寫 <br/>'
                            isNotValidator = true;
                        }
                    });

                    if (isNotValidator) {
                    	  BootstrapDialog.show({
                              title: '錯誤',
                              message: function(dialog) {
                                  return message;
                              }
                          });
                        return;
                    }

                    var fileName = $('#btnSaveDialog input[name=fileName]').val();

                    var $button = this;
                    $button.disable();
                    $button.spin();
                    dialog.setClosable(false);
                    dialog.setMessage('進行中');

                    var ftp2QMode = {},
                        ftp2QConfig = {},
                        heartBeatClientXMLVO = {};

                    var heartBeatConnectionFactory = {},
                        heartBeatDestination = {},
                        heartBeatClientVO = {};

                    var heartBeatConnectionFactoryVO = {},
                        ftpConnectionFactoryVO = {},
                        orderDestination = {},
                        invDestination = {},
                        orderErrorDestination = {},
                        invErrorDestination = {},
                        handleVO = {};

                    heartBeatClientVO['beatID'] = fileName;
                    heartBeatClientVO['fileName'] = fileName;
                    heartBeatClientVO['timeSeries'] = $heartBeatClient.find('input[name=timeSeries]').val();

                    heartBeatConnectionFactory['username'] = $heartBeatClient.find('input[name=username]').val();
                    heartBeatConnectionFactory['password'] = $heartBeatClient.find('input[name=password]').val();
                    heartBeatConnectionFactory['host'] = $heartBeatClient.find('input[name=host]').val();
                    heartBeatConnectionFactory['port'] = $heartBeatClient.find('input[name=port]').val();
                    heartBeatConnectionFactory['virtualHost'] = $heartBeatClient.find('input[name=virtualHost]').val();

                    heartBeatDestination['destinationName'] = $heartBeatDestination.find('input[name=queueName]').val();
                    heartBeatDestination['amqp'] = 'true';
                    heartBeatDestination['amqpQueueName'] = $heartBeatDestination.find('input[name=queueName]').val();
                    heartBeatDestination['amqpExchangeName'] = $heartBeatDestination.find('input[name=exchangeName]').val();
                    heartBeatDestination['amqpRoutingKey'] = $heartBeatDestination.find('input[name=routingKey]').val();

                    heartBeatClientXMLVO['heartBeatConnectionFactoryVO'] = heartBeatConnectionFactory;
                    heartBeatClientXMLVO['destination'] = heartBeatDestination;
                    heartBeatClientXMLVO['heartBeatClientVO'] = heartBeatClientVO;

                    heartBeatConnectionFactoryVO['username'] = $connectionFactoryData.find('input[name=username]').val();
                    heartBeatConnectionFactoryVO['password'] = $connectionFactoryData.find('input[name=password]').val();
                    heartBeatConnectionFactoryVO['virtualHost'] = $connectionFactoryData.find('input[name=virtualHost]').val();
                    heartBeatConnectionFactoryVO['host'] = $connectionFactoryData.find('input[name=host]').val();
                    heartBeatConnectionFactoryVO['port'] = $connectionFactoryData.find('input[name=port]').val();

                    ftpConnectionFactoryVO['username'] = $ftpConnectionFactoryData.find('input[name=username]').val();
                    ftpConnectionFactoryVO['password'] = $ftpConnectionFactoryData.find('input[name=password]').val();
                    ftpConnectionFactoryVO['host'] = $ftpConnectionFactoryData.find('input[name=host]').val();
                    ftpConnectionFactoryVO['port'] = $ftpConnectionFactoryData.find('input[name=port]').val();
                    ftpConnectionFactoryVO['fileDirectory'] = $ftpConnectionFactoryData.find('input[name=fileDirectory]').val();

                    orderDestination['destinationName'] = $orderDestination.find('input[name=queueName]').val();
                    orderDestination['amqp'] = 'true';
                    orderDestination['amqpQueueName'] = $orderDestination.find('input[name=queueName]').val();
                    orderDestination['amqpExchangeName'] = $orderDestination.find('input[name=exchangeName]').val();
                    orderDestination['amqpRoutingKey'] = $orderDestination.find('input[name=routingKey]').val();

                    invDestination['destinationName'] = $invDestination.find('input[name=queueName]').val();
                    invDestination['amqp'] = 'true';
                    invDestination['amqpQueueName'] = $invDestination.find('input[name=queueName]').val();
                    invDestination['amqpExchangeName'] = $invDestination.find('input[name=exchangeName]').val();
                    invDestination['amqpRoutingKey'] = $invDestination.find('input[name=routingKey]').val();

                    invErrorDestination['destinationName'] = $invErrorDestination.find('input[name=queueName]').val();
                    invErrorDestination['amqp'] = 'true';
                    invErrorDestination['amqpQueueName'] = $invErrorDestination.find('input[name=queueName]').val();
                    invErrorDestination['amqpExchangeName'] = $invErrorDestination.find('input[name=exchangeName]').val();
                    invErrorDestination['amqpRoutingKey'] = $invErrorDestination.find('input[name=routingKey]').val();

                    orderErrorDestination['destinationName'] = $orderErrorDestination.find('input[name=queueName]').val();
                    orderErrorDestination['amqp'] = 'true';
                    orderErrorDestination['amqpQueueName'] = $orderErrorDestination.find('input[name=queueName]').val();
                    orderErrorDestination['amqpExchangeName'] = $orderErrorDestination.find('input[name=exchangeName]').val();
                    orderErrorDestination['amqpRoutingKey'] = $orderErrorDestination.find('input[name=routingKey]').val();

                    handleVO['lastOrder'] = $handleVO.find('input[name=lastOrder]').val();
                    handleVO['lastInv'] = $handleVO.find('input[name=lastInv]').val();
                    handleVO['uniformNumbers'] = $handleVO.find('input[name=uniformNumbers]').val();

                    ftp2QConfig['heartBeatConnectionFactoryVO'] = heartBeatConnectionFactoryVO;
                    ftp2QConfig['ftpConnectionFactoryVO'] = ftpConnectionFactoryVO;
                    ftp2QConfig['orderDestination'] = orderDestination;
                    ftp2QConfig['invDestination'] = invDestination;
                    ftp2QConfig['orderErrorDestination'] = orderErrorDestination;
                    ftp2QConfig['invErrorDestination'] = invErrorDestination;
                    ftp2QConfig['heartBeatClientVO'] = heartBeatClientVO;
                    ftp2QConfig['handleVO'] = handleVO;

                    ftp2QMode['ftp2QConfig'] = ftp2QConfig;
                    ftp2QMode['heartBeatClientXMLVO'] = heartBeatClientXMLVO;
                    ftp2QMode['jarFilePath'] = $jarFilePathTag.find('input[name=jarFilePath]').val();


                    $.ajax({
                        type: "PUT",
                        datatype: "json",
                        contentType: "application/json; charset=utf-8",
                        url: "./ftp2q",
                        data: JSON.stringify(ftp2QMode),
                        beforeSend: function(data) {
                            console.log("ttt:" + JSON.stringify(ftp2QMode));
                        },
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
            url: "./ftp2q/" + fileName,
            success: function(json) {
                var data = jQuery.parseJSON(json)
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

                                console.log("data:" + data)

                                var heartBeatHeartBeatClientVO = data.heartBeatClientXMLVO.heartBeatClientVO;

                                var heartBeatHeartBeatConnectionFactoryVO = data.heartBeatClientXMLVO.heartBeatConnectionFactoryVO;
                                var heartBeatDestination = data.heartBeatClientXMLVO.destination;

                                var ftp2qFtpConnectionFactoryVO = data.ftp2QConfig.ftpConnectionFactoryVO
                                var ftp2qHandleVO = data.ftp2QConfig.handleVO;
                                var ftp2qHeartBeatClientVO = data.ftp2QConfig.heartBeatClientVO;
                                var ftp2qHeartBeatConnectionFactoryVO = data.ftp2QConfig.heartBeatConnectionFactoryVO;
                                var ftp2qInvDestination = data.ftp2QConfig.invDestination;
                                var ftp2qInvErrorDestination = data.ftp2QConfig.invErrorDestination;
                                var ftp2qOrderDestination = data.ftp2QConfig.orderDestination;
                                var ftp2qOrderErrorDestination = data.ftp2QConfig.orderErrorDestination;

                                $heartBeatClient.find('input[name=beatID]').val(heartBeatHeartBeatClientVO.beatID);
                                $heartBeatClient.find('input[name=fileName]').val(heartBeatHeartBeatClientVO.fileName);
                                $heartBeatClient.find('input[name=timeSeries]').val(heartBeatHeartBeatClientVO.timeSeries);

                                $heartBeatClient.find('input[name=username]').val(heartBeatHeartBeatConnectionFactoryVO.username);
                                $heartBeatClient.find('input[name=password]').val(heartBeatHeartBeatConnectionFactoryVO.password);
                                $heartBeatClient.find('input[name=host]').val(heartBeatHeartBeatConnectionFactoryVO.host);
                                $heartBeatClient.find('input[name=port]').val(heartBeatHeartBeatConnectionFactoryVO.port);
                                $heartBeatClient.find('input[name=virtualHost]').val(heartBeatHeartBeatConnectionFactoryVO.virtualHost);

                                $heartBeatDestination.find('input[name=queueName]').val(heartBeatDestination.amqpQueueName);
                                $heartBeatDestination.find('input[name=exchangeName]').val(heartBeatDestination.amqpExchangeName);
                                $heartBeatDestination.find('input[name=routingKey]').val(heartBeatDestination.amqpRoutingKey);

                                $connectionFactoryData.find('input[name=username]').val(ftp2qHeartBeatConnectionFactoryVO.username);
                                $connectionFactoryData.find('input[name=password]').val(ftp2qHeartBeatConnectionFactoryVO.password);
                                $connectionFactoryData.find('input[name=virtualHost]').val(ftp2qHeartBeatConnectionFactoryVO.virtualHost);
                                $connectionFactoryData.find('input[name=host]').val(ftp2qHeartBeatConnectionFactoryVO.host);
                                $connectionFactoryData.find('input[name=port]').val(ftp2qHeartBeatConnectionFactoryVO.port);

                                $ftpConnectionFactoryData.find('input[name=username]').val(ftp2qFtpConnectionFactoryVO.username);
                                $ftpConnectionFactoryData.find('input[name=password]').val(ftp2qFtpConnectionFactoryVO.password);
                                $ftpConnectionFactoryData.find('input[name=host]').val(ftp2qFtpConnectionFactoryVO.host);
                                $ftpConnectionFactoryData.find('input[name=port]').val(ftp2qFtpConnectionFactoryVO.port);
                                $ftpConnectionFactoryData.find('input[name=fileDirectory]').val(ftp2qFtpConnectionFactoryVO.fileDirectory);

                                $orderDestination.find('input[name=queueName]').val(ftp2qOrderDestination.amqpQueueName);
                                $orderDestination.find('input[name=exchangeName]').val(ftp2qOrderDestination.amqpExchangeName);
                                $orderDestination.find('input[name=routingKey]').val(ftp2qOrderDestination.amqpRoutingKey);

                                $invDestination.find('input[name=queueName]').val(ftp2qInvDestination.amqpQueueName);
                                $invDestination.find('input[name=exchangeName]').val(ftp2qInvDestination.amqpExchangeName);
                                $invDestination.find('input[name=routingKey]').val(ftp2qInvDestination.amqpRoutingKey);

                                $invErrorDestination.find('input[name=queueName]').val(ftp2qInvErrorDestination.amqpQueueName);
                                $invErrorDestination.find('input[name=exchangeName]').val(ftp2qInvErrorDestination.amqpExchangeName);
                                $invErrorDestination.find('input[name=routingKey]').val(ftp2qInvErrorDestination.amqpRoutingKey);

                                $orderErrorDestination.find('input[name=queueName]').val(ftp2qOrderErrorDestination.amqpQueueName);
                                $orderErrorDestination.find('input[name=exchangeName]').val(ftp2qOrderErrorDestination.amqpExchangeName);
                                $orderErrorDestination.find('input[name=routingKey]').val(ftp2qOrderErrorDestination.amqpRoutingKey);

                                $handleVO.find('input[name=lastOrder]').val(ftp2qHandleVO.lastOrder);
                                $handleVO.find('input[name=lastInv]').val(ftp2qHandleVO.lastInv);
                                $handleVO.find('input[name=uniformNumbers]').val(ftp2qHandleVO.uniformNumbers);
                                $jarFilePathTag.find('input[name=jarFilePath]').val(data.jarFilePath);

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
                        url: "./ftp2q/" + fileName,
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