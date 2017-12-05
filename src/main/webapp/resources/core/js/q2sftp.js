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
    var $connectionFactory = $('#connectionFactory');
    var $queueConnectionFactory = $('#queueConnectionFactory');
    var $errorQueueConnectionFactory = $('#errorQueueConnectionFactory');
    var $sftpData = $('#sftpData');
    
    $("button[name=btn-import-data]").click(function(event) {

        $('input[name=beatID]', $heartBeatClient).val('test');
        $('input[name=fileName]', $heartBeatClient).val('test');
        $('input[name=timeSeries]', $heartBeatClient).val('60000');
        $('input[name=jarFilePath]', $heartBeatClient).val('D:\\jarFilePath\\Q2FTP.jar');

        $('input[name=host]', $connectionFactory).val('192.168.112.199');
        $('input[name=password]', $connectionFactory).val('password');
        $('input[name=port]', $connectionFactory).val('5672');
        $('input[name=username]', $connectionFactory).val('admin');
        $('input[name=virtualHost]', $connectionFactory).val('/');
        
        $('input[name=exchangeName]', $queueConnectionFactory).val('exchange');
        $('input[name=queueName]', $queueConnectionFactory).val('ian');
        $('input[name=routingKey]', $queueConnectionFactory).val('ian');

        $('input[name=exchangeName]', $errorQueueConnectionFactory).val('exchange');
        $('input[name=queueName]', $errorQueueConnectionFactory).val('ian2');
        $('input[name=routingKey]', $errorQueueConnectionFactory).val('ian2');

        $('input[name=user]', $sftpData).val('mysqlmove');
        $('input[name=password]', $sftpData).val('admin123');
        $('input[name=host]', $sftpData).val('192.168.112.164');
        $('input[name=port]', $sftpData).val('22');
        $('input[name=ein]', $sftpData).val('20939790');
        $('input[name=dir]', $sftpData).val('/home/mysqlmove');
    });
    
    $("button[name=btn-save]").click(function(event) {

        var $div;

        BootstrapDialog.show({
            title: '確認是否送出',
            message: function(dialog) {
                $div = buildInput('名稱', '設定檔名稱', 'fileName');

                var $content =
                    $('<div/>').append(
                        $div
                    );

                return $content;
            },
            buttons: [{
                label: '確認',
                action: function(dialog) {

                    if ( !fieldDataValidator($div, '設定檔', 'fileName') ) return false;
                    if ( !dataValidator() ) return false;
                    
                    var fileName = $('input[name=fileName]', $div).val();
                    var $button = this;
                    $button.disable();
                    $button.spin();
                    dialog.setClosable(false);
                    dialog.setMessage('進行中');

                    //Common Parameters
                    var vo = {},
                        q2sftp = {},
                        val = {};

                    //HeartBeat Client
                    val['beatID'] = fileName;
                    val['fileName'] = fileName;
                    val['timeSeries'] = $heartBeatClient.find('input[name=timeSeries]').val();
                    val['jarFilePath'] = $heartBeatClient.find('input[name=jarFilePath]').val();
                    q2sftp['heartBeatClient'] = val;
                    val = {};

                    //ConnectionFactory
                    val['username'] = $connectionFactory.find('input[name=username]').val();
                    val['password'] = $connectionFactory.find('input[name=password]').val();
                    val['host'] = $connectionFactory.find('input[name=host]').val();
                    val['virtualHost'] = $connectionFactory.find('input[name=virtualHost]').val();
                    val['port'] = $connectionFactory.find('input[name=port]').val();
                    q2sftp['connectionFactory'] = val;
                    val = {};
                    
                    //Queue ConnectionFactory
                    val['username'] = $connectionFactory.find('input[name=username]').val();
                    val['password'] = $connectionFactory.find('input[name=password]').val();
                    val['host'] = $connectionFactory.find('input[name=host]').val();
                    val['virtualHost'] = $connectionFactory.find('input[name=virtualHost]').val();
                    val['port'] = $connectionFactory.find('input[name=port]').val();
                    val['exchangeName'] = $queueConnectionFactory.find('input[name=exchangeName]').val();
                    val['queueName'] = $queueConnectionFactory.find('input[name=queueName]').val();
                    val['routingKey'] = $queueConnectionFactory.find('input[name=routingKey]').val();
 
                    q2sftp['queueConnectionFactory'] = val;
                    val = {};
                    
                    //Error Queue ConnectionFactory
                    val['username'] = $connectionFactory.find('input[name=username]').val();
                    val['password'] = $connectionFactory.find('input[name=password]').val();
                    val['host'] = $connectionFactory.find('input[name=host]').val();
                    val['virtualHost'] = $connectionFactory.find('input[name=virtualHost]').val();
                    val['port'] = $connectionFactory.find('input[name=port]').val();
                    val['exchangeName'] = $errorQueueConnectionFactory.find('input[name=exchangeName]').val();
                    val['queueName'] = $errorQueueConnectionFactory.find('input[name=queueName]').val();
                    val['routingKey'] = $errorQueueConnectionFactory.find('input[name=routingKey]').val();
 
                    q2sftp['errorQueueConnectionFactory'] = val;
                    val = {};            
                    
                    //SFTP Client
                    val['host'] = $sftpData.find('input[name=host]').val();
                    val['user'] = $sftpData.find('input[name=user]').val();
                    val['password'] = $sftpData.find('input[name=password]').val();
                    val['port'] = $sftpData.find('input[name=port]').val();
                    val['ein'] = $sftpData.find('input[name=ein]').val();
                    val['dir'] = $sftpData.find('input[name=dir]').val();
 
                    q2sftp['ftpClient'] = val;
                    val = {};
                    
                    $.ajax({
                        type: "POST",
                        datatype: "json",
                        contentType: "application/json; charset=utf-8",
                        url: "./q2sftp",
                        data: JSON.stringify(q2sftp),
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

    	var $div = $('#imaginary_container');
        var fileName = $('input[name=fileName]', $div).val();

        if (!fieldDataValidator($div, '搜尋', 'fileName')) return false;
        
        $.ajax({
            type: "GET",
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            url: "./q2sftp/search/" + fileName,
            success: function(data) {

                BootstrapDialog.show({
                    title: '查詢結果',
                    message: function(dialog) {

                        var $content;
                        $content = $.isEmptyObject(data) ? $('<div/>').append($("<p />", {
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

                                var $button = this;
                                $button.disable();
                                $button.spin();
                                dialog.setClosable(false);
                                dialog.setMessage('進行中');

                                var ftpClient = data.ftpClient;
                                var queueConnectionFactory = data.queueConnectionFactory;
                                var errorQueueConnectionFactory = data.errorQueueConnectionFactory;
                                var heartBeatClient = data.heartBeatClient;

                                $('input[name=beatID]', $heartBeatClient).val( heartBeatClient.beatID );
                                $('input[name=fileName]', $heartBeatClient).val( heartBeatClient.fileName );
                                $('input[name=timeSeries]', $heartBeatClient).val( heartBeatClient.timeSeries );
                                $('input[name=jarFilePath]', $heartBeatClient).val( heartBeatClient.jarFilePath );

                                $('input[name=host]', $connectionFactory).val( queueConnectionFactory.host );
                                $('input[name=password]', $connectionFactory).val( queueConnectionFactory.password );
                                $('input[name=port]', $connectionFactory).val( queueConnectionFactory.port );
                                $('input[name=username]', $connectionFactory).val( queueConnectionFactory.username );
                                $('input[name=virtualHost]', $connectionFactory).val( queueConnectionFactory.virtualHost );
                                
                                $('input[name=exchangeName]', $queueConnectionFactory).val( queueConnectionFactory.exchangeName );
                                $('input[name=queueName]', $queueConnectionFactory).val( queueConnectionFactory.queueName );
                                $('input[name=routingKey]', $queueConnectionFactory).val( queueConnectionFactory.routingKey );

                                $('input[name=exchangeName]', $errorQueueConnectionFactory).val( errorQueueConnectionFactory.exchangeName );
                                $('input[name=queueName]', $errorQueueConnectionFactory).val( errorQueueConnectionFactory.queueName );
                                $('input[name=routingKey]', $errorQueueConnectionFactory).val( errorQueueConnectionFactory.routingKey );

                                $('input[name=user]', $sftpData).val( ftpClient.user );
                                $('input[name=password]', $sftpData).val( ftpClient.password );
                                $('input[name=host]', $sftpData).val( ftpClient.host );
                                $('input[name=port]', $sftpData).val( ftpClient.port );
                                $('input[name=ein]', $sftpData).val( ftpClient.ein );
                                $('input[name=dir]', $sftpData).val( ftpClient.dir );

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
            }
        });
    });
    $("button[name=btn-update]").click(function(event) {

        BootstrapDialog.show({
            title: '確認是否修改',
            buttons: [{
                label: '確認',
                action: function(dialog) {

                    if ( !fieldDataValidator( $heartBeatClient , '設定檔', 'fileName') ) return false;

                    if ( !dataValidator() ) return false;

                    var fileName = $('input[name=fileName]', $heartBeatClient).val();
                    var $button = this;
                    $button.disable();
                    $button.spin();
                    dialog.setClosable(false);
                    dialog.setMessage('進行中');

                    //Common Parameters
                    var vo = {},
                        q2sftp = {},
                        val = {};

                    //HeartBeat Client
                    val['beatID'] = fileName;
                    val['fileName'] = fileName;
                    val['timeSeries'] = $heartBeatClient.find('input[name=timeSeries]').val();
                    val['jarFilePath'] = $heartBeatClient.find('input[name=jarFilePath]').val();
                    q2sftp['heartBeatClient'] = val;
                    val = {};

                    //ConnectionFactory
                    val['username'] = $connectionFactory.find('input[name=username]').val();
                    val['password'] = $connectionFactory.find('input[name=password]').val();
                    val['host'] = $connectionFactory.find('input[name=host]').val();
                    val['virtualHost'] = $connectionFactory.find('input[name=virtualHost]').val();
                    val['port'] = $connectionFactory.find('input[name=port]').val();
                    q2sftp['connectionFactory'] = val;
                    val = {};
                    
                    //Queue ConnectionFactory
                    val['username'] = $connectionFactory.find('input[name=username]').val();
                    val['password'] = $connectionFactory.find('input[name=password]').val();
                    val['host'] = $connectionFactory.find('input[name=host]').val();
                    val['virtualHost'] = $connectionFactory.find('input[name=virtualHost]').val();
                    val['port'] = $connectionFactory.find('input[name=port]').val();
                    val['exchangeName'] = $queueConnectionFactory.find('input[name=exchangeName]').val();
                    val['queueName'] = $queueConnectionFactory.find('input[name=queueName]').val();
                    val['routingKey'] = $queueConnectionFactory.find('input[name=routingKey]').val();
 
                    q2sftp['queueConnectionFactory'] = val;
                    val = {};
                    
                    //Error Queue ConnectionFactory
                    val['username'] = $connectionFactory.find('input[name=username]').val();
                    val['password'] = $connectionFactory.find('input[name=password]').val();
                    val['host'] = $connectionFactory.find('input[name=host]').val();
                    val['virtualHost'] = $connectionFactory.find('input[name=virtualHost]').val();
                    val['port'] = $connectionFactory.find('input[name=port]').val();
                    val['exchangeName'] = $errorQueueConnectionFactory.find('input[name=exchangeName]').val();
                    val['queueName'] = $errorQueueConnectionFactory.find('input[name=queueName]').val();
                    val['routingKey'] = $errorQueueConnectionFactory.find('input[name=routingKey]').val();
 
                    q2sftp['errorQueueConnectionFactory'] = val;
                    val = {};            
                    
                    //SFTP Client
                    val['host'] = $sftpData.find('input[name=host]').val();
                    val['user'] = $sftpData.find('input[name=user]').val();
                    val['password'] = $sftpData.find('input[name=password]').val();
                    val['port'] = $sftpData.find('input[name=port]').val();
                    val['ein'] = $sftpData.find('input[name=ein]').val();
                    val['dir'] = $sftpData.find('input[name=dir]').val();
 
                    q2sftp['ftpClient'] = val;
                    val = {};

                    $.ajax({
                        type: "PUT",
                        datatype: "json",
                        contentType: "application/json; charset=utf-8",
                        url: "./q2sftp",
                        data: JSON.stringify(q2sftp),
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
    
    $('#imaginary_container button[name=btn-delete]').click(function(event) {

    	var $content;
    	
        BootstrapDialog.show({
            title: '刪除',
            message: function(dialog) {

                $content =
                    $('<div/>').append(
                        buildInput('名稱', '要刪除的設定檔名稱', 'fileName')
                    );

                return $content;
            },
            buttons: [{
                label: '確認',
                action: function(dialog) {
                    var $button = this;
                    var fileName = $('input[name=fileName]', $content ).val();

                    $.ajax({
                        type: "DELETE",
                        datatype: "json",
                        contentType: "application/json; charset=utf-8",
                        url: "./q2sftp/delete/" + fileName,
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

/**
 * 回傳包含 bootstrap input 的物件
 * @param $span_text 標題文字
 * @param $input_placeholder 欄位提示文字
 * @param $input_name input名稱屬性
 */
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

    var $obj_input = $obj.find( ('input[name=' + input_name + ']') );

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
    var $connectionFactory_inputs = $('#connectionFactory input');
    var $queueConnectionFactory_inputs = $('#queueConnectionFactory input');
    var $errorQueueConnectionFactory_inputs = $('#errorQueueConnectionFactory input');
    var $sftpData_inputs = $('#sftpData input');
    
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
    title_array['$connectionFactory_inputs'] = '佇列連線設定';
    title_array['$queueConnectionFactory_inputs'] = '來源佇列';
    title_array['$errorQueueConnectionFactory_inputs'] = '錯誤佇列';
    title_array['$sftpData_inputs'] = 'SFTP';

    var element_array = {};
    element_array['$heartBeatClient_inputs'] = $heartBeatClient_inputs;
    element_array['$connectionFactory_inputs'] = $connectionFactory_inputs;
    element_array['$queueConnectionFactory_inputs'] = $queueConnectionFactory_inputs;
    element_array['$errorQueueConnectionFactory_inputs'] = $errorQueueConnectionFactory_inputs;
    element_array['$sftpData_inputs'] = $sftpData_inputs;

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