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
    var $databaseConnectionFactory = $('#databaseConnectionFactoryData');
    var $tableSetting = $('#tableSettingData');
    var $queueConnectionFactory = $('#queueConnectionFactoryData');
    var $queueOrigin = $('#queueOriginData');

    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        $.fn.dataTable.tables({
            visible: true,
            api: true
        }).columns.adjust();
    });

    $("button[name=btn-import-data]").click(function(event) {

        $('input[name=beatID]', $heartBeatClient).val('test');
        $('input[name=fileName]', $heartBeatClient).val('test');
        $('input[name=timeSeries]', $heartBeatClient).val('60000');
        $('input[name=jarFilePath]', $heartBeatClient).val('D:\\jarFilePath\\Q2D.jar');

        $('input[name=dbUserName]', $databaseConnectionFactory).val('root');
        $('input[name=dbPassword]', $databaseConnectionFactory).val('root');
        $('input[name=dbURL]', $databaseConnectionFactory).val('jdbc:mysql://localhost/ian?useSSL=false');
        $('input[name=jdbcDriver]', $databaseConnectionFactory).val('com.mysql.jdbc.Driver');

        $('input[name=username]', $queueConnectionFactory).val('admin');
        $('input[name=password]', $queueConnectionFactory).val('password');
        $('input[name=host]', $queueConnectionFactory).val('192.168.112.199');
        $('input[name=port]', $queueConnectionFactory).val('5672');
        $('input[name=virtualHost]', $queueConnectionFactory).val('/');

        $('input[name=queueName]', $queueOrigin).val('ian');
        $('input[name=exchangeName]', $queueOrigin).val('exchange');
        $('input[name=routingKey]', $queueOrigin).val('ian');

        $insertTable.clear().draw();

        $insertTable.rows.add([{
            "name": 'product',
            "source": 'CompanyCode',
            "destination": 'productId',
            "type": 'VARCHAR'
        }, {
            "name": 'product',
            "source": 'WarehouseCode',
            "destination": 'productName',
            "type": 'VARCHAR'
        }, {
            "name": 'user',
            "source": 'CompanyCode',
            "destination": 'user_id',
            "type": 'VARCHAR'
        }]).draw();

        $('input[name=checkbox-group-select]', $insertTable.table().node())[0].checked = true;
        $('input[name=checkbox-group-select]', $insertTable.table().node())[1].checked = true;
        $('input[name=checkbox-group-select]', $insertTable.table().node())[2].checked = true;
        
        $updateTable.clear().draw();

        $updateTable.rows.add([{
            "name": 'product',
            "source": 'WarehouseCode',
            "destination": 'productName',
            "type": 'VARCHAR'
        }, {
            "name": 'product',
            "source": 'WarehouseCode',
            "destination": 'productId',
            "type": 'VARCHAR'
        }, {
            "name": 'user',
            "source": 'WarehouseCode',
            "destination": 'memo',
            "type": 'VARCHAR'
        }, {
            "name": 'user',
            "source": 'WarehouseCode',
            "destination": 'user_id',
            "type": 'VARCHAR'
        }]).draw();       
        $('input[name=checkbox-group-select]', $updateTable.table().node())[0].checked = true;
        $('input[name=checkbox-group-select]', $updateTable.table().node())[1].checked = true;
        $('input[name=checkbox-group-select]', $updateTable.table().node())[2].checked = true;
        $('input[name=checkbox-group-select]', $updateTable.table().node())[3].checked = true;
        
        $updateRelationTable.clear().draw();

        $updateRelationTable.rows.add([{
            "name": 'product',
            "source": 'CompanyCode',
            "destination": 'productId',
            "type": 'VARCHAR',
            "relation": '='
        }, {
            "name": 'user',
            "source": 'CompanyCode',
            "destination": 'user_id',
            "type": 'VARCHAR',
            "relation": '='
        }]).draw();       
        $('input[name=checkbox-group-select]', $updateRelationTable.table().node())[0].checked = true;
        $('input[name=checkbox-group-select]', $updateRelationTable.table().node())[1].checked = true;

        $deleteTable.rows.add([{
            "name": 'product',
            "source": 'CompanyCode',
            "destination": 'productId',
            "type": 'VARCHAR'
        }, {
            "name": 'user',
            "source": 'WarehouseCode',
            "destination": 'user_id',
            "type": 'VARCHAR'
        }]).draw();       
        $('input[name=checkbox-group-select]', $deleteTable.table().node())[0].checked = true;
        $('input[name=checkbox-group-select]', $deleteTable.table().node())[1].checked = true;
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

                    if (!fieldDataValidator($div, '設定檔', 'fileName')) return false;

                    var fileName = $('input[name=fileName]', $div).val();
                    var $button = this;
                    $button.disable();
                    $button.spin();
                    dialog.setClosable(false);
                    dialog.setMessage('進行中');

                    //Common Parameters
                    var vo = {},
                        q2d = {},
                        val = {},
                        tableNames = [],
                        tables = [],
                        cells,
                        $checkboxs,
                        condition = {};

                    //HeartBeat Client
                    val['beatID'] = fileName;
                    val['fileName'] = fileName;
                    val['timeSeries'] = $heartBeatClient.find('input[name=timeSeries]').val();
                    val['jarFilePath'] = $heartBeatClient.find('input[name=jarFilePath]').val();
                    q2d['heartBeatClient'] = val;
                    val = {};

                    //Database ConnectionFactory
                    val['dbUserName'] = $databaseConnectionFactory.find('input[name=dbUserName]').val();
                    val['dbPassword'] = $databaseConnectionFactory.find('input[name=dbPassword]').val();
                    val['dbURL'] = $databaseConnectionFactory.find('input[name=dbURL]').val();
                    val['jdbcDriver'] = $databaseConnectionFactory.find('input[name=jdbcDriver]').val();
                    q2d['databaseConnectionFactory'] = val;
                    val = {};

                    //Queue ConnectionFactory
                    val['username'] = $queueConnectionFactory.find('input[name=username]').val();
                    val['password'] = $queueConnectionFactory.find('input[name=password]').val();
                    val['host'] = $queueConnectionFactory.find('input[name=host]').val();
                    val['virtualHost'] = $queueConnectionFactory.find('input[name=virtualHost]').val();
                    val['port'] = $queueConnectionFactory.find('input[name=port]').val();
                    q2d['queueConnectionFactory'] = val;
                    val = {};

                    //Queue OriginData
                    val['queueName'] = $queueOrigin.find('input[name=queueName]').val();
                    val['exchangeName'] = $queueOrigin.find('input[name=exchangeName]').val();
                    val['routingKey'] = $queueOrigin.find('input[name=routingKey]').val();
                    q2d['queueOrigin'] = val;
                    val = {};

                    var Table = {};
                    
                    //Insert Table
                    cells = $insertTable.cells().nodes();
                    $checkboxs = $(cells).find('input[name=checkbox-group-select]:checked');

                    $checkboxs.each(function(index, checkbox) {

                        var row = $(checkbox).closest('tr');
                        var data = $("#insertTable").dataTable().fnGetData(row);
                        var tableName = data.name;

                        if ($.inArray(tableName, tableNames) == -1) {
                            tableNames.push(tableName);
                        }
                    });

                    $.each(tableNames, function(index, tableName) {

                        var tmp = [];
                        var table = {};
                        table['name'] = tableName;

                        $checkboxs.each(function(index, checkbox) {

                            var row = $(checkbox).closest('tr');
                            var data = $("#insertTable").dataTable().fnGetData(row);

                            if ($.inArray(data.name, tableNames) != -1) {

                                var field = {};
                                var fieldVal = {};
                                var tableDetail = {};

                                if (tableName == data.name) {

                                    fieldVal['source'] = data.source;
                                    fieldVal['destination'] = data.destination;
                                    fieldVal['type'] = data.type;

                                    tmp.push(fieldVal);
                                    table['field'] = tmp;
                                }
                            }

                        });
                        tables.push(table);
                    });
                    Table['table'] = tables;
                    q2d['insert'] = Table;
                    
                    tables = [];
                    tableNames = [];
                    Table = {};
                    
                    //Update Relation Table
                    
        			$.each( $updateRelationTable.rows().data() , function(index, data) {
        				condition[data.name] = data;
                    });
                    
                    //Update Table
                    cells = $updateTable.cells().nodes();
                    $checkboxs = $(cells).find('input[name=checkbox-group-select]:checked');

                    $checkboxs.each(function(index, checkbox) {

                        var row = $(checkbox).closest('tr');
                        var data = $("#updateTable").dataTable().fnGetData(row);
                        var tableName = data.name;

                        if ($.inArray(tableName, tableNames) == -1) {
                            tableNames.push(tableName);
                        }
                    });

                    $.each(tableNames, function(index, tableName) {

                        var tmp = [];
                        var table = {};
                        var con = {};
                        Table = {};
                        
                        table['name'] = tableName;

                        table['condition'] = condition[tableName];
                        
                        $checkboxs.each(function(index, checkbox) {

                            var row = $(checkbox).closest('tr');
                            var data = $("#updateTable").dataTable().fnGetData(row);

                            if ($.inArray(data.name, tableNames) != -1) {

                                var field = {};
                                var fieldVal = {};
                                var tableDetail = {};
                                
                                if (tableName == data.name) {

                                    fieldVal['source'] = data.source;
                                    fieldVal['destination'] = data.destination;
                                    fieldVal['type'] = data.type;
                                    
                                    tmp.push(fieldVal);
                                    table['field'] = tmp;
                                }
                            }

                        });
                        tables.push(table);
                    });

                    Table['table'] = tables;
                    q2d['update'] = Table;
                    
                    tables = [];
                    tableNames = [];
                    Table = {};

                    //Delete Table
                    cells = $deleteTable.cells().nodes();
                    $checkboxs = $(cells).find('input[name=checkbox-group-select]:checked');

                    $checkboxs.each(function(index, checkbox) {

                        var row = $(checkbox).closest('tr');
                        var data = $("#deleteTable").dataTable().fnGetData(row);
                        var tableName = data.name;

                        if ($.inArray(tableName, tableNames) == -1) {
                            tableNames.push(tableName);
                        }
                    });

                    $.each(tableNames, function(index, tableName) {

                        var tmp = [];
                        var table = {};
                        table['name'] = tableName;

                        $checkboxs.each(function(index, checkbox) {

                            var row = $(checkbox).closest('tr');
                            var data = $("#deleteTable").dataTable().fnGetData(row);

                            if ($.inArray(data.name, tableNames) != -1) {

                                var field = {};
                                var fieldVal = {};
                                var tableDetail = {};

                                if (tableName == data.name) {

                                    fieldVal['source'] = data.source;
                                    fieldVal['destination'] = data.destination;
                                    fieldVal['type'] = data.type;

                                    tmp.push(fieldVal);
                                    table['field'] = tmp;
                                }
                            }

                        });
                        tables.push(table);
                    });

                    Table['table'] = tables;
                    q2d['delete'] = Table;
                    
                    tables = [];
                    tableNames = [];
                    Table = {};
                    
                    vo['config'] = q2d;

                    $.ajax({
                        type: "POST",
                        datatype: "json",
                        contentType: "application/json; charset=utf-8",
                        url: "./q2d",
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
    
    $("button[name=btn-update]").click(function(event) {

        BootstrapDialog.show({
            title: '確認是否修改',
            buttons: [{
                label: '確認',
                action: function(dialog) {

                    if (!fieldDataValidator( $heartBeatClient , '設定檔', 'fileName')) return false;
                    
//                    if( !dataValidator() ) return false;

                    var fileName = $('input[name=fileName]', $heartBeatClient).val();
                    var $button = this;
                    $button.disable();
                    $button.spin();
                    dialog.setClosable(false);
                    dialog.setMessage('進行中');

                    //Common Parameters
                    var vo = {},
                        q2d = {},
                        val = {},
                        tableNames = [],
                        tables = [],
                        cells,
                        $checkboxs,
                        condition = {};

                    //HeartBeat Client
                    val['beatID'] = fileName;
                    val['fileName'] = fileName;
                    val['timeSeries'] = $heartBeatClient.find('input[name=timeSeries]').val();
                    val['jarFilePath'] = $heartBeatClient.find('input[name=jarFilePath]').val();
                    q2d['heartBeatClient'] = val;
                    val = {};

                    //Database ConnectionFactory
                    val['dbUserName'] = $databaseConnectionFactory.find('input[name=dbUserName]').val();
                    val['dbPassword'] = $databaseConnectionFactory.find('input[name=dbPassword]').val();
                    val['dbURL'] = $databaseConnectionFactory.find('input[name=dbURL]').val();
                    val['jdbcDriver'] = $databaseConnectionFactory.find('input[name=jdbcDriver]').val();
                    q2d['databaseConnectionFactory'] = val;
                    val = {};

                    //Queue ConnectionFactory
                    val['username'] = $queueConnectionFactory.find('input[name=username]').val();
                    val['password'] = $queueConnectionFactory.find('input[name=password]').val();
                    val['host'] = $queueConnectionFactory.find('input[name=host]').val();
                    val['virtualHost'] = $queueConnectionFactory.find('input[name=virtualHost]').val();
                    val['port'] = $queueConnectionFactory.find('input[name=port]').val();
                    q2d['queueConnectionFactory'] = val;
                    val = {};

                    //Queue OriginData
                    val['queueName'] = $queueOrigin.find('input[name=queueName]').val();
                    val['exchangeName'] = $queueOrigin.find('input[name=exchangeName]').val();
                    val['routingKey'] = $queueOrigin.find('input[name=routingKey]').val();
                    q2d['queueOrigin'] = val;
                    val = {};

                    var Table = {};
                    
                    //Insert Table
                    cells = $insertTable.cells().nodes();
                    $checkboxs = $(cells).find('input[name=checkbox-group-select]:checked');

                    $checkboxs.each(function(index, checkbox) {

                        var row = $(checkbox).closest('tr');
                        var data = $("#insertTable").dataTable().fnGetData(row);
                        var tableName = data.name;

                        if ($.inArray(tableName, tableNames) == -1) {
                            tableNames.push(tableName);
                        }
                    });

                    $.each(tableNames, function(index, tableName) {

                        var tmp = [];
                        var table = {};
                        table['name'] = tableName;

                        $checkboxs.each(function(index, checkbox) {

                            var row = $(checkbox).closest('tr');
                            var data = $("#insertTable").dataTable().fnGetData(row);

                            if ($.inArray(data.name, tableNames) != -1) {

                                var field = {};
                                var fieldVal = {};
                                var tableDetail = {};

                                if (tableName == data.name) {

                                    fieldVal['source'] = data.source;
                                    fieldVal['destination'] = data.destination;
                                    fieldVal['type'] = data.type;

                                    tmp.push(fieldVal);
                                    table['field'] = tmp;
                                }
                            }

                        });
                        tables.push(table);
                    });
                    Table['table'] = tables;
                    q2d['insert'] = Table;
                    
                    tables = [];
                    tableNames = [];
                    Table = {};
                    
                    //Update Relation Table
                    
        			$.each( $updateRelationTable.rows().data() , function(index, data) {
        				condition[data.name] = data;
                    });
                    
                    //Update Table
                    cells = $updateTable.cells().nodes();
                    $checkboxs = $(cells).find('input[name=checkbox-group-select]:checked');

                    $checkboxs.each(function(index, checkbox) {

                        var row = $(checkbox).closest('tr');
                        var data = $("#updateTable").dataTable().fnGetData(row);
                        var tableName = data.name;

                        if ($.inArray(tableName, tableNames) == -1) {
                            tableNames.push(tableName);
                        }
                    });

                    $.each(tableNames, function(index, tableName) {

                        var tmp = [];
                        var table = {};
                        var con = {};
                        Table = {};
                        
                        table['name'] = tableName;

                        table['condition'] = condition[tableName];
                        
                        $checkboxs.each(function(index, checkbox) {

                            var row = $(checkbox).closest('tr');
                            var data = $("#updateTable").dataTable().fnGetData(row);

                            if ($.inArray(data.name, tableNames) != -1) {

                                var field = {};
                                var fieldVal = {};
                                var tableDetail = {};
                                
                                if (tableName == data.name) {

                                    fieldVal['source'] = data.source;
                                    fieldVal['destination'] = data.destination;
                                    fieldVal['type'] = data.type;
                                    
                                    tmp.push(fieldVal);
                                    table['field'] = tmp;
                                }
                            }

                        });
                        tables.push(table);
                    });

                    Table['table'] = tables;
                    q2d['update'] = Table;
                    
                    tables = [];
                    tableNames = [];
                    Table = {};

                    //Delete Table
                    cells = $deleteTable.cells().nodes();
                    $checkboxs = $(cells).find('input[name=checkbox-group-select]:checked');

                    $checkboxs.each(function(index, checkbox) {

                        var row = $(checkbox).closest('tr');
                        var data = $("#deleteTable").dataTable().fnGetData(row);
                        var tableName = data.name;

                        if ($.inArray(tableName, tableNames) == -1) {
                            tableNames.push(tableName);
                        }
                    });

                    $.each(tableNames, function(index, tableName) {

                        var tmp = [];
                        var table = {};
                        table['name'] = tableName;

                        $checkboxs.each(function(index, checkbox) {

                            var row = $(checkbox).closest('tr');
                            var data = $("#deleteTable").dataTable().fnGetData(row);

                            if ($.inArray(data.name, tableNames) != -1) {

                                var field = {};
                                var fieldVal = {};
                                var tableDetail = {};

                                if (tableName == data.name) {

                                    fieldVal['source'] = data.source;
                                    fieldVal['destination'] = data.destination;
                                    fieldVal['type'] = data.type;

                                    tmp.push(fieldVal);
                                    table['field'] = tmp;
                                }
                            }

                        });
                        tables.push(table);
                    });

                    Table['table'] = tables;
                    q2d['delete'] = Table;
                    
                    tables = [];
                    tableNames = [];
                    Table = {};
                    
                    vo['config'] = q2d;

                    $.ajax({
                        type: "PUT",
                        datatype: "json",
                        contentType: "application/json; charset=utf-8",
                        url: "./q2d",
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
                        url: "./q2d/delete/" + fileName,
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
            url: "./q2d/search/" + fileName,
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

                                var heartBeatClient = data.config.heartBeatClient;
                                var databaseConnectionFactory = data.config.databaseConnectionFactory;
                                var queueConnectionFactory = data.config.queueConnectionFactory;
                                var queueOrigin = data.config.queueOrigin;

                                $('input[name=beatID]', $heartBeatClient).val( heartBeatClient.beatID );
                                $('input[name=fileName]', $heartBeatClient).val( heartBeatClient.fileName );
                                $('input[name=timeSeries]', $heartBeatClient).val( heartBeatClient.timeSeries );
                                $('input[name=jarFilePath]', $heartBeatClient).val( heartBeatClient.jarFilePath );

                                $('input[name=dbUserName]', $databaseConnectionFactory).val( databaseConnectionFactory.dbUserName );
                                $('input[name=dbPassword]', $databaseConnectionFactory).val( databaseConnectionFactory.dbPassword );
                                $('input[name=dbURL]', $databaseConnectionFactory).val( databaseConnectionFactory.dbURL );
                                $('input[name=jdbcDriver]', $databaseConnectionFactory).val( databaseConnectionFactory.jdbcDriver );

                                $('input[name=username]', $queueConnectionFactory).val( queueConnectionFactory.username );
                                $('input[name=password]', $queueConnectionFactory).val( queueConnectionFactory.password );
                                $('input[name=host]', $queueConnectionFactory).val( queueConnectionFactory.host );
                                $('input[name=port]', $queueConnectionFactory).val( queueConnectionFactory.port );
                                $('input[name=virtualHost]', $queueConnectionFactory).val( queueConnectionFactory.virtualHost );

                                $('input[name=queueName]', $queueOrigin).val( queueOrigin.queueName );
                                $('input[name=exchangeName]', $queueOrigin).val( queueOrigin.exchangeName );
                                $('input[name=routingKey]', $queueOrigin).val( queueOrigin.routingKey );

                                $insertTable.clear().draw();
                                $updateRelationTable.clear().draw();
                                $updateTable.clear().draw();
                                $deleteTable.clear().draw();

                                $.each(data.config.insert.table, function(index, item) {

                                    $.each(item.field, function(i, field) {
                                    	field.name = item.name;
                                    	$insertTable.rows.add([field]).draw();
                                    });
                                });

                                $.each(data.config.update.table, function(index, item) {

                                	var condition = item.condition;
                                	
                                	condition.name = item.name;
                                	$updateRelationTable.rows.add([condition]).draw();
                                });
                                
                                $.each(data.config.update.table, function(index, item) {
                                	
                                    $.each(item.field, function(i, update) {
                                    	update.name = item.name;
                                    	$updateTable.rows.add([update]).draw();
                                    });
                                });
                                
                                $.each(data.config.delete.table, function(index, item) {

                                	$.each(item.field, function(i, del) {
                                    	del.name = item.name;
                                    	$deleteTable.rows.add([del]).draw();
                                    });
                                });
                                
                                checkedAll( $("#insertTable") );
                                checkedAll( $("#updateRelationTable") );
                                checkedAll( $("#updateTable") );
                                checkedAll( $("#deleteTable") );

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
    
    $insertTable = $("#insertTable").DataTable({
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
        }, {
            "title": "表格名稱",
            "data": "name",
            "defaultContent": ""
        }, {
            "title": "來源欄位",
            "data": "source",
            "defaultContent": ""
        }, {
            "title": "目標欄位",
            "data": "destination",
            "defaultContent": ""
        }, {
            "title": "型態",
            "data": "type",
            "defaultContent": ""
        }, {
            "title": "功能",
            "data": null,
            "defaultContent": ""
        }],
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

                var $table = $("#insertTable");
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

                var $checkedboxs = $('#insertTable input[name=checkbox-group-select]:checked');

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
                                $insertTable
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
                                buildInput('名稱', '表格名稱', 'name'),
                                buildInput('來源', '來源欄位', 'source'),
                                buildInput('目標', '目標欄位', 'destination'),
                                buildInput('型態', '欄位型態', 'type')
                            );

                        return $dialog;
                    },
                    buttons: [{
                        label: '確認',
                        action: function(dialog) {

                            var $name = $dialog.find('input[name=name]');
                            var $source = $dialog.find('input[name=source]');
                            var $destination = $dialog.find('input[name=destination]');
                            var $type = $dialog.find('input[name=type]');

                            $insertTable.row.add({
                                "name": $name.val(),
                                "source": $source.val(),
                                "destination": $destination.val(),
                                "type": $type.val()
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

    $updateTable = $("#updateTable").DataTable({
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
        }, {
            "title": "表格名稱",
            "data": "name",
            "defaultContent": ""
        }, {
            "title": "來源欄位",
            "data": "source",
            "defaultContent": ""
        }, {
            "title": "目標欄位",
            "data": "destination",
            "defaultContent": ""
        }, {
            "title": "型態",
            "data": "type",
            "defaultContent": ""
        }, {
            "title": "功能",
            "data": null,
            "defaultContent": ""
        }],
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

                var $table = $("#updateTable");
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

                var $checkedboxs = $('#updateTable input[name=checkbox-group-select]:checked');

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
                                $updateTable
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
                                buildInput('名稱', '表格名稱', 'name'),
                                buildInput('來源', '來源欄位', 'source'),
                                buildInput('目標', '目標欄位', 'destination'),
                                buildInput('型態', '欄位型態', 'type')
                            );

                        return $dialog;
                    },
                    buttons: [{
                        label: '確認',
                        action: function(dialog) {

                            var $name = $dialog.find('input[name=name]');
                            var $source = $dialog.find('input[name=source]');
                            var $destination = $dialog.find('input[name=destination]');
                            var $type = $dialog.find('input[name=type]');

                            $updateTable.row.add({
                                "name": $name.val(),
                                "source": $source.val(),
                                "destination": $destination.val(),
                                "type": $type.val()
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
    
    $updateRelationTable = $("#updateRelationTable").DataTable({
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
        }, {
            "title": "表格名稱",
            "data": "name",
            "defaultContent": ""
        }, {
            "title": "來源欄位",
            "data": "source",
            "defaultContent": ""
        }, {
            "title": "目標欄位",
            "data": "destination",
            "defaultContent": ""
        }, {
            "title": "型態",
            "data": "type",
            "defaultContent": ""
        }, {
            "title": "規則",
            "data": "relation",
            "defaultContent": ""
        }, {
            "title": "功能",
            "data": null,
            "defaultContent": ""
        }],
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

                var $table = $("#updateRelationTable");
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

                var $checkedboxs = $('#updateRelationTable input[name=checkbox-group-select]:checked');

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
                                $updateRelationTable
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
            	
//            	console.log($updateRelationTable.rows().data());
            	
                var $dialog;

                BootstrapDialog.show({
                    title: '新增',
                    message: function(dialog) {

                        $dialog =
                            $('<div/>').append(
                                buildInput('名稱', '表格名稱', 'name'),
                                buildInput('來源', '來源欄位', 'source'),
                                buildInput('目標', '目標欄位', 'destination'),
                                buildInput('型態', '欄位型態', 'type'),
                                buildInput('規則', '比對規則', 'relation')
                            );

                        return $dialog;
                    },
                    buttons: [{
                        label: '確認',
                        action: function(dialog) {

                            var $name = $dialog.find('input[name=name]');
                            var $source = $dialog.find('input[name=source]');
                            var $destination = $dialog.find('input[name=destination]');
                            var $type = $dialog.find('input[name=type]');
                            var $relation = $dialog.find('input[name=relation]');

                            $updateRelationTable.row.add({
                                "name": $name.val(),
                                "source": $source.val(),
                                "destination": $destination.val(),
                                "type": $type.val(),
                                "relation": $relation.val()
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
    
    $deleteTable = $("#deleteTable").DataTable({
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
        }, {
            "title": "表格名稱",
            "data": "name",
            "defaultContent": ""
        }, {
            "title": "來源欄位",
            "data": "source",
            "defaultContent": ""
        }, {
            "title": "目標欄位",
            "data": "destination",
            "defaultContent": ""
        }, {
            "title": "型態",
            "data": "type",
            "defaultContent": ""
        }, {
            "title": "功能",
            "data": null,
            "defaultContent": ""
        }],
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

                var $table = $("#deleteTable");
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

                var $checkedboxs = $('#deleteTable input[name=checkbox-group-select]:checked');

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
                                $deleteTable
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
                                buildInput('名稱', '表格名稱', 'name'),
                                buildInput('來源', '來源欄位', 'source'),
                                buildInput('目標', '目標欄位', 'destination'),
                                buildInput('型態', '欄位型態', 'type')
                            );

                        return $dialog;
                    },
                    buttons: [{
                        label: '確認',
                        action: function(dialog) {

                            var $name = $dialog.find('input[name=name]');
                            var $source = $dialog.find('input[name=source]');
                            var $destination = $dialog.find('input[name=destination]');
                            var $type = $dialog.find('input[name=type]');

                            $deleteTable.row.add({
                                "name": $name.val(),
                                "source": $source.val(),
                                "destination": $destination.val(),
                                "type": $type.val()
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
    
    //註冊修改功能
    registerBtnForDt();
});


function registerBtnForDt() {
    var dtArray = ['insertTable', 'updateTable', 'deleteTable'];
    $.each(dtArray, function(index, id) {

        var $dt = $("#" + id);

        $dt.on("click", 'button[name=dt-btn-update]', function() {

            var row = this.closest("tr");
            var data = $dt.DataTable().row(row).data();

            var $name = buildInput('名稱', '表格名稱', 'name');
            var $source = buildInput('來源', '來源欄位', 'source');
            var $destination = buildInput('目標', '目標欄位', 'destination');
            var $type = buildInput('型態', '欄位型態', 'type');

            $('input', $name).val(data.name);
            $('input', $source).val(data.source);
            $('input', $destination).val(data.destination);
            $('input', $type).val(data.type);

            BootstrapDialog.show({
                title: '修改',
                message: function(dialog) {

                    var $content =
                        $('<div/>').append(
                            $name,
                            $source,
                            $destination,
                            $type
                        );

                    return $content;
                },
                buttons: [{
                    label: '確認',
                    action: function(dialog) {

                        data.name = $('input', $name).val();
                        data.source = $('input', $source).val();
                        data.destination = $('input', $destination).val();
                        data.type = $('input', $type).val();

                        $dt.DataTable().row(row)
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
    });
}

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
function checkedAll( $table ){
    var $chkbox_all = $('input[type="checkbox"]', $table);
    var $chkbox_checked = $('input[type="checkbox"]:checked', $table);

    if ($chkbox_checked.length === 0) {

        $chkbox_all.each(function() {
            $(this).prop("checked", true);
            $(this).addClass("toggleon");
        });
    }
}