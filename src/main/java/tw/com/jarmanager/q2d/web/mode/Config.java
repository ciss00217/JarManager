package tw.com.jarmanager.q2d.web.mode;

import java.io.Serializable;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import tw.com.jarmanager.q2w.web.mode.FieldName;

@XmlRootElement
public class Config implements Serializable{
	@XmlElement(name = "queueConnectionFactory")
	private QueueConnectionFactory queueConnectionFactory;
	@XmlElement(name = "databaseConnectionFactory")
	private DatabaseConnectionFactory databaseConnectionFactory;
	@XmlElement(name = "queueOrigin")
	private QueueOrigin queueOrigin;
	@XmlElement(name = "HeartBeatClient")
	private HeartBeatClient heartBeatClient;
	
	@XmlElement(name = "Insert")
    @SerializedName("insert")
    @Expose
	private Insert insert;
//	@XmlElementWrapper(name = "Insert")
//	 @XmlElement(name = "Table")
//	private List<Table> insert;
//	@XmlElement(name = "Delete",type=Delete.class)
//	private List<Object> delete;
	private Delete delete;
//	@XmlElement(name = "Update",type=Update.class)
//	private List<Object> update;
	private Update update;

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
