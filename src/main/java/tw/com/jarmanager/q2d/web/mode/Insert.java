package tw.com.jarmanager.q2d.web.mode;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

//@XmlRootElement
public class Insert {
	@XmlElement(name = "Table",type=Table.class)
	private List<Table> table;

	@XmlTransient
	public List<Table> getTables() {
		return table;
	}

	public void setTables(List<Table> table) {
		this.table = table;
	}
}
