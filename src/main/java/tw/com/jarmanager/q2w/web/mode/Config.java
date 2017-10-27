package tw.com.jarmanager.q2w.web.mode;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Config {

	private HeartBeatClient heartBeatClient;
	
	private ConnectionFactory connectionFactory;
	
	private QueueDestination queueDestination;
	
	private QueueOrigin queueOrigin;
	
	private WebService webService;

	public HeartBeatClient getHeartBeatClient() {
		return heartBeatClient;
	}

	public void setHeartBeatClient(HeartBeatClient heartBeatClient) {
		this.heartBeatClient = heartBeatClient;
	}

	public ConnectionFactory getConnectionFactory() {
		return connectionFactory;
	}

	public void setConnectionFactory(ConnectionFactory connectionFactory) {
		this.connectionFactory = connectionFactory;
	}

	public QueueDestination getQueueDestination() {
		return queueDestination;
	}

	public void setQueueDestination(QueueDestination queueDestination) {
		this.queueDestination = queueDestination;
	}

	public QueueOrigin getQueueOrigin() {
		return queueOrigin;
	}

	public void setQueueOrigin(QueueOrigin queueOrigin) {
		this.queueOrigin = queueOrigin;
	}

	public WebService getWebService() {
		return webService;
	}

	public void setWebService(WebService webService) {
		this.webService = webService;
	}
}
