package tw.com.jarmanager.q2sftp.service;

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

import tw.com.heartbeat.clinet.vo.HeartBeatClientVO;
import tw.com.heartbeat.clinet.vo.HeartBeatClientXMLVO;
import tw.com.heartbeat.clinet.vo.HeartBeatConnectionFactoryVO;
import tw.com.heartbeat.clinet.vo.HeartBeatDestinationVO;
import tw.com.jarmanager.api.vo.JarProjectVO;
import tw.com.jarmanager.q2sftp.mode.BankPro;
import tw.com.jarmanager.q2sftp.mode.QueueConnectionFactory;
import tw.com.jarmanager.service.JarManagerService;
import tw.com.jarmanager.util.JarXMLUtil;
import tw.com.jarmanager.util.XmlUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class QueueToSFTPService {

	private final static Logger logger = LoggerFactory.getLogger(QueueToSFTPService.class);

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

	public HeartBeatClientXMLVO getHeartBeatClientXMLVO(BankPro bankPro) {
		QueueConnectionFactory queueConnectionFactory = bankPro.getQueueConnectionFactory();

		HeartBeatClientVO heartBeatClientVO = new HeartBeatClientVO();

		heartBeatClientVO.setBeatID(bankPro.getHeartBeatClient().getBeatID());
		heartBeatClientVO.setFileName(bankPro.getHeartBeatClient().getFileName());
		heartBeatClientVO.setTimeSeries(bankPro.getHeartBeatClient().getTimeSeries());

		HeartBeatConnectionFactoryVO heartBeatConnectionFactoryVO = new HeartBeatConnectionFactoryVO();

		heartBeatConnectionFactoryVO.setHost(queueConnectionFactory.getHost());
		heartBeatConnectionFactoryVO.setPassword(queueConnectionFactory.getHost());
		heartBeatConnectionFactoryVO.setPort(queueConnectionFactory.getPort());
		heartBeatConnectionFactoryVO.setUsername(queueConnectionFactory.getUsername());
		heartBeatConnectionFactoryVO.setVirtualHost(queueConnectionFactory.getVirtualHost());

		HeartBeatDestinationVO heartBeatDestinationVO = new HeartBeatDestinationVO();

		heartBeatDestinationVO.setDestinationName("jmsHeart");
		heartBeatDestinationVO.setAmqp(true);
		heartBeatDestinationVO.setAmqpQueueName("jmsHeart");
		heartBeatDestinationVO.setAmqpExchangeName("jms.durable.queues");
		heartBeatDestinationVO.setAmqpRoutingKey("jmsHeart");

		HeartBeatClientXMLVO heartBeatClientXMLVO = new HeartBeatClientXMLVO();
		heartBeatClientXMLVO.setHeartBeatClientVO(heartBeatClientVO);
		heartBeatClientXMLVO.setHeartBeatConnectionFactoryVO(heartBeatConnectionFactoryVO);
		heartBeatClientXMLVO.setDestination(heartBeatDestinationVO);
		return heartBeatClientXMLVO;

	}

	public boolean addJarProjectVOXml(BankPro bankPro) throws IOException, JMSException {

		JarProjectVO jarProjectVO = new JarProjectVO();

		jarProjectVO.setBeatID(bankPro.getHeartBeatClient().getBeatID());
		jarProjectVO.setFileName(bankPro.getHeartBeatClient().getFileName());
		jarProjectVO.setJarFilePath(bankPro.getHeartBeatClient().getJarFilePath());
		jarProjectVO.setTimeSeries(bankPro.getHeartBeatClient().getTimeSeries());

		String fileName = bankPro.getHeartBeatClient().getFileName();

		List<String> filePathXMLList = new ArrayList<>();
		filePathXMLList.add(fileName + "-q2ftp-config");
		filePathXMLList.add(fileName + "-q2ftp-HeatBeatClinetBeans");
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

	public boolean updateJarProjectVOXml(BankPro bankPro) throws IOException, JMSException {
		JarProjectVO jarProjectVO = new JarProjectVO();

		jarProjectVO.setBeatID(bankPro.getHeartBeatClient().getBeatID());
		jarProjectVO.setFileName(bankPro.getHeartBeatClient().getFileName());
		jarProjectVO.setJarFilePath(bankPro.getHeartBeatClient().getJarFilePath());
		jarProjectVO.setTimeSeries(bankPro.getHeartBeatClient().getTimeSeries());

		String fileName = bankPro.getHeartBeatClient().getFileName();

		List<String> filePathXMLList = new ArrayList<>();
		filePathXMLList.add(fileName + "-q2ftp-config");
		filePathXMLList.add(fileName + "-q2ftp-HeatBeatClinetBeans");
		jarProjectVO.setFilePathXMLList(filePathXMLList);

		jarProjectVO = JarXMLUtil.addPathInJarXmlPath(jarProjectVO);

		return new JarManagerService().updateJarProjectVOXml(jarProjectVO);
	}

	public String removeAllConfig(String fileName) throws JAXBException {

		String jarXmlPath = XmlUtil.getJarManagerConfig("jarXmlPath");
		String jarManagerPath = XmlUtil.getJarManagerConfig("jarManagerPath");

		String mes = "";
		try {
			String name = fileName + "-q2ftp-config";
			String path = jarXmlPath + fileName + "-q2ftp-config.xml";

			if (XmlUtil.fileExistsJarXmlPath(name)) {
				File file = new File(path);
				mes += file.delete() ? "[成功刪除] q2ftp-config.xml\n" : "[刪除失敗] q2ftp-config.xml\n";
			} else {
				mes += "[檔案不存在] q2ftp-config.xml\n";
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			mes += "[系統錯誤] q2ftp-config.xml\n";
		}
		try {
			String name = fileName + "-q2ftp-HeatBeatClinetBeans";
			String path = jarXmlPath + fileName + "-q2ftp-HeatBeatClinetBeans.xml";

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
		return mes;
	}
}