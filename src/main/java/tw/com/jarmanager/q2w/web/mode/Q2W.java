package tw.com.jarmanager.q2w.web.mode;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;

public class Q2W {

//	private String fileName;
	private Config config;
	private List<FieldName> xmlConverter;
	
	public List<FieldName> getXmlConverter() {
		return xmlConverter;
	}

	public void setXmlConverter(List<FieldName> xmlConverter) {
		this.xmlConverter = xmlConverter;
	}

//	public String getFileName() {
//		return fileName;
//	}
//
//	public void setFileName(String fileName) {
//		this.fileName = fileName;
//	}

	public Config getConfig() {
		return config;
	}

	public void setConfig(Config config) {
		this.config = config;
	}

}
