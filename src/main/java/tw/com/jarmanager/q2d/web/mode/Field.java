package tw.com.jarmanager.q2d.web.mode;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement
@XmlType(propOrder = { "source", "destination", "type" })
public class Field {
	@XmlElement(name = "Source")
	private String source;
	@XmlElement(name = "Destination")
	private String destination;
	@XmlElement(name = "Type")
	private String type;

	@XmlTransient
	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	@XmlTransient
	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	@XmlTransient
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
