package tw.com.jarmanager.q2d.web;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import tw.com.jarmanager.api.vo.JarProjectVO;
import tw.com.jarmanager.q2d.service.QueueToDatabaseService;
import tw.com.jarmanager.q2d.web.mode.Config;
import tw.com.jarmanager.q2d.web.mode.DatabaseConnectionFactory;
import tw.com.jarmanager.q2d.web.mode.Delete;
import tw.com.jarmanager.q2d.web.mode.Field;
import tw.com.jarmanager.q2d.web.mode.HeartBeatClient;
import tw.com.jarmanager.q2d.web.mode.Insert;
import tw.com.jarmanager.q2d.web.mode.Q2D;
import tw.com.jarmanager.q2d.web.mode.QueueConnectionFactory;
import tw.com.jarmanager.q2d.web.mode.QueueOrigin;
import tw.com.jarmanager.q2d.web.mode.Table;
import tw.com.jarmanager.q2d.web.mode.Update;
import tw.com.jarmanager.util.XmlUtil;

@Controller
@RequestMapping("/q2d")
public class QueueToDatabaseController {

	private final Logger logger = LoggerFactory.getLogger(QueueToDatabaseController.class);

	private final QueueToDatabaseService service;

	@Autowired
	public QueueToDatabaseController(QueueToDatabaseService service) {
		this.service = service;
	}

	@RequestMapping(method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public @ResponseBody String dataToFile(@RequestBody Q2D q2d) throws Exception {

		String xml = null, fileName = null, mes = "";
//		System.out.println();
//		System.out.println(new Gson().toJson(q2d));
//		System.out.println();
		mes = new Gson().toJson(q2d);
		
		Q2D q2d2 = new Q2D();
		Config config = new Config();
		QueueConnectionFactory queueConnectionFactory = new QueueConnectionFactory();
		DatabaseConnectionFactory databaseConnectionFactory = new DatabaseConnectionFactory();
		QueueOrigin queueOrigin = new QueueOrigin();
		HeartBeatClient heartBeatClient = new HeartBeatClient();
		Insert insert = new Insert();
		Delete delete = new Delete();
		Update update = new Update();
		
		queueConnectionFactory.setHost("192.168.112.199");
		queueConnectionFactory.setPassword("password");
		queueConnectionFactory.setPort("5672");
		queueConnectionFactory.setUsername("admin");
		
		databaseConnectionFactory.setJdbcDriver("com.mysql.jdbc.Driver");
		databaseConnectionFactory.setDbURL("jdbc:mysql://localhost/ian?useSSL=false");
		databaseConnectionFactory.setDbUserName("root");
		databaseConnectionFactory.setDbPassword("root");
		
		queueOrigin.setExchangeName("exchange");
		queueOrigin.setRoutingKey("ian");
		queueOrigin.setQueueName("ian");
		
		heartBeatClient.setBeatID("Q2D");
		heartBeatClient.setFileName("Q2D");
		heartBeatClient.setTimeSeries(60000);
		
		Table product = new Table();
		product.setName("product");
		
		Field field = new Field();
		field.setSource("CompanyCode");
		field.setDestination("productId");
		field.setType("VARCHAR");
		
		List<Field> fields = new ArrayList<>();
		fields.add(field); 
		fields.add(field); 
		fields.add(field);

		product.setField(fields);
		
		List<Table> tables = new ArrayList<>();
		tables.add(product);
		tables.add(product);
		tables.add(product);
		
		insert.setTable(tables);
		delete.setTable(tables);
		update.setTable(tables);
		
		config.setDatabaseConnectionFactory(databaseConnectionFactory);
		config.setDelete(delete);
		config.setHeartBeatClient(heartBeatClient);
		config.setInsert(insert);
		config.setQueueConnectionFactory(queueConnectionFactory);
		config.setQueueOrigin(queueOrigin);
		config.setUpdate(update);
		
		q2d2.setConfig(config);

		mes = new Gson().toJson(q2d2);
		
//		try {
//			fileName = q2d.getConfig().getHeartBeatClient().getFileName();
//		} catch (NullPointerException e) {
//			logger.error("Can not get the file name");
//			return "Can not get the file name";
//		}
		
//		try {
//			String name = fileName + "-q2d-config";
//
//			if (!XmlUtil.fileExistsJarXmlPath(name)) {
//				xml = service.getObjToXml(q2d.getConfig(), Config.class);
//				XmlUtil.fileToJarXmlPath(name, false, xml);
//				mes += "[成功] q2d-config.xml\n";
//			} else {
//				mes += "[已存在] q2d-config.xml\n";
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//			logger.error(e.getMessage());
//			mes += "[失敗] q2d-config.xml\n";
//		}
		// String mes = "";
		// System.out.println(arg0);
		return mes;
	}

}