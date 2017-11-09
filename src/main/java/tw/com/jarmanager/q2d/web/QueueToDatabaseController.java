package tw.com.jarmanager.q2d.web;

import java.lang.reflect.Type;
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
import com.google.gson.reflect.TypeToken;

import tw.com.jarmanager.q2d.service.QueueToDatabaseService;
import tw.com.jarmanager.q2d.web.mode.Clazz;
import tw.com.jarmanager.q2d.web.mode.Config;
import tw.com.jarmanager.q2d.web.mode.Q2D;
import tw.com.jarmanager.q2w.web.mode.FieldName;
import tw.com.jarmanager.q2w.web.mode.Q2W;
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

	@RequestMapping(value = "/delete/{fileName}", method = RequestMethod.DELETE, produces = "text/plain; charset=utf-8")
	public @ResponseBody String delete(@PathVariable("fileName") String fileName) throws Exception {

		return service.removeAllConfig(fileName);
	}

	@RequestMapping(value = "/search/{fileName}", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
	public @ResponseBody String searchFile(@PathVariable("fileName") String fileName) throws Exception {
		String q2dConfigFileName = fileName + "-q2d-config";

		Q2D root = new Q2D();

		if (XmlUtil.fileExistsJarXmlPath(q2dConfigFileName)) {
			Config q2d = (Config) service.getJarXmleToObj(q2dConfigFileName, Config.class);
			String jarFilePath = service.getJarFilePathFromJarApiXml(fileName);
			q2d.getHeartBeatClient().setJarFilePath(jarFilePath);
			root.setConfig(q2d);
		}

		return new Gson().toJson(root);

	}

	@RequestMapping(method = RequestMethod.POST, produces = "text/plain; charset=utf-8")
	public @ResponseBody String dataToFile(@RequestBody String json) throws Exception {

		String xml = null, fileName = null, mes = "";
		Gson gson = null;
		Q2D q2d = null;
		try {
			gson = new Gson();
			Type type = new TypeToken<Q2D>() {
			}.getType();
			q2d = gson.fromJson(json, type);

		} catch (Exception e) {
			logger.error("Please check the correctness of the data");
			return "Please check the correctness of the data";
		}
		try {
			fileName = q2d.getConfig().getHeartBeatClient().getFileName();
		} catch (NullPointerException e) {
			logger.error("Can not get the file name");
			return "Can not get the file name";
		}

		try {
			String name = fileName + "-q2d-config";

			if (!XmlUtil.fileExistsJarXmlPath(name)) {
				xml = service.getObjToXml(q2d.getConfig(), Config.class);
				XmlUtil.fileToJarXmlPath(name, false, xml);
				mes += "[成功] q2d-config.xml\n";
			} else {
				mes += "[已存在] q2d-config.xml\n";
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			mes += "[失敗] q2d-config.xml\n";
		}
		try {
			String name = fileName + "-HeatBeatClinetBeans";

			if (!XmlUtil.fileExistsJarXmlPath(name)) {
				Clazz clazz = service.getHeartBeatVo(q2d, fileName);
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
			mes += service.addJarProjectVOXml(q2d.getConfig(), fileName) ? "[成功] JarManagerAPI.xml\n"
					: "[已存在] JarManagerAPI.xml\n";
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			mes += "[失敗] JarManagerAPI.xml\n";
		}
		return mes;
	}

	@RequestMapping(method = RequestMethod.PUT, produces = "text/plain; charset=utf-8")
	public @ResponseBody String updateToFile(@RequestBody String json) throws Exception {

		String xml = null, fileName = null, mes = "";
		Gson gson = null;
		Q2D q2d = null;
		try {
			gson = new Gson();
			Type type = new TypeToken<Q2D>() {
			}.getType();
			q2d = gson.fromJson(json, type);

		} catch (Exception e) {
			logger.error("Please check the correctness of the data");
			return "Please check the correctness of the data";
		}
		try {
			fileName = q2d.getConfig().getHeartBeatClient().getFileName();
		} catch (NullPointerException e) {
			logger.error("Can not get the file name");
			return "Can not get the file name";
		}

		try {
			String name = fileName + "-q2d-config";

			if (XmlUtil.fileExistsJarXmlPath(name)) {
				xml = service.getObjToXml(q2d.getConfig(), Config.class);
				XmlUtil.fileToJarXmlPath(name, false, xml);
				mes += "[成功] q2d-config.xml\n";
			} else {
				mes += "[不存在] q2d-config.xml\n";
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			mes += "[失敗] q2d-config.xml\n";
		}
		try {
			String name = fileName + "-HeatBeatClinetBeans";

			if (XmlUtil.fileExistsJarXmlPath(name)) {
				Clazz clazz = service.getHeartBeatVo(q2d, fileName);
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
			mes += service.updateJarProjectVOXml(q2d.getConfig(), fileName) ? "[成功] JarManagerAPI.xml\n"
					: "[已存在] JarManagerAPI.xml\n";
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			mes += "[失敗] JarManagerAPI.xml\n";
		}
		return mes;
	}
}