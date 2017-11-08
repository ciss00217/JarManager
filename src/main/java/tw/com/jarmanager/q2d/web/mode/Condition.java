package tw.com.jarmanager.q2d.web.mode;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@XmlRootElement(name = "Condition")
public class Condition {
	@XmlElement(name = "Source")
	private String source;
	@XmlElement(name = "Destination")
	private String destination;
	@XmlElement(name = "Type")
	private String type;
	@XmlElement(name = "Relation")
	private String relation;

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

	@XmlTransient
	public String getRelation() {
		return relation;
	}

	public void setRelation(String relation) {
		this.relation = relation;
	}

}
