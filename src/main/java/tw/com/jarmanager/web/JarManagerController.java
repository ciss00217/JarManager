package tw.com.jarmanager.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.jms.JMSException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import tw.com.heartbeat.clinet.vo.HeartBeatClientVO;
import tw.com.jarmanager.api.vo.JarProjectVO;
import tw.com.jarmanager.service.JarManagerService;
import tw.com.jarmanager.util.JarXMLUtil;

@Controller
public class JarManagerController {

	private final Logger logger = LoggerFactory.getLogger(JarManagerController.class);
	private final JarManagerService jarManagerService;

	@Autowired
	public JarManagerController(JarManagerService jarManagerService) {
		this.jarManagerService = jarManagerService;
	}

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public ModelAndView jarManagerIndex() {

		logger.debug("jarManager() is executed!");

		List<HeartBeatClientVO> heartBeatClientVOList = null;
		List<JarProjectVO> jarProjectVOList = null;

		try {
			
			jarProjectVOList = jarManagerService.getJarProjectVOStatus();
		} catch (Exception e) {
			logger.debug("Error: " + e.getMessage());
		}

		ModelAndView model = new ModelAndView();
		model.setViewName("jarManager");
		model.addObject("heartBeatClientVOList", heartBeatClientVOList);
		model.addObject("jarProjectVOList", jarProjectVOList);

		return model;

	}

	@RequestMapping(value = "/JarProjectVO/{id:.+}", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody JarProjectVO getJarProjectVO(@PathVariable("id") String id) {

		logger.debug("jarManager() is executed!  ");

		List<JarProjectVO> jarProjectVOList = null;

		try {

			jarProjectVOList = jarManagerService.getXMLJarPeojectVOs();

			if (jarProjectVOList != null && jarProjectVOList.size() > 0) {
				for (JarProjectVO jarProjectVO : jarProjectVOList) {
					if (id.equals(jarProjectVO.getBeatID())) {
						jarProjectVO = JarXMLUtil.removePathInJarXmlPath(jarProjectVO);
						return jarProjectVO;
					}
				}
			}

		} catch (Exception e) {
			logger.debug("Error: " + e.getMessage());
		}

		return null;

	}

	@RequestMapping(value = "/JarProjectVO", method = RequestMethod.POST)
	public @ResponseBody boolean insertJarPeojectVOs(@RequestBody JarProjectVO jarProjectVO) {
		boolean isSucess = false;
		try {

			List<String> list = jarProjectVO.getFilePathXMLList();
			List<String> newFilePath = new ArrayList<String>();
			ApplicationContext context = new FileSystemXmlApplicationContext("classpath:jarmanager-config.xml");

			jarProjectVO = JarXMLUtil.addPathInJarXmlPath(jarProjectVO);

			isSucess = jarManagerService.addJarProjectVOXml(jarProjectVO);
		} catch (IOException | JMSException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return isSucess;

	}

	@RequestMapping(value = "/JarProjectVO", method = RequestMethod.PUT)
	public @ResponseBody boolean editJarPeojectVOs(@RequestBody JarProjectVO jarProjectVO) {
		boolean isSucess = false;
		try {
		
			 jarProjectVO= JarXMLUtil.addPathInJarXmlPath(jarProjectVO);

			isSucess = jarManagerService.updateJarProjectVOXml(jarProjectVO);
		} catch (IOException | JMSException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return isSucess;
	}

	@RequestMapping(value = "/JarProjectVO/{id:.+}", method = RequestMethod.DELETE)
	public @ResponseBody boolean deleteJarPeojectVOs(@PathVariable("id") String id) {

		List<String> ids = new ArrayList<String>();
		ids.add(id);

		boolean isSucess = false;
		try {
			isSucess = jarManagerService.deleteJarProjectVOXml(ids);
		} catch (IOException | JMSException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return isSucess;

	}

	@RequestMapping(value = "/JarProjectVOs", method = RequestMethod.GET)
	public ModelAndView JarPeojectVOs() {
		boolean isManagerApiRun = true;
		logger.debug("JarPeojectVOs is executed!  ");
		List<JarProjectVO> jarProjectVOList = null;
		
	
		try {
			jarProjectVOList = jarManagerService.getJarProjectVOStatusForUI();

			jarProjectVOList = JarXMLUtil.removePathInJarXmlPath(jarProjectVOList);

		} catch (Exception e) {
			logger.debug("Error: " + e.getMessage());
		}

		ModelAndView model = new ModelAndView();
		if(jarManagerService.jarManagerIsRun()){
			model.addObject("jarManagerIsRun", true);
		}else{
			model.addObject("jarManagerIsRun", false);
		}
		
		model.setViewName("jarManagerNew");
		model.addObject("jarProjectVOList", jarProjectVOList);

		return model;

	}
}
