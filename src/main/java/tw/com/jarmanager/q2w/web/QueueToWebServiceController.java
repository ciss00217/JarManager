package tw.com.jarmanager.q2w.web;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.StringWriter;
import java.util.List;
import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.PropertyException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.sun.org.apache.bcel.internal.generic.AALOAD;

import tw.com.jarmanager.api.vo.JarProjectVO;
import tw.com.jarmanager.q2w.service.QueueToWebServiceService;
import tw.com.jarmanager.q2w.web.mode.Class;
import tw.com.jarmanager.q2w.web.mode.Config;
import tw.com.jarmanager.q2w.web.mode.FieldName;
import tw.com.jarmanager.q2w.web.mode.HeartBeatClientVO;
import tw.com.jarmanager.q2w.web.mode.HeartBeatConnectionFactory;
import tw.com.jarmanager.q2w.web.mode.HeartBeatDestination;
import tw.com.jarmanager.q2w.web.mode.Q2W;
import tw.com.jarmanager.q2w.web.mode.XmlConverter;
import tw.com.jarmanager.service.JarManagerService;
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
	
	@RequestMapping( method = RequestMethod.POST)
	public @ResponseBody String getSearchResultViaAjax(@RequestBody Q2W q2w) throws Exception {

		String xml = null;
		String fileName = q2w.getConfig().getHeartBeatClient().getFileName();
		String mes = "";
		try {
			xml = service.getObjToXml(q2w.getConfig(), Config.class);
			XmlUtil.fileToJarXmlPath(fileName + "-q2w-config", false, xml);
			mes += "[success] q2w-config.xml\n";
		} catch (Exception e) {
			logger.error(e.getMessage());
			mes += "[failure] q2w-config.xml\n";
		}
		try {
			tw.com.jarmanager.q2w.web.mode.Class clazz = service.getHeartBeatVo(q2w, fileName);
			xml = service.getObjToXml(clazz, tw.com.jarmanager.q2w.web.mode.Class.class);
			XmlUtil.fileToJarXmlPath(fileName + "-HeatBeatClinetBeans", false, xml);
			mes += "[success] HeatBeatClinetBeans.xml\n";
		} catch (Exception e) {
			logger.error(e.getMessage());
			mes += "[failure] HeatBeatClinetBeans.xml\n";
		}

		try {
			service.addJarProjectVOXml(q2w.getConfig(), fileName);
			mes += "[success] JarManagerAPI.xml\n";
		} catch (Exception e) {
			logger.error(e.getMessage());
			mes += "[failure] JarManagerAPI.xml\n";
		}
		try {
			List<FieldName> test = q2w.getXmlConverter();

			for (int i = 0; i < test.size(); i++) {

				FieldName fieldName = test.get(i);

				System.out.println("-----------------------------------------");
				System.out.println(fieldName.getSource());
				System.out.println(fieldName.getDescription());
				System.out.println(fieldName.getDestination());
				System.out.println(fieldName.isAttribute());
			}
			// List<XmlConverter> test= q2w.getXmlConverter();
			//
			// for(int i=0;i<test.size();i++){
			//
			// XmlConverter x = test.get(i);
			// FieldName fieldName = x.getFieldName();
			// System.out.println("-----------------------------------------");
			// System.out.println(fieldName.getSource());
			// System.out.println(fieldName.getDescription());
			// System.out.println(fieldName.getDestination());
			// System.out.println(fieldName.isAttribute());
			// }

			Config config = new Config();
			config.setXmlConverter(test);

			xml = service.getObjToXml(config, Config.class);
			logger.debug("xml:" + xml);
			XmlUtil.fileToJarXmlPath(fileName + "-xmlconverter-config", false, xml);
			mes += "[success] xmlconverter-config.xml\n";
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			mes += "[failure] xmlconverter-config.xml\n";
		}
		return mes;
	}
}