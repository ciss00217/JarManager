package tw.com.jarmanager.q2sftp.mode;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement(name = "bankPro")
@XmlType(propOrder = { "ftpClient", "heartBeatClient", "queueConnectionFactory", "errorQueueConnectionFactory" })
public class BankPro {
	private FtpClient ftpClient;
	private HeartBeatClient heartBeatClient;
	private QueueConnectionFactory queueConnectionFactory;
	private ErrorQueueConnectionFactory errorQueueConnectionFactory;

	public FtpClient getFtpClient() {
		return ftpClient;
	}

	public void setFtpClient(FtpClient ftpClient) {
		this.ftpClient = ftpClient;
	}

	public HeartBeatClient getHeartBeatClient() {
		return heartBeatClient;
	}

	public void setHeartBeatClient(HeartBeatClient heartBeatClient) {
		this.heartBeatClient = heartBeatClient;
	}

	public QueueConnectionFactory getQueueConnectionFactory() {
		return queueConnectionFactory;
	}

	public void setQueueConnectionFactory(QueueConnectionFactory queueConnectionFactory) {
		this.queueConnectionFactory = queueConnectionFactory;
	}

	public ErrorQueueConnectionFactory getErrorQueueConnectionFactory() {
		return errorQueueConnectionFactory;
	}

	public void setErrorQueueConnectionFactory(ErrorQueueConnectionFactory errorQueueConnectionFactory) {
		this.errorQueueConnectionFactory = errorQueueConnectionFactory;
	}

}
