package tw.com.jarmanager.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.jms.JMSException;

import tw.com.jarmanager.api.vo.JarProjectVO;
import tw.com.jarmanager.q2w.web.mode.HeartBeatClient;

public class Test {

	public static void main(String[] args) throws IOException, JMSException {
		// TODO Auto-generated method stub
		addJarProjectVOXml("FILE");
	}

	public static boolean addJarProjectVOXml(String fileName) throws IOException, JMSException {

		// HeartBeatClient heartBeatClient = config.getHeartBeatClient();
		JarProjectVO jarProjectVO = new JarProjectVO();
		jarProjectVO.setBeatID("Q2W111");
		jarProjectVO.setFileName("Q2W111");
		jarProjectVO.setJarFilePath("D:\\jarFilePath\\Q2W.jar");
		jarProjectVO.setTimeSeries(60000);
		List<String> filePathXMLList = new ArrayList<>();
		filePathXMLList.add(fileName + "-q2w-config");
		filePathXMLList.add(fileName + "-xmlconverter-config");
		filePathXMLList.add(fileName + "-HeatBeatClinetBeans");
		jarProjectVO.setFilePathXMLList(filePathXMLList);
		return new JarManagerService().addJarProjectVOXml(jarProjectVO);
	}

}
