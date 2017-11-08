package tw.com.jarmanager.q2d.web.mode;

import java.util.List;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

//@XmlRootElement
public class Table {

	@XmlAttribute(name = "name")
	private String name;

	@XmlElement(name = "Field", type = Field.class)
	private List<Field> field;

	@XmlElement(name = "Relation")
	private String relation;

	@XmlTransient
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@XmlTransient
	public List<Field> getFields() {
		return field;
	}

	public void setFields(List<Field> field) {
		this.field = field;
	}

	@XmlTransient
	public String getRelation() {
		return relation;
	}

	public void setRelation(String relation) {
		this.relation = relation;
	}
}
