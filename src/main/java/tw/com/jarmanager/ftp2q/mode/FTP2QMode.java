package tw.com.jarmanager.ftp2q.mode;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import tw.com.heartbeat.clinet.vo.HeartBeatClientXMLVO;

@XmlRootElement(name = "class")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = { "ftp2QConfig", "heartBeatClientXMLVO","jarFilePath"})
public class FTP2QMode {
	private FTP2QConfig ftp2QConfig;
	private HeartBeatClientXMLVO heartBeatClientXMLVO;
	private String jarFilePath;
	
	public FTP2QConfig getFtp2QConfig() {
		return ftp2QConfig;
	}
	public void setFtp2QConfig(FTP2QConfig ftp2qConfig) {
		ftp2QConfig = ftp2qConfig;
	}
	public HeartBeatClientXMLVO getHeartBeatClientXMLVO() {
		return heartBeatClientXMLVO;
	}
	public void setHeartBeatClientXMLVO(HeartBeatClientXMLVO heartBeatClientXMLVO) {
		this.heartBeatClientXMLVO = heartBeatClientXMLVO;
	}
	public String getJarFilePath() {
		return jarFilePath;
	}
	public void setJarFilePath(String jarFilePath) {
		this.jarFilePath = jarFilePath;
	}

}
