package tw.com.jarmanager.service;

import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.lang.management.RuntimeMXBean;
import java.util.List;

import javax.jms.JMSException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.stereotype.Service;

import tw.com.heartbeat.clinet.vo.HeartBeatClientVO;
import tw.com.jarmanager.api.service.JarManagerAPIService;
import tw.com.jarmanager.api.vo.JarManagerAPIXMLVO;
import tw.com.jarmanager.api.vo.JarProjectVO;

@Service
public class JarManagerService {

	private final Logger logger = LoggerFactory.getLogger(JarManagerService.class);


	public List<HeartBeatClientVO> getSoleHeartBeatClientVOList() throws JMSException {
		ApplicationContext context = new FileSystemXmlApplicationContext("classpath:jarmanager-config.xml");
		String xmlpath = (String) context.getBean("jarManagerPath");
		JarManagerAPIService.setXmlFilePath(xmlpath);

		List<HeartBeatClientVO> heartBeatClientVOList = JarManagerAPIService.getSoleHeartBeatClientVOList();

		return heartBeatClientVOList;

	}

	public List<JarProjectVO> getJarProjectVOStatus() throws IOException, JMSException {
		ApplicationContext context = new FileSystemXmlApplicationContext("classpath:jarmanager-config.xml");
		String xmlpath = (String) context.getBean("jarManagerPath");
		JarManagerAPIService.setXmlFilePath(xmlpath);

		List<JarProjectVO> jarProjectVOList = JarManagerAPIService.getJarProjectVOStatus("127.0.0.1", 9527);

		return jarProjectVOList;

	}
	
	public boolean jarManagerIsRun() {
		List<JarProjectVO> jarProjectVOList = null;
		try {
			jarProjectVOList = getJarProjectVOStatus();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JMSException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (jarProjectVOList == null) {
			return false;
		} else {
			return true;
		}
	}
	
	
	public List<JarProjectVO> getJarProjectVOStatusForUI() throws IOException, JMSException {
		List<JarProjectVO> jarProjectVOStatuss = getJarProjectVOStatus();
		List<JarProjectVO> xMLJarPeojectVOs = getXMLJarPeojectVOs();
		if (jarProjectVOStatuss != null) {
			for (JarProjectVO xMLJarPeojectVO : xMLJarPeojectVOs) {
				for (JarProjectVO jarProjectVOStatus : jarProjectVOStatuss) {
					String xMLJarVOBeatID = xMLJarPeojectVO.getBeatID();
					String jarVOStatusBeatID = jarProjectVOStatus.getBeatID();

					if (xMLJarVOBeatID.equals(jarVOStatusBeatID)) {
						xMLJarPeojectVO.setFirstSuccessRun(jarProjectVOStatus.getFirstSuccessRun());
						xMLJarPeojectVO.setNotFindCount(jarProjectVOStatus.getNotFindCount());
						xMLJarPeojectVO.setPid(jarProjectVOStatus.getPid());
						xMLJarPeojectVO.setNeedRun(jarProjectVOStatus.getNeedRun());
					}
				}

			}
		}

		return xMLJarPeojectVOs;
	}

	public List<JarProjectVO> getXMLJarPeojectVOs() throws IOException, JMSException {
		ApplicationContext context = new FileSystemXmlApplicationContext("classpath:jarmanager-config.xml");
		String xmlpath = (String) context.getBean("jarManagerPath");
		JarManagerAPIService.setXmlFilePath(xmlpath);

		List<JarProjectVO> jarProjectVOList = JarManagerAPIService.getXMLJarProjectVOList(xmlpath);

		return jarProjectVOList;

	}
	
	
	public JarManagerAPIXMLVO getJarManagerAPIXMLVO() {
		ApplicationContext context = new FileSystemXmlApplicationContext("classpath:jarmanager-config.xml");
		String xmlpath = (String) context.getBean("jarManagerPath");
		JarManagerAPIService.setXmlFilePath(xmlpath);

		JarManagerAPIXMLVO jarManagerAPIXMLVO = JarManagerAPIService.getJarManagerAPIXMLVO();

		return jarManagerAPIXMLVO;
	}

	public boolean addJarProjectVOXml(JarProjectVO jarProjectVO) throws IOException, JMSException {
		ApplicationContext context = new FileSystemXmlApplicationContext("classpath:jarmanager-config.xml");
		String xmlpath = (String) context.getBean("jarManagerPath");
		String jarXmlPath = (String) context.getBean("jarXmlPath");
		jarProjectVO.setNeedRun(true);
		JarManagerAPIService.setXmlFilePath(xmlpath);

		return JarManagerAPIService.addJarProjectVOXml(jarProjectVO);
	}

	public boolean deleteJarProjectVOXml(List<String> ids) throws IOException, JMSException {
		ApplicationContext context = new FileSystemXmlApplicationContext("classpath:jarmanager-config.xml");
		String xmlpath = (String) context.getBean("jarManagerPath");
		JarManagerAPIService.setXmlFilePath(xmlpath);

		return JarManagerAPIService.deleteJarProjectVOXml(ids);
	}

	public boolean updateJarProjectVOXml(JarProjectVO jarProjectVO) throws IOException, JMSException {
		ApplicationContext context = new FileSystemXmlApplicationContext("classpath:jarmanager-config.xml");
		String xmlpath = (String) context.getBean("jarManagerPath");
		JarManagerAPIService.setXmlFilePath(xmlpath);

		return JarManagerAPIService.updateJarProjectVOXml(jarProjectVO);
	}
	
	public boolean JarManagerSetUpXml(JarManagerAPIXMLVO jarManagerAPIXMLVO) throws IOException, JMSException {
		ApplicationContext context = new FileSystemXmlApplicationContext("classpath:jarmanager-config.xml");
		String xmlpath = (String) context.getBean("jarManagerPath");
		JarManagerAPIService.setXmlFilePath(xmlpath);

		jarManagerAPIXMLVO.getHeartBeatDestinationVO()
				.setAmqpQueueName(jarManagerAPIXMLVO.getHeartBeatDestinationVO().getDestinationName());
		jarManagerAPIXMLVO.getHeartBeatDestinationVO().setAmqp(true);
		return JarManagerAPIService.jarManagerSetUp(jarManagerAPIXMLVO);
	}

}
