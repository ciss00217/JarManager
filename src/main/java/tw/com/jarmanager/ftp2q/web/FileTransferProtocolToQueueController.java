package tw.com.jarmanager.ftp2q.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import tw.com.heartbeat.clinet.vo.HeartBeatClientXMLVO;
import tw.com.jarmanager.ftp2q.mode.FTP2QConfig;
import tw.com.jarmanager.ftp2q.mode.FTP2QMode;
import tw.com.jarmanager.ftp2q.service.FileTransferProtocolToQueueService;
import tw.com.jarmanager.util.XmlUtil;

@Controller
@RequestMapping("/ftp2q")
public class FileTransferProtocolToQueueController {

	private final Logger logger = LoggerFactory.getLogger(FileTransferProtocolToQueueController.class);
	private final FileTransferProtocolToQueueService service;

	@Autowired
	public FileTransferProtocolToQueueController(FileTransferProtocolToQueueService service) {
		this.service = service;
	}

	@RequestMapping(method = RequestMethod.GET)
	public ModelAndView ftp2q() {

		ModelAndView model = new ModelAndView();
		model.setViewName("ftp2q");
		return model;

	}

	@RequestMapping(value = "/{fileName}", method = RequestMethod.DELETE, produces = "text/plain; charset=utf-8")
	public @ResponseBody String delete(@PathVariable("fileName") String fileName) throws Exception {

		return service.removeAllConfig(fileName);
	}

	@RequestMapping(value = "/{fileName}", method = RequestMethod.GET, produces = "text/plain; charset=utf-8")
	public @ResponseBody String search(@PathVariable("fileName") String fileName) throws Exception {

		String ftp2qConfigFileName = fileName + "-ftp2q-config";
		String ftpHeatBeatConfigFileName = fileName + "-HeatBeatClinetBeans";

		FTP2QMode ftpP2QMode = new FTP2QMode();

		if (XmlUtil.fileExistsJarXmlPath(ftp2qConfigFileName)) {
			FTP2QConfig ftp2QConfig = (FTP2QConfig) service.getJarXmleToObj(ftp2qConfigFileName, FTP2QConfig.class);

			String jarFilePath = service.getJarFilePathFromJarApiXml(fileName);

			ftpP2QMode.setFtp2QConfig(ftp2QConfig);

			ftpP2QMode.setJarFilePath(jarFilePath);
		}

		if (XmlUtil.fileExistsJarXmlPath(ftpHeatBeatConfigFileName)) {
			
			HeartBeatClientXMLVO heartBeatClientXMLVO = (HeartBeatClientXMLVO) service
					.getJarXmleToObj(ftpHeatBeatConfigFileName, HeartBeatClientXMLVO.class);
			
			ftpP2QMode.setHeartBeatClientXMLVO(heartBeatClientXMLVO);
		}
		
		return new Gson().toJson(ftpP2QMode);
	}

	@RequestMapping(method = RequestMethod.POST, produces = "text/plain; charset=utf-8")
	public @ResponseBody String dataToFile(@RequestBody FTP2QMode ftp2QMode) throws Exception {

		String xml = null;
		String beatID = ftp2QMode.getHeartBeatClientXMLVO().getHeartBeatClientVO().getBeatID();
		String mes = "";
		try {
			String name = beatID + "-ftp2q-config";

			if (!XmlUtil.fileExistsJarXmlPath(name)) {
				xml = service.getObjToXml(ftp2QMode.getFtp2QConfig(), FTP2QConfig.class);
				XmlUtil.fileToJarXmlPath(name, false, xml);
				mes += "[成功] ftp2q-config.xml\n";
			} else {
				mes += "[已存在] ftp2q-config.xml\n";
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			mes += "[失敗] ftp2q-config.xml\n";
		}
		
		try {
			String name = beatID + "-HeatBeatClinetBeans";

			if (!XmlUtil.fileExistsJarXmlPath(name)) {
				xml = service.getObjToXml(ftp2QMode.getHeartBeatClientXMLVO(), HeartBeatClientXMLVO.class);
				XmlUtil.fileToJarXmlPath(name, false, xml);
				mes += "[成功] HeatBeatClinetBeans.xml\n";
			} else {
				mes += "[已存在] HeatBeatClinetBeans.xml\n";
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			mes += "[失敗] HeatBeatClinetBeans.xml\n";
		}

		try {
			mes += service.addJarProjectVOXml(ftp2QMode, beatID) ? "[成功] JarManagerAPI.xml\n"
					: "[已存在] JarManagerAPI.xml\n";
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			mes += "[失敗] JarManagerAPI.xml\n";
		}

		return mes;
	}
	
	
	@RequestMapping(method = RequestMethod.PUT, produces = "text/plain; charset=utf-8")
	public @ResponseBody String updateToFile(@RequestBody FTP2QMode ftp2QMode) throws Exception {
		String xml = null;
		String beatID = ftp2QMode.getHeartBeatClientXMLVO().getHeartBeatClientVO().getBeatID();
		String mes = "";
		
		try {
			String name = beatID + "-ftp2q-config";

			if (XmlUtil.fileExistsJarXmlPath(name)) {
				xml = service.getObjToXml(ftp2QMode.getFtp2QConfig(), FTP2QMode.class);
				XmlUtil.fileToJarXmlPath(name, false, xml);
				mes += "[成功] ftp2q-config.xml\n";
			} else {
				mes += "[不存在] ftp2q-config.xml\n";
			}
		} catch (Exception e) {
			logger.error("ERROR:");
			
			logger.error(e.getMessage());
			mes += "[失敗] ftp2q-config.xml\n";
		}
		
		
		try {
			String name = beatID + "-HeatBeatClinetBeans";

			if (XmlUtil.fileExistsJarXmlPath(name)) {
				xml = service.getObjToXml(ftp2QMode.getHeartBeatClientXMLVO(), HeartBeatClientXMLVO.class);
				XmlUtil.fileToJarXmlPath(name, false, xml);
				mes += "[成功] HeatBeatClinetBeans.xml\n";
			} else {
				mes += "[不存在] HeatBeatClinetBeans.xml\n";
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			mes += "[失敗] HeatBeatClinetBeans.xml\n";
		}


		try {
			mes += service.updateJarProjectVOXml(ftp2QMode, beatID) ? "[成功] JarManagerAPI.xml\n"
					: "[已存在] JarManagerAPI.xml\n";
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			mes += "[失敗] JarManagerAPI.xml\n";
		}

		return mes;
	}

}
