package tw.com.jarmanager.q2d.web.mode;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlTransient;

//@XmlRootElement
public class Insert {

	@XmlElement(name = "Table",type=Table.class)
    private List<Table> table = null;

	@XmlTransient
	public List<Table> getTable() {
		return table;
	}

	public void setTable(List<Table> table) {
		this.table = table;
	}
}
