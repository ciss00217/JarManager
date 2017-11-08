package tw.com.jarmanager.q2d.web.mode;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import tw.com.jarmanager.q2w.web.mode.FieldName;

@XmlRootElement
public class Config {
	@XmlElement(name = "queueConnectionFactory")
	private QueueConnectionFactory queueConnectionFactory;
	@XmlElement(name = "databaseConnectionFactory")
	private DatabaseConnectionFactory databaseConnectionFactory;
	@XmlElement(name = "queueOrigin")
	private QueueOrigin queueOrigin;
	@XmlElement(name = "HeartBeatClient")
	private HeartBeatClient heartBeatClient;
	
	//@XmlElement(name = "Insert")
	//private Insert insert;
	@XmlElementWrapper(name = "Insert")
	 @XmlElement(name = "Table")
	private List<Table> insert;
//	@XmlElement(name = "Delete",type=Delete.class)
//	private List<Object> delete;
	private List<Object> delete;
//	@XmlElement(name = "Update",type=Update.class)
//	private List<Object> update;
	private List<Object> update;

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
	public List<Table> getInsert() {
		return insert;
	}

	public void setInsert(List<Table> insert) {
		this.insert = insert;
	}

	@XmlTransient
	public List<Object> getDelete() {
		return delete;
	}

	public void setDelete(List<Object> delete) {
		this.delete = delete;
	}

	@XmlTransient
	public List<Object> getUpdate() {
		return update;
	}

	public void setUpdate(List<Object> update) {
		this.update = update;
	}

}
