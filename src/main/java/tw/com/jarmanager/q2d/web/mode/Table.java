package tw.com.jarmanager.q2d.web.mode;

import java.util.List;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Table {

	@XmlAttribute(name = "name")
	private String name;
	@XmlElement(name = "Field")
	private List<Field> field = null;

	@XmlElement(name = "Condition")
	private Condition condition;

	@XmlTransient
	public Condition getCondition() {
		return condition;
	}

	public void setCondition(Condition condition) {
		this.condition = condition;
	}

	@XmlTransient
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@XmlTransient
	public List<Field> getField() {
		return field;
	}

	public void setField(List<Field> field) {
		this.field = field;
	}

	//// @XmlAttribute(name = "name")
	// private String name;
	//
	// // private TableDetail tableDetail;
	//
	// // @XmlElementWrapper(name = "Table")
	//// @XmlElement(name = "Field", type = Field.class)
	// private List<Field> field;
	//
	//// @XmlElement(name = "Relation")
	// private String relation;
	//
	//// @XmlTransient
	// public String getName() {
	// return name;
	// }
	//
	// public void setName(String name) {
	// this.name = name;
	// }
	//
	//// @XmlTransient
	//
	//
	//// @XmlTransient
	// public String getRelation() {
	// return relation;
	// }
	//
	// public List<Field> getField() {
	// return field;
	// }
	//
	// public void setField(List<Field> field) {
	// this.field = field;
	// }
	//
	// public void setRelation(String relation) {
	// this.relation = relation;
	// }
}
