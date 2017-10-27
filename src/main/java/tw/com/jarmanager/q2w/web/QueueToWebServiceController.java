package tw.com.jarmanager.q2w.web;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.StringWriter;
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

import tw.com.jarmanager.q2w.web.mode.Config;
import tw.com.jarmanager.q2w.web.mode.Q2W;
import tw.com.jarmanager.util.XmlUtil;

@Controller
@RequestMapping("/q2w")
public class QueueToWebServiceController {

	private final Logger logger = LoggerFactory.getLogger(QueueToWebServiceController.class);

	// @RequestMapping(value = { "/", "/home" }, method = RequestMethod.GET)
	// public String home() {
	//
	// return "home";
	// }
	//
	// @RequestMapping(value = "/q2w", method = RequestMethod.GET)
	// public String q2w() {
	// return "q2w";
	// }
	//
	// @RequestMapping(value = "/q2d", method = RequestMethod.GET)
	// public String q2d() {
	// return "q2d";
	// }

	// @ResponseBody
	// @RequestMapping(value = "/q2w/api/writeToXml", method =
	// RequestMethod.POST)

	@ResponseBody
	@RequestMapping("writeToXml")
	public void getSearchResultViaAjax(@RequestBody Q2W q2w) throws Exception {

		String fileName = q2w.getFileName();

		JAXBContext context = JAXBContext.newInstance(Config.class);
		Marshaller m = context.createMarshaller();
		m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);

		StringWriter sw = new StringWriter();
		m.marshal(q2w.getConfig(), sw);

		XmlUtil.fileToJarXmlPath(fileName, false, sw.toString());

	}
}