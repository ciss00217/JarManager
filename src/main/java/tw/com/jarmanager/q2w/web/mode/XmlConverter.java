package tw.com.jarmanager.q2w.web.mode;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

import tw.com.jarmanager.q2w.web.mode.FieldName;

@XmlRootElement
//@XmlSeeAlso(ArrayList.class)
public class XmlConverter {
	
	@XmlElement(name="fieldName")
	private FieldName fieldName;

	@XmlTransient
	public FieldName getFieldName() {
		return fieldName;
	}

	public void setFieldName(FieldName fieldName) {
		this.fieldName = fieldName;
	}



}
