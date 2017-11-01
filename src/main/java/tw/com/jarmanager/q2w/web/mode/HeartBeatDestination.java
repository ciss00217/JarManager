package tw.com.jarmanager.q2w.web.mode;

public class HeartBeatDestination {
	private String destinationName;
	private String amqp;
	private String amqpQueueName;
	private String amqpExchangeName;
	private String amqpRoutingKey;

	public String getDestinationName() {
		return destinationName;
	}

	public void setDestinationName(String destinationName) {
		this.destinationName = destinationName;
	}

	public String getAmqp() {
		return amqp;
	}

	public void setAmqp(String amqp) {
		this.amqp = amqp;
	}

	public String getAmqpQueueName() {
		return amqpQueueName;
	}

	public void setAmqpQueueName(String amqpQueueName) {
		this.amqpQueueName = amqpQueueName;
	}

	public String getAmqpExchangeName() {
		return amqpExchangeName;
	}

	public void setAmqpExchangeName(String amqpExchangeName) {
		this.amqpExchangeName = amqpExchangeName;
	}

	public String getAmqpRoutingKey() {
		return amqpRoutingKey;
	}

	public void setAmqpRoutingKey(String amqpRoutingKey) {
		this.amqpRoutingKey = amqpRoutingKey;
	}

}
