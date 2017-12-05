package tw.com.jarmanager.q2sftp.web;

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

import tw.com.heartbeat.clinet.vo.HeartBeatClientXMLVO;
import tw.com.jarmanager.q2sftp.mode.BankPro;
import tw.com.jarmanager.q2sftp.service.QueueToSFTPService;
import tw.com.jarmanager.util.XmlUtil;

@Controller
@RequestMapping("/q2sftp")
public class QueueToSFTPController {
	private final Logger logger = LoggerFactory.getLogger(QueueToSFTPController.class);
	private QueueToSFTPService service;

	@Autowired
	public QueueToSFTPController(QueueToSFTPService service) {
		this.service = service;
	}

	@RequestMapping(method = RequestMethod.POST, produces = "text/plain; charset=utf-8")
	public @ResponseBody String save(@RequestBody BankPro bankPro) throws Exception {
		String xml = null, fileName = null, mes = "";

		try {
			fileName = bankPro.getHeartBeatClient().getFileName();
		} catch (NullPointerException e) {
			logger.error("Can not get the file name");
			return "Can not get the file name";
		}

		try {
			String name = fileName + "-q2ftp-config";

			if (!XmlUtil.fileExistsJarXmlPath(name)) {
				xml = service.getObjToXml(bankPro, BankPro.class);
				XmlUtil.fileToJarXmlPath(name, false, xml);
				mes += "[成功] q2ftp-config.xml\n";
			} else {
				mes += "[已存在] q2ftp-config.xml\n";
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			mes += "[失敗] q2ftp-config.xml\n";
		}
		try {
			String name = fileName + "-HeatBeatClinetBeans";

			if (!XmlUtil.fileExistsJarXmlPath(name)) {
				HeartBeatClientXMLVO clazz = service.get(bankPro);
				xml = service.getObjToXml(clazz, HeartBeatClientXMLVO.class);
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
			mes += service.addJarProjectVOXml(bankPro) ? "[成功] JarManagerAPI.xml\n" : "[已存在] JarManagerAPI.xml\n";
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			mes += "[失敗] JarManagerAPI.xml\n";
		}
		return mes;
	}

	@RequestMapping(value = "/search/{fileName}", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
	public @ResponseBody String searchFile(@PathVariable("fileName") String fileName) throws Exception {
		String q2ftpConfigFileName = fileName + "-q2ftp-config";

		BankPro bankPro = null;

		if (XmlUtil.fileExistsJarXmlPath(q2ftpConfigFileName)) {
			bankPro = (BankPro) service.getJarXmleToObj(q2ftpConfigFileName, BankPro.class);
			String jarFilePath = service.getJarFilePathFromJarApiXml(fileName);
			bankPro.getHeartBeatClient().setJarFilePath(jarFilePath);
		}
		return new Gson().toJson(bankPro);

	}

	@RequestMapping(method = RequestMethod.PUT, produces = "text/plain; charset=utf-8")
	public @ResponseBody String updateToFile(@RequestBody BankPro bankPro) throws Exception {

		String xml = null, fileName = null, mes = "";

		try {
			fileName = bankPro.getHeartBeatClient().getFileName();
		} catch (NullPointerException e) {
			logger.error("Can not get the file name");
			return "Can not get the file name";
		}

		try {
			String name = fileName + "-q2ftp-config";

			if (XmlUtil.fileExistsJarXmlPath(name)) {
				xml = service.getObjToXml(bankPro, BankPro.class);
				XmlUtil.fileToJarXmlPath(name, false, xml);
				mes += "[成功] q2ftp-config.xml\n";
			} else {
				mes += "[不存在] q2ftp-config.xml\n";
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			mes += "[失敗] q2ftp-config.xml\n";
		}
		try {
			String name = fileName + "-HeatBeatClinetBeans";

			if (XmlUtil.fileExistsJarXmlPath(name)) {
				HeartBeatClientXMLVO clazz = service.get(bankPro);
				xml = service.getObjToXml(clazz, HeartBeatClientXMLVO.class);
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
			mes += service.updateJarProjectVOXml(bankPro) ? "[成功] JarManagerAPI.xml\n" : "[已存在] JarManagerAPI.xml\n";
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			mes += "[失敗] JarManagerAPI.xml\n";
		}
		return mes;
	}

	@RequestMapping(value = "/delete/{fileName}", method = RequestMethod.DELETE, produces = "text/plain; charset=utf-8")
	public @ResponseBody String delete(@PathVariable("fileName") String fileName) throws Exception {

		return service.removeAllConfig(fileName);
	}
}
