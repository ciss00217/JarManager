package tw.com.jarmanager.util;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

import tw.com.jarmanager.api.vo.JarProjectVO;

public class JarXMLUtil {

	public static JarProjectVO addPathInJarXmlPath(JarProjectVO jarProjectVO) {
		List<String> list = jarProjectVO.getFilePathXMLList();
		List<String> newFilePath = new ArrayList<String>();
		ApplicationContext context = new FileSystemXmlApplicationContext("classpath:jarmanager-config.xml");
		String jarXmlPath = (String) context.getBean("jarXmlPath");

		for (int i = 0; i < list.size(); i++) {
			String str = list.get(i);
			str = jarXmlPath + list.get(i) + ".xml";
			newFilePath.add(str);
		}
		jarProjectVO.setFilePathXMLList(newFilePath);
		return jarProjectVO;
	}

	public static List<JarProjectVO> addPathInJarXmlPath(List<JarProjectVO> jarProjectVOs) {
		for (JarProjectVO jarProjectVO : jarProjectVOs) {
			jarProjectVO = addPathInJarXmlPath(jarProjectVO);
		}
		return jarProjectVOs;
	}

	public static JarProjectVO removePathInJarXmlPath(JarProjectVO jarProjectVO) {
		List<String> list = jarProjectVO.getFilePathXMLList();
		List<String> newFilePath = new ArrayList<String>();
		ApplicationContext context = new FileSystemXmlApplicationContext("classpath:jarmanager-config.xml");
		String jarXmlPath = (String) context.getBean("jarXmlPath");

		for (int i = 0; i < list.size(); i++) {
			String str = list.get(i);
			str = str.replace(jarXmlPath, "");
			str = str.replace(".xml", "");

			newFilePath.add(str);
		}
		jarProjectVO.setFilePathXMLList(newFilePath);
		return jarProjectVO;
	}

	public static List<JarProjectVO> removePathInJarXmlPath(List<JarProjectVO> jarProjectVOs) {
		for (JarProjectVO jarProjectVO : jarProjectVOs) {
			jarProjectVO = removePathInJarXmlPath(jarProjectVO);
		}
		return jarProjectVOs;
	}

}
