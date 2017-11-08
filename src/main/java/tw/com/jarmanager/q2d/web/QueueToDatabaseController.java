package tw.com.jarmanager.q2d.web;

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
import tw.com.jarmanager.q2d.service.QueueToDatabaseService;
import tw.com.jarmanager.q2d.web.mode.Config;
import tw.com.jarmanager.q2d.web.mode.Q2D;
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

	@RequestMapping(method = RequestMethod.POST, produces = "text/plain; charset=utf-8")
	public @ResponseBody String dataToFile(@RequestBody Q2D q2d) throws Exception {

		String xml = null, fileName = null, mes = "";
		System.out.println();
		System.out.println(new Gson().toJson(q2d));
		System.out.println();
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
		// String mes = "";
		// System.out.println(arg0);
		return mes;
	}

}