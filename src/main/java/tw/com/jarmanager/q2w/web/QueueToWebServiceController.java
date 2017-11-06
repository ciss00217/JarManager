package tw.com.jarmanager.q2w.web;

import java.util.List;

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
import tw.com.jarmanager.q2w.service.QueueToWebServiceService;
import tw.com.jarmanager.q2w.web.mode.Clazz;
import tw.com.jarmanager.q2w.web.mode.Config;
import tw.com.jarmanager.q2w.web.mode.FieldName;
import tw.com.jarmanager.q2w.web.mode.Q2W;
import tw.com.jarmanager.q2w.web.mode.XmlConverter;
import tw.com.jarmanager.util.XmlUtil;

@Controller
@RequestMapping("/q2w")
public class QueueToWebServiceController {

	private final Logger logger = LoggerFactory.getLogger(QueueToWebServiceController.class);

	private final QueueToWebServiceService service;

	@Autowired
	public QueueToWebServiceController(QueueToWebServiceService service) {
		this.service = service;
	}

	
	@RequestMapping(value = "/search/{fileName}", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
	public @ResponseBody String searchFile(@PathVariable("fileName") String fileName) throws Exception {
		System.out.println(fileName);

		String q2wConfigFileName = fileName + "-q2w-config";
		String q2wXmlconverterConfigFileName = fileName + "-xmlconverter-config";
//		String q2wHeatBeatClinetBeansConfigFileName = fileName + "-HeatBeatClinetBeans";

		Q2W root = new Q2W();

		if (XmlUtil.fileExistsJarXmlPath(q2wConfigFileName)) {
			Config q2w = (Config) service.getJarXmleToObj(q2wConfigFileName, Config.class);
			String jarFilePath = service.getJarFilePathFromJarApiXml(fileName);
			q2w.getHeartBeatClient().setJarFilePath(jarFilePath);
			logger.debug(new Gson().toJson(q2w));
			root.setConfig(q2w);
		}
		if (XmlUtil.fileExistsJarXmlPath(q2wXmlconverterConfigFileName)) {
			Config q2w = (Config) service.getJarXmleToObj(q2wXmlconverterConfigFileName, Config.class);
			List<FieldName> xmlconverter = q2w.getXmlConverter();
			// List<FieldName> xmlConverter = (List<FieldName> )
			// service.getJarXmleToObj(q2wXmlconverterConfigFileName,
			// FieldName.class);
			// root.SE
			logger.debug(new Gson().toJson(xmlconverter));
			root.setXmlConverter(xmlconverter);
		}
		// if(XmlUtil.fileExistsJarXmlPath(q2wHeatBeatClinetBeansConfigFileName)){
		// Clazz clazz = (Clazz)
		// service.getJarXmleToObj(q2wHeatBeatClinetBeansConfigFileName,
		// Clazz.class);
		// logger.debug(new Gson().toJson(clazz));
		// root.setClazz(clazz);
		// }

		return new Gson().toJson(root);

	}

	@RequestMapping(method = RequestMethod.POST, produces = "text/plain; charset=utf-8")
	public @ResponseBody String dataToFile(@RequestBody Q2W q2w) throws Exception {

		String xml = null;
		String fileName = q2w.getConfig().getHeartBeatClient().getFileName();
		String mes = "";
		try {
			String name = fileName + "-q2w-config";

			if (!XmlUtil.fileExistsJarXmlPath(name)) {
				xml = service.getObjToXml(q2w.getConfig(), Config.class);
				XmlUtil.fileToJarXmlPath(name, false, xml);
				mes += "[成功] q2w-config.xml\n";
			} else {
				mes += "[已存在] q2w-config.xml\n";
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			mes += "[失敗] q2w-config.xml\n";
		}
		try {
			String name = fileName + "-HeatBeatClinetBeans";

			if (!XmlUtil.fileExistsJarXmlPath(name)) {
				Clazz clazz = service.getHeartBeatVo(q2w, fileName);
				xml = service.getObjToXml(clazz, Clazz.class);
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
			mes += service.addJarProjectVOXml(q2w.getConfig(), fileName) ? "[成功] JarManagerAPI.xml\n"
					: "[已存在] JarManagerAPI.xml\n";
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			mes += "[失敗] JarManagerAPI.xml\n";
		}
		try {
			String name = fileName + "-xmlconverter-config";

			if (!XmlUtil.fileExistsJarXmlPath(name)) {
				List<FieldName> xmlConverter = q2w.getXmlConverter();

				Config config = new Config();
				config.setXmlConverter(xmlConverter);

				xml = service.getObjToXml(config, Config.class);
				XmlUtil.fileToJarXmlPath(name, false, xml);
				mes += "[成功] xmlconverter-config.xml\n";
			} else {
				mes += "[已存在] xmlconverter-config.xml\n";
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			mes += "[失敗] xmlconverter-config.xml\n";
		}
		return mes;
	}

	@RequestMapping(value = "/delete/{fileName}",method = RequestMethod.DELETE, produces = "text/plain; charset=utf-8")
	public @ResponseBody String delete(@PathVariable("fileName") String fileName) throws Exception {

		return service.removeAllConfig(fileName);
	}
	
	@RequestMapping(method = RequestMethod.PUT, produces = "text/plain; charset=utf-8")
	public @ResponseBody String updateToFile(@RequestBody Q2W q2w) throws Exception {

		String xml = null;
		String fileName = q2w.getConfig().getHeartBeatClient().getFileName();
		String mes = "";
		try {
			String name = fileName + "-q2w-config";

			if (XmlUtil.fileExistsJarXmlPath(name)) {
				xml = service.getObjToXml(q2w.getConfig(), Config.class);
				XmlUtil.fileToJarXmlPath(name, false, xml);
				mes += "[成功] q2w-config.xml\n";
			} else {
				mes += "[不存在] q2w-config.xml\n";
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			mes += "[失敗] q2w-config.xml\n";
		}
		try {
			String name = fileName + "-HeatBeatClinetBeans";

			if (XmlUtil.fileExistsJarXmlPath(name)) {
				Clazz clazz = service.getHeartBeatVo(q2w, fileName);
				clazz.getHeartBeatConnectionFactory().setVirtualHost("/");
				xml = service.getObjToXml(clazz, Clazz.class);
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
			mes += service.updateJarProjectVOXml(q2w.getConfig(), fileName) ? "[成功] JarManagerAPI.xml\n"
					: "[已存在] JarManagerAPI.xml\n";
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			mes += "[失敗] JarManagerAPI.xml\n";
		}
		try {
			String name = fileName + "-HeatBeatClinetBeans";

			if (XmlUtil.fileExistsJarXmlPath(name)) {
				List<FieldName> xmlConverter = q2w.getXmlConverter();

				Config config = new Config();
				config.setXmlConverter(xmlConverter);

				xml = service.getObjToXml(config, Config.class);
				XmlUtil.fileToJarXmlPath(fileName + "-xmlconverter-config", false, xml);
				mes += "[成功] xmlconverter-config.xml\n";
			} else {
				mes += "[不存在] xmlconverter-config.xml\n";
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			mes += "[失敗] xmlconverter-config.xml\n";
		}
		return mes;
	}
}