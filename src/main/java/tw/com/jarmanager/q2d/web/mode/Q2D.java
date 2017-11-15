package tw.com.jarmanager.q2d.web.mode;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlTransient;

public class Q2D {
	
	@XmlElement(name = "config")
	private Config config;

	@XmlTransient
	public Config getConfig() {
		return config;
	}

	public void setConfig(Config config) {
		this.config = config;
	}

}
