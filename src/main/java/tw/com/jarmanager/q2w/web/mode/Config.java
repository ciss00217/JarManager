package tw.com.jarmanager.q2w.web.mode;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement
@XmlType(propOrder = { "heartBeatClient", "connectionFactory", "queueDestination", "queueOrigin", "queueError",
		"webService", "xmlConverter" })
public class Config {

	@XmlElement(name = "HeartBeatClient")
	private HeartBeatClient heartBeatClient;

	@XmlElement(name = "connectionFactory")
	private ConnectionFactory connectionFactory;

	@XmlElement(name = "queueDestination")
	private QueueDestination queueDestination;

	@XmlElement(name = "queueOrigin")
	private QueueOrigin queueOrigin;

	@XmlElement(name = "queueError")
	private QueueError queueError;

	@XmlElement(name = "webService")
	private WebService webService;

	@XmlElement(name = "fieldName", type = FieldName.class)
	private List<FieldName> xmlConverter;

	@XmlTransient
	public QueueError getQueueError() {
		return queueError;
	}

	public void setQueueError(QueueError queueError) {
		this.queueError = queueError;
	}

	@XmlTransient
	public List<FieldName> getXmlConverter() {
		return xmlConverter;
	}

	public void setXmlConverter(List<FieldName> xmlConverter) {
		this.xmlConverter = xmlConverter;
	}

	@XmlTransient
	public HeartBeatClient getHeartBeatClient() {
		return heartBeatClient;
	}

	public void setHeartBeatClient(HeartBeatClient heartBeatClient) {
		this.heartBeatClient = heartBeatClient;
	}

	@XmlTransient
	public ConnectionFactory getConnectionFactory() {
		return connectionFactory;
	}

	public void setConnectionFactory(ConnectionFactory connectionFactory) {
		this.connectionFactory = connectionFactory;
	}

	@XmlTransient
	public QueueDestination getQueueDestination() {
		return queueDestination;
	}

	public void setQueueDestination(QueueDestination queueDestination) {
		this.queueDestination = queueDestination;
	}

	@XmlTransient
	public QueueOrigin getQueueOrigin() {
		return queueOrigin;
	}

	public void setQueueOrigin(QueueOrigin queueOrigin) {
		this.queueOrigin = queueOrigin;
	}

	@XmlTransient
	public WebService getWebService() {
		return webService;
	}

	public void setWebService(WebService webService) {
		this.webService = webService;
	}
}
