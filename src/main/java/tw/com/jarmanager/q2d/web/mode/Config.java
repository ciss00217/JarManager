package tw.com.jarmanager.q2d.web.mode;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import tw.com.jarmanager.q2w.web.mode.QueueError;

@XmlRootElement
public class Config {
	@XmlElement(name = "queueConnectionFactory")
	private QueueConnectionFactory queueConnectionFactory;
	
	@XmlElement(name = "databaseConnectionFactory")
	private DatabaseConnectionFactory databaseConnectionFactory;
	
	@XmlElement(name = "queueOrigin")
	private QueueOrigin queueOrigin;

	@XmlElement(name = "queueError")
	private QueueError queueError;
	
	@XmlElement(name = "HeartBeatClient")
	private HeartBeatClient heartBeatClient;
	
	@XmlElement(name = "Insert")
	private Insert insert;
	
	@XmlElement(name = "Delete")
	private Delete delete;
	
	@XmlElement(name = "Update")
	private Update update;

	@XmlTransient
	public QueueError getQueueError() {
		return queueError;
	}

	public void setQueueError(QueueError queueError) {
		this.queueError = queueError;
	}

	@XmlTransient
	public QueueConnectionFactory getQueueConnectionFactory() {
		return queueConnectionFactory;
	}

	public void setQueueConnectionFactory(QueueConnectionFactory queueConnectionFactory) {
		this.queueConnectionFactory = queueConnectionFactory;
	}

	@XmlTransient
	public DatabaseConnectionFactory getDatabaseConnectionFactory() {
		return databaseConnectionFactory;
	}

	public void setDatabaseConnectionFactory(DatabaseConnectionFactory databaseConnectionFactory) {
		this.databaseConnectionFactory = databaseConnectionFactory;
	}

	@XmlTransient
	public QueueOrigin getQueueOrigin() {
		return queueOrigin;
	}

	public void setQueueOrigin(QueueOrigin queueOrigin) {
		this.queueOrigin = queueOrigin;
	}

	@XmlTransient
	public HeartBeatClient getHeartBeatClient() {
		return heartBeatClient;
	}

	public void setHeartBeatClient(HeartBeatClient heartBeatClient) {
		this.heartBeatClient = heartBeatClient;
	}

	@XmlTransient
	public Insert getInsert() {
		return insert;
	}

	public void setInsert(Insert insert) {
		this.insert = insert;
	}

	@XmlTransient
	public Delete getDelete() {
		return delete;
	}

	public void setDelete(Delete delete) {
		this.delete = delete;
	}

	@XmlTransient
	public Update getUpdate() {
		return update;
	}

	public void setUpdate(Update update) {
		this.update = update;
	}

}
