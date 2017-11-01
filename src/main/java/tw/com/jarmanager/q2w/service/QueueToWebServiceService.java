package tw.com.jarmanager.q2w.service;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import javax.jms.JMSException;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.stereotype.Service;

import tw.com.jarmanager.api.service.JarManagerAPIService;
import tw.com.jarmanager.api.vo.JarProjectVO;
import tw.com.jarmanager.q2w.web.mode.Config;
import tw.com.jarmanager.q2w.web.mode.ConnectionFactory;
import tw.com.jarmanager.q2w.web.mode.HeartBeatClient;
import tw.com.jarmanager.q2w.web.mode.HeartBeatClientVO;
import tw.com.jarmanager.q2w.web.mode.HeartBeatConnectionFactory;
import tw.com.jarmanager.q2w.web.mode.HeartBeatDestination;
import tw.com.jarmanager.q2w.web.mode.Q2W;
import tw.com.jarmanager.service.JarManagerService;

@Service
public class QueueToWebServiceService {

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

	public tw.com.jarmanager.q2w.web.mode.Class getHeartBeatVo(Q2W q2w, String fileName) {

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

		heartBeatClientVO.setBeatID(heartBeatClient.getBeatID());
		heartBeatClientVO.setTimeSeries(heartBeatClient.getTimeSeries());
		heartBeatClientVO.setFileName(fileName);

		heartBeatDestination.setDestinationName("jmsHeart");
		heartBeatDestination.setAmqp("true");
		heartBeatDestination.setAmqpQueueName("jmsHeart");
		heartBeatDestination.setAmqpExchangeName("jms.durable.queues");
		heartBeatDestination.setAmqpRoutingKey("jmsHeart");

		tw.com.jarmanager.q2w.web.mode.Class clazz = new tw.com.jarmanager.q2w.web.mode.Class();

		clazz.setHeartBeatClientVO(heartBeatClientVO);
		clazz.setHeartBeatConnectionFactory(heartBeatConnectionFactory);
		clazz.setHeartBeatDestination(heartBeatDestination);

		return clazz;
	}
	
	public boolean addJarProjectVOXml(Config config,String fileName) throws IOException, JMSException {
		HeartBeatClient heartBeatClient = config.getHeartBeatClient();
		JarProjectVO jarProjectVO = new JarProjectVO();
		jarProjectVO.setBeatID(heartBeatClient.getBeatID());
		jarProjectVO.setFileName(heartBeatClient.getFileName());
		jarProjectVO.setJarFilePath(heartBeatClient.getJarFilePath());
		jarProjectVO.setTimeSeries(heartBeatClient.getTimeSeries());
		List<String> filePathXMLList = new ArrayList<>();
		filePathXMLList.add(fileName+"-q2w-config");
		filePathXMLList.add(fileName+"-xmlconverter-config");
		filePathXMLList.add(fileName+"-HeatBeatClinetBeans");
		jarProjectVO.setFilePathXMLList(filePathXMLList);
		return new JarManagerService().addJarProjectVOXml(jarProjectVO);
	}
}
