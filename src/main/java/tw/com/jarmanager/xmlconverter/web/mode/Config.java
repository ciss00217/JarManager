package tw.com.jarmanager.xmlconverter.web.mode;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement
@XmlType(propOrder = { "xmlConverter" })
public class Config {

	@XmlElement(name = "fieldName",type=FieldName.class)
	private List<FieldName> xmlConverter;

	@XmlTransient
	public List<FieldName> getXmlConverter() {
		return xmlConverter;
	}

	public void setXmlConverter(List<FieldName> xmlConverter) {
		this.xmlConverter = xmlConverter;
	}

}
