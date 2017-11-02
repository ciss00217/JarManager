package tw.com.jarmanager.q2w.web.mode;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlTransient;

public class Q2W {

	// private String fileName;
	private Config config;
	
	@XmlElement(name = "fieldName", type = FieldName.class)
	private List<FieldName> xmlConverter;

	private Clazz clazz;
	
	public Clazz getClazz() {
		return clazz;
	}

	public void setClazz(Clazz clazz) {
		this.clazz = clazz;
	}

	@XmlTransient
	public List<FieldName> getXmlConverter() {
		return xmlConverter;
	}

	public void setXmlConverter(List<FieldName> xmlConverter) {
		this.xmlConverter = xmlConverter;
	}

	// public String getFileName() {
	// return fileName;
	// }
	//
	// public void setFileName(String fileName) {
	// this.fileName = fileName;
	// }

	public Config getConfig() {
		return config;
	}

	public void setConfig(Config config) {
		this.config = config;
	}

}
