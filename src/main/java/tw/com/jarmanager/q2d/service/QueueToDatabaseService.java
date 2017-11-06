package tw.com.jarmanager.q2d.service;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import javax.jms.JMSException;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import tw.com.jarmanager.api.service.JarManagerAPIService;
import tw.com.jarmanager.api.vo.JarProjectVO;
import tw.com.jarmanager.q2w.web.mode.Clazz;
import tw.com.jarmanager.q2w.web.mode.Config;
import tw.com.jarmanager.q2w.web.mode.ConnectionFactory;
import tw.com.jarmanager.q2w.web.mode.FieldName;
import tw.com.jarmanager.q2w.web.mode.HeartBeatClient;
import tw.com.jarmanager.q2w.web.mode.HeartBeatClientVO;
import tw.com.jarmanager.q2w.web.mode.HeartBeatConnectionFactory;
import tw.com.jarmanager.q2w.web.mode.HeartBeatDestination;
import tw.com.jarmanager.q2w.web.mode.Q2W;
import tw.com.jarmanager.service.JarManagerService;
import tw.com.jarmanager.util.JarXMLUtil;
import tw.com.jarmanager.util.XmlUtil;

@Service
public class QueueToDatabaseService {

	private final static Logger logger = LoggerFactory.getLogger(QueueToDatabaseService.class);

