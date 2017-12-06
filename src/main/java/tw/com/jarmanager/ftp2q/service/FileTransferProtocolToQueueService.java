package tw.com.jarmanager.ftp2q.service;

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
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import tw.com.heartbeat.clinet.vo.HeartBeatClientVO;
import tw.com.jarmanager.api.vo.JarProjectVO;
import tw.com.jarmanager.ftp2q.mode.FTP2QConfig;
import tw.com.jarmanager.ftp2q.mode.FTP2QMode;
import tw.com.jarmanager.q2w.web.mode.Config;
import tw.com.jarmanager.q2w.web.mode.HeartBeatClient;
import tw.com.jarmanager.service.JarManagerService;
import tw.com.jarmanager.util.JarXMLUtil;
import tw.com.jarmanager.util.XmlUtil;
import tw.com.jarmanager.web.JarManagerController;

@Service
public class FileTransferProtocolToQueueService {

	private final Logger logger = LoggerFactory.getLogger(FileTransferProtocolToQueueService.class);

	public String removeAllConfig(String fileName) throws JAXBException {

		String jarXmlPath = XmlUtil.getJarManagerConfig("jarXmlPath");
		String jarManagerPath = XmlUtil.getJarManagerConfig("jarManagerPath");

		String mes = "";
		try {
			String name = fileName + "-ftp2q-config";
			String path = jarXmlPath + fileName + "-ftp2q-config.xml";

			if (XmlUtil.fileExistsJarXmlPath(name)) {
				File file = new File(path);
				mes += file.delete() ? "[成功刪除] ftp2q-config.xml\n" : "[刪除失敗] ftp2q-config.xml\n";
			} else {
				mes += "[檔案不存在] ftp2q-config.xml\n";
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			mes += "[系統錯誤] ftp2q-config.xml\n";
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

	public boolean addJarProjectVOXml(FTP2QMode config, String beatID) throws IOException, JMSException {

		try {
			JarProjectVO jarProjectVO = new JarProjectVO();
			jarProjectVO.setBeatID(config.getHeartBeatClientXMLVO().getHeartBeatClientVO().getBeatID());
			jarProjectVO.setFileName(config.getHeartBeatClientXMLVO().getHeartBeatClientVO().getFileName());
			jarProjectVO.setJarFilePath(config.getJarFilePath());
			jarProjectVO.setTimeSeries(config.getHeartBeatClientXMLVO().getHeartBeatClientVO().getTimeSeries());
			List<String> filePathXMLList = new ArrayList<>();
			filePathXMLList.add(beatID + "-ftp2q-config");
			filePathXMLList.add(beatID + "-HeatBeatClinetBeans");
			jarProjectVO.setFilePathXMLList(filePathXMLList);

			jarProjectVO = JarXMLUtil.addPathInJarXmlPath(jarProjectVO);

			return new JarManagerService().addJarProjectVOXml(jarProjectVO);
		} catch (NullPointerException e) {
			return false;
		}
	}
	
	public boolean updateJarProjectVOXml(FTP2QMode config, String beatID) throws IOException, JMSException {
		JarProjectVO jarProjectVO = new JarProjectVO();
		jarProjectVO.setBeatID(config.getHeartBeatClientXMLVO().getHeartBeatClientVO().getBeatID());
		jarProjectVO.setFileName(config.getHeartBeatClientXMLVO().getHeartBeatClientVO().getFileName());
		jarProjectVO.setJarFilePath(config.getJarFilePath());
		jarProjectVO.setTimeSeries(config.getHeartBeatClientXMLVO().getHeartBeatClientVO().getTimeSeries());
		List<String> filePathXMLList = new ArrayList<>();
		filePathXMLList.add(beatID + "-ftp2q-config");
		filePathXMLList.add(beatID + "-HeatBeatClinetBeans");
		jarProjectVO.setFilePathXMLList(filePathXMLList);

		jarProjectVO = JarXMLUtil.addPathInJarXmlPath(jarProjectVO);
		return new JarManagerService().updateJarProjectVOXml(jarProjectVO);
	}
	
	
	
	
}
