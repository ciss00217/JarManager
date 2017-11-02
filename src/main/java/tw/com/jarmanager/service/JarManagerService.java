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
import tw.com.jarmanager.api.vo.JarProjectVO;

@Service
public class JarManagerService {

	private final Logger logger = LoggerFactory.getLogger(JarManagerService.class);

	public void clearQueue() throws JMSException {
		ApplicationContext context = new FileSystemXmlApplicationContext("classpath:jarmanager-config.xml");
		String xmlpath = (String) context.getBean("jarManagerPath");
		JarManagerAPIService jarManagerAPIService = new JarManagerAPIService();
		jarManagerAPIService.setXmlFilePath(xmlpath);

		// jarManagerAPIService.getDeathList();

	}

	public List<HeartBeatClientVO> getSoleHeartBeatClientVOList() throws JMSException {
		ApplicationContext context = new FileSystemXmlApplicationContext("classpath:jarmanager-config.xml");
		String xmlpath = (String) context.getBean("jarManagerPath");
		JarManagerAPIService jarManagerAPIService = new JarManagerAPIService();
		jarManagerAPIService.setXmlFilePath(xmlpath);

		List<HeartBeatClientVO> heartBeatClientVOList = jarManagerAPIService.getSoleHeartBeatClientVOList();

		return heartBeatClientVOList;

	}

	public List<JarProjectVO> getJarProjectVOStatus() throws IOException, JMSException {
		ApplicationContext context = new FileSystemXmlApplicationContext("classpath:jarmanager-config.xml");
		String xmlpath = (String) context.getBean("jarManagerPath");
		JarManagerAPIService jarManagerAPIService = new JarManagerAPIService();
		jarManagerAPIService.setXmlFilePath(xmlpath);

		List<JarProjectVO> jarProjectVOList = jarManagerAPIService.getJarProjectVOStatus("127.0.0.1", 9527);

		return jarProjectVOList;

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
						xMLJarPeojectVO.setFirstScuessRun(jarProjectVOStatus.getFirstScuessRun());
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
		JarManagerAPIService jarManagerAPIService = new JarManagerAPIService();
		jarManagerAPIService.setXmlFilePath(xmlpath);

		List<JarProjectVO> jarProjectVOList = jarManagerAPIService.getXMLJarProjectVOList(xmlpath);

		return jarProjectVOList;

	}

	public boolean addJarProjectVOXml(JarProjectVO jarProjectVO) throws IOException, JMSException {
		ApplicationContext context = new FileSystemXmlApplicationContext("classpath:jarmanager-config.xml");
		String xmlpath = (String) context.getBean("jarManagerPath");
		String jarXmlPath = (String) context.getBean("jarXmlPath");
		jarProjectVO.setNeedRun(true);
		JarManagerAPIService jarManagerAPIService = new JarManagerAPIService();
		jarManagerAPIService.setXmlFilePath(xmlpath);
		

		return jarManagerAPIService.addJarProjectVOXml(jarProjectVO);
	}

	public boolean deleteJarProjectVOXml(List<String> ids) throws IOException, JMSException {
		ApplicationContext context = new FileSystemXmlApplicationContext("classpath:jarmanager-config.xml");
		String xmlpath = (String) context.getBean("jarManagerPath");
		JarManagerAPIService jarManagerAPIService = new JarManagerAPIService();
		jarManagerAPIService.setXmlFilePath(xmlpath);

		return jarManagerAPIService.deleteJarProjectVOXml(ids);
	}

	public boolean updateJarProjectVOXml(JarProjectVO jarProjectVO) throws IOException, JMSException {
		ApplicationContext context = new FileSystemXmlApplicationContext("classpath:jarmanager-config.xml");
		String xmlpath = (String) context.getBean("jarManagerPath");
		JarManagerAPIService jarManagerAPIService = new JarManagerAPIService();
		jarManagerAPIService.setXmlFilePath(xmlpath);

		return jarManagerAPIService.updateJarProjectVOXml(jarProjectVO);
	}

}
