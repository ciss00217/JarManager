package tw.com.jarmanager.q2d.web.mode;

import java.beans.Transient;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

//@XmlRootElement
public class Insert {

//	@XmlElement(name = "Table",type=Table.class)
	@XmlElementWrapper(name = "insert")
	@XmlElement(name = "table",type=Table.class)
    @SerializedName("table")
    @Expose
    private List<Table> table = null;

	@Transient
	public List<Table> getTable() {
		return table;
	}

	public void setTable(List<Table> table) {
		this.table = table;
	}

//	@XmlElementWrapper(name = "Insert")
//	@XmlElement(name = "Table")
//	private Table table;
//
//	public Table getTable() {
//		return table;
//	}
//
//	public void setTable(Table table) {
//		this.table = table;
//	}

}