	public String removeAllConfig(String fileName) throws JAXBException {

		String jarXmlPath = XmlUtil.getJarManagerConfig("jarXmlPath");
		String jarManagerPath = XmlUtil.getJarManagerConfig("jarManagerPath");

		String mes = "";
		try {
			String name = fileName + "-q2w-config";
			String path = jarXmlPath + fileName + "-q2w-config.xml";

			if (XmlUtil.fileExistsJarXmlPath(name)) {
				File file = new File(path);
				mes += file.delete() ? "[成功刪除] q2w-config.xml\n" : "[刪除失敗] q2w-config.xml\n";
			} else {
				mes += "[檔案不存在] q2w-config.xml\n";
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			mes += "[系統錯誤] q2w-config.xml\n";
		}
		try {
			String name = fileName + "-HeatBeatClinetBeans";
			String path = jarXmlPath + fileName + "-HeatBeatClinetBeans.xml";

			if (XmlUtil.fileExistsJarXmlPath(name)) {
				File file = new File(path);
				mes += file.delete() ? "[成功刪除] HeatBeatClinetBeans.xml\n" : "[刪除失敗] HeatBeatClinetBeans.xml\n";
			} else {
				mes += "[檔案不存在] HeatBeatClinetBeans.xml\n";
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			mes += "[系統錯誤] HeatBeatClinetBeans.xml\n";
		}

		try {

			File jarManagerFile = new File(jarManagerPath);
			if (jarManagerFile.exists() && !jarManagerFile.isDirectory()) {

				List<JarProjectVO> jarProjectVOs = new JarManagerService().getXMLJarPeojectVOs();

				boolean tagIsInXml = false;

				if (jarProjectVOs != null && jarProjectVOs.size() > 0) {
					for (JarProjectVO jarProjectVO : jarProjectVOs) {
						if (fileName.equals(jarProjectVO.getBeatID())) {
							jarProjectVO = JarXMLUtil.removePathInJarXmlPath(jarProjectVO);
							tagIsInXml = true;
						}
					}
				}
				mes += tagIsInXml ? (new Object() {
					public String getResult() {
						String resulit = "";
						List<String> ids = new ArrayList<String>();
						ids.add(fileName);
						try {
							resulit = new JarManagerService().deleteJarProjectVOXml(ids) ? "[成功刪除] JarManagerAPI.xml\n"
									: "[刪除失敗] JarManagerAPI.xml\n";
						} catch (Exception e) {
							resulit = "[系統錯誤] JarManagerAPI.xml\n";
						}
						return resulit;
					}
				}).getResult() : "[資料不存在] JarManagerAPI.xml\n";
			} else {
				mes += "[檔案不存在] JarManagerAPI.xml\n";
			}

		} catch (Exception e) {
			logger.error(e.getMessage());
			mes += "[系統錯誤] JarManagerAPI.xml\n";
		}

		try {
			String name = fileName + "-xmlconverter-config";
			String path = jarXmlPath + fileName + "-xmlconverter-config.xml";

			if (XmlUtil.fileExistsJarXmlPath(name)) {
				File file = new File(path);
				mes += file.delete() ? "[成功刪除] xmlconverter-config.xml\n" : "[刪除失敗] xmlconverter-config.xml\n";
			} else {
				mes += "[檔案不存在] xmlconverter-config.xml\n";
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			mes += "[系統錯誤] xmlconverter-config.xml\n";
		}
		return mes;
	}

	public String getObjToXml(Object obj, Class<?> classesToBeBound) throws JAXBException {

		JAXBContext context = null;
		Marshaller marshaller = null;
		StringWriter sw = new StringWriter();

		context = JAXBContext.newInstance(classesToBeBound);
		marshaller = context.createMarshaller();
		marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);

		marshaller.marshal(obj, sw);
		return sw.toString();
	}

	public Object getJarXmleToObj(String fileName, Class<?> classesToBeBound) {
		File file = null;
		Object object = null;
		String jarXmlPath = XmlUtil.getJarManagerConfig("jarXmlPath");
		try {
			file = new File(jarXmlPath + fileName + ".xml");

			JAXBContext jaxbContext = JAXBContext.newInstance(classesToBeBound);

			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
			object = jaxbUnmarshaller.unmarshal(file);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}
		return object;
	}

	public tw.com.jarmanager.q2w.web.mode.Clazz getHeartBeatVo(Q2W q2w, String fileName) {

		HeartBeatConnectionFactory heartBeatConnectionFactory = new HeartBeatConnectionFactory();
		HeartBeatDestination heartBeatDestination = new HeartBeatDestination();
		HeartBeatClientVO heartBeatClientVO = new HeartBeatClientVO();

		Config config = q2w.getConfig();

		ConnectionFactory connectionFactory = config.getConnectionFactory();
		HeartBeatClient heartBeatClient = config.getHeartBeatClient();

		heartBeatConnectionFactory.setHost(connectionFactory.getHost());
		heartBeatConnectionFactory.setPassword(connectionFactory.getPassword());
		heartBeatConnectionFactory.setPort(connectionFactory.getPort());
		heartBeatConnectionFactory.setUsername(connectionFactory.getUsername());
		heartBeatConnectionFactory.setVirtualHost("/");

		heartBeatClientVO.setBeatID(heartBeatClient.getBeatID());
		heartBeatClientVO.setTimeSeries(heartBeatClient.getTimeSeries());
		heartBeatClientVO.setFileName(fileName);

		heartBeatDestination.setDestinationName("jmsHeart");
		heartBeatDestination.setAmqp("true");
		heartBeatDestination.setAmqpQueueName("jmsHeart");
		heartBeatDestination.setAmqpExchangeName("jms.durable.queues");
		heartBeatDestination.setAmqpRoutingKey("jmsHeart");

		tw.com.jarmanager.q2w.web.mode.Clazz clazz = new tw.com.jarmanager.q2w.web.mode.Clazz();

		clazz.setHeartBeatClientVO(heartBeatClientVO);
		clazz.setHeartBeatConnectionFactory(heartBeatConnectionFactory);
		clazz.setHeartBeatDestination(heartBeatDestination);

		return clazz;
	}

	public boolean addJarProjectVOXml(Config config, String fileName) throws IOException, JMSException {
		HeartBeatClient heartBeatClient = config.getHeartBeatClient();
		JarProjectVO jarProjectVO = new JarProjectVO();
		jarProjectVO.setBeatID(heartBeatClient.getBeatID());
		jarProjectVO.setFileName(heartBeatClient.getFileName());
		jarProjectVO.setJarFilePath(heartBeatClient.getJarFilePath());
		jarProjectVO.setTimeSeries(heartBeatClient.getTimeSeries());
		List<String> filePathXMLList = new ArrayList<>();
		filePathXMLList.add(fileName + "-q2w-config");
		filePathXMLList.add(fileName + "-xmlconverter-config");
		filePathXMLList.add(fileName + "-HeatBeatClinetBeans");
		jarProjectVO.setFilePathXMLList(filePathXMLList);

		jarProjectVO = JarXMLUtil.addPathInJarXmlPath(jarProjectVO);

		return new JarManagerService().addJarProjectVOXml(jarProjectVO);
	}

	public String getJarFilePathFromJarApiXml(String id) throws IOException, JMSException {

		JarManagerService service = new JarManagerService();
		String jarFilePath = null;

		List<JarProjectVO> list = service.getXMLJarPeojectVOs();

		if (list != null && list.size() > 0) {
			for (JarProjectVO jarProjectVO : list) {
				if (id.equals(jarProjectVO.getBeatID())) {
					jarProjectVO = JarXMLUtil.removePathInJarXmlPath(jarProjectVO);
					jarFilePath = jarProjectVO.getJarFilePath();
				}
			}
		}
		return jarFilePath;

	}

	public boolean updateJarProjectVOXml(Config config, String fileName) throws IOException, JMSException {
		HeartBeatClient heartBeatClient = config.getHeartBeatClient();
		JarProjectVO jarProjectVO = new JarProjectVO();
		jarProjectVO.setBeatID(heartBeatClient.getBeatID());
		jarProjectVO.setFileName(heartBeatClient.getFileName());
		jarProjectVO.setJarFilePath(heartBeatClient.getJarFilePath());
		jarProjectVO.setTimeSeries(heartBeatClient.getTimeSeries());
		List<String> filePathXMLList = new ArrayList<>();
		filePathXMLList.add(fileName + "-q2w-config");
		filePathXMLList.add(fileName + "-xmlconverter-config");
		filePathXMLList.add(fileName + "-HeatBeatClinetBeans");
		jarProjectVO.setFilePathXMLList(filePathXMLList);

		jarProjectVO = JarXMLUtil.addPathInJarXmlPath(jarProjectVO);
		return new JarManagerService().updateJarProjectVOXml(jarProjectVO);
	}
}