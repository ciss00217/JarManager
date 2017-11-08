package tw.com.jarmanager.q2d.web.mode;

import java.beans.Transient;

import javax.xml.bind.annotation.XmlElement;

public class Q2D {
	
//	@XmlElement(name = "config")
	private Config config;

//	@Transient
	public Config getConfig() {
		return config;
	}

	public void setConfig(Config config) {
		this.config = config;
	}

}
