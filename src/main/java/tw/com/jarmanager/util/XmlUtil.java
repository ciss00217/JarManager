package tw.com.jarmanager.util;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

public class XmlUtil {

	private final static Logger logger = LoggerFactory.getLogger(XmlUtil.class);

	/*
	 * 目的:從JarManagerConfig文件中，提取出所需參數的值 
	 * name: 要提取的值對應的名稱
	 */
	public static String getJarManagerConfig(String name) {
		ApplicationContext context = null;
		try {
			context = new FileSystemXmlApplicationContext("classpath:jarmanager-config.xml");
			name = (String) context.getBean(name);
		} catch (BeansException e) {
			name = null;
			logger.error(e.getMessage());
		}
		return name;
	}

	/*
	 * 目的:寫入XML至JarManagerConfig文件中規定的路徑下 fileName: 要建立的檔案名稱 
	 * type: 檔案寫入方式
	 * true為附加上去，false則是覆寫 content: XML內文
	 */
	public static boolean fileToJarXmlPath(String fileName, boolean type, String content) {
		File file = null;
		boolean result = false;
		String jarXmlPath = XmlUtil.getJarManagerConfig("jarXmlPath");
		try {
			file = new File(jarXmlPath + fileName + ".xml");
			file.getParentFile().mkdirs();
			file.createNewFile();
			FileWriter fw = new FileWriter(file.getAbsolutePath(), type);
			fw.write(content);
			fw.close();
			result = true;
		} catch (IOException e) {
			logger.error(e.getMessage());
		}
		return result;
	}

	/*
	 * 目的: 確認檔案是否存在於JarManagerConfig文件中規定的路徑下 
	 * fileName: 檔案名稱
	 */
	public static boolean fileExistsJarXmlPath(String fileName) {
		File file = null;
		boolean result = false;
		String jarXmlPath = XmlUtil.getJarManagerConfig("jarXmlPath");
		try {
			file = new File(jarXmlPath + fileName + ".xml");
			if (file.exists() && !file.isDirectory()) {
				result = true;
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return result;
	}
}
