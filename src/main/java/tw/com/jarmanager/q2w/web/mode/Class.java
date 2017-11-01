package tw.com.jarmanager.q2w.web.mode;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Class {
	private HeartBeatConnectionFactory heartBeatConnectionFactory;
	private HeartBeatDestination heartBeatDestination;
	private HeartBeatClientVO heartBeatClientVO;

	public HeartBeatConnectionFactory getHeartBeatConnectionFactory() {
		return heartBeatConnectionFactory;
	}

	public void setHeartBeatConnectionFactory(HeartBeatConnectionFactory heartBeatConnectionFactory) {
		this.heartBeatConnectionFactory = heartBeatConnectionFactory;
	}

	public HeartBeatDestination getHeartBeatDestination() {
		return heartBeatDestination;
	}

	public void setHeartBeatDestination(HeartBeatDestination heartBeatDestination) {
		this.heartBeatDestination = heartBeatDestination;
	}

	public HeartBeatClientVO getHeartBeatClientVO() {
		return heartBeatClientVO;
	}

	public void setHeartBeatClientVO(HeartBeatClientVO heartBeatClientVO) {
		this.heartBeatClientVO = heartBeatClientVO;
	}

}
